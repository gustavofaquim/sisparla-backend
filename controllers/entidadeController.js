import { Sequelize, Op } from 'sequelize';

import entidadeModel from "../models/Entidade.js";


const entidadeController = {

    findAll: async(req,res) => {
        try {
            
            const filtro = req.query.filtro;

            const whereClause = {};

            if(filtro){

                whereClause[Op.or] = [
                    { Nome: { [Op.like]: `%${filtro}%` } }, 
                ]
            }

            const entidades = await entidadeModel.findAll({
                where: whereClause, 
                order: [['Nome', 'ASC'], ]
            });

            res.json(entidades);

        } catch (error) {
            console.log(`Erro ao buscar a lista de entidades: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de entidades'})
        }
    },

    findByType: async(req, res) => {

        const { id } = req.params;
       
        try {
            
            const partidos = await entidadeModel.findAll({
                where: {
                    Tipo: {
                        [Op.like] : `%${id}%`,
                    }
                }
            });
            res.json(partidos);

        } catch (error) {
            console.log(`Erro ao buscar a lista de entidades: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de entidades'})
        }
    },

    findByNot: async(req,res) => {
        
        const { id } = req.params;

        try {
            const entidades = await entidadeModel.findAll({
                where: {
                    Tipo: {
                        [Op.notLike] : `%${id}%`,
                    }
                }  
            })
            res.json(entidades);
        } catch (error) {
            console.log(`Erro ao buscar a lista de entidades: ${error}`);
            res.status(500).json({msg: 'Erro ao buscar a lista de entidades'})
        }
    },

    findByName: async(name) => {
        
        try {
            const entidade = await entidadeModel.findOne({
                where: {
                    Nome: {
                        [Op.like] : `%${name}%`
                    }
                }
            })

            
            return entidade;
            
        } catch (error) {
            console.log(`Erro ao buscar a entidade: ${error}`);
            throw new Error('Erro ao buscar a entidade');
        }
    },


    findByAcronym: async(sigla) => {
        try {
            const entidade = await entidadeModel.findOne({
                where: {
                    Sigla: sigla
                }
            });

            return entidade;
        } catch (error) {
            console.log(`Erro ao buscar a entidade: ${error}`);
            throw new Error('Erro ao buscar a entidade');
        }
    },

    createIfNotExists: async(entidade) => {
        try {
            

            let novaEntidade = await entidadeController.findByName(entidade.entidadeNome);

            if(novaEntidade){
                return novaEntidade;
            }

            novaEntidade = await entidadeModel.create({
                Nome: entidade.entidadeNome,
                Sigla: entidade.entidadeSigla,
                Tipo: entidade.entidadeTipo,
            });

            return novaEntidade;

        } catch (error) {
            console.log(`Erro criar a nova entidade: ${error}`);
            throw new Error('Erro criar a nova entidade');
        }
    }
}

export default entidadeController;