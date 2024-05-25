import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();


import classificacaoController from '../controllers/classificacaoController.js';


router 
    .route("/classificacoes")
    .get(verificarToken,  verificarPermissao('Vizualizar'),(req,res) => classificacaoController.findAll(req,res));

    
export default router;