import express from 'express';

const router = express.Router();


import situacaoCadastroController from '../controllers/situacaoController.js';

router
    .route("/situacoesCadastros")
    .get((req,res) => situacaoCadastroController.findAll(req,res));


export default router;