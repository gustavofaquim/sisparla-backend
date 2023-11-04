import express from "express";

const router = express.Router();

import categoriaDemandaController from "../controllers/categoriaDemandaController.js";

router
    .route("/categorias-demandas")
    .get((req,res) => categoriaDemandaController.findAll(req,res));

export default router;