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
import classificacaoController from './classificacaoController.js';
import telefoneController from './telefoneController.js';
import situacaoCadastroController from './situacaoController.js';
import entidadeController from "./entidadeController.js";
import filiacaoController from './filiacaoController.js';
import vinculacaoController from './vinculacaoController.js';
import DemandaModel from "../models/Demanda.js";


import verificarToken from '../middlewares/verificarToken.js';


const apoiadorController = {


    findAll: async(req,res) => {
      
        try {
            
            const termoBusca = req.query.termoBusca;
            const filtroProfissao = req.query.profissao;
            const filtroPartido = req.query.partido;

            const sistema = req.usuario.sistema;
            
            const whereClause = {};

            whereClause['Sistema'] = sistema;

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

            if (filtroProfissao && filtroProfissao != 'todas') {
                whereClause['$Profissao$'] = {
                  [Op.like]: `%${filtroProfissao}%`,
                };
            }

            if(filtroPartido && filtroPartido != 'todos'){
                whereClause['$FiliacaoPartidaria.PartidoFiliacao.Nome$'] = {
                    [Op.like]: `%${filtroPartido}%`
                }
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
                        model: TelefoneModel,
                        as: 'TelefoneApoiador',
                        foreignKey: 'IdApoiador'
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
                        model: FiliacaoModel,
                        as: 'FiliacaoPartidaria',
                        foreignKey: 'Filiacao',
                        include:{
                            model: PartidoModel,
                            as: 'PartidoFiliacao',
                            foreignKey: 'Partido',
                        }
                    }
                ],
                where: whereClause
            });

           
            res.json(apoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }

    },

    findByBirthday: async(req,res) => {
    
        try {
            
            const { periodo } = req.query;
            //const periodo = id;
           

            const sistema = req.usuario.sistema;
            
            const whereClause = {};

            whereClause['Sistema'] = sistema;
            
            const data = new Date();
            const mesAtual = data.getMonth() + 1;

            if(periodo != null && (periodo === 'semana' || periodo === 'mes') ){
               
         

                if (periodo === 'semana') {
                    
                    const primeiro = data.getDate() - data.getDay(); 
 
                    const primeiroDia = new Date(data.setDate(primeiro));
                    const ultimoDia = new Date(data.setDate(data.getDate()+6));


                    whereClause.DataNascimento = {
                        [Op.and]: [
                            sequelize.literal(`WEEK(DataNascimento) BETWEEN WEEK('${primeiroDia.toISOString()}') AND WEEK('${ultimoDia.toISOString()}')`),
                        ],
                    };

                } else if (periodo === 'mes') {

                    whereClause.DataNascimento = sequelize.literal(`MONTH(DataNascimento) = ${mesAtual}`);
                }


            }else{
                const diaAual = data.getDate();
                whereClause.DataNascimento = sequelize.literal(`DAY(DataNascimento) = ${diaAual} AND MONTH(DataNascimento) = ${mesAtual}`);
            }

            const aniversariantes = await apoiadorModel.findAll({
                where: whereClause,
                include: [
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
                        include: {
                            model: cidadeModel,
                            as: 'CidadeApoiador',
                            foreignKey: 'Cidade',
                        },
                    },
                    {
                        model: TelefoneModel,
                        as: 'TelefoneApoiador',
                        foreignKey: 'IdApoiador'
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
                ],
            });

            res.json(aniversariantes);


        } catch (error) {
            console.log(`Erro ao buscar a lista de aniversariantes: ${error}`);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
        
    },

    findByDayBirthday: async() => {

        try {
            
            const sistema = req.usuario.sistema;
            
            const whereClause = {};

            whereClause['Sistema'] = sistema;

            const data = new Date();
            
            const mesAtual = data.getMonth() + 1;
            const diaAual = data.getDate();
            

            whereClause.DataNascimento = sequelize.literal(`DAY(DataNascimento) = ${diaAual} AND MONTH(DataNascimento) = ${mesAtual}`);


            const aniversariantes = await apoiadorModel.findAll({
                where: whereClause,
                include: [
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
                        include: {
                            model: cidadeModel,
                            as: 'CidadeApoiador',
                            foreignKey: 'Cidade',
                        },
                    },
                    {
                        model: TelefoneModel,
                        as: 'TelefoneApoiador',
                        foreignKey: 'IdApoiador'
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
                ],
            });

           return (aniversariantes);


        } catch (error) {
            console.log(`Erro ao buscar a lista de aniversariantes do dia: ${error}`);
            return 'Erro ao buscar a lista de aniversariantes do dia';
        }
    },



    findById: async (req,res) => {

        const { id } = req.params;

        const sistema = req.usuario.sistema;
            
        const whereClause = {};

        whereClause['Sistema'] = sistema;
        whereClause['IdApoiador'] = id;
        

        try {
            const apoiador = await apoiadorModel.findOne({where: whereClause,
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
                        model: DemandaModel,
                        as: 'Demanda',
                        foreignKey: 'Apoiador'
                     }, 
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

    destructuringApoiador: (apoiador) => {


        try {
            
            const idApoiador = apoiador?.IdApoiador;
            const nome = apoiador?.Nome;
            const apelido = apoiador?.Apelido;
            const cpf = apoiador?.CPF;
            const dataNascimento = apoiador?.DataNascimento;
            const profissao = apoiador?.Profissao;
            const religiao = apoiador?.Religiao;
            const email = apoiador?.Email;
            const informacaoAdicional = apoiador?.InformacaoAdicional;

            
            const idClassificacao = apoiador?.Classificacao;
            const idSituacao = apoiador?.Situacao;
            
            
            const numeroTelefone = apoiador?.TelefoneApoiador?.Numero;
            const numeroWhatsapp = apoiador?.TelefoneApoiador?.WhatsApp;
            const numeroAntigo =  apoiador?.TelefoneApoiador?.Numero;
            
            
            const cep = apoiador?.EnderecoApoiador?.CEP;
            const cidade = apoiador?.EnderecoApoiador?.CidadeApoiador?.Nome;
            const estado = apoiador?.EnderecoApoiador?.CidadeApoiador?.Estado;

            
            const idEndereco = apoiador?.EnderecoApoiador?.idEndereco;
            const bairro = apoiador?.EnderecoApoiador?.Bairro;
            const lagradouro = apoiador?.EnderecoApoiador?.Lagradouro;
            const quadra = apoiador?.EnderecoApoiador?.Quadra;
            const numeroEndereco = apoiador?.EnderecoApoiador?.Numero;
            const pontoReferencia = apoiador?.EnderecoApoiador?.PontoReferencia;

            let entidadeTipo = '';
            let entidadeNome = '';
            let entidadeNomeAntigo = '';
            let entidadeSigla = '';
            let entidadeCargo = '';
            let entidadeLideranca = '';

            const partidoId = apoiador?.FiliacaoPartidaria?.Partido;
            const partidoNome = apoiador?.FiliacaoPartidaria?.PartidoFiliacao?.Nome;
            const partidoCargo = apoiador?.FiliacaoPartidaria?.Cargo;
            const partidoLideranca = apoiador?.FiliacaoPartidaria?.Lideranca;
            const partidoZona = apoiador?.FiliacaoPartidaria?.Zona;
            const partidoSecao = apoiador?.FiliacaoPartidaria?.Secao;
            const diretorioMunicpio = apoiador?.FiliacaoPartidaria?.DiretorioMunicipio;
            const diretorioUF = apoiador?.FiliacaoPartidaria?.DiretorioUF;


            apoiador.Vinculacao.forEach((e, index) => {
                entidadeTipo = e.VinculacaoEntidade.Tipo;
               
                if (entidadeTipo !== 'Partido Político' && entidadeTipo) {
                    
                    entidadeNome = e.VinculacaoEntidade.Nome;
                    entidadeNomeAntigo = e.VinculacaoEntidade.Nome;
                    entidadeSigla = e.VinculacaoEntidade.Sigla;
                    entidadeLideranca = e.Lideranca;
                    entidadeCargo = e.Cargo;

                }
            });
            

            let demandas = [];

            apoiador.Demanda?.forEach((e, index) => {
                demandas.push({ 'demandaId': e.IdDemanda, 'assunto': e.Assunto });
            });
            
        
            const apoiadorD = {idApoiador, nome, apelido, cpf, dataNascimento, profissao, religiao, email, 
                informacaoAdicional, idClassificacao, idSituacao, numeroTelefone, numeroAntigo ,numeroWhatsapp, idEndereco,
                cep, cidade, estado, bairro, lagradouro, quadra, numeroEndereco, pontoReferencia, 
                entidadeTipo, entidadeNome, entidadeNomeAntigo, entidadeSigla, entidadeCargo, entidadeLideranca, partidoId,
                partidoLideranca,partidoZona, partidoSecao, diretorioMunicpio, diretorioUF, partidoNome, partidoCargo, demandas
            };

            return apoiadorD;

        } catch (error) {
            console.log('Erro ao desestruturar Apoiador: ' + error);
            throw error;
        }

    },


    updateById: async(req, res) => {

        const { id } = req.params;
        
        const sistema = req.usuario.sistema;
            
        const whereClause = {};

        whereClause['Sistema'] = sistema;
        whereClause['IdApoiador'] = id;
       
        try {
            
            const apoiador = await apoiadorModel.findOne({where: whereClause});

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }


            const {idApoiador, nome, apelido,  cpf, dataNascimento, profissao, religiao, email, informacaoAdicional, idClassificacao, idSituacao, numeroAntigo, numeroTelefone, numeroWhatsapp,
            idEndereco, cep, cidade, estado, bairro, lagradouro, quadra, numeroEndereco, pontoReferencia, entidadeTipo, entidadeNome, entidadeSigla,
            entidadeCargo, entidadeLideranca, partidoId, partidoLideranca, partidoCargo} = req.body;

            const user = req.usuario;
            
        
            //let dadosEntidade;
            let vinculacao;
            let dadosTelefone;
            let filiacao;
            let endereco;

            
            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, lagradouro, numeroEndereco, bairro, quadra, pontoReferencia};
                if(!idEndereco){
                    endereco = await enderecoController.createIfNotExists(enderecoCompleto);
                }else{
                    endereco = await enderecoController.update(idEndereco, enderecoCompleto)
                }
            }
          


            // Verifica se existe entidade
            if(entidadeNome != null && entidadeNome.length > 1){

                const entidadeCompleta = {entidadeNome, entidadeSigla, entidadeTipo};

                const enti = await entidadeController.createIfNotExists(entidadeCompleta);

                const dadosVinculacao = {
                    Apoiador: idApoiador,
                    Cargo: entidadeCargo || '',
                    Entidade: enti.IdEntidade, 
                    Sigla: entidadeSigla,
                    Lideranca: entidadeLideranca || 'n',
                };


                vinculacao = await vinculacaoController.updateOrCreateIfNotExists(dadosVinculacao);
                
                
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
            }

            
    
            // Verifica se existe número de telefone
            if(numeroTelefone != null && numeroTelefone.length > 6){

                
                const tel = await telefoneController.findByNumber(numeroAntigo, idApoiador); 
                
             
                dadosTelefone = {
                    IdTelefone: tel.idTelefone,
                    Numero: numeroTelefone,
                    WhatsApp: numeroWhatsapp || 's',
                    Principal: 's' 
                };
            }

            
            const dadosApoiador = {
                IdApoiador: idApoiador,
                Nome: nome,
                CPF: cpf || null,
                Apelido: apelido,
                DataNascimento: dataNascimento,
                Email: email,
                Profissao: profissao,
                Religiao: religiao,
                Endereco: endereco?.dataValues?.idEndereco,
                Classificacao: idClassificacao,
                Situacao: idSituacao,
                Filiacao: filiacao?.IdFiliacao,
                InformacaoAdicional: informacaoAdicional,
                Sistema: user.sistema
            };

            
            
            const apoiadorAtualizado = await  apoiadorController.atualizarApoiadorComVinculacao(dadosApoiador, null, dadosTelefone);
            
            res.json(apoiadorAtualizado);


        } catch (error) {
            console.log(`Erro ao atualizar o apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao atualizar o registro'});
        }
    },


    atualizarApoiadorComVinculacao: async(dadosApoiador, dadosEntidade, dadosTelefone) => {
       
        // Inicia a transação
        const t = await sequelize.transaction();

        try {
            
            // Atualiza o Apoiador
            const attApoiador = await apoiadorModel.update(dadosApoiador, {
                where: { IdApoiador: dadosApoiador.IdApoiador },
                transaction: t,
            });
            
            
           
            if(dadosEntidade){
                console.log(dadosEntidade);
                const [vinculacaoInstanceEntidade, createdEntidade] = await Vinculacao.findOrCreate({
                    where: { Entidade: dadosEntidade.Entidade, Apoiador: dadosApoiador.IdApoiador },
                    defaults: {
                        Apoiador: dadosApoiador.IdApoiador,
                        Cargo: dadosEntidade.Cargo,
                        Entidade: dadosEntidade.Entidade,
                        Lideranca: dadosEntidade.Lideranca
                    },
                    transaction: t
                });
    
                
                
                if (!createdEntidade) {
                    // Se não foi criado, significa que já existia, então você pode atualizar os valores
                    await vinculacaoInstanceEntidade.update({
                        Apoiador: dadosApoiador.IdApoiador,
                        Cargo: dadosEntidade.Cargo,
                        Lideranca: dadosEntidade.Lideranca
                    }, { transaction: t });
                }
            }
           
           
        
            /*if(dadosPartido){
                
                const [vinculacaoInstancePartido, createdPartido] = await Vinculacao.findOrCreate({
                    where: { Entidade: dadosPartido.Entidade, Apoiador: dadosApoiador.IdApoiador },
                    defaults: {
                        Apoiador: dadosApoiador.IdApoiador,
                        Cargo: dadosPartido.Cargo,
                        Entidade: dadosPartido.Entidade,
                        Lideranca: dadosPartido.Lideranca
                    },
                    transaction: t
                });
            
               
                if (!createdPartido) {
                    // Se não foi criado, significa que já existia, então você pode atualizar os valores
                    await vinculacaoInstancePartido.update({
                        Apoiador: dadosApoiador.IdApoiador,
                        Cargo: dadosPartido.Cargo,
                        Lideranca: dadosPartido.Lideranca
                    }, { transaction: t });
                } *

            }*/
           
          
            if(dadosTelefone){
                const [telefoneInstance, createdTelefone] = await TelefoneModel.findOrCreate({
                    where: {IdTelefone: dadosTelefone?.IdTelefone,  Apoiador: dadosApoiador.IdApoiador },
                    defaults: {
                        Apoiador: dadosApoiador.IdApoiador,
                        Numero: dadosTelefone.Numero,
                        WhatsApp: dadosTelefone.WhatsApp,
                        Principal: dadosTelefone.Principal
                    },
                    transaction: t
                });
    
                
                if(!createdTelefone){
                    
                    await telefoneInstance.update({
                        Apoiador: dadosApoiador.IdApoiador,
                        Numero: dadosTelefone.Numero,
                        WhatsApp: dadosTelefone.WhatsApp,
                        Principal: dadosTelefone.Principal
                    },{ transaction: t })
                }
    
            }
    
            
            
            // Confirma a transação
            await t.commit();

            return attApoiador;
        
        } catch (error) {
            // Em caso de erro, desfaz a transação
            await t.rollback();
            throw error; 
        }
    },




    create: async (req,res) => {
         
        try {

            const {
                nome, apelido, profissao, cpf, religiao, nascimento, classificacao, email, telefone, situacao, 
                cep, cidade, estado, lagradouro, numero, bairro, quadra, pontoReferencia, 
                entidadeNome, entidadeTipo, entidadeSigla, entidadeCargo, entidadeLideranca,
                partidoId, partidoCargo, partidoLideranca, secao, zona, diretorioMunicpio, diretorioUF,
                informacoesAdicionais 
            } = req.body

            const user = req.usuario;

            let dadosEntidade;
            let filiacao;
            let dadosTelefone;
            let endereco;

       
            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, lagradouro, numero, bairro, quadra, pontoReferencia};
                endereco = await enderecoController.createIfNotExists(enderecoCompleto);
            }
          

             // Verifica se existe entidade
            if(entidadeNome != null && entidadeNome.length > 1){
                const entidadeCompleta = {entidadeNome, entidadeSigla, entidadeTipo};

                const enti = await entidadeController.createIfNotExists(entidadeCompleta);

                dadosEntidade = {
                    Cargo: entidadeCargo,
                    Entidade: enti.IdEntidade, 
                    Lideranca: entidadeLideranca,
                };
            }

            // Verifica se existe partido
            if(partidoId != null && partidoId.length >= 1){
                
                const dadosFiliacao = {
                    IdPartido: partidoId,
                    DiretorioMunicipio: diretorioMunicpio || '',
                    DiretorioUF: diretorioUF || '',
                    Zona: zona || '',
                    Secao: secao || '',
                    Cargo: partidoCargo || '',
                    Lideranca: partidoLideranca || 'n'
                }

                filiacao = await filiacaoController.updateOrCreateIfNotExists(null,dadosFiliacao);

            }

             

            // Verifica se existe número de telefone
            if(telefone != null && telefone.length > 6){
                
                dadosTelefone = {
                    Numero: telefone,
                    WhatsApp: 's',
                    Principal: 's' 
                };
            }

            
            
            const classif = await classificacaoController.findByName(classificacao);
            const sit = await situacaoCadastroController.findByName(situacao);
        
            
            const dadosApoiador = {
                Nome: nome,
                CPF: cpf || null,
                Apelido: apelido,
                DataNascimento: nascimento,
                Email: email,
                Profsissao: profissao,
                Religiao: religiao,
                Endereco: endereco?.dataValues?.idEndereco,
                Classificacao: classif.idClassificacao,
                Situacao: sit.idSituacao,
                Filiacao: filiacao?.IdFiliacao,
                InformacaoAdicional: informacoesAdicionais,
                Sistema: user.sistema
            };

            
            
            const novoApoiador = await  apoiadorController.criarApoiadorComVinculacao(dadosApoiador, dadosEntidade, dadosTelefone);

            res.json(novoApoiador);

        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar o apoiador'})
        }
    },


    criarApoiadorComVinculacao: async (dadosApoiador, dadosEntidade, dadosTelefone) => {
        
        
       
        // Inicia a transação
        const t = await sequelize.transaction();
        
        try {
            // Cria o Apoiador
            const novoApoiador = await apoiadorModel.create(dadosApoiador, { transaction: t });


            if(dadosEntidade){
                 // Cria a Vinculacao com o IdApoiador
                await Vinculacao.create({
                    Apoiador: novoApoiador.IdApoiador,
                    ...dadosEntidade,
                }, { transaction: t });
            }

            /*if(dadosPartido){
                // Cria a Vinculacao com o IdApoiador
                await Vinculacao.create({
                    Apoiador: novoApoiador.IdApoiador,
                    ...dadosPartido,
                }, { transaction: t });
            }*/

            if(dadosTelefone){
                await TelefoneModel.create({
                    Apoiador: novoApoiador.IdApoiador,
                    ...dadosTelefone
                },{ transaction: t })
            }
            
    
            // Confirma a transação
            await t.commit();
    
            return novoApoiador;
        } catch (error) {
            // Em caso de erro, desfaz a transação
            await t.rollback();
            throw error; // Rejoga o erro para o chamador lidar
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

    viewApoiadores: async(req,res) => {
        try {
            
            const apoiadores = await apoiadorModel.findAll({
                include: [
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
            })


            const apoiadoresClassificacao = apoiadores.reduce((contagem, apoiador) => {
                const tipo = apoiador.ClassificacaoApoiador.Descricao; // Substitua 'nome' pelo campo correto da categoria
                contagem[tipo] = (contagem[tipo] || 0) + 1;
                return contagem;
            }, {});


            // Construir um array com a contagem por tipo
            const contagemApoiadoresClassificacao = Object.entries(apoiadoresClassificacao).map(([tipo, quantidade]) => ({ tipo, quantidade }));


            const apoiadoresSituacao = apoiadores.reduce((contagem, apoiador) => {
                const tipo = apoiador.SituacaoCadastroApoiador.Descricao; // Substitua 'nome' pelo campo correto da categoria
                contagem[tipo] = (contagem[tipo] || 0) + 1;
                return contagem;
            }, {});


            // Construir um array com a contagem por tipo
            const contagemApoiadoresSituacao = Object.entries(apoiadoresSituacao).map(([tipo, quantidade]) => ({ tipo, quantidade }));

            res.status(200).json([{'ApoiadoresClassificacao' : contagemApoiadoresClassificacao},{'ApoiadoresSituacao' : contagemApoiadoresSituacao}]);


        } catch (error) {
            console.log(`Não foi possível exibir os dados de apoiadores: ${error}`);
            res.status(500).json({msg: 'Não foi possível exibir os dados de apoiadores'});
        }
    },



}

export default apoiadorController;