
import grupoModel from "../models/Grupo.js";

import usuarioModel from "../models/Usuario.js";

const grupoController = {

    findAll: async(req,res) => {

        try {
            const grupo = await grupoModel.findAll(
               {
                include: [
                    {
                        model: usuarioModel,
                        as: 'ResponsavelGrupo',
                        foreignKey: 'Resonsavel',
                    }]
               }
            );
            return res.json(grupo);
        } catch (error) {
            console.log(`Erro ao oboter a lista de grupos: ${error}`);
            res.status(500).json({msg: 'Erro ao oboter a lista de grupos'});
        }
    },

    findById: async(req,res) => {

        const { id } = req.params;

        try {
            
            const grupo = await grupoModel.findByPk(id,{
                include: [
                    {
                        model: usuarioModel,
                        as: 'ResponsavelGrupo',
                        foreignKey: 'Resonsavel',
                    }]
            })

            if(!grupo){
                return res.status(500).json('Grupo não encontrado');
            }

            return res.json(grupo);

        } catch (error) {
            console.log('Erro ao obter o grupo: ' + error);
            return res.status(500).json('Erro ao obter o grupo');
        }
    },

    create: async(req,res) => {
        try {
            
            const {nome, responsavel} = req.body;
            
            const novoGrupo = await grupoModel.create({
               Nome: nome,
               Responsavel: responsavel
            });

            return res.status(200).json(novoGrupo);

        } catch (error) {
            console.log(`Erro ao cadastrar grupo: ${error}`);
            res.status(500).json('Erro ao cadastrar grupo');
        }
    }
}

export default  grupoController;