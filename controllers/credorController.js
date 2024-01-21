import credorModel from "../models/Credor.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";

const credorController = {

    findAll: async(req,res) => {
        try {
            
            const pessoas = await credorModel.findAll({
                include: [
                    {
                        model: enderecoModel,
                        as: 'EnderecoPessoa',
                        foreignKey: 'Endereco',
                        include:{
                            model: cidadeModel,
                            as: 'CidadeEndereco',
                            foreignKey: 'Cidade',
                        }
                    }
                ]
            });

            res.status(200).json(pessoas);

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao buscar a lista de pessoas'});
        }
    },

    create: async(req,res) => {
        try {
            
            const {nome, endereco, tipo, documento} = req.body;

            const novoCredor = await credorModel.create({
                Nome: nome,
                Endereco: endereco,
                Tipo: tipo,
                Documento: documento
            });

            return res.status(200).json({novoCredor});

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao cadastrar o novo credor'});
        }
    },
}

export default credorController;