import { Sequelize, Op, where } from 'sequelize';
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
import Usuario from '../models/Usuario.js';


import {verificarToken} from '../middlewares/verificarToken.js';
import Grupo from '../models/Grupo.js';
import OrigemCadastro from '../models/OrigemCadastro.js';
import Apoiador from '../models/Apoiador.js';
import generateToken from '../middlewares/geraTokenApoiador.js';




const apoiadorController = {



    countFindAll: async(req,res) => {
        try {
            
            const termoBusca = req.query.termoBusca;
            const filtroProfissao = req.query.profissao;
            const filtroPartido = req.query.partido;
            const filtroCidade = req.query.cidade;
            const filtroReligiao = req.query.religiao;

            const whereClause = {};


            if (termoBusca) {
                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } },
                    { Apelido: { [Op.like]: `%${termoBusca}%` } },
                    { Email: { [Op.like]: `%${termoBusca}%` } },
                    {
                        '$EnderecoApoiador.CidadeEndereco.Nome$': {
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
                whereClause['$Profissao$'] = filtroProfissao
            }

            if(filtroPartido && filtroPartido != 'todos'){
                whereClause['$FiliacaoPartidaria.PartidoFiliacao.Nome$'] = {
                    [Op.like]: `%${filtroPartido}%`
                }
            }

            if(filtroCidade && filtroCidade != 'todas'){
                whereClause['$EnderecoApoiador.CidadeEndereco.IdCidade$'] = filtroCidade;
            }

          
    
           
            const totalApoiadores = await apoiadorModel.count({
                include: [
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
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao',
                    },
                    {
                        model: SituacaoCadastro,
                        as: 'SituacaoCadastroApoiador',
                        foreignKey: 'Situacao',

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

           
            return res.json(totalApoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }
    },

    findAll: async(req,res) => {
      
        try {

            

            const termoBusca = req.query.termoBusca;
            const filtroProfissao = req.query.profissao;
            const filtroCidade = req.query.cidade;
            const filtroSituacao = req.query.situacao;
            const filtroReligiao = req.query.religiao;


            const page = parseInt(req.query.page) || 1; // Página atual, padrão é 1
            const itemsPerPage = parseInt(req.query.itemsPerPage) || 30; // Itens por página, padrão é 30
    
            const startIndex = parseInt(req.query.startIndex) || (page - 1) * itemsPerPage; // Índice de início, padrão é calculado com base na página atual
            const endIndex = parseInt(req.query.endIndex) || startIndex + itemsPerPage; // Índice final, padrão é calculado com base no índice de início e itens por página

            
            const whereClause = {};


            if (termoBusca) {
                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } },
                    { Apelido: { [Op.like]: `%${termoBusca}%` } },
                    { Email: { [Op.like]: `%${termoBusca}%` } },
                    
                    // Busca textual por cidade
                    /*sequelize.literal(`(
                        SELECT
                            1
                        FROM
                            ENDERECO AS EnderecoApoiador
                            INNER JOIN CIDADE AS CidadeEndereco ON EnderecoApoiador.Cidade = CidadeEndereco.IdCidade
                        WHERE
                            CidadeEndereco.Nome LIKE '%${termoBusca}%'
                            AND EnderecoApoiador.idEndereco = Apoiador.Endereco
                    ) IS NOT NULL`)*/
                    
                    /*{
                        '$EnderecoApoiador.CidadeEndereco.Nome$': {
                            [Op.like]: `%${termoBusca}%`,
                        },
                    },*/
                   /* {
                        '$SituacaoCadastroApoiador.Descricao$':{
                            [Op.like]: `%${termoBusca}%`,
                        }
                    }*/
                ]
            }

            if (filtroProfissao && filtroProfissao != 'todas') {
                whereClause['$Profissao$'] = filtroProfissao
            }

        
            if(filtroSituacao && filtroSituacao != 'todas'){
                whereClause['$Situacao$'] = filtroSituacao;
            }

            if(filtroReligiao && filtroReligiao != 'todas'){
                whereClause['$Religiao$'] = filtroReligiao;
            }

           

            if (filtroCidade && filtroCidade !== 'todas') {
                whereClause[Op.and] = [
                    whereClause[Op.and] || {}, // Garanta que o array whereClause[Op.and] exista
                    sequelize.literal(`(
                        SELECT
                            1
                        FROM
                            ENDERECO AS EnderecoApoiador
                            INNER JOIN CIDADE AS CidadeEndereco ON EnderecoApoiador.Cidade = CidadeEndereco.IdCidade
                        WHERE
                            CidadeEndereco.IdCidade = ${filtroCidade}
                            AND EnderecoApoiador.idEndereco = Apoiador.Endereco
                    ) IS NOT NULL`)
                ];
            }
    
    
           
            const apoiadores = await apoiadorModel.findAll({
                include: [
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
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao',
                    },
                    {
                        model: SituacaoCadastro,
                        as: 'SituacaoCadastroApoiador',
                        foreignKey: 'Situacao',

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
                    {
                        model: FiliacaoModel,
                        as: 'FiliacaoPartidaria',
                        foreignKey: 'Filiacao',
                        include:{
                            model: PartidoModel,
                            as: 'PartidoFiliacao',
                            foreignKey: 'Partido',
                        }
                    },
                  
                ],
                where: whereClause,
                order: [['DataInsercao', 'DESC']],
                limit: endIndex - startIndex, // Limitar o número de resultados com base no índice de início e fim
                offset: startIndex, // Ignorar os resultados anteriores ao índice de início
            });

           
           
            res.json(apoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }

    },


    findList: async(req,res) => {
      
        try {

            
            const termoBusca = req.query.filtro;
            
            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `${termoBusca}%` } }, 
                ]
            }
           
            const apoiadores = await apoiadorModel.findAll({
                
                where: whereClause,
                order: [['Nome', 'ASC']]
            });

           
            res.json(apoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }

    },


    filterAll: async(req,res) => {
      
        try {

            
            const termoBusca = req.query.termoBusca;
            
            const whereClause = {};


            if (termoBusca) {
                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${termoBusca}%` } },
                    
                ]
            }

           
            const apoiadores = await apoiadorModel.findAll({
                where: whereClause,
            });

           
            res.json(apoiadores);
        

        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
        }

    },

    findByBirthday: async(req,res) => {
    
        try {
            
            const { periodo, dia } = req.query;
            //const periodo = id;

            
            const whereClause = {};

            
            const data = new Date();
            const mesAtual = data.getMonth() + 1;

            if(dia != null && dia.length > 1){

                const dataEscolhida = new Date(dia + ' UTC');

                const diaEscolhida = dataEscolhida.getDate();
                const mesEscolhido = dataEscolhida.getMonth() + 1;

                whereClause.DataNascimento = {
                    [Op.and]: [
                        sequelize.literal(`DAY(DataNascimento) = ${diaEscolhida} AND MONTH(DataNascimento) = ${mesEscolhido}`),
                    ],
                };

            }else{

                // Somente verifica os aniversários por período caso uma data não tenha sido fornecida
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
                            as: 'CidadeEndereco',
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
            
        
            const whereClause = {};

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
                            as: 'CidadeEndereco',
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

        //Estava usando somente para testar o recurso do recadastramento...
        //console.log('Aqui');
        //console.log(generateToken(id));

        try {  
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

    destructuringApoiador: (apoiador) => {

        try {
            
            const idApoiador = apoiador?.IdApoiador;
            const nome = apoiador?.Nome;
            const apelido = apoiador?.Apelido;
            const cpf = apoiador?.CPF;
            const dataNascimento = apoiador?.DataNascimento;
            const idProfissao = apoiador?.ProfissaoApoiador?.IdProfissao;
            const profissao = apoiador?.ProfissaoApoiador?.Nome;
            const religiao = apoiador?.Religiao;
            const email = apoiador?.Email;
            const informacaoAdicional = apoiador?.InformacaoAdicional;
            const grupoId = apoiador?.GrupoApoiador?.IdGrupo;
            const grupoNome = apoiador?.GrupoApoiador?.Nome;
            const responsavelId = apoiador?.ResponsavelCadastro?.idUsuario;
            const responsavelNome = apoiador?.ResponsavelCadastro?.Nome;
            const origemId = apoiador?.OrigemApoiador?.IdOrigem;
            const origemNome = apoiador?.OrigemApoiador?.Descricao;
            const dataInsercao = apoiador?.DataInsercao;
            const sexo = apoiador?.Sexo;

            const apoiadorVinculado = apoiador?.ApoiadorVinculado;

            
            const idClassificacao = apoiador?.Classificacao;
            const idSituacao = apoiador?.Situacao;
           
            const idTelefone = apoiador?.TelefoneApoiador?.[0]?.idTelefone;
            const numeroTelefone = apoiador?.TelefoneApoiador?.[0]?.Numero;
            const numeroWhatsapp = apoiador?.TelefoneApoiador?.[0]?.WhatsApp;
            const numeroAntigo =  apoiador?.TelefoneApoiador?.[0]?.Numero;
            
            
            const cep = apoiador?.EnderecoApoiador?.CEP;
            const cidade = apoiador?.EnderecoApoiador?.CidadeEndereco?.Nome;
            const estado = apoiador?.EnderecoApoiador?.CidadeEndereco?.Estado;

            
            const idEndereco = apoiador?.EnderecoApoiador?.idEndereco;
            const bairro = apoiador?.EnderecoApoiador?.Bairro;
            const logradouro = apoiador?.EnderecoApoiador?.Logradouro;
            const complemento = apoiador?.EnderecoApoiador?.Complemento;
            const numeroEndereco = apoiador?.EnderecoApoiador?.Numero;
            const pontoReferencia = apoiador?.EnderecoApoiador?.PontoReferencia;

           
            const idFiliacao = apoiador?.FiliacaoPartidaria?.IdFiliacao;
            const partidoId = apoiador?.FiliacaoPartidaria?.Partido;
            const partidoNome = apoiador?.FiliacaoPartidaria?.PartidoFiliacao?.Nome;
            const partidoCargo = apoiador?.FiliacaoPartidaria?.Cargo;
            const partidoLideranca = apoiador?.FiliacaoPartidaria?.Lideranca;
            const partidoZona = apoiador?.FiliacaoPartidaria?.Zona;
            const partidoSecao = apoiador?.FiliacaoPartidaria?.Secao;
            const diretorioMunicpio = apoiador?.FiliacaoPartidaria?.DiretorioMunicipio;
            const diretorioUF = apoiador?.FiliacaoPartidaria?.DiretorioUF;


            let IdEntidade = '';
            let entidadeTipo = '';
            let entidadeNome = '';
            let entidadeNomeAntigo = '';
            let entidadeSigla = '';
            let entidadeCargo = '';
            let entidadeLideranca = '';
            
            apoiador?.Vinculacao?.forEach((e, index) => {
                entidadeTipo = e.VinculacaoEntidade.Tipo;
               
                if (entidadeTipo !== 'Partido Político' && entidadeTipo) {
                    IdEntidade = e.VinculacaoEntidade.IdEntidade;
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

        
            const apoiadorD = {idApoiador, nome, apelido, cpf, dataNascimento, idProfissao, profissao, religiao, email, 
                informacaoAdicional, idClassificacao, idSituacao, idTelefone, numeroTelefone, numeroAntigo ,numeroWhatsapp, idEndereco, IdEntidade,
                cep, cidade, estado, bairro, logradouro, complemento, numeroEndereco, pontoReferencia, 
                entidadeTipo, entidadeNome, entidadeNomeAntigo, entidadeSigla, entidadeCargo, entidadeLideranca, partidoId,
                partidoLideranca,partidoZona, partidoSecao, diretorioMunicpio, diretorioUF, partidoNome, partidoCargo, demandas, 
                grupoId, grupoNome, responsavelId, responsavelNome, origemId, origemNome, dataInsercao, apoiadorVinculado, idFiliacao, sexo
            };

            return apoiadorD;

        } catch (error) {
            console.log('Erro ao desestruturar Apoiador: ' + error);
            throw error;
        }

    },


    updateById: async(req, res) => {

        const { id } = req.params;
          
        const whereClause = {};

        whereClause['IdApoiador'] = id;
       
       
        try {
            
            const apoiador = await apoiadorModel.findOne({where: whereClause});

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }


            const {idApoiador, nome, apelido,  cpf, dataNascimento, profissao,  religiao, email, informacaoAdicional, idClassificacao, idSituacao, numeroAntigo, numeroTelefone, whats,
            idEndereco, cep, cidade, estado, bairro, complemento, logradouro, numeroEndereco, pontoReferencia, entidadeTipo, entidadeNome, entidadeSigla,
            entidadeCargo, entidadeLideranca, partidoId, partidoLideranca, partidoCargo, grupo, origemId, dataInsercao, apoiadorVinculado, responsavelId, sexo
            } = req.body;


            //let dadosEntidade;
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
              
                dadosTelefone = {
                    Numero: numeroTelefone,
                    WhatsApp: whats || 'n',
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
                Grupo: grupo,
                Origem: origemId,
                DataInsercao: dataInsercao,
                Responsavel: responsavelId,
                ApoiadorVinculado: apoiadorVinculado,
                Sexo: sexo
            };
            
            
            const apoiadorAtualizado = await apoiadorController.atualizarApoiadorComVinculacao(dadosApoiador, null, dadosTelefone);
            
            const apoiadorD = apoiadorController.destructuringApoiador(apoiadorAtualizado);
           
            return res.status(200).json(apoiadorD);


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

            
            if(dadosTelefone){

                const telefoneExistente = await TelefoneModel.findOne({
                    where: { Apoiador: dadosApoiador.IdApoiador }
                });

                if (telefoneExistente) {

                    // Se já houver um registro, atualize o número de telefone
                    await TelefoneModel.update(
                        { Numero: dadosTelefone.Numero },
                        { where: { Apoiador: dadosApoiador.IdApoiador  } }
                    );
                }else {
                    // Se não houver um registro, insira um novo número de telefone
                    await TelefoneModel.create({
                        Apoiador: dadosApoiador.IdApoiador,
                        ...dadosTelefone
                    }, { transaction: t });

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


    removeFiliacao: async(IdApoiador) => {

        try {

            
            const apoiador = await apoiadorModel.update(
                {Filiacao: null},
                {where: 
                    {IdApoiador: IdApoiador}
                } 
            )

            return 'Filiacao removida com sucesso';
            
        } catch (error) {
            console.log(`Erro ao remover filiação ${error}`);
            throw error; 
        }
    },

    create: async(req,res) => {
         
        try {


            const {
                nome, apelido, profissao, cpfSemMascara, religiao, nascimento, classificacao, email, telefoneSemMascara, whats, situacao, 
                cepSemMascara, cidade, estado, logradouro, numero, bairro, complemento, pontoReferencia, 
                entidadeNome, entidadeTipo, entidadeSigla, entidadeCargo, entidadeLideranca,
                partidoId, partidoCargo, partidoLideranca, secao, zona, diretorioMunicpio, diretorioUF, grupo, responsavelId, responsavelNome, origem,
                informacoesAdicionais, dataInsercao, apoiadorVinculado, sexo 
            } = req.body


            const cpf = cpfSemMascara;
            const cep = cepSemMascara;
            const telefone = telefoneSemMascara;


            let dadosEntidade;
            let filiacao;
            let dadosTelefone;
            let endereco;


            if(cidade != null && estado != null){
                const enderecoCompleto = {cep, cidade, estado, logradouro, numero, bairro, complemento, pontoReferencia};
                //endereco = await enderecoController.createIfNotExists(enderecoCompleto);
                endereco = await enderecoController.create(enderecoCompleto);
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
                    WhatsApp: whats || 'n',
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
                Profissao: profissao,
                Religiao: religiao,
                Endereco: endereco?.dataValues?.idEndereco,
                Classificacao: classif.idClassificacao,
                Situacao: sit.idSituacao || 1,
                Filiacao: filiacao?.IdFiliacao,
                InformacaoAdicional: informacoesAdicionais,
                Responsavel: responsavelId,
                Grupo: grupo,
                Origem: origem,
                DataInsercao: dataInsercao,
                ApoiadorVinculado: apoiadorVinculado,
                Sexo: sexo
            };

            


            const novoApoiador = await  apoiadorController.criarApoiadorComVinculacao(dadosApoiador, dadosEntidade, dadosTelefone);

            return res.status(200).json(novoApoiador);

        } catch (error) {
            console.log(`Erro ao cadastrar o apoiador: ${error}`);
            return res.status(500).json({msg: 'Erro ao cadastrar o apoiador'})
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

            return res.json({msg: 'Appoiador deletado com sucesso'});

        } catch (error) {
            console.log(`Erro ao deletar apoiador: ${error}`);
            return res.status(500).json({msg: 'Erro ao deletar apoiador'});
        }
    },


    count: async(req,res) => {
        
        try {
            
            const countApoiadores = await apoiadorModel.count();
            return res.status(200).json(countApoiadores);

        } catch (error) {
            return res.status(500).json({msg: 'Não foi possível exibir a quantidade de apoiadores'});
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