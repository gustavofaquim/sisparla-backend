
import { Op } from 'sequelize';

import doacaoModel from "../models/Doacao.js";
import campanhaModel from "../models/Campanha.js";
import apoiadorModel from '../models/Apoiador.js';

const DoacaoController = {

    findAll: async(req,res) => {

        try {

            const { termoBusca } = req.query;
            const filtroCampanha = req.query.campanha;
            
            const whereClause = {};

            if(termoBusca){

                whereClause[Op.or] = [
                    {Descricao: { [Op.like]: `%${termoBusca}%`} },
                    {Nome: { [Op.like]: `%${termoBusca}%`} },
                ]
                
            }

            if (filtroCampanha && filtroCampanha != 'todas') {
                whereClause['$IdCampanha$'] = filtroCampanha
            }

            const doacoes = await doacaoModel.findAll({ 
                include: [
                    {
                        model: campanhaModel,
                        as: 'DoacaoCampanha',
                        foreignKey: 'IdCampanha'
                    }
                ],
                
                where: whereClause, 
                order: [['Data', 'DESC']] 
            });


            return res.status(200).json(doacoes);

        } catch (error) {
            console.log('Erro ao recuperar os dados')
            console.log(error)
            return res.status(500).json({msg: 'Erro ao buscar os dados'})
        }
    }
}


export default DoacaoController;