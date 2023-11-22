

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

    BirthDayMessages: async() => {

        // Envia mensagem para os aniversariantes do dia
        try {
            console.log('Entrou na função de aniversário');
           const aniversariantesDia =  await apoiadorController.findByDayBirthday();
           
           if(aniversariantesDia){

            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
    
            const client = twilio(accountSid, authToken);
    
            const msg = 'Feliz aniversário, espero que tudo dê muito certo. É isso ai :) ';
            const apoiadores = await  apoiadorController.findByDayBirthday();

           

           // const arquivos = req.files;

            const numerosApoiadores = apoiadores.map(apoiador => {
                if (!(apoiador?.TelefoneApoiador?.Numero)) {
                    console.log('Número não informado');
                    return undefined;
                }
            
                let apoiadorNumero = apoiador?.TelefoneApoiador?.Numero;
                return `whatsapp:+55${apoiadorNumero}`
            }).filter(numero => numero !== undefined);

            /*const urls = arquivos.map(arquivo => {

                return arquivo.path
            })*/

            const mediaUrls = ['https://cdn.awsli.com.br/600x450/2371/2371577/produto/152944414/d196c59442.jpg'];

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
                
                return message.sid;
            })
            .catch(err => {
                console.error(`Erro ao enviar mensagem para ${numerosApoiadores}: ${err}`);
                return 'Houve um erro ao enviar a mensagem';
            });

           }
           
            
        } catch (error) {
            console.log(`Houve um erro ao enviar a mensagem: ${error}`);
            return 'Houve um erro ao enviar a mensagem';
        }

    }
}

export default mensagemController;

