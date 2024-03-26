import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();

import filtrosController from '../controllers/filtrosController.js';


router
    .route("/filtros")
    .get(verificarToken,(req,res) => filtrosController.cidadeAndProfissao(req,res));

export default router;