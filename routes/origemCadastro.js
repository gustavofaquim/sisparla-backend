import express from 'express';
import {verificarPermissao, verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import origemCadastroController from '../controllers/origemCadastroController.js';

router
    .route("/origens")
    .get(verificarToken, (req,res) => origemCadastroController.findAll(req,res));

export default router;
