
import apoiadorModel from "../models/Apoiador.js";
import profissaoModel from "../models/Profissao.js";
import religiaoModel from "../models/Religiao.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";
import classificacaoModel from "../models/Classificacao.js";
import SituacaoCadastro from "../models/SituacaoCadastro.js";

const apoiadorController = {



    findAll: async(req,res) => {
      
        try {

            const apoiadores = await apoiadorModel.findAll({
                include: [
                   {
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao'
                    },
                    {
                        model: religiaoModel,
                        as: 'ApoiadorReligiao',
                        foreignKey: 'Religiao'
                    },
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
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
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao'
                     },
                     {
                        model: religiaoModel,
                        as: 'ApoiadorReligiao',
                        foreignKey: 'Religiao'
                     },
                     {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        foreignKey: 'Endereco',
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
        const { body } = req;

        try {
            
            const apoiador = await apoiadorModel.findByPk(id);

            if(!apoiador){
                return res.status(404).json({msg: 'Apoiador não encontrado'});
            }

            await apoiador.update(body);

            const apoiadorAtualizado = await apoiadorModel.findByPk(id);

            res.json(apoiadorAtualizado);

        } catch (error) {
            console.log(`Erro ao atualizar o registro: ${error}`);
            res.status(500).json({msg: 'Erro ao atualizar o registro'});
        }
    },


    create: async (req,res) => {

        const { body } = req;

        try {

            const novoApoiador = await apoiadorModel.create(body);

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