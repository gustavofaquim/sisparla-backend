import situacaoDemanda from "../models/SituacaoDemanda.js";


const situacaoDemandaController = {

    findAll: async(req,res) => {
        try {
            
            const situacoes = await situacaoDemanda.findAll();
            res.json(situacoes);

        } catch (error) {
            console.log(`Erro ao buscar a lista de situacoes: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de situacoes'});
        }
    }
}

export default situacaoDemandaController;