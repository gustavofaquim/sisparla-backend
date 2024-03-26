import express from "express";
import {verificarToken} from '../middlewares/verificarToken.js';
import tipoEntidadeController from "../controllers/tipoEntidadeController.js";

const router = express.Router();

router
    .route("/tiposEntidade")
    .get(verificarToken,(req,res) => tipoEntidadeController.findAll(req,res));

export default router;