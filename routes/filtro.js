import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import filtrosController from '../controllers/filtrosController.js';


router
    .route("/filtros")
    .get(verificarToken,(req,res) => filtrosController.filtrosApoiadores(req,res));

export default router;