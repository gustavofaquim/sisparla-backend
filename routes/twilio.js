import express from 'express';
import multer from 'multer';
import twilioController from '../controllers/twilioController.js';





const router = express.Router();

// Configuração do Multer para aceitar uploads de arquivos
const storage = multer.memoryStorage(); // Armazenar os arquivos na memória como buffers
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Define o tamanho máximo do arquivo em bytes (aqui é 10 MB)
    },
});
  

router
    .route("/send")
    .post(upload.array('arquivos', 5), (req, res) => twilioController.send(req, res));

export default router;
