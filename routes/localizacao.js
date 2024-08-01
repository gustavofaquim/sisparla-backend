import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import localizacaoController from "../controllers/LocalizacaoController.js";


router
    .route("/localizacao/:id")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['apoiadores']),(req,res) => localizacaoController.find(req,res));



    export default router;