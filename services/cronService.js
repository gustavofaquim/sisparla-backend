import cron from 'node-cron';
import mensagemController from '../controllers/mensagemController.js';



// Esta função será chamada automaticamente todos os dias às 00:00 (meia-noite)
cron.schedule('44 15 * * *', async () => {
    try {
        console.log('Executando a função de aniversário automaticamente...');
        const aniversariantesDia = await mensagemController.BirthDayMessages();

        if (aniversariantesDia) {
            console.log('Aniversariantes do dia:', aniversariantesDia);
            // Resto do código de tratamento...
        } else {
            console.log('Nenhum aniversariante encontrado');
        }
    } catch (error) {
        console.log(`Houve um erro ao executar a função de aniversário automaticamente: ${error}`);
    }
});

export default cron;