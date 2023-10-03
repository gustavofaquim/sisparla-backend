import estadoModel from "../models/Estado.js";

const estadoController = {

    findAll: async (req,res) => {
        try {
            const estado = await estadoModel.findAll();
            res.json(estado);
        } catch (error) {
            console.log(`Erro ao buscar os estados: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar os estados'});
        }
    },

    findByName: async (uf) => {
        
        try {            
            const estado = await estadoModel.findOne({
                where: {
                    UF: uf
                }
            });

            return (estado);

        }catch (error) {
            console.log(`Erro ao buscar o estado: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar o estado'});
        }
    }

}

export default estadoController;