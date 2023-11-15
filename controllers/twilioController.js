

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';


const twilioController = {

    send: async(req,res) => {
        
        try {
            
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            
            const client = twilio(accountSid, authToken);
           
            const msg = req.body?.texto;
            const apoiadores = req.body?.selectedApoiadores;
            const arquivos = req.body?.selectedFiles || [];
            
    
            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = apoiador?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`;
            }).filter(numero => numero !== undefined);;


            const mediaUrls = arquivos.map((file, index) => {
                try {
            
                    const url = `data:${file.type};base64,${file.data}`;
                    const originalname = file.name;
            
                    return { url, originalname };
                } catch (error) {
                    console.error(`Erro ao criar mediaUrl para arquivo ${index + 1}:`, error);
                    return null;
                }
            }).filter(url => url !== null);
            
             
            
            console.log('Número de elementos em arquivos:', arquivos.length);
           
          
            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                mediaUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Faquitemplacas.com.br%2FprodutosDetalhes.php%3Fp%3Datencao-area-de-teste&psig=AOvVaw07ulg2vk6pZSYjf_gQtLA2&ust=1700156070857000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJjZg4fFxoIDFQAAAAAdAAAAABAE',
            })
            .then(message => {
                console.log(`Mensagem enviada para ${numerosApoiadores}: ${message}`);
                return res.status(200).json(message.sid);
            })
            .catch(err => {
                console.error(`Erro ao enviar mensagem para ${numerosApoiadores}: ${err}`);
                return res.status(500).json('Houve um erro ao enviar a mensagem');
            });
            

        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json('Houve um erro ao enviar a mensagem');
        }

    }
}

export default twilioController;

