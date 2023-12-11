import { Sequelize, Op, where } from 'sequelize';
import sequelize from "../db/conn.js";


import demandaModel from "../models/Demanda.js";
import SituacaoDemanda from '../models/SituacaoDemanda.js';
import CategoriaDemanda from '../models/CategoriaDemanda.js';
import DemandaResponsavel from "../models/Usuario.js";
import Apoiador from "../models/Apoiador.js";

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

    userDemands: async(req,res) => {

        try {
                const { id } = req.params;

                const whereClause = {
                '$DemandaResponsavel.IdUsuario$': id,
                '$DemandaSituaco.Descricao$': 'Aberta',};

              

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
            console.log(`Erro ao buscar as demandas do usuário ${error}`);
            res.status(500).json({msg: 'Erro ao buscar as demandas do usuário'});
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
            const apoiadorNome = demanda?.DemandaApoiador?.Nome;
            const emendaParlamentar = demanda.EmendaParlamentar;
            const valor = demanda.Valor;
            const data = demanda.Data;
            
           
            const demandaD = {idDemanda, assunto, descricao, idCategoria, idSituacao,
            idResponsavel, idApoiador, apoiadorNome,  emendaParlamentar, valor, data};

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

            return res.json(demandaD);

        } catch (error) {
            console.log(`Erro ao buscar a demanda: ${error}`);
            return res.status(500).json({msg: 'Erro ao buscar a demanda'});
        }
    },


    create: async(req,res) => {

      
        try {
            
            const {assunto, descricao, idApoiador, idCategoria, idSituacao, idResponsavel, valor, emendaParlamentar} = req.body;

            const dataAtual = new Date();

            
            const novaDemanda = await demandaModel.create({
                Assunto: assunto,
                Descricao: descricao,
                Apoiador: idApoiador,
                Categoria: idCategoria,
                Situacao: idSituacao,
                Responsavel: idResponsavel,
                Valor: valor || null,
                Data: dataAtual,
                EmendaParlamentar: emendaParlamentar || 'N'
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
                Apoiador: idApoiador,
                Responsavel: idResponsavel || null,
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

    },


    updateSituacaoById: async(req,res) => {

        const { id } = req.params;

        try {
            
            const demanda = await demandaModel.findByPk(id);

            if(!demanda){
                console.log('Demanda não encontrada');
                return;
            }

            const {situacao} = req.body;

            const demandaAtualizada = await demandaModel.update(
                {Situacao: situacao}, 
                {where: {IdDemanda: id}}
            )

            return res.status(200).json({demandaAtualizada});

        } catch (error) {
            console.log('Erro ao atualizar a situacao da demanda: ' + error);
            res.status(500).json({msg: 'Erro ao atualiza a situacao da demanda'});
        }

    },

    deleteById: async(req,res) => {

        const { id } = req.params;

        try {
            
            const demandaDeletada  = await demandaModel.destroy({
                where: {
                    IdDemanda: id,
                },
            })

            if(demandaDeletada === 0){
                return res.status(404).json({msg: 'Demanda não encontrado'});
            }

            res.status(200).json({msg: 'Demanda deletado com sucesso'});


        } catch (error) {
            console.log('Erro ao excluir demanda: ' + error);
            res.status(500).json({msg: 'Erro ao excluir demanda: '});
        }
    },

    viewDemandas: async(req,res) => {

        try {
            
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
                ],
               
            })

            const demandaPorTipo = demandas.reduce((contagem, demanda) => {
                const tipo = demanda.DemandaCategoria.Descricao;
                contagem[tipo] = (contagem[tipo] || 0) + 1;
                return contagem;
            }, {});

     
             // Construir um array com a contagem por tipo
            const contagemDemanda = Object.entries(demandaPorTipo).map(([tipo, quantidade]) => ({ tipo, quantidade }));


            const demandaPorSituacao = demandas.reduce((contagem, demanda) => {
                const tipo = demanda.DemandaSituaco.Descricao; // Substitua 'nome' pelo campo correto da categoria
                contagem[tipo] = (contagem[tipo] || 0) + 1;
                return contagem;
            }, {});

             // Construir um array com a contagem por tipo
             const contagemDemandaSit = Object.entries(demandaPorSituacao).map(([tipo, quantidade]) => ({ tipo, quantidade }));

             res.status(200).json([{'DemandasSituacao' : contagemDemandaSit},{'DemandasCateogira' : contagemDemanda}]);


        } catch (error) {
            console.log(`Não foi possível exibir os dados de demandas: ${error}`);
            res.status(500).json({msg: 'Não foi possível exibir os dados de demandas'});
        }

    },
}

export default demandaController;