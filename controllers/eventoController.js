import { Sequelize, Op } from 'sequelize';

import eventoModel from "../models/Evento.js";

const eventoController = {

    findAll: async(req,res) => {
        try {
            
            const eventos = await eventoModel.findAll();
            res.json(eventos);

        } catch (error) {
            console.log(`Erro ao buscar evento: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar evento'});
        }
    },

    create: async(req,res) => {
        try {
            
            const {nome, descricao, responsavel, local, dataHorario, relacao, participantes} = req.body;

            console.log(req.body);
        } catch (error) {
            
        }
    }
}

export default eventoController;