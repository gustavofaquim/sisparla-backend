import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import doacaoController from '../controllers/doacaoController.js';


router
    .route("/doacao")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['despesas']), (req,res) => doacaoController.findAll(req,res));

    
export default router;