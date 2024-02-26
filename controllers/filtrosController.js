import cidadeModel from "../models/Cidade.js";
import apoiadorModel from "../models/Apoiador.js";
import enderecoModel from "../models/Endereco.js";
import profissaoModel from "../models/Profissao.js";

const filtrosController = {

    cidadeAndProfissao: async (req, res) => {
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
                    {
                        model: profissaoModel,
                        as: 'ProfissaoApoiador',
                        foreignKey: 'Profissao',
                    },
                ],
            });
    
            const cidadesUnicas = new Set();
            const profissoesUnicas = new Set();
    
            // Iterar sobre apoiadores e coletar cidades e profissões únicas
            apoiadores.forEach((apoiador) => {
                const enderecoApoiador = apoiador.EnderecoApoiador;
                const profissaoApoiador = apoiador.ProfissaoApoiador;
    
                if (enderecoApoiador && enderecoApoiador.CidadeEndereco) {
                    const cidade = enderecoApoiador.CidadeEndereco;
                    const cidadeInfo = {
                        IdCidade: cidade.IdCidade,
                        Nome: cidade.Nome,
                        Estado: cidade.Estado, // Substitua por sua propriedade correta
                    };
                    cidadesUnicas.add(JSON.stringify(cidadeInfo));
                }
    
                if (profissaoApoiador) {
                    const profissaoInfo = {
                        IdProfissao: profissaoApoiador.IdProfissao,
                        Nome: profissaoApoiador.Nome,
                        // Adicione outras propriedades conforme necessário
                    };
                    profissoesUnicas.add(JSON.stringify(profissaoInfo));
                }
            });
    
            const cidadesArray = Array.from(cidadesUnicas).map((cidadeStr) => JSON.parse(cidadeStr));
            const profissoesArray = Array.from(profissoesUnicas).map((profissaoStr) => JSON.parse(profissaoStr));
    
            res.json({ cidades: cidadesArray, profissoes: profissoesArray });
            
        } catch (error) {
            console.log(`Erro ao buscar cidades e profissões de apoiadores: ${error}`);
            res.status(500).json({ msg: 'Erro ao buscar cidades e profissões de apoiadores' });
        }
    },
}

export default filtrosController