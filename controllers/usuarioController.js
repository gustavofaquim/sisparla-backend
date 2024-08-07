import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize, Op, QueryTypes  } from 'sequelize';
import sequelize from "../db/conn.js";

import revokedTokens from "../middlewares/revokedTokens.js";
import usuarioModel from "../models/Usuario.js";
import PerfilAcesso from "../models/PerfilAcesso.js";
import Permissao from "../models/Permissao.js";
import PerfilPermissao from "../models/PerfilPermissao.js";

const usuarioController = {

    encrypt: (senha) => {


        // Geração do salt
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            throw err;
        }

        // Hash da senha com o salt
        bcrypt.hash(senha, salt, (err, hash) => {
            if (err) {
            throw err;
            }

            // Agora 'hash' contém a senha encriptada
            //console.log('Senha Encriptada:', hash);
        });
        });

    },


    find: async(req,res) => {

        const {nomeUsuario, senha} = req.body
        
        try {


            const query = `
            SELECT 
                u.IdUsuario,
                u.NomeUsuario,
                u.Nome,
                u.Senha,
                u.PerfilAcesso AS IdPerfil,
                PA.Nome as PerfilNome,
                t.Nome AS Tela,
                p.IdPermissao,
                p.Nome AS PermissaoNome
            FROM
                	USUARIO u
                    INNER JOIN PERFIL_ACESSO PA ON u.PerfilAcesso = PA.IdPerfil
                    INNER JOIN PERFIL_PERMISSAO PP ON PP.IdPerfil = PA.IdPerfil
                    INNER JOIN TELA t on t.IdTela = PP.IdTela
                    INNER JOIN PERMISSAO p ON p.IdPermissao = PP.IdPermissao
            WHERE
                u.NomeUsuario = :nomeUsuario;`;
                
            let results = [];


            results = await sequelize.query(query, {
                replacements: { nomeUsuario },
                type: sequelize.QueryTypes.SELECT 
            });

        
            
            if (results.length === 0) {
                res.status(401).json({ msg: 'Nome de Usuário inválido' });
                return;
            }

    
           // Agregar os resultados
            const usuario = {
                IdUsuario: results[0].IdUsuario,
                NomeUsuario: results[0].NomeUsuario,
                Senha: results[0].Senha,
                Nome: results[0].Nome,
                Sistema: results[0].Sistema,
                Perfil: {
                    IdPerfil: results[0].IdPerfil,
                    Nome: results[0].PerfilNome,
                    Telas: []
                }
            };

            
             // Iterar sobre os resultados para agregar permissões
            results.forEach(row => {
                if (row.IdPermissao && row.PermissaoNome && row.Tela) {
                    usuario.Perfil.Telas.push({
                        Tela: row.Tela,
                        permissoes: {
                            IdPermissao: row.IdPermissao,
                            Nome: row.PermissaoNome}
                    });
                }
            });


            
            const password = await bcrypt.compare(senha, usuario.Senha);

            if(!password){
                res.status(401).json({msg: 'Senha inválida'});
                return;
            }

            if(usuario?.Perfil?.Telas.length == 0 ){
                res.status(401).json({msg: 'Você não possui permissão para acessar esse recurso.'});
                return;
            }

            const secret = 'secreto';


            // Gerar token JWT
            const token = jwt.sign(
                { 
                    id: usuario.IdUsuario,
                    usuario: usuario.NomeUsuario,
                    nome: usuario.Nome,  
                    regra: usuario.RegraAcesso,
                    perfil: usuario.Perfil.IdPerfil,
                    sistema: usuario.Sistema, 
                    telas: usuario.Perfil.Telas,
                        
                   
                }, 
                secret
            );
            
           
            //res.json({ token });
            // res.setHeader('Authorization', `Bearer ${token}`); -> não funciona no servidor de produção
            res.status(200).json({token});

        } catch (error) {
            console.log(`Erro buscar usuario: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar usuario'})
        }
    },


    findAssets: async(req,res) => {
        try {

           // const busca = req?.query?.inputValue


            const usuarios = await usuarioModel.findAll({
                where: {
                  Status: 1,
                },
                include: [
                    {
                        model: PerfilAcesso,
                        as: 'PerfilAcessoUsuario',
                        foreignKey: 'Perfil'
                    }, 
                ]
            });

            
           // Construindo URLs de imagens
           const usuariosComImagens = usuarios.map(user => {
                const imageUrl = user.Avatar
                ? `http://${req.get('host')}/uploads/images/users/${user.Avatar}`
                : null;
                
                return { ...user.dataValues, imageUrl };
            });

            //console.log(usuariosComImagens)
    
            res.json(usuariosComImagens);

        } catch (error) {
            console.log(`Erro buscar usuarios: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar usuarios'})
        }
    },

    removeToken: async (req, res) => {
        
        try {
          const tokenObtido = req.headers.authorization;
          const token = tokenObtido?.replace('Bearer ', '');
      
          if (!token) {
            return res.status(401).json({ msg: 'Token não fornecido' });
          }
      
          // Adicione o token à lista de tokens revogados
          revokedTokens.add(token);
          
          return res.status(200).json({ msg: 'Token removido com sucesso' });

        } catch (error) {
          console.error('Erro ao remover o token:', error);
          return res.status(500).json({ msg: 'Erro ao remover o token' });
        }
    }
      

}

export default usuarioController;