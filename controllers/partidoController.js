import { Sequelize, Op } from 'sequelize';

import partidoModel from "../models/Partido.js";

const partidoController = {

    findAll: async(req,res) => {
        try {
            const partidos = await partidoModel.findAll();
            res.json(partidos);
        } catch (error) {
            console.log(`Erro ao buscar a lista de partidos: ${error}`)
            res.status(500).json({msg: 'Erro ao buscar a lista de partidos'});
        }
    }
}

export default partidoController;