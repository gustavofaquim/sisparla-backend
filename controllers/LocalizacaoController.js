
import { Sequelize, Op } from 'sequelize';
import sequelize from "../db/conn.js";

const LocalizacaoController = {


    find: async (req, res) => {
    
        try {
            const { id } = req.params; // Extraindo o IdApoiador corretamente

            const coordenadas = await sequelize.query(
                `SELECT ST_X(Coordenada) AS longitude, ST_Y(Coordenada) AS latitude 
                FROM Localizacao WHERE IdApoiador = ?`, 
                { 
                    replacements: [id], // Usando parâmetros substituíveis para evitar SQL Injection
                    type: sequelize.QueryTypes.SELECT 
                }
            );
    
            console.log(coordenadas);
    
            return res.status(200).json(coordenadas);
        } catch (error) {
            console.log('Erro! Não foi possível recuperar a informação');
            console.log(error);
            return res.status(500).json('Erro ao recuperar a localização');
        }
    }
    
}

export default LocalizacaoController;