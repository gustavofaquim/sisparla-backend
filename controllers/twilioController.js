

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
          
            
            const teste = await twilioController.saveImage(arquivos);
            console.log(teste);
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


    saveImage: async(arquivos) => {

        try {
            
            // Verifique se há um arquivo de imagem na requisição
            if (!arquivos) {
                return res.status(400).send('Nenhuma imagem enviada');
            }


            // Caminho para a pasta onde você deseja salvar as imagens
            const pastaDestino = 'public/images';

            // Garanta que a pasta exista, se não, crie-a
            if (!fs.existsSync(pastaDestino)) {
                fs.mkdirSync(pastaDestino, { recursive: true });
            }

            // Caminho completo do arquivo no servidor
            const caminhoArquivo = path.join(pastaDestino, arquivos.filename);

            // Mova o arquivo para a pasta de destino
            fs.renameSync(req.file.path, caminhoArquivo);


            res.send('Imagem salva com sucesso!');

        }catch (error) {
            console.error('Erro ao salvar a imagem:', error);
            es.status(500).send('Erro interno do servidor');
        }

    }
}

export default twilioController;

