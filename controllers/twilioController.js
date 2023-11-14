

import dotenv from 'dotenv';
dotenv.config();


const twilioController = {

    send: async(req,res) => {

        try {
            
            const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

            const client = require('twilio')(accountSid, authToken);

            client.messages
            .create({
                body: 'Fazendo um teste de envio via código.',
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: 'whatsapp:+556296828796', // Número do destinatário
            })
            .then(message => console.log(message.sid))
            .catch(err => console.error(err));

        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
        }

    }
}

export default twilioController;

