import express from "express";
import verificarToken from '../middlewares/verificarToken.js';
import estadoController from "../controllers/estadoController.js";

const router = express.Router();

router
    .route("/estados")
    .get(verificarToken,(req,res) => estadoController.findAll(req,res));

export default router;