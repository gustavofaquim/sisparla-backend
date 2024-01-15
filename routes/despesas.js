import express from 'express';

const router = express.Router();

import despesaController from '../controllers/despesaController.js';

router
    .route("/despesas")
    .get((req,res) => despesaController.findAll(req,res));


router
    .route("/despesas/:id")
    .get((req,res) => despesaController.findById(req,res));


export default router;