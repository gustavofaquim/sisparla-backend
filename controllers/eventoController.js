import { Sequelize, Op } from 'sequelize';

import eventoModel from "../models/Evento.js";

const eventoController = {

    findAll: async(req,res) => {
        try {
            
            const eventos = await eventoModel.findAll();
            return res.json(eventos);

        } catch (error) {
            console.log(`Erro ao buscar evento: ${error}`);
            return res.status(500).json({msg: 'Erro ao buscar evento'});
        }
    },

    create: async(req,res) => {
        try {
            
            const {nome, descricao, responsavel, local, dataHorario, relacao, participantes} = req.body;

            const novoEvento = await eventoModel.create({
                Nome: nome,
                Descricao: descricao,
                Responsavel: responsavel,
                Local: local,
                DataHorario: dataHorario,
                Relacao: relacao,
            });

            if(participantes){
                console.log('entrou aqui');
            }

            return res.status(200).json(novoEvento);
            
        } catch (error) {
            console.log(`Erro ao cadastrar o evento ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar o evento'});
        }
    }
}

export default eventoController;