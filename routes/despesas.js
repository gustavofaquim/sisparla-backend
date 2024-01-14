import express from 'express';

const router = express.Router();

import despesaController from '../controllers/despesaController.js';

router
    .route("/despesas")
    .get((req,res) => despesaController.findAll(req,res));





export default router;