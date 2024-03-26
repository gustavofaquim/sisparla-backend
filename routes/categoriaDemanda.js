import express from "express";
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();

import categoriaDemandaController from "../controllers/categoriaDemandaController.js";

router
    .route("/categorias-demandas")
    .get(verificarToken,(req,res) => categoriaDemandaController.findAll(req,res));

export default router;