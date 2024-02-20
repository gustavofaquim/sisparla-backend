import telefoneModel from "../models/Telefone.js";

const telefoneController = {

    findByNumber: async(num, idApoiador) => {
        try {
            const telefone = await telefoneModel.findOne({
                where: {
                    Numero: num,
                    Apoiador: idApoiador
                }
                
            });

            return telefone;
        } catch (error) {
            console.log(`Erro ao buscar o telefone: ${error}`)
        }

    }
}

export default telefoneController;