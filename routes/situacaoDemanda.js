import express from "express";

const router = express.Router();

import situacaoDemandaController from "../controllers/situacaoDemandaController.js";

router
    .route("/situacao-demandas")
    .get((req,res) => situacaoDemandaController.findAll(req,res));


export default router;