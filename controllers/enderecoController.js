
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";
import apoiadorModel from "../models/Apoiador.js";
import estadoController from "./estadoController.js";
import cidadeController from "./cidadeController.js";


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


    find: async (endereco) => {

        
        try {

            const estado = await estadoController.findByName(endereco.estado);
            const cidade = await cidadeController.createIfNotExists(endereco.cidade, estado.IdEstado);

            

        
            let end = await enderecoModel.findOne({
                where: {
                    Cidade: cidade.IdCidade,
                    Bairro: endereco.bairro,
                    numero: endereco.numero,
                    lagradouro: endereco.lagradouro,
                    quadra: endereco.quadra,
                    pontoReferencia: endereco.pontoReferencia 
                }
            });

            return end;

        } catch (error) {
            console.log(`Erro ao buscar o endereco ${error}`);
            throw new Error('Erro ao buscar endereço');
        }

    },




    createIfNotExists: async (endereco) => {

        try {

            let novoEndereco = await enderecoController.find(endereco);

            if(novoEndereco){
                return novoEndereco;
            }

            const estado = await estadoController.findByName(endereco.estado);
            const cidade = await cidadeController.createIfNotExists(endereco.cidade, estado.IdEstado);

            novoEndereco = await enderecoModel.create({
               Cidade: cidade.IdCidade,
               CEP: endereco.CEP,
               Bairro: endereco.bairro,
               Numero: endereco.numero,
               Lagradouro: endereco.lagradouro,
               Quadra: endereco.quadra,
               PontoReferencia: endereco.pontoReferencia
            });

            return novoEndereco;
            
        } catch (error) {
            console.log(`Erro criar novo endereço ${error}`);
            throw new Error('Erro ao criar endereço');
        }

    },


    create: async (req,res) => {

        const { cidade, nome, cep, numero, lagradouro, quadra, pontoReferencia } = req.body;

        try {
            
            
           const novoEndereco = await enderecoModel.create({
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
    },

    update: async(id, endereco) => {
    
        const {cidade, bairro, numero, lagradouro, quadra, pontoReferencia } = endereco;

        try {
            
            const endereco = await enderecoModel.findByPk(id);

            if(!endereco){
                return {msg: 'Endereço não encontrado'};
               // return res.status(404).json({msg: 'Endereço não encontrado'});
            }
            
            await endereco.update({
                Cidade: cidade,
                Bairro: bairro,
                Numero: numero,
                Lagradouro: lagradouro,
                Quadra: quadra,
                PontoReferencia: pontoReferencia
            });

            const enderecoAtualizado = await enderecoModel.findByPk(id);

            return enderecoAtualizado;

        } catch (error) {
            console.log(`Erro ao atualizar o endereco: ${error}`);
            return({msg: 'Erro ao atualizar o endereco'});
        }


    }


};

export default enderecoController;