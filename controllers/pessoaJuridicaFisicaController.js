import pessoaModel from "../models/PessoaJuridicaFisica.js";
import enderecoModel from "../models/Endereco.js";
import bairroModel from "../models/Bairro.js";
import cidadeModel from "../models/Cidade.js";

const pessoaFisicaJuridicaController = {

    findAll: async(req,res) => {
        try {
            
            const pessoas = await pessoaModel.findAll({
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
                ]
            });

            res.status(200).json(pessoas);

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Erro ao buscar a lista de pessoas'});
        }
    }
}

export default pessoaFisicaJuridicaController;