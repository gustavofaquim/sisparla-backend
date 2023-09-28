import classificacaoModel from "../models/Classificacao.js";

const classificacaoController = {

    findAll: async(req,res) => {
        
        try {
            
            const classificacoes = await classificacaoModel.findAll();
            res.json(classificacoes)

        } catch (error) {
            console.log(`Erro ao buscar a lista de classificacoes: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de classificacoes'});
        }
    }
}

export default classificacaoController;