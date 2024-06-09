import filiacaoModel from "../models/FiliacaoPartidaria.js";
import apoiadorModel from "../models/Apoiador.js";
import apoiadorController from "./apoiadorController.js";

const filiacaoController = {

    findByApoiador: async(idApoiador) => {

        try {
            const apoiadorFiliacao = await apoiadorModel.findOne({
                where: {
                    IdApoiador: idApoiador
                }
            });


            if(!apoiadorFiliacao.Filiacao){
                console.log('A apoiador ainda não possui filiação partidaria')
                return;
            }


            const filiacao = await filiacaoModel.findOne({
                where: {
                    IdFiliacao: apoiadorFiliacao.Filiacao
                }
            });

            return filiacao;

        } catch (error) {
            console.log(`Erro ao buscar a filiacao: ${error}`);
            throw new Error('Erro ao buscar a filiacao');
            
        }
    },

    updateOrCreateIfNotExists: async(idApoiador,dadosFiliacao) => {

        try {
            
            if(idApoiador){
                const filiacaoExistente = await filiacaoController.findByApoiador(idApoiador);

                if(filiacaoExistente){
                    const filiacaoAtualizada = await filiacaoController.update(dadosFiliacao, filiacaoExistente.IdFiliacao);
                    return filiacaoAtualizada;
                }
            }
            

            const novaFiliacao = await filiacaoModel.create({
                    Partido: dadosFiliacao.IdPartido,
                    DiretorioMuniciapal: dadosFiliacao.DiretorioMuniciapal,
                    DiretorioUF: dadosFiliacao.DiretorioUF,
                    Zona: dadosFiliacao.Zona,
                    Secao: dadosFiliacao.Secao,
                    Cargo: dadosFiliacao.Cargo,
                    Lideranca: dadosFiliacao.Lideranca
            })

            return novaFiliacao;
        } catch (error) {
            console.log(`Erro ao criar ou atualizar a filiação ${error}`);
            throw  new Error('Erro ao criar ou atualizar a filiacao');
        }
    },

    update: async(dadosFiliacao, idFiliacao) => {

        
        try {
            
            const filiacaoAtualizada = await filiacaoModel.update(
                {
                    Partido: dadosFiliacao.IdPartido,
                    DiretorioMuniciapal: dadosFiliacao.DiretorioMuniciapal,
                    DiretorioUF: dadosFiliacao.DiretorioUF,
                    Zona: dadosFiliacao.Zona,
                    Secao: dadosFiliacao.Secao,
                    Cargo: dadosFiliacao.Cargo,
                    Lideranca: dadosFiliacao.Lideranca
                }, {
                    where: {
                        IdFiliacao: idFiliacao
                    }
                }
            )

            return filiacaoAtualizada;
        } catch (error) {
            console.log(`Erro ao atualizar a filiação ${error}`)
            throw new Error('Erro ao atualizar a filiação');
        }
    },


    delete: async(IdFiliacao, IdPartido) => {

        try {
            
            if(!(IdFiliacao && IdPartido)){
               return ('Apoiador ou Partido invalidos');
            }



            const filiacaoDeletada = await filiacaoModel.destroy({
                where: {
                    IdFiliacao: IdFiliacao,
                    Partido: IdPartido
                }
            })


            return 'Filiação excluída com sucesso';



        } catch (error) {
            console.log(`Erro ao deletar a filiação ${error}`)
            return error;
        }
    }
}

export default filiacaoController;