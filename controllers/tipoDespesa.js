import tipoModel from "../models/TipoDespesa.js";

const tipoDespesaController = {

    findAll: async(req,res) => {

        try {
            
            const tipos = await tipoModel.findAll()
            res.status(200).json(tipos);

        } catch (error) {
            res.status(500).json({msg: 'Erro ao listar os tipos'})
        }
    }
}

export default tipoDespesaController;