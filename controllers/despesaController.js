
import { Sequelize, Op } from 'sequelize';
import despesaModel from "../models/Despesa.js";
import OrigemDespesa from "../models/OrigemDespesa.js";
import credorModel from "../models/Credor.js";
import TipoDespesa from "../models/TipoDespesa.js";

const DespesaController = {

    findAll: async(req,res) => {
        
        try {

            const {termoBusca} = req.query;

            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    { Descricao: { [Op.like]: `%${termoBusca}%` } }, 
                    { Valor: { [Op.like]: `%${termoBusca}%` } }, 
                    {
                        '$CredorDespesa.Nome$': {
                            [Op.like]: `%${termoBusca}%`,
                        },
                    },
                ]
            }
            
            const despesas = await despesaModel.findAll({
                include: [
                    {
                        model: credorModel,
                        as: 'CredorDespesa',
                        foreignKey: 'Credor'
                    },
                    {
                        model: OrigemDespesa,
                        as: 'OrigemDespesa',
                        foreignKey: 'Origem'
                    },
                    {
                        model: TipoDespesa,
                        as: 'TipoDespesa',
                        foreignKey: 'Tipo'
                    }
                ], where: whereClause, order: [['Data', 'DESC'], ]
            });
            
            res.json(despesas);

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao buscar a lista de despesas'});
        }
    },

    findById: async(req,res) =>{

        const { id } = req.params;
        
        try {
            
            const despesa = await despesaModel.findByPk(id, {
                include: [
                    {
                        model: credorModel,
                        as: 'CredorDespesa',
                        foreignKey: 'Credor'
                    },
                    {
                        model: OrigemDespesa,
                        as: 'OrigemDespesa',
                        foreignKey: 'Origem'
                    },
                    {
                        model: TipoDespesa,
                        as: 'TipoDespesa',
                        foreignKey: 'Tipo'
                    }
                ]
            })

            if(!despesa){
                return res.status(500).json({msg: 'Despesa não encontrada'});
            }

            return res.json(despesa);

        } catch (error) {
            return res.status(500).json({msg: 'Error: ' + error});
        }
    },


    create: async(req,res) => {

        try {
            
            const {descricao, detalhamento, valor, dataDespesa, idTipo, idOrigem, Credor} = req.body;

            const novaDespesa = await despesaModel.create({
                Descricao: descricao,
                Detalhamento: detalhamento,
                Valor: valor,
                Data: dataDespesa,
                Tipo: idTipo,
                Origem: idOrigem,
                Credor: Credor
            })

            return res.status(200).json({novaDespesa});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao cadastrar a despesa'});
        }
    },

    updateById: async(req,res) => {
        
        const { id } = req.params;
        try {
            
            const despesa = await despesaModel.findByPk(id);


            if(!despesa){
                return res.status(404).json({msg: 'Despesa não encontrada'});
            }

            const {Descricao, Detalhamento, Valor, Data, Tipo, Origem, Credor} = req.body;


            const despesaAtualizada = await despesaModel.update({
                Descricao: Descricao,
                Detalhamento: Detalhamento,
                Valor: Valor,
                Data: Data,
                Tipo: Tipo,
                Origem: Origem,
                Credor: Credor  
            }, {
                where: {IdDespesa: id}
            });

            return res.status(200).json({despesaAtualizada});

        } catch (error) {
            console.log(error);
        }
    },


    deleteByid: async(req,res) => {

        const { id } = req.params;
        try {
            
            if(!id){
                return res.status(500).json({msg: 'Despesa não encontrada'});
            }

            const despesaExcluida = await despesaModel.destroy({
                where: {IdDespesa: id}
            });

            return res.status(200).json({despesaExcluida});
            

        } catch (error) {
           return res.status(404).json({msg: error});
        }
    }
};

export default DespesaController;