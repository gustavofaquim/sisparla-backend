import origemModel from "../models/OrigemCadastro.js";


const origemCadastroController = {
    
    findAll: async(req,res) =>{
        
        try {
            
            const origem = await origemModel.findAll();

            return res.json(origem);

        } catch (error) {
            console.log(`Erro ao oboter a lista de origens: ${error}`);
            res.status(500).json({msg: 'Erro ao oboter a lista de origens'});
        }
    }
}

export default origemCadastroController;