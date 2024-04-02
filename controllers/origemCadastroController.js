import origemModel from "../models/OrigemCadastro.js";


const origemCadastroController = {
    
    findAll: async(req,res) =>{
        
        try {
            
            const origem = await origemModel.findAll();

            return res.json(origem);

        } catch (error) {
            console.log(`Erro ao oboter a lista de origens: ${error}`);
            return res.status(500).json({msg: 'Erro ao oboter a lista de origens'});
        }
    },

    findById: async(req,res) => {
        const { id } = req.params;

        try {
            
            const origem = await origemModel.findByPk(id);

            if(!origem){
                return res.status(500).json('Origem não encontrado');
            }

            return res.json(origem);

        } catch (error) {
            console.log('Erro ao obter a origem: ' + error);
            return res.status(500).json('Erro ao obter a origem');
        }
    },

    create: async(req,res) => {

        try {

            const { Descricao } = req.body;

            const novaOrigem = await origemModel.create({
                Descricao: Descricao
            });

            return res.status(200).json(novaOrigem);
            
        } catch (error) {
            console.log(`Erro ao cadastrar nova origem: ${error}`);
            return res.status(500).json('Erro ao cadastrar nova origem.');
        }
    },

    deleteById: async(req,res) => {
        const { id } = req.params;

        try {
            
            if(!id){
                return res.status(500).json("Origem não encontrado");
            }

            const origemExcluida = await origemModel.destroy({
                where: {IdOrigem: id}
            })

            return res.status(200).json({origemExcluida});

        } catch (error) {
            console.log('Erro ao excluir a origem: ' + error);
            return res.status(500).json(error);
        }
    },


}

export default origemCadastroController;