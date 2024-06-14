import sexoModel from "../models/Sexo.js";

const sexoController = {

    findAll: async(req,res) => {
        
        try {
            
            const sexos = await sexoModel.findAll();
            res.json(sexos)

        } catch (error) {
            console.log(`Erro ao buscar a lista de sexos: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de sexos'});
        }
    },
}

export default sexoController;