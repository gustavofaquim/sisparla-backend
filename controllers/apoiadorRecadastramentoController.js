import { Sequelize, Op } from 'sequelize';
import sequelize from "../db/conn.js";

import apoiadorModel from "../models/Apoiador.js";
import profissaoModel from "../models/Profissao.js";
import religiaoModel from "../models/Religiao.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import PartidoModel from "../models/Partido.js";
import TelefoneModel from "../models/Telefone.js"
import EntidadeModel from "../models/Entidade.js";
import cidadeModel from "../models/Cidade.js";
import Vinculacao from '../models/Vinculacao.js';
import classificacaoModel from "../models/Classificacao.js";
import SituacaoCadastro from "../models/SituacaoCadastro.js";
import FiliacaoModel from "../models/FiliacaoPartidaria.js";
import enderecoController from "./enderecoController.js";

import filiacaoController from './filiacaoController.js';
import vinculacaoController from './vinculacaoController.js';
import Usuario from '../models/Usuario.js';
import apoiadorController from './apoiadorController.js';


import Grupo from '../models/Grupo.js';
import OrigemCadastro from '../models/OrigemCadastro.js';

import decodificaTokenApoiador from '../middlewares/decodificaTokenApoiador.js';



const apoiadorRecadastramentoController = {



    findByToken: async (req,res) => {

        try {  

            const tokenObtido = req.headers.authorization;
            const token = tokenObtido.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({ msg: 'Token não fornecido' });
            }
            
           
            const dadosApoiador = decodificaTokenApoiador(token);


            if(!dadosApoiador.IdApoiador){
                console.log(`ID do apoidor enviado é inválido.`);
                return res.status(500).json({msg: 'Erro ao bsucar o apoiador'});
            }

            const id = dadosApoiador.IdApoiador;
            
    
            const apoiador = await apoiadorModel.findOne({
                where: {IdApoiador: id},
                include: [
                    {
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao',
                    },
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
                        include:{
                            model: cidadeModel,
                            as: 'CidadeEndereco',
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
                    }, 
                    {
                        model: TelefoneModel,
                        as: 'TelefoneApoiador',
                        foreignKey: 'IdApoiador'
                    }, 
                    {
                        model: FiliacaoModel,
                        as: 'FiliacaoPartidaria',
                        foreignKey: 'IdFiliacao',
                        include:{
                            model: PartidoModel,
                            as: 'PartidoFiliacao',
                            foreignKey: 'Partido'
                        }
                    },
                    {
                        model: Vinculacao,
                        as: 'Vinculacao',
                        foreignKey: 'Apoiador',
                        include:{
                            model: EntidadeModel,
                            as: 'VinculacaoEntidade',
                            foreignKey: 'Entidade',
                        }
                    },
                    {
                        model: Usuario,
                        as: 'ResponsavelCadastro',
                        foreignKey: 'Responsavel'
                    },
                    {
                        model: Grupo,
                        as: 'GrupoApoiador',
                        foreignKey: 'Grupo',

                    },
                    {
                        model: OrigemCadastro,
                        as: 'OrigemApoiador',
                        foreignKey: 'Origem'
                    },
                    /*{
                        model: DemandaModel,
                        as: 'Demanda',
                        foreignKey: 'Apoiador'
                    },*/ 
                 ]
            });

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }

            
            const apoiadorD = apoiadorController.destructuringApoiador(apoiador);
            
          
           // res.json(apoiador); //-> objeto original
            res.json(apoiadorD); // -> objeto desestruturado...

        } catch (error) {
            console.log(`Erro ao buscar o apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao bsucar o apoiador'});
        }
    },


    updateByToken: async(req, res) => {

       try {


            const tokenObtido = req.headers.authorization;
            const token = tokenObtido.replace('Bearer ', '');

          
            if (!token) {
                return res.status(401).json({ msg: 'Token não fornecido' });
            }
            
        
            const dadosApoiador = decodificaTokenApoiador(token);

            if(!dadosApoiador.IdApoiador){
                console.log(`ID do apoidor enviado é inválido.`);
                return res.status(500).json({msg: 'Erro ao bsucar o apoiador'});
            }
            
            const id = dadosApoiador.IdApoiador;
            const whereClause = {};

            whereClause['IdApoiador'] = id;
            

            const apoiador = await apoiadorModel.findOne({where: whereClause});

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }

            const {idApoiador, nome, cpf, dataNascimento, profissao, entidade, religiao, email, numeroTelefone, whats,
                idEndereco, cep, cidade, estado, bairro, complemento, logradouro, numeroEndereco, pontoReferencia, 
                entidadeCargo, entidadeLideranca, partidoId, partidoLideranca, partidoCargo, dataInsercao, partidoRemovido, entidadeRemovida, idFiliacao
                , comunicacao
            } = req.body;

   
        

            let vinculacao;
            let dadosTelefone;
            let filiacao;
            let endereco;


            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, logradouro, numeroEndereco, bairro, complemento, pontoReferencia};
               
                if(!idEndereco){
                   //endereco = await enderecoController.createIfNotExists(enderecoCompleto);
                    endereco = await enderecoController.create(enderecoCompleto);
                }else{
                    endereco = await enderecoController.update(idEndereco, enderecoCompleto)
                }
            }

           
            if(entidade){

                const dadosVinculacao = {
                    Apoiador: idApoiador,
                    Cargo: entidadeCargo || '',
                    Entidade: entidade, 
                    Lideranca: entidadeLideranca || 'n',
                };
                
                vinculacao = await vinculacaoController.updateOrCreateIfNotExists(dadosVinculacao);
                
            }else if(entidadeRemovida){
                vinculacao =- await vinculacaoController.delete(idApoiador, entidadeRemovida);
            }

            // Verifica se existe partido
            if(partidoId != null && partidoId >= 1){
                
                const dadosFiliacao = {
                     IdPartido: partidoId,
                     DiretorioMunicipio: '',
                     DiretorioUF: '',
                     Zona: '',
                     Secao: '',
                     Cargo: partidoCargo || '',
                     Lideranca: partidoLideranca || 'n'
                 }
 
                 filiacao = await filiacaoController.updateOrCreateIfNotExists(idApoiador,dadosFiliacao);
            }else if(partidoRemovido){
                
                const apoiador = await apoiadorController.removeFiliacao(idApoiador);

                const filiacao = await filiacaoController.delete(idFiliacao, partidoRemovido);
            }

            // Verifica se existe número de telefone
            if(numeroTelefone != null && numeroTelefone.length > 6){
              
                dadosTelefone = {
                    Numero: numeroTelefone,
                    WhatsApp: whats || 'n',
                    Principal: 's' 
                };
                
            }


            const dados = {
                IdApoiador: idApoiador,
                Nome: nome,
                CPF: cpf || null,
                DataNascimento: dataNascimento,
                Email: email,
                Profissao: profissao,
                Religiao: religiao,
                Endereco: endereco?.dataValues?.idEndereco,
                Filiacao: filiacao?.IdFiliacao,
                Obs: 'Recadastramento',
                DataInsercao: new Date(),
            };


            const apoiadorAtualizado = await apoiadorController.atualizarApoiadorComVinculacao(dados, null, dadosTelefone);

            
            return res.status(200).json('Dados Salvos com sucesso');

       } catch (error) {
            console.log(`Erro ao salvar dados: ${error}`);
            throw error; 
       }



    },


}


export default apoiadorRecadastramentoController;