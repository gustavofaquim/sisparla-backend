import tipoEntidadeModel from "../models/TipoEntidade.js";

const tipoEntidadeController = {

    findAll: async (req,res) => {
        try {
            const tipoEntidade = await tipoEntidadeModel.findAll();
            res.json(tipoEntidade);
        } catch (error) {
            console.log(`Erro ao buscar os tipos de entidades: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar os tipos de entidades'});
        }
    }
}

export default tipoEntidadeController;