import cidadeModel from "../models/Cidade.js";

const cidadeController = {

    find: async(city,IdEstado) => {
        
        try {
            
            const cidade = await cidadeModel.findOne({
                where: {
                    Nome: city,
                    Estado: IdEstado
                }
            });

            return cidade;
        } catch (error) {
            console.log(`Erro ao buscar a cidade ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a cidade'})
        }
    },

    createIfNotExists: async(city, IdEstado) => {
        try {
            
            const cidade = await cidadeController.find(city, IdEstado);
            
            if(cidade){
                return cidade;
            }
            
            const novaCidade = cidadeModel.create({
                Nome: city,
                Estado: IdEstado

            });

            return novaCidade;

        } catch (error) {
            console.log(`Erro ao cadastrar a cidade ${error}`);
            throw new Error('Erro ao cadastrar a cidade');
        }
    }
}

export default cidadeController;