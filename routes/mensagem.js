import express from 'express';
import mensagemController from '../controllers/mensagemController.js';
import upload from "../config/multer.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

// Adicionando a configuração para servir arquivos estáticos
const staticPath = path.join(__dirname, '../medias');
router.use('/medias', express.static(staticPath));

router
    .route('/enviar')
    .post( (req,res) => mensagemController.enviar(req,res));

export default router;
