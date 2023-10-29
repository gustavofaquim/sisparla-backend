import express from 'express';

const router = express.Router();


import partidoController from "../controllers/partidoController.js";

router
    .route("/partidos")
    .get((req,res) => partidoController.findAll(req,res));


export default router;