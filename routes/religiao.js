import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();

import religiaoController from '../controllers/religiaoController.js';

router
    .route("/religioes")
    .get(verificarToken,(req,res) => religiaoController.findAll(req,res));

export default router;

