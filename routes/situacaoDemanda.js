import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import situacaoDemandaController from "../controllers/situacaoDemandaController.js";

router
    .route("/situacao-demandas")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['demandas']),(req,res) => situacaoDemandaController.findAll(req,res));


export default router;