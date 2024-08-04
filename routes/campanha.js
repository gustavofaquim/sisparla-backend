import express from 'express';
import {verificarToken,verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import campanhaController from '../controllers/campanhaController.js';

router
    .route("/lista-campanhas")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']), (req,res) => campanhaController.findList(req,res));


export default router;