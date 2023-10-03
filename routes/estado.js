import express from "express";

import estadoController from "../controllers/estadoController.js";

const router = express.Router();

router
    .route("/estados")
    .get((req,res) => estadoController.findAll(req,res));

export default router;