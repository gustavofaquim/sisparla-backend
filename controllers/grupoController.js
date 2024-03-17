
import grupoModel from "../models/Grupo.js";

const grupoController = {

    findAll: async(req,res) => {

        try {
            const grupo = await grupoModel.findAll();
            return res.json(grupo);
        } catch (error) {
            console.log(`Erro ao oboter a lista de grupos: ${error}`);
            res.status(500).json({msg: 'Erro ao oboter a lista de grupos'});
        }
    }
}

export default  grupoController;