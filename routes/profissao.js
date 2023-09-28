import express from 'express';

import profissaoController from '../controllers/profissaoController.js';

const router = express.Router();

router
    .route("/profissoes")
    .get((req,res) => profissaoController.findAll(req,res));

export default router;