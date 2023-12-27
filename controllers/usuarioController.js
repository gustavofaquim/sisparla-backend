import usuarioModel from "../models/Usuario.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            console.log('Senha Encriptada:', hash);
        });
        });

    },


    find: async(req,res) => {

        const {nomeUsuario, senha} = req.body

        try {
            const usuario = await usuarioModel.findOne({
                where: {
                    NomeUsuario: nomeUsuario,
                }
            });

            
            if(!usuario){
                res.status(401).json({msg: 'Nome de Usuário inválido'});
                return;
            }
      

            const password = await bcrypt.compare(senha, usuario.Senha);

            if(!password){
                res.status(401).json({msg: 'Senha inválida'});
                return;
            }


            const secret = 'secreto';

            // Gerar token JWT
            const token = jwt.sign(
                { 
                    usuario: usuario.NomeUsuario,
                    nome: usuario.Nome,  
                    regra: usuario.RegraAcesso,
                    sistema: usuario.Sistema 
                }, secret , { expiresIn: '1h' }
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
            
            const usuarios = await usuarioModel.findAll({
                where: {Status: 1}
            })

            res.json(usuarios);

        } catch (error) {
            console.log(`Erro buscar usuarios: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar usuarios'})
        }
    }

    

}

export default usuarioController;