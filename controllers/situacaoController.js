import situacaoModel from "../models/SituacaoCadastro.js";


const situacaoCadastroController = {

    findAll: async(req, res) => {

        try {
            const situacoes = await situacaoModel.findAll();
            res.json(situacoes);
        } catch (error) {
            
        }
    },

    findByName: async(sit) => {
        try {
            const situacao = await situacaoModel.findOne({
                where: {
                    Descricao: sit
                }
            });

            return situacao;
        } catch (error) {
            console.log(`Erro ao buscar a situacao do cadastro: ${error}`);
        }
    }
}

export default situacaoCadastroController;