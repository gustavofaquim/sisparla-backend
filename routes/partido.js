import express from 'express';

import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import partidoController from "../controllers/partidoController.js";

router
    .route("/partidos")
    .get(verificarToken,verificarPermissao('Vizualizar'), (req,res) => partidoController.findAll(req,res));


export default router;