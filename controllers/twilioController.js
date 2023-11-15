

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';


const twilioController = {

    send: async(req,res) => {
        
        try {
            
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            
            const client = twilio(accountSid, authToken);
           
            const msg = req.body?.texto;
            const apoiadores = req.body?.selectedApoiadores;
            const mediaUrl = req.body?.mediaUrl

            console.log(mediaUrl);
            
            return
    
            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = apoiador?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`;
            }).filter(numero => numero !== undefined);;

 
            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                mediaUrl: [mediaUrl],
            })
            .then(message => console.log(`Mensagem enviada para ${numerosApoiadores}: ${message}`))
            .catch(err => console.error(`Erro ao enviar mensagem para ${numerosApoiadores}: ${err}`));

            return res.status(200).json(message.sid);

        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json('Houve um erro ao enviar a mensagem');
        }

    }
}

export default twilioController;

