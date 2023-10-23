import religiaoModel from "../models/Religiao.js";

const religiaoController = {

    findAll: async(req,res) => {
        try {
            
            const religiao = await religiaoModel.findAll();

            res.json(religiao);

        } catch (error) {
            console.log(`Erro ao buscar a lista de religioes: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de religioes'});
        }
    }
}

export default religiaoController;