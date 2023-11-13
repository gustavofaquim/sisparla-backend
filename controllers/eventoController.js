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

    findById: async(req,res) => {

        const { id } = req.params;
        
        try {
            
            const evento = await eventoModel.findByPk(id);

            if(!evento){
                return res.status(500).json({msg: 'Evento não encontrado'});
            }

            return res.json(evento);

        }catch (error) {
            console.log(`Erro ao buscar o evento: ${error}`);
            return res.status(500).json({msg: 'Erro ao buscar o evento'});
        }

    },

    create: async(req,res) => {
        try {
            
            const {nome, descricao, responsavel, local, dataHorario, relacao} = req.body;

            const novoEvento = await eventoModel.create({
                Nome: nome,
                Descricao: descricao,
                Responsavel: responsavel,
                Local: local,
                DataHorario: dataHorario,
                Relacao: relacao,
            });

            
            return res.status(200).json(novoEvento);
            
        } catch (error) {
            console.log(`Erro ao cadastrar o evento ${error}`);
            res.status(500).json({msg: 'Erro ao cadastrar o evento'});
        }
    },

    updateById: async(req,res) => {
        const { id } = req.params;

        try {
            
            const evento = await eventoModel.findByPk(id);

            if(!evento){
                return res.status(500).json({msg: 'Evento não encontrado'});
            }

            const dadosEvento = req.body;

            const eventoAtualizado = await eventoModel.update(dadosEvento, {
                where: {IdEvento: id}
            })

            return res.status(200).json({eventoAtualizado});

        } catch (error) {
            console.log(`Erro ao atualizar o evento: ${error}`);
            res.status(500).json({msg: 'Erro ao atualizar o evento'});
        }
    }
}

export default eventoController;