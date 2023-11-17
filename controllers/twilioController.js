

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';
import fs from 'fs';



const twilioController = {

    send: async(req,res) => {
        
        try {
            
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            
            const client = twilio(accountSid, authToken);
           
            const msg = req.body?.texto;
            const apoiadores = req.body?.selectedApoiadores;

            console.log(req.file);

            const {name} = req.body;

            const file = req.file;

            console.log('Name:' + name);
            console.log("File: " + file);
            res.json({msg: "Imagem salva com sucesso"});

            return 
            
    
            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = apoiador?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`;
            }).filter(numero => numero !== undefined);;


            
             return
            
          
            
            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                mediaUrl: [''],
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

    },


    saveImagem: async(req,res) => {

        try {
            
            const {name} = req.body;

            const file = req.file;

            console.log('Name:' + name);
            console.log("File: " + file);
            res.json({msg: "Imagem salva com sucesso"});


        } catch (error) {
            console.log('Erro ao salvar imagem')
            res.status(500).json({msg: 'Erro ao salvar imagem'});
                    
        }
    }

}

export default twilioController;

