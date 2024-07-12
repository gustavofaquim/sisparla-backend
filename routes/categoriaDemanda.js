import express from "express";
import {verificarToken,  verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import categoriaDemandaController from "../controllers/categoriaDemandaController.js";

router
    .route("/categorias-demandas")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['demandas']),(req,res) => categoriaDemandaController.findAll(req,res));

export default router;