import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
import estadoController from "../controllers/estadoController.js";

const router = express.Router();

router
    .route("/estados")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => estadoController.findAll(req,res));

export default router;