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
    },


    findById: async(req,res) => {
        const { id } = req.params;

        try {
            
            const religiao = await religiaoModel.findByPk(id);

            if(!religiao){
                return res.status(500).json('Religião não encontrado');
            }

            return res.json(religiao);

        } catch (error) {
            console.log('Erro ao obter a religião: ' + error);
            return res.status(500).json('Erro ao obter a religião');
        }
    },

    create: async(req, res) => {
        try {
            
            const { Nome } = req.body;
            const religiao = await religiaoModel.create({ Nome: Nome });

            res.json(religiao);

        } catch (error) {
            console.log(`Erro ao cadastrar religião: ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar religião.'});
        }
    },

    deleteById: async(req,res) => {
        const { id } = req.params;

        try {
            
            if(!id){
                return res.status(500).json("Religião não encontrado");
            }

            const religiaoExcluida = await religiaoModel.destroy({
                where: {IdReligiao: id}
            })

            return res.status(200).json({religiaoExcluida});

        } catch (error) {
            console.log('Erro ao excluir a religião: ' + error);
            return res.status(500).json(error);
        }
    },
}

export default religiaoController;