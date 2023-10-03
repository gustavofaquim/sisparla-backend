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
    },

    findByName: async(nome) => {
        try {
            
            const classificacao = await classificacaoModel.findOne({
                where: {
                    Descricao: nome,
                  },
            })
            return classificacao;

        } catch (error) {
            console.log(`Erro ao buscar a classificacao: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a classificacao'});
        }
    }
}

export default classificacaoController;