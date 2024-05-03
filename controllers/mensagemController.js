

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import axios from 'axios';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { url } from 'inspector';

import apoiadorController from './apoiadorController.js';



const mensagemController = {

    enviar: async(req,res) => {
        try {
            
            
            const msg = req.body?.msg;
            const telefones = req.body?.telefones;
            const media = req.body?.media;
            
            if(!telefones){
                return res.status(500).json('Não foram informados telefones para o envio de mensagens.');
            }
            if(!msg){
                return res.status(500).json('Não foram informados mensagens para serem enviadas.');
            }


            const user_token_id = process.env.USER_TOKEN_ID;
            const instance_id = process.env.INSTANCE_ID;
            const instance_token = process.env.instance_token
            const api_url = "https://api.gzappy.com/v1/message/send-media";
            
            const headers = {
                'Content-Type': 'application/json',
                'user_token_id': user_token_id
            }

            const body = {
                instance_id: instance_id,
                instance_token: instance_token,
                message: msg,
                phone: telefones,
                mediaUrl: media,
            }

           const response = await fetch(api_url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            return res.status(200).json(`Mensagem enviada com sucesso para ${telefones.length} contatos`)

        } catch (error) {
            console.error(`Houve um erro ao enviar a mensagem: ${error}`);
            return res.status(500).json('Houve um erro ao enviar a mensagem');
        }

    },

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

    sendImagem: async() => {

        try {
            

            //const apiUrl = 'https://app.whatsgw.com.br/api/WhatsGw/Send';
            const apiKey = '457ea5cb-7bcb-47f1-a3b3-a92124fb3e72';
            const phoneNumber = '5562996828796'; // Numero de onde a mensagem vai partir


            const messageCustomId = '';
            const messageType = 'image';
            const check_status = "1";
            
            const message_body_mimetype = "image/jpeg"; // Formato da imagem
            const message_body_filename = "file.jpg";  // Nome do arquivo

            const message_caption  = "" ; //Texto da legenda

            // Imagem em base64
            const message_body = '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'; 
            //Arquivo em base64


            // Busca os aniversariantes do dia no banco de dados
            const aniversariantesDia =  await apoiadorController.findByDayBirthday();
            
            if(aniversariantesDia){
                const numerosApoiadores = aniversariantesDia.map(apoiador => {
                    if (!(apoiador?.TelefoneApoiador?.[0]?.Numero)) {
                        console.log('Número não informado');
                        return undefined;
                    }
                
                    let apoiadorNumero = apoiador?.TelefoneApoiador?.[0]?.Numero;
                    return `55${apoiadorNumero}`
                   
                }).filter(numero => numero !== undefined);

                //console.log(numerosApoiadores)


                const parameters = new URLSearchParams();
                parameters.append('apikey', apiKey);
                parameters.append('phone_number', phoneNumber);
                parameters.append('contact_phone_number', numerosApoiadores);
                parameters.append('message_custom_id', messageCustomId);
                parameters.append('check_status', check_status);
                parameters.append('message_body_mimetype', message_body_mimetype);
                parameters.append('message_body_filename', message_body_filename);
                parameters.append('message_type', messageType);
                parameters.append('message_caption', message_caption);
                parameters.append('message_body', message_body);
                // Adicione outros parâmetros conforme necessário

               // const response = await axios.post(apiUrl, parameters);
    
                console.log('Resposta da API WhatsGW:', response.data);

                
                // Faça o que for necessário com a resposta da API"
                return ({ success: true, response: response.data });
            
            }
            else{
                return ({satisfies: false, response: 'Aniversariantes não encontrados'});
            }

            

            

           // const key = process.env.WhatsGW_Key;

            //const msg = req.body?.texto;
            //const apoiadores = JSON.parse(req.body?.apoiadores);
            //const apoiadores = '629111111111';
            //const arquivos = req.files;
    
            /*if (!msg || !apoiadores || !arquivos) {
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            }*/


        
           /* const numerosApoiadores = apoiadores
                .map(apoiador => apoiador?.TelefoneApoiador?.Numero)
                .filter(numero => numero !== undefined)
                .map(numero => `whatsapp:+55${numero}`);
            */

           // const numerosApoiadores = '5562996828796'
            
    
            
           // const contactPhoneNumber = '551199999999';
            

        } catch (error) {
            console.error('Erro ao enviar mensagem via API WhatsGW:', error.message);
            return ({ success: false, error: 'Erro ao enviar mensagem via API WhatsGW', details: error.message });
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

