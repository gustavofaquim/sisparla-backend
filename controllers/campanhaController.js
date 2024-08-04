
import { Op, where } from 'sequelize';
import sequelize from "../db/conn.js";


import campanhaModel from "../models/Campanha.js";

const campanhaController = {


    findList: async(req,res) => {

        try {

            const termoBusca = req.query.filtro;
            
            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `${termoBusca}%` } }, 
                ]
            }

            const campanhas = await campanhaModel.findAll({
                
                where: whereClause,
                order: [['Nome', 'ASC']]
            });

            return res.status(200).json(campanhas);
            
        } catch (error) {
            console.log(`Erro ao buscar a lista de dados: ${error}`);
            return res.status(500).json(`Erro ao buscar a lista de dados: ${error}`);
        }

    }
}

export default campanhaController;