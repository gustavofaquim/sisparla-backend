
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

           
            const cidade = await cidadeController.createIfNotExists(endereco.cidade, endereco.estado);

        

            let whereClause = {
                Cidade: cidade.IdCidade
            };
            
            if (endereco.bairro) {
                whereClause.Bairro = endereco.bairro;
            }
            
            if (endereco.cep) {
                whereClause.CEP = endereco.cep;
            }
            
            if (endereco.logradouro) {
                whereClause.logradouro = endereco.logradouro;
            }
            
            if (endereco.complemento) {
                whereClause.complemento = endereco.complemento;
            }
            
            if (endereco.pontoReferencia) {
                whereClause.pontoReferencia = endereco.pontoReferencia;
            }
            

            let end = await enderecoModel.findOne({
                where: whereClause
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
            
            
            //const estado = await estadoController.findByName(endereco.estado);
            
            
            const cidade = await cidadeController.createIfNotExists(endereco.cidade, endereco.estado);
            
          
            novoEndereco = await enderecoModel.create({
               Cidade: cidade.IdCidade,
               CEP: endereco.cep,
               Bairro: endereco.bairro,
               Logradouro: endereco.logradouro,
               Complemento: endereco.complemento,
               PontoReferencia: endereco.pontoReferencia
            });

            
            return novoEndereco;
            
        } catch (error) {
            console.log(`Erro criar novo endereço ${error}`);
            throw new Error('Erro ao criar endereço');
        }

    },


    create: async (endereco) => {


        try {
            
            const cidade = await cidadeController.createIfNotExists(endereco.cidade, endereco.estado);
            
            if(!cidade){
                console.log('Não foi possível encontrar a cidade informada');
                return ('Não foi possível encontrar a cidade informada.');
            }

           const novoEndereco = await enderecoModel.create({
               Cidade: cidade.IdCidade,
               CEP: endereco.cep,
               Bairro: endereco.bairro,
               Logradouro: endereco.logradouro,
               Complemento: endereco.complemento,
               PontoReferencia: endereco.pontoReferencia
            });

            
            return novoEndereco;

        } catch (error) {
            console.log(`Erro ao cadastrar o endereco: ${error}`);
            throw new Error('Erro ao criar endereço');
        }
    },

    update: async(id, enderecoCompleto) => {

      
        try {
            
            const endereco = await enderecoModel.findByPk(id);
            const cidade = await cidadeController.createIfNotExists(enderecoCompleto.cidade, enderecoCompleto.estado);
            
            if(!endereco){
                return {msg: 'Endereço não encontrado'};
            }
           

            await endereco.update({
                Cidade: cidade.IdCidade,
                CEP: enderecoCompleto.cep,
                Bairro: enderecoCompleto.bairro,
                Logradouro: enderecoCompleto.logradouro,
                Complemento: enderecoCompleto.complemento,
                PontoReferencia: enderecoCompleto.pontoReferencia
            }, { where: {IdEndereco: id }});

            const enderecoAtualizado = await enderecoModel.findByPk(id);

        
            return enderecoAtualizado;

        } catch (error) {
            console.log(`Erro ao atualizar o endereco: ${error}`);
            return({msg: 'Erro ao atualizar o endereco'});
        }

    }


};

export default enderecoController;