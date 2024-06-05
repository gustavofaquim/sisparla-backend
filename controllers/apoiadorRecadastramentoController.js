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
import Usuario from '../models/Usuario.js';
import apoiadorController from './apoiadorController.js';


import Grupo from '../models/Grupo.js';
import OrigemCadastro from '../models/OrigemCadastro.js';
import Apoiador from '../models/Apoiador.js';

import geraTokenApoiador from "../middlewares/geraTokenApoiador.js";
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


}


export default apoiadorRecadastramentoController;