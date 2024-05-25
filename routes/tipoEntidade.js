import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
import tipoEntidadeController from "../controllers/tipoEntidadeController.js";

const router = express.Router();

router
    .route("/tiposEntidade")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => tipoEntidadeController.findAll(req,res));

export default router;