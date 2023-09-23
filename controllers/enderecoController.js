
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";
import bairroController from "./bairroController.js";

const enderecoController = {

    findAll: async (req,res) => {

        try {
            
            const endereco = await enderecoModel.findAll({
                include:[
                    {
                        model: bairroModel,
                        as: 'BairroApoiador',
                        foreignKey: 'Bairro',
                        include: [{
                            model: cidadeModel,
                            as: 'CidadeApoiador',
                            foreignKey: 'Cidade',
                        }]
                    }
                ]
            });

            res.json(endereco);

        } catch (error) {
            console.log(`Erro ao buscar a lista de endereco: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de endereco'});
        }
    },


    create: async (req,res) => {

        const { cidade, nome, cep, numero, lagradouro, quadra, pontoReferencia } = req.body;

        try {
            
            const bairro = await bairroController.createIfNotExists(cidade, nome, cep);
            
           const novoEndereco = await enderecoModel.create({
                Bairro: bairro.IdBairro,
                Numero: numero,
                Lagradouro: lagradouro,
                Quadra: quadra,
                PontoReferencia: pontoReferencia
              });


            res.json(novoEndereco);

        } catch (error) {
            console.log(`Erro ao cadastrar o endereco: ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar o endereco'})
        }
    }


};

export default enderecoController;