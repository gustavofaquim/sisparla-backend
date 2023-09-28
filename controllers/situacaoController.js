import situacaoModel from "../models/SituacaoCadastro.js";


const situacaoCadastroController = {

    findAll: async(req, res) => {

        try {
            const situacoes = await situacaoModel.findAll();
            res.json(situacoes);
        } catch (error) {
            
        }
    }
}

export default situacaoCadastroController;