import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import situacaoCadastroController from '../controllers/situacaoController.js';

router
    .route("/situacoesCadastros")
    .get(verificarToken,(req,res) => situacaoCadastroController.findAll(req,res));


export default router;