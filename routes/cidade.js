import express from 'express';
import {verificarToken,verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import cidadeController from '../controllers/cidadeController.js';


router
    .route("/cidade")
    .get(verificarToken, verificarPermissao(['Criar', 'Visualizar']),(req,res) => cidadeController.findById(req,res));

export default router;