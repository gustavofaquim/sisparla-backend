import express from 'express';

import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import partidoController from "../controllers/partidoController.js";

router
    .route("/partidos")
    .get((req,res) => partidoController.findAll(req,res));


export default router;