import profissaoModel from "../models/Profissao.js";


const profissaoController = {

    findAll: async (req,res) => {

        try {
            
            const profissao = await profissaoModel.findAll();

            res.json(profissao);

        } catch (error) {
            console.log(`Erro ao buscar a lista de profissoes: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de profissoes'});
        }
    },

    
};

export default profissaoController;