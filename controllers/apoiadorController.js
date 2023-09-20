
import apoiadorModel from "../models/Apoiador.js";

const apoiadorController = {



    findAll: async(req,res) =>{
        /*
        
        const users = await userModel.find();

        res.json(users);
        
        */
        try {

            const apoiadores = await apoiadorModel.findAll();
            res.json(apoiadores);
        


        } catch (error) {
            console.log(`Erro ao buscar a lista de dados ${error}`);
        }

    },
}

export default apoiadorController;