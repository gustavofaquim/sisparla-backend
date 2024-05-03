import sequelize from "../db/conn.js";
import { Sequelize, Op } from 'sequelize';

import apoiadorModel from "../models/Apoiador.js";
import Endereco from "../models/Endereco.js";


const dashboardController = {


    ageRange: async(req,res) => {

        try {

            const apoiadoresComDataNascimento = await apoiadorModel.findAll({ dataNascimento: { $ne: null } }); // Obtém todos os apoiadores

        
            // Define os limites das faixas etárias
            const faixasEtarias = [
                { faixa: '16-18', min: 16, max: 18 },
                { faixa: '19-24', min: 19, max: 24 },
                { faixa: '25-30', min: 25, max: 30 },
                { faixa: '31-40', min: 31, max: 40 },
                { faixa: '41-50', min: 41, max: 50 },
                { faixa: '51-60', min: 51, max: 60 },
                { faixa: '60+', min: 60, max: Infinity},
                // Adicione mais faixas etárias conforme necessário
            ];

            // Inicializa um objeto para armazenar a contagem de apoiadores em cada faixa etária
            const contagemPorFaixaEtaria = {};
            for (const faixa of faixasEtarias) {
                contagemPorFaixaEtaria[faixa.faixa] = 0;
            }

            // Itera sobre os apoiadores com data de nascimento para contar quantos estão em cada faixa etária
            for (const apoiador of apoiadoresComDataNascimento) {
                const idade = dashboardController.calcularIdade(apoiador.DataNascimento);

                for (const faixa of faixasEtarias) {
                    if (idade >= faixa.min && idade <= faixa.max) {
                        contagemPorFaixaEtaria[faixa.faixa]++;
                        break;
                    }
                }
            }

            // Organiza os dados no formato necessário para o gráfico
            const categories = Object.keys(contagemPorFaixaEtaria);
            const data = Object.values(contagemPorFaixaEtaria);

            // Retorna a contagem de apoiadores por faixa etária
            return res.status(200).json({ categories, data });
                

        } catch (error) {
            console.log(`${error}`);
            return res.status(500).json({msg: 'Erro ao obter as faixas etarias'});
        }
    },

    distributionCity: async(req,res) => {

        try {

            const consultaSQL = `SELECT 
            C.IdCidade,
            C.Nome,
            COUNT(DISTINCT A.IdApoiador) AS QNT
            FROM APOIADOR A
            INNER JOIN ENDERECO E ON A.Endereco = E.IdEndereco
            INNER JOIN CIDADE C ON C.IdCidade = E.Cidade
            WHERE C.IdCidade IS NOT NULL
            GROUP BY C.IdCidade
            ORDER BY QNT DESC;`;

            const apoiadoresPorCidade = await sequelize.query(consultaSQL, {type: Sequelize.QueryTypes.SELECT})

            

            return res.status(200).json(apoiadoresPorCidade);

            
        } catch (error) {
            console.log(`${error}`);
            return res.status(500).json({msg: 'Erro ao obter a distribuição por cidade'});
        }
    },


    // Função para calcular a idade com base na data de nascimento
    calcularIdade: (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth() + 1;
        const mesNascimento = nascimento.getMonth() + 1;
        
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade;
    }

}

export default dashboardController;