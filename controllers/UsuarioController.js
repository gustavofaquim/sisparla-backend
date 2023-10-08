import usuarioModel from "../models/Usuario.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usuarioController = {


    find: async(req,res) => {

        const {nomeUsuario, senha} = req.body

        try {
            const usuario = await usuarioModel.findOne({
                where: {
                    NomeUsuario: nomeUsuario,
                }
            });

            console.log(usuario);
            if(!usuario){
                res.status(401).json({msg: 'Nome de Usuário inválido'});
                return;
            }

            const password = await bcrypt.compare(senha, "fdfdfdfdfdfdfd");

            if(!password){
                res.status(401).json({msg: 'Senha inválida'});
                return;
            }

            // Gerar token JWT
            const token = jwt.sign({ usuario: usuario.NomeUsuario, regra: usuario.RegraAcesso }, 'secreto', { expiresIn: '1h' });

           
            res.json({ token });

        } catch (error) {
            console.log(`Erro buscar usuario: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar usuario'})
        }
    }

}

export default usuarioController;