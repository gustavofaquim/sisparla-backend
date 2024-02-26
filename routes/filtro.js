import express from 'express';

const router = express.Router();

import filtrosController from '../controllers/filtrosController.js';


router
    .route("/filtros")
    .get((req,res) => filtrosController.cidadeAndProfissao(req,res));

export default router;