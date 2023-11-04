import categoriaDemanda from "../models/CategoriaDemanda.js";


const categoriaDemandaController = {

    findAll: async(req,res) => {
        
        try {
            const categorias = await categoriaDemanda.findAll();
            res.json(categorias);

        } catch (error) {
            console.log(`Erro ao buscar a lista de categorias: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de categorias'});
        }
    }   
}

export default categoriaDemandaController;
