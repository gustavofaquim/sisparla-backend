import cidadeModel from "../models/Cidade.js";
import apoiadorModel from "../models/Apoiador.js";
import enderecoModel from "../models/Endereco.js";

const cidadeController = {

    find: async(city,IdEstado) => {
        
        try {
            
            const cidade = await cidadeModel.findOne({
                where: {
                    Nome: city,
                    Estado: IdEstado
                }
            });

            return cidade;
        } catch (error) {
            console.log(`Erro ao buscar a cidade ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a cidade'})
        }
    },

    findById: async(req,res) => {
        
        try {

            const {IdCidade, IdEstado} = req.body;
            
            const cidade = await cidadeModel.findOne({
                where: {
                    IdCidade: IdCidade,
                    Estado: IdEstado
                }
            });

            res.status(200).json({cidade});
        } catch (error) {
            console.log(`Erro ao buscar a cidade ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a cidade'})
        }
    },
    
    findByUF: async(req,res) =>{
        try {
            
            const { estado } = req.body;

            const cidade = await cidadeModel.findOne({
                where: {
                    Estado: estado
                }
            })

            res.status(200).json({cidade});
        } catch (error) {
            res.status(500).json({msg: 'Erro ao buscar a cidade'})
        }

    },

    cidadesApoiadores: async (req, res) => {
        try {
            const apoiadores = await apoiadorModel.findAll({
                include: [
                    {
                        model: enderecoModel,
                        as: 'EnderecoApoiador',
                        include: {
                            model: cidadeModel,
                            as: 'CidadeEndereco',
                        },
                    },
                ],
            });
    
            const cidadesUnicas = new Set();
    
            // Iterar sobre apoiadores e coletar cidades únicas
            apoiadores.forEach((apoiador) => {
                const enderecoApoiador = apoiador.EnderecoApoiador;
                if (enderecoApoiador && enderecoApoiador.CidadeEndereco) {
                    const cidade = enderecoApoiador.CidadeEndereco;
                    const cidadeInfo = {
                        IdCidade: cidade.IdCidade,
                        Nome: cidade.Nome,
                        Estado: cidade.Estado, 
                    };
                    cidadesUnicas.add(JSON.stringify(cidadeInfo));
                }
            });
    
            const cidadesArray = Array.from(cidadesUnicas).map((cidadeStr) => JSON.parse(cidadeStr));
            res.status(200).json(cidadesArray);

        } catch (error) {
            console.log(`Erro ao buscar cidades de apoiadores: ${error}`);
            res.status(500).json({ msg: 'Erro ao buscar cidades de apoiadores' });
        }
    },

    createIfNotExists: async(city, IdEstado) => {
        try {

            
            const cidade = await cidadeController.find(city, IdEstado);
            
            if(cidade){
                return cidade;
            }
            
            const novaCidade = cidadeModel.create({
                Nome: city,
                Estado: IdEstado

            });

            return novaCidade;

        } catch (error) {
            console.log(`Erro ao cadastrar a cidade ${error}`);
            throw new Error('Erro ao cadastrar a cidade');
        }
    }
}

export default cidadeController;