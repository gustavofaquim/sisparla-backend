

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { url } from 'inspector';

import apoiadorController from './apoiadorController.js';



const mensagemController = {

    send: async(req,res) => {
        
        try {
            
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
    
            const client = twilio(accountSid, authToken);
    

            const msg = req.body.texto;
            const apoiadores = JSON.parse(req.body?.apoiadores);
            const arquivos = req.files;
            
    
            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = apoiador?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`
            }).filter(numero => numero !== undefined);

            const urls = arquivos.map(arquivo => {

                return arquivo.path
            })

 
            //const mediaUrls = [urls];
            const mediaUrls = ['link'];
            

            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                //mediaUrl: urls
                mediaUrl: mediaUrls
            })
            .then(message => {
                console.log(`Mensagem enviada para ${numerosApoiadores}`);
                
                urls.forEach(url => {
                    fs.unlinkSync(url);
                });
                
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

    BirthDayMessages: async(req,res) => {

        // Envia mensagem para os aniversariantes do dia
        try {
            console.log('Entrou na função de aniversário');
           const aniversariantesDia =  await apoiadorController.findByDayBirthday();
           
           if(aniversariantesDia){

            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
    
            const client = twilio(accountSid, authToken);
    

            const msg = req.body.texto;
            const apoiadores = JSON.parse(req.body?.apoiadores);
            const arquivos = req.files;

            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = aniversariantesDia?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`
            }).filter(numero => numero !== undefined);

            const urls = arquivos.map(arquivo => {

                return arquivo.path
            })

            const mediaUrls = ['link'];

            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                //mediaUrl: urls
                mediaUrl: mediaUrls
            })
            .then(message => {
                console.log(`Mensagem enviada para ${numerosApoiadores}`);
                
                urls.forEach(url => {
                    fs.unlinkSync(url);
                });
                
                return res.status(200).json(message.sid);
            })
            .catch(err => {
                console.error(`Erro ao enviar mensagem para ${numerosApoiadores}: ${err}`);
                return res.status(500).json('Houve um erro ao enviar a mensagem');
            });

           }
           
            
        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json('Houve um erro ao enviar a mensagem');
        }

    }
}

export default mensagemController;

