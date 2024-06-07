import entidadeModel from "../models/Entidade.js";
import vinculacaoModel from "../models/Vinculacao.js";
import apoiadorModel from "../models/Apoiador.js";


const vinculacaoController = {


    findByApoiador: async(idApoiador) => {

        try {
            
            // Essa consulta nao está retornando nada...
            // mudar para findAll depois e acrescentar mais filtros...
            const vinculacao = await vinculacaoModel.findOne({
                where: {
                    Apoiador: idApoiador
                }
            });


            if(!vinculacao.idVinculacao){
                console.log('O apoiador ainda não possui nenhuma vinculação');
                return;
            }

            return vinculacao; 

        } catch (error) {
            
        }
    },

    updateOrCreateIfNotExists: async(dadosVinculacao) => {

        try {
            
            // Acrescentar mais validações posteriormente, para garantir que um apoiador possa ter mais de uma vinculacao.
            const vinculacaoExistente = await vinculacaoController.findByApoiador(dadosVinculacao.Apoiador)
        

            if(vinculacaoExistente){
                const vinculacaoAtualizada = await vinculacaoController.update(dadosVinculacao, vinculacaoExistente.idVinculacao)
                return vinculacaoAtualizada;
            }
                
            

            const novaVinculacao = await vinculacaoModel.create({
                
                Apoiador: dadosVinculacao.Apoiador,
                Cargo: dadosVinculacao.Cargo,
                Entidade: dadosVinculacao.Entidade,
                Lideranca: dadosVinculacao.Lideranca
            });

            return novaVinculacao;
           

        } catch (error) {
            console.log(`Erro ao criar ou atualizar a vinculacao ${error}`);
            throw  new Error('Erro ao criar ou atualizar a vinculacao');
        }
    },

    update: async(dadosVinculacao, idVinculacao) => {

        try {
            
            const vinculacaoAtualizada = await vinculacaoModel.update(
                {
                    Apoiador: dadosVinculacao.Apoiador,
                    Cargo: dadosVinculacao.Cargo,
                    Entidade: dadosVinculacao.Entidade,
                    Lideranca: dadosVinculacao.Lideranca
                }, {
                    where: {
                        idVinculacao: idVinculacao
                    }
                }
            )

            return vinculacaoAtualizada;

        } catch (error) {
            console.log(`Erro ao atualizar a vinculacao ${error}`);
            throw  new Error('Erro ao atualizar a vinculacao');
        }
    }

}

export default vinculacaoController;