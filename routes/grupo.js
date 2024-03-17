import express from "express";
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();

import grupoController from "../controllers/grupoController.js";

router
    .route("/grupos")
    .get(verificarToken,(req,res) => grupoController.findAll(req,res));

export default router;