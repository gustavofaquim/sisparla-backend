import origemModel from "../models/OrigemDespesa.js";

const origemDespesaController = {

        findAll: async(req,res) => {
            try {
                const origens = await origemModel.findAll();
                res.status(200).json(origens);
            } catch (error) {
                res.status(500).json({msg: 'Erro ao listar as origens'})
            }
        }
}

export default origemDespesaController;