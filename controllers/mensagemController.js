

import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { url } from 'inspector';



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
                return `whatsapp:+55${apoiadorNumero}`;
            }).filter(numero => numero !== undefined);;

            const urls = arquivos.map(arquivo => {

                return arquivo.path
            })
 
           
            client.messages
            .create({
                body: msg,
                from: 'whatsapp:+14155238886', // Número do Twilio (não seu número pessoal)
                to: numerosApoiadores, // Número do destinatário
                //mediaUrl: urls
                mediaUrl: ['https://i.ibb.co/k8FpdBJ/Whats-App-Image-2023-11-15-at-09-15-28.jpg', 'https://i.ibb.co/2gC4JZk/Captura-de-tela-de-2023-07-16-19-46-26.png'],
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

export default mensagemController;

