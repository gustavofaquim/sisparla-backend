import { Sequelize, Op, where } from 'sequelize';


import demandaModel from "../models/Demanda.js";
import SituacaoDemanda from '../models/SituacaoDemanda.js';
import CategoriaDemanda from '../models/CategoriaDemanda.js';

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
    }
}

export default demandaController;