
import apoiadorModel from "../models/Apoiador.js";
import profissaoModel from "../models/Profissao.js";
import religiaoModel from "../models/Religiao.js";

const apoiadorController = {



    findAll: async(req,res) =>{
      
        try {

            const apoiadores = await apoiadorModel.findAll({
                include: [
                   {
                    model: profissaoModel,
                    as: 'ProfissaoApoiador',
                    foreignKey: 'Profissao'
                    },
                    {
                    model: religiaoModel,
                    as: 'ApoiadorReligiao',
                    foreignKey: 'Religiao'
                    }

                ]
            });

            
            
            res.json(apoiadores);
        


        } catch (error) {
            console.log(`Erro ao buscar a lista de dados ${error}`);
        }

    },
}

export default apoiadorController;