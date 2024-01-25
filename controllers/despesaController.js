

import despesaModel from "../models/Despesa.js";
import OrigemDespesa from "../models/OrigemDespesa.js";
import credorModel from "../models/Credor.js";
import TipoDespesa from "../models/TipoDespesa.js";

const DespesaController = {

    findAll: async(req,res) => {
        
        try {
            
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
                ]
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
                        as: 'Credor',
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
            
        }
    },


    create: async(req,res) => {

        try {
            
            const {descricao, detalhamento, valor, dataDespesa, idTipo, idOrigem, idCredor, credor} = req.body;
            

            const novaDespesa = await despesaModel.create({
                Descricao: descricao,
                Detalhamento: detalhamento,
                Valor: valor,
                Data: dataDespesa,
                Tipo: idTipo,
                Origem: idOrigem,
                Credor: idCredor
            })

            return res.status(200).json({novaDespesa});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao cadastrar a despesa'});
        }
    }
};

export default DespesaController;