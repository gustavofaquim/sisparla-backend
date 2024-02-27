import express from "express";
import verificarToken from '../middlewares/verificarToken.js';

import profissaoController from '../controllers/profissaoController.js';

const router = express.Router();

router
    .route("/profissoes")
    .get(verificarToken,(req,res) => profissaoController.findAll(req,res));

export default router;