import { Sequelize, Op } from 'sequelize';
import sequelize from "../db/conn.js";

import apoiadorModel from "../models/Apoiador.js";
import profissaoModel from "../models/Profissao.js";
import religiaoModel from "../models/Religiao.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";
import Vinculacao from '../models/Vinculacao.js';
import classificacaoModel from "../models/Classificacao.js";
import SituacaoCadastro from "../models/SituacaoCadastro.js";
import enderecoController from "./enderecoController.js";
import classificacaoController from './classificacaoController.js';
import situacaoCadastroController from './situacaoController.js';
import entidadeController from "./entidadeController.js";


const apoiadorController = {


    findAll: async(req,res) => {
      
        try {
            
            const { termoBusca } = req.query;


            const whereClause = {};

            if (termoBusca) {
                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } },
                    { Apelido: { [Op.like]: `%${termoBusca}%` } },
                    { Email: { [Op.like]: `%${termoBusca}%` } },
                    {
                        '$EnderecoApoiador.CidadeApoiador.Nome$': {
                            [Op.like]: `%${termoBusca}%`,
                        },
                    },
                    {
                        '$SituacaoCadastroApoiador.Descricao$':{
                            [Op.like]: `%${termoBusca}%`,
                        }
                    }
                ]
            }
    
            
            const apoiadores = await apoiadorModel.findAll({
                include: [
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
                        include:{
                            model: cidadeModel,
                            as: 'CidadeApoiador',
                            foreignKey: 'Cidade',
                        }
                    },
                    {
                        model: classificacaoModel,
                        as: 'ClassificacaoApoiador',
                        foreignKey: 'Classificacao',

                    },
                    {
                        model: SituacaoCadastro,
                        as: 'SituacaoCadastroApoiador',
                        foreignKey: 'Situacao',

                    }
                ],
                where: whereClause
            });
           
            
            res.json(apoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }

    },

    findById: async (req,res) => {

        const { id } = req.params;

        try {
            const apoiador = await apoiadorModel.findByPk(id, {
                include: [
                    
                     {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
                        include:{
                            model: cidadeModel,
                            as: 'CidadeApoiador',
                            foreignKey: 'Cidade',
                        }
                     },
                     {
                        model: classificacaoModel,
                        as: 'ClassificacaoApoiador',
                        foreignKey: 'Classificacao',
 
                     },
                     {
                        model: SituacaoCadastro,
                        as: 'SituacaoCadastroApoiador',
                        foreignKey: 'Situacao',
 
                     }
                 ]
            });

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }

            res.json(apoiador);

        } catch (error) {
            console.log(`Erro ao buscar o apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao bsucar o apoiador'});
        }
    },


    updateById: async(req, res) => {

        const { id } = req.params;
        const { nome, cpf, apelido, dataNascimento, email, profsissao, religiao,endereco,classificacao, situacao, informacaoAdicional } = req.body;

        try {
            
            const apoiador = await apoiadorModel.findByPk(id);

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }


            const end = await  enderecoController.update(apoiador.Endereco,endereco);

            await apoiador.update({
                Nome: nome,
                CPF: cpf,
                Apelido: apelido,
                DataNascimento: dataNascimento,
                Email: email,
                Profsissao: profsissao,
                Religiao: religiao,
                Endereco: apoiador.Enderco,
                Classificacao: classificacao,
                Situacao: situacao,
                InformacaoAdicional: informacaoAdicional
            });

            const apoiadorAtualizado = await apoiadorModel.findByPk(id);

            res.json(apoiadorAtualizado);

        } catch (error) {
            console.log(`Erro ao atualizar o registro: ${error}`);
            res.status(500).json({msg: 'Erro ao atualizar o registro'});
        }
    },



    criarApoiadorComVinculacao: async (dadosApoiador, dadosVinculacao) => {
        
       
        // Inicia a transação
        const t = await sequelize.transaction();
        
        try {
            // Cria o Apoiador
            const novoApoiador = await apoiadorModel.create(dadosApoiador, { transaction: t });


            // Cria a Vinculacao com o IdApoiador
            await Vinculacao.create({
                Apoiador: novoApoiador.IdApoiador,
                ...dadosVinculacao,
            }, { transaction: t });
    
            // Confirma a transação
            await t.commit();
    
            return novoApoiador;
        } catch (error) {
            // Em caso de erro, desfaz a transação
            await t.rollback();
            throw error; // Rejoga o erro para o chamador lidar
        }
    },




    create: async (req,res) => {
         
        try {

            const {
                nome, apelido, profissao, cpf, religiao, nascimento, classificacao, email, telefone, situacao, 
                cep, cidade, estado, lagradouro, numero, bairro, quadra, pontoReferencia, 
                entidadeNome, entidadeTipo, entidadeSigla, entidadeCargo, entidadeLideranca,
                partido, partidoCargo, partidoLideranca,
                informacoesAdicionais 
            } = req.body

            const enderecoCompleto = {cep, cidade, estado, lagradouro, numero, bairro, quadra, pontoReferencia}
            
            const entidadeCompleta = {entidadeNome, entidadeSigla, entidadeTipo};

            const end = await enderecoController.createIfNotExists(enderecoCompleto);
            const classif = await classificacaoController.findByName(classificacao);
            const sit = await situacaoCadastroController.findByName(situacao);
            const enti = await entidadeController.createIfNotExists(entidadeCompleta);

            console.log(enti);
            
            const dadosApoiador = {
                Nome: nome,
                CPF: cpf || null,
                Apelido: apelido,
                DataNascimento: nascimento,
                Email: email,
                Profsissao: profissao,
                Religiao: religiao,
                Endereco: end.dataValues.idEndereco,
                Classificacao: classif.idClassificacao,
                Situacao: sit.idSituacao,
                InformacaoAdicional: informacoesAdicionais,
            };

            const dadosVinculacao = {
                Cargo: entidadeCargo,
                Entidade: enti.IdEntidade, 
                Lideranca: entidadeLideranca,
            };

    
           const novoApoiador = await  apoiadorController.criarApoiadorComVinculacao(dadosApoiador, dadosVinculacao);

            res.json(novoApoiador);

        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar o apoiador'})
        }
    },
    


    deleteById: async (req,res) => {

        const { id } = req.params;

        try {
            
            const apoiadorDeletado = await apoiadorModel.destroy({
                where: {
                    IdApoiador: id,
                },
            });

            if(apoiadorDeletado === 0){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }

            res.json({msg: 'Appoiador deletado com sucesso'});

        } catch (error) {
            console.log(`Erro ao deletar apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao deletar apoiador'});
        }
    },


}

export default apoiadorController;