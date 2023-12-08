

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { url } from 'inspector';

import apoiadorController from './apoiadorController.js';



const mensagemController = {

    send: async (req, res) => {
        try {
            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
    
            const client = twilio(accountSid, authToken);
    
            const msg = req.body?.texto;
            const apoiadores = JSON.parse(req.body?.apoiadores);
            const arquivos = req.files;
    
            if (!msg || !apoiadores || !arquivos) {
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            }
    
            const numerosApoiadores = apoiadores
                .map(apoiador => apoiador?.TelefoneApoiador?.Numero)
                .filter(numero => numero !== undefined)
                .map(numero => `whatsapp:+55${numero}`);
    
            const urls = arquivos.map(arquivo => arquivo.path);
    
            const mediaUrls = ['https://images.tcdn.com.br/img/img_prod/606732/produto_teste_3919_1_85010fa0e84b19ffcfe78386f6f702cd_20230523151158.jpg'];
    
            const message = await client.messages.create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                mediaUrl: mediaUrls
            });
    
            console.log(`Mensagem enviada para ${numerosApoiadores}`);
    
            urls.forEach(url => {
                fs.unlinkSync(url);
            });
    
            return res.status(200).json({ success: true, sid: message.sid });
        } catch (error) {
            console.error(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json({ success: false, error: 'Houve um erro ao enviar a mensagem', details: error.message });
        }
    },


    send2: async(req,res) => {

        try {
            
            const key = process.env.WhatsGW_Key;

            const msg = req.body?.texto;
            const apoiadores = JSON.parse(req.body?.apoiadores);
            const arquivos = req.files;
    
            if (!msg || !apoiadores || !arquivos) {
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            }
    
            const numerosApoiadores = apoiadores
                .map(apoiador => apoiador?.TelefoneApoiador?.Numero)
                .filter(numero => numero !== undefined)
                .map(numero => `whatsapp:+55${numero}`);
            
            
            const apiUrl = 'https://app.whatsgw.com.br/api/WhatsGw/Send/';
            const apiKey = '6E3F58D5-8784-45F3-B436-YOWAPIKEY';
            const phoneNumber = '5562996828796';
           // const contactPhoneNumber = '551199999999';
            const messageCustomId = 'teste';
            const messageType = 'text';
            const messageBody = 'Fazendo um teste WhatsGW \n*negrito*\n~tachado~\n```Monoespaçado```\n😜"';
    
            const parameters = new URLSearchParams();
            parameters.append('apikey', apiKey);
            parameters.append('phone_number', phoneNumber);
            parameters.append('contact_phone_number', numerosApoiadores);
            parameters.append('message_custom_id', messageCustomId);
            parameters.append('message_type', messageType);
            parameters.append('message_body', messageBody);
            // Adicione outros parâmetros conforme necessário
    
            const response = await axios.post(apiUrl, parameters);
    
            console.log('Resposta da API WhatsGW:', response.data);
    
            // Faça o que for necessário com a resposta da API"

            return res.status(200).json({ success: true, response: response.data });

        } catch (error) {
            console.error('Erro ao enviar mensagem via API WhatsGW:', error.message);
            return res.status(500).json({ success: false, error: 'Erro ao enviar mensagem via API WhatsGW', details: error.message });
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

            console.log(numerosApoiadores)

            /*const urls = arquivos.map(arquivo => {

                return arquivo.path
            })*/

            const mediaUrls = ['https://images.tcdn.com.br/img/img_prod/606732/produto_teste_3919_1_85010fa0e84b19ffcfe78386f6f702cd_20230523151158.jpg'];
            return
            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: [numerosApoiadores], // Número do destinatário
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

