import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import grupoController from "../controllers/grupoController.js";

router
    .route("/grupos")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => grupoController.findAll(req,res));

router
    .route("/grupo")
    .post(verificarToken,verificarPermissao('Criar'),(req,res) => grupoController.create(req,res));

router
    .route("/grupo/:id")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => grupoController.findById(req,res));

router
    .route("/grupo/:id")
    .put(verificarToken,verificarPermissao('Atualizar'),(req,res) => grupoController.updateById(req,res));

router
    .route("/grupo/:id")
    .delete(verificarToken,verificarPermissao('Deletar'),(req,res) => grupoController.deleteByid(req,res));

export default router;