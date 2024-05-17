
import { Op } from 'sequelize';


import profissaoModel from "../models/Profissao.js";


const profissaoController = {

    findAll: async (req,res) => {

        try {

            const termoBusca = req.query.termoBusca;

            const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
            const itemsPerPage = parseInt(req.query.itemsPerPage) || 15; // Itens por página, padrão é 30
    
            const startIndex = parseInt(req.query.startIndex) || (page - 1) * itemsPerPage; // Índice de início, padrão é calculado com base na página atual
            const endIndex = parseInt(req.query.endIndex) || startIndex + itemsPerPage; // Índice final, padrão é calculado com base no índice de início e itens por página

            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } }, 
                ]
            }
            
            const profissao = await profissaoModel.findAll({ 
                where: whereClause, 
                limit: endIndex - startIndex, 
                offset: startIndex, 
                order: [['Nome', 'ASC'], ]});

            res.json(profissao);

        } catch (error) {
            console.log(`Erro ao buscar a lista de profissoes: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de profissoes'});
        }
    },

    findById: async(req,res) => {

        const { id } = req.params;

        try {
            
           const profissao = await profissaoModel.findByPk(id);

           if(!profissao){
                return res.status(500).json('Profissão não encontrada');
           }

           return res.json(profissao);

        } catch (error) {
            console.log(`Erro ao buscar profissão: ${error}`);
            return res.status(500).json('Erro ao obter grupo');
        }

    },

    create: async(req,res) => {
        try {
            
            const {Nome} = req.body;

            const novaProfissao = await profissaoModel.create({
                Nome: Nome
            })

            return res.status(200).json(novaProfissao);
            
        } catch (error) {
            console.log(`Erro ao criar profissão: ${error}`);
            res.status(500).json('Erro ao cadastrar profissão.');
        }
    },


    deleteById: async(req,res) => {

        const { id } = req.params;

        try {
            
            if(!id){
                return res.status(500).json('Profissão não encontrada');
            }

            const profissaoExluida = await profissaoModel.destroy({
                where: {IdProfissao: id}
            })


            return res.status(200).json(profissaoExluida);

        } catch (error) {
            console.log(`Erro ao excluir profissão: ${error}`);
            return res.status(500).json(error);
        }   
    },

    updateById: async(req,res) => {
        const { id } = req.params;

        try {
            
            const profissao = await profissaoModel.findByPk(id);
            
            if(!profissao){
                return res.json(500).json('Proifissão não encontrad');
            }

            const { Nome } = req.body;

            const profissaoAtualizada = await profissaoModel.update({
                Nome: Nome
            }, {
                where: {IdProfissao: id}
            });

            return res.status(200).json(profissaoAtualizada);

        } catch (error) {
            console.log(`Erro ao buscar profissão: ${error}`);
            return res.status(500).json('Erro ao obter grupo');
        }
    },


    countFindAll: async(req,res) =>{
        try {
            
            const termoBusca = req.query.termoBusca;
            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } }, 
                ]
            }   

            
            const profissao = await profissaoModel.count({where: whereClause});

        
            res.json(profissao);

        } catch (error) {
            console.log('Erro ao contar as profissões');
            console.log(error);
            return res.status(500).json('Erro ao contar as profissoes');
        }
    }

    
};

export default profissaoController;