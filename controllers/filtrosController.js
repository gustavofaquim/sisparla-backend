import cidadeModel from "../models/Cidade.js";
import apoiadorModel from "../models/Apoiador.js";
import enderecoModel from "../models/Endereco.js";
import profissaoModel from "../models/Profissao.js";
import SituacaoCadastro from "../models/SituacaoCadastro.js";

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
                    {
                        model: SituacaoCadastro,
                        as: 'SituacaoCadastroApoiador',
                        foreignKey: 'Situacao',

                    },
                ],
            });

            const cidadesUnicas = new Set();
            const profissoesUnicas = new Set();
            const statusUnicos = new Set();
            const religioesUnicas = new Set();
    
            // Iterar sobre apoiadores e coletar cidades e profissões únicas
            apoiadores.forEach((apoiador) => {
                const enderecoApoiador = apoiador.EnderecoApoiador;
                const profissaoApoiador = apoiador.ProfissaoApoiador;
                const situacaoApoiador = apoiador.SituacaoCadastroApoiador;
                const religiaoApoiador = apoiador.Religiao;
    
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

                if(situacaoApoiador){
                   
                    const statusInfo = {
                        IdSituacao: situacaoApoiador.idSituacao,
                        Descricao: situacaoApoiador.Descricao
                    };
                    statusUnicos.add(JSON.stringify(statusInfo));
                }

                if(religiaoApoiador){
                    const religiaoInfo = {
                        Nome: religiaoApoiador
                    };
                    religioesUnicas.add(JSON.stringify(religiaoInfo));
                }
            });
    
            const cidadesArray = Array.from(cidadesUnicas).map((cidadeStr) => JSON.parse(cidadeStr));
            const profissoesArray = Array.from(profissoesUnicas).map((profissaoStr) => JSON.parse(profissaoStr));
            const situacoesArray = Array.from(statusUnicos).map((situacoesStr) => JSON.parse(situacoesStr));
            const religiaoArray = Array.from(religioesUnicas).map((religioesStr) => JSON.parse(religioesStr));
    
            res.json({ cidades: cidadesArray, profissoes: profissoesArray, situacoes: situacoesArray, religioes: religiaoArray});
            
        } catch (error) {
            console.log(`Erro ao buscar cidades, profissões e status de apoiadores: ${error}`);
            res.status(500).json({ msg: '`Erro ao buscar cidades, profissões e status de apoiadores' });
        }
    },
}

export default filtrosController