import express from "express";
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();

import situacaoDemandaController from "../controllers/situacaoDemandaController.js";

router
    .route("/situacao-demandas")
    .get(verificarToken,(req,res) => situacaoDemandaController.findAll(req,res));


export default router;