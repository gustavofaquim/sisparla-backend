import express from "express";
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();

import grupoController from "../controllers/grupoController.js";

router
    .route("/grupos")
    .get(verificarToken,(req,res) => grupoController.findAll(req,res));

router
    .route("/grupo")
    .post(verificarToken,(req,res) => grupoController.create(req,res));

router
    .route("/grupo/:id")
    .get(verificarToken,(req,res) => grupoController.findById(req,res));

router
    .route("/grupo/:id")
    .put(verificarToken,(req,res) => grupoController.updateById(req,res));

router
    .route("/grupo/:id")
    .delete(verificarToken,(req,res) => grupoController.deleteByid(req,res));

export default router;