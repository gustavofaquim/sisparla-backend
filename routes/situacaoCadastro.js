import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();


import situacaoCadastroController from '../controllers/situacaoController.js';

router
    .route("/situacoesCadastros")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => situacaoCadastroController.findAll(req,res));


export default router;