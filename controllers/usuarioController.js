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
                u.Perfil AS IdPerfil,
                pa.Nome as PerfilNome,
                p.IdPermissao,
                p.Nome AS PermissaoNome
            FROM
                USUARIO u
                LEFT JOIN PERFIL_ACESSO pa ON u.Perfil = pa.IdPerfil
                LEFT JOIN PERFIL_PERMISSAO pp ON pa.IdPerfil = pp.IdPerfil
                LEFT JOIN PERMISSAO p ON pp.IdPermissao = p.IdPermissao
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
                RegraAcesso: results[0].RegraAcesso,
                Sistema: results[0].Sistema,
                Perfil: {
                    IdPerfil: results[0].IdPerfil,
                    Nome: results[0].PerfilNome,
                    Permissoes: []
                }
            };
            
             // Iterar sobre os resultados para agregar permissões
            results.forEach(row => {
                if (row.IdPermissao && row.PermissaoNome) {
                    usuario.Perfil.Permissoes.push({
                        IdPermissao: row.IdPermissao,
                        Nome: row.PermissaoNome
                    });
                }
            });
            
            
                          

            const password = await bcrypt.compare(senha, usuario.Senha);

            if(!password){
                res.status(401).json({msg: 'Senha inválida'});
                return;
            }

            if(usuario?.Perfil?.Permissoes.length == 0 ){
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
                    permissoes: usuario.Perfil.Permissoes
                }, 
                secret
            );
            
            
            //res.json({ token });
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).json({token});

        } catch (error) {
            console.log(`Erro buscar usuario: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar usuario'})
        }
    },


    findAssets: async(req,res) => {
        try {

            const busca = req?.query?.inputValue
        
            const usuarios = await usuarioModel.findAll({
                where: {
                  Status: 1,
                  Nome: {
                    [Op.like]: `%${busca}%` // Usando Op.like para comparar substrings
                  }
                }
            });

            res.json(usuarios);

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