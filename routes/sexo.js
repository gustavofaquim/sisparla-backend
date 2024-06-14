import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import sexoController from '../controllers/sexoController.js';

router
    .route("/sexos")
    .get((req,res) => sexoController.findAll(req,res));

export default router;

