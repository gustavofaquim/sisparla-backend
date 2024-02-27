import express from 'express';

import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();


import partidoController from "../controllers/partidoController.js";

router
    .route("/partidos")
    .get(verificarToken, (req,res) => partidoController.findAll(req,res));


export default router;