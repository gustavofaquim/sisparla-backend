import sequelize from "../db/conn.js";
import { Sequelize, Op } from 'sequelize';

import credorModel from "../models/Credor.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";
import enderecoController from "./enderecoController.js";


const credorController = {

    findAll: async(req,res) => {
        try {
            
            const {termoBusca} = req.query;

            const whereClause = {};
            
            if(termoBusca){
                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } }, 
                    { Documento: { [Op.like]: `%${termoBusca}%` } }, 
                    { Tipo: { [Op.like]: `%${termoBusca}%` }}
                ]
            }   

            
            const credores = await credorModel.findAll({
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
                ],
                where: whereClause,
            });
            

           return res.status(200).json(credores);

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Erro ao buscar a lista de credores'});
        }
    },

    findById: async(req,res) =>{

        const { id } = req.params;

        try {

            const credor = await credorModel.findByPk(id,{
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
                ],
            })

            if(!credor){
                return res.status(500).json({msg: 'Credor não encontrado'});
            }

            return res.status(200).json({credor});
            
        } catch (error) {
            console.log(`Erro ao buscar o credor: ${error}`);
            return res.status(500).json({msg: 'Erro ao buscar o credor'});
        }

    },

    create: async(req,res) => {
        try {
            
            const {nome, estado, cidade, cepSemMascara,  bairro, logradouro, complemento, pontoReferencia, telefone, tipo, documento} = req.body;

            const cep = cepSemMascara;

            // Inicia a transação
            const t = await sequelize.transaction();

            let endereco;

            // Verifica se existe um endereço
            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, logradouro, bairro, complemento, pontoReferencia};
                endereco = await enderecoController.createIfNotExists(enderecoCompleto);
            }


            const novoCredor = await credorModel.create({
                Nome: nome,
                Telefone: telefone,
                Endereco: endereco?.dataValues?.idEndereco,
                Tipo: tipo,
                Documento: documento
            });

             // Confirma a transação
             await t.commit();


            return res.status(200).json({novoCredor});

        } catch (error) {
            return res.status(500).json({msg: 'Erro ao cadastrar o novo credor'});
        }
    },

    updateById: async(req,res) => {

        const { id } = req.params;

        try {

           
            const credor = await credorModel.findByPk(id);


            if(!credor){
                return res.status(500).json({msg: 'Credor não encontrado'});
            }

            const {Nome, Endereco, estado, cidade, cep,  bairro, logradouro, complemento, pontoReferencia, EnderecoPessoa, Telefone, Tipo, Documento } = req.body;

            const idEndereco = Endereco;

            // Inicia a transação
            const t = await sequelize.transaction();

            let endereco;
            let lagradouro = logradouro;
            
 
            // Verifica se existe um endereço
            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, lagradouro, bairro, complemento, pontoReferencia};
                 
                if(!idEndereco){
                    endereco = await enderecoController.createIfNotExists(enderecoCompleto);
                }else{
                    endereco = await enderecoController.update(idEndereco, enderecoCompleto)
                } 
                 
                endereco = await enderecoController.createIfNotExists(enderecoCompleto);
            }

            const credorAtualizado = await credorModel.update({
                Nome: Nome,
                Telefone: Telefone,
                Endereco: endereco?.dataValues?.idEndereco,
                Tipo: Tipo,
                Documento: Documento
            }, {
                    where: {
                    idCredor: id,
            },});


            // Confirma a transação
            await t.commit();
 
            return res.status(200).json({credorAtualizado});

            
        } catch (error) {
            return res.status(500).json({msg: 'Erro ao cadastrar o novo credor'});
        }
    },

    deleteByid: async(req,res) => {

        const { id } = req.params;
    
        try {
            if(!id){
                return res.status(500).json({msg: 'Credor não encontrada'});
            }

            const credorExcluido = await credorModel.destroy({
                where: {IdCredor: id},
            })

            return res.status(200).json({credorExcluido});

        } catch (error) {
            
            return res.status(404).json({msg: error});
        }
    }
}

export default credorController;