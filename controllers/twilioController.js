

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';


const twilioController = {

    send: async(req,res) => {
        
        try {
            
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            
            const client = twilio(accountSid, authToken);

            client.messages
            .create({
                body: 'Fazendo um teste de envio via código.',
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: 'whatsapp:+556296828796', // Número do destinatário
            })
            .then(message => console.log(message.sid))
            .catch(err => console.error(err));

            return res.status(200).json(message.sid);

        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json('Houve um erro ao enviar a mensagem');
        }

    }
}

export default twilioController;

