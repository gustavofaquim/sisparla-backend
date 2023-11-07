import { Sequelize, Op, where } from 'sequelize';


import demandaModel from "../models/Demanda.js";
import SituacaoDemanda from '../models/SituacaoDemanda.js';
import CategoriaDemanda from '../models/CategoriaDemanda.js';
import DemandaResponsavel from "../models/Usuario.js";

const demandaController = {

    findAll: async(req,res) => {

        try {

            const {termoBusca} = req.query;
            
            const whereClause = {};

            if(termoBusca){
                whereClause[Op.or] = [
                    {Assunto: {[Op.like]: `%${termoBusca}%`} },
                   {
                        '$DemandaCategoria.Descricao$':{
                            [Op.like] : `%${termoBusca}%`
                        },
                    },
                    {
                        '$DemandaSituaco.Descricao$': {
                            [Op.like] : `%${termoBusca}%`
                        }
                    }
                ]
            }

            const demandas = await demandaModel.findAll({
                include: [
                    {
                        model: SituacaoDemanda,
                        as: 'DemandaSituaco',
                        foreignKey: 'Situacao'
                    },
                    {
                        model: CategoriaDemanda,
                        as: 'DemandaCategoria',
                        foreignKey: 'Demanda'
                    },
                    {
                        model: DemandaResponsavel,
                        as: 'DemandaResponsavel',
                        foreignKey: 'Responsavel'
                    }
                ],
                where: whereClause
            });
            
            res.json(demandas);



        } catch (error) {
            console.log(`Erro ao buscar a lista de demandas ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de demandas'});
        }
    },

    destructuringDemanda: (demanda) => {

        try {

            
            const idDemanda = demanda.IdDemanda;
            const assunto = demanda.Assunto;
            const descricao = demanda.Descricao;
            const idCategoria = demanda.Categoria;
            const idSituacao = demanda.Situacao;
            const idResponsavel = demanda.Responsavel;
            const idApoiador = demanda?.Apoiador;
            const emendaParlamentar = demanda.EmendaParlamentar;
            const valor = demanda.Valor;
           
            const demandaD = {idDemanda, assunto, descricao, idCategoria, idSituacao,
            idResponsavel, idApoiador, emendaParlamentar, valor};

            return demandaD;
            
        } catch (error) {
            console.log('Erro ao desestruturar a Demanda: ' + error);
            throw error;
        }

    },

    findById: async(req,res) => {

        const { id } = req.params;

        try {
            
            const demanda = await demandaModel.findByPk(id,{
                include: [
                    {
                        model: SituacaoDemanda,
                        as: 'DemandaSituaco',
                        foreignKey: 'Situacao'
                    },
                    {
                        model: CategoriaDemanda,
                        as: 'DemandaCategoria',
                        foreignKey: 'Demanda'
                    },
                    {
                        model: DemandaResponsavel,
                        as: 'DemandaResponsavel',
                        foreignKey: 'Responsavel'
                    }
                ],
            })

            if(!demanda){
                return res.status(404).json({msg: 'Demanda não encontrado'});
            }
           

            const demandaD = demandaController.destructuringDemanda(demanda);

            res.json(demandaD);

        } catch (error) {
            console.log(`Erro ao buscar a demanda: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a demanda'});
        }
    },


    create: async(req,res) => {

      
        try {
            
            const {assunto, descricao, apoiador, idCategoria, idSituacao, idResponsavel, valor, emandaParlamentar} = req.body
            
            const novaDemanda = await demandaModel.create({
                Assunto: assunto,
                Descricao: descricao,
                Apoiador: apoiador,
                Categoria: idCategoria,
                Situacao: idSituacao,
                Responsavel: idResponsavel,
                Valor: valor || null,
                EmendaParlamentar: emandaParlamentar || 'N'
            })

          
            return res.status(200).json({novaDemanda});


        } catch (error) {
            console.log(`Erro ao cadastrar a demanda ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar a demanda'});
        }
    },

    updateById: async(req,res) => {

        const { id } = req.params;
        

        try {
            
            const demanda = await demandaModel.findByPk(id);

            if(!demanda){
                return res.status(500).json({msg: 'Demanda não encontrada'});
            }

            const {assunto, descricao, idCategoria, idSituacao, 
            idResponsavel, idApoiador, emendaParlamentar, valor} = req.body;

            const dadosDemanda = {
                Assunto: assunto,
                Descricao: descricao,
                Categoria: idCategoria,
                Situacao: idSituacao,
                Responsavel: idResponsavel || null,
                Apoiador: idApoiador || null,
                EmendaParlamentar: emendaParlamentar,
                Valor: valor
            }

            const demandaAtualizada = await demandaModel.update(dadosDemanda, {
                where: {IdDemanda: id}
            })

            return res.status(200).json({demandaAtualizada});

        } catch (error) {
            console.log('Erro ao atualizar a Demanda: ' + error);
            res.status(500).json({msg: 'Erro ao atualizar a Demanda'});
        }

    }
}

export default demandaController;