import { response } from "express";
import bairroModel from "../models/Bairro.js";


const bairroController = {

  

    findOneByName: async (cidade, nome) => {

      try {
          
        const bairro = await bairroModel.findOne({
          where: {
            Nome: nome,
            Cidade: cidade
          },
        });
          
        return bairro;

      }catch (error) {
        console.log(`Erro ao buscar o bairro ${error}`);
        res.status(500).json({msg: 'Erro ao buscar o bairro'})
      }
    },


    findById: async(id) => {

      try {
        
        const bairro = await bairroModel.findByPk(id);

        if(!bairro){
          return res.status(404).json({msg: 'Bairro não encontrado'});
        }

        res.json(bairro);

      } catch (error) {
        console.log(`Erro ao buscar o bairro ${error}`);
        res.status(500).json({msg: 'Erro ao buscar o bairro'})
      }
    },

      createIfNotExists: async (cidade, nome, cep) => {
        
        
        try {
         
          let bairro = await bairroController.findOneByName(cidade, nome);
    
          
          if (!bairro) {
            bairro = await bairroModel.create({
              Cidade: cidade,
              Nome: nome,
              CEP: cep,

            });
          }
    
          return bairro;
          
        } catch (error) {
          console.log(`Erro ao criar o bairro ${error}`);
          throw new Error('Erro ao criar o bairro');
        }
      },

      update: async(id, nome, cidade, cep) => {

        try {
          
          const bairro = await bairroModel.findByPk(id);

          if(!bairro){
            return;
          }

          await bairro.update({
            Nome: nome,
            Cidade: cidade,
            CEP: cep
          });

          const bairroAtualizado = await bairroModel.findByPk(id);

          return bairroAtualizado;

        } catch (error) {
          console.log(`Erro ao atualizar o bairro: ${error}`);
          throw new Error('Erro ao atualizar o bairro');
        }

      }

}

export default bairroController;