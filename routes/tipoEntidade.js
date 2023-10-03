import express from "express";

import tipoEntidadeController from "../controllers/tipoEntidadeController.js";

const router = express.Router();

router
    .route("/tiposEntidade")
    .get((req,res) => tipoEntidadeController.findAll(req,res));

export default router;