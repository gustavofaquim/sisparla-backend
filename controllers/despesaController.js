

import Despesa from "../models/Despesa.js";
import OrigemDespesa from "../models/OrigemDespesa.js";
import PessoaJuridicaFisica from "../models/PessoaJuridicaFisica.js";
import TipoDespesa from "../models/TipoDespesa.js";

const DespesaController = {

    findAll: async(req,res) => {
        try {

            
            const despesas = await Despesa.findAll({
                include: [
                    {
                        model: PessoaJuridicaFisica,
                        as: 'PessoaFisicaJuridica',
                        foreignKey: 'PessoaJuridicaFisica'
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
            //console.log(error);
            res.status(500).json({msg: 'Erro ao buscar a lista de despesas'});
        }
    }
};

export default DespesaController;