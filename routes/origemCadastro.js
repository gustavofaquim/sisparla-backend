import express from 'express';
import {verificarPermissao, verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import origemCadastroController from '../controllers/origemCadastroController.js';

router
    .route("/origens")
    .get(verificarToken, (req,res) => origemCadastroController.findAll(req,res));


router
    .route("/origem")
    .post(verificarToken, (req,res) => origemCadastroController.create(req,res));

router
    .route("/origem/:id")
    .get(verificarToken, (req,res) => origemCadastroController.findById(req,res));

router
    .route("/origem/:id")
    .delete(verificarToken, (req,res) => origemCadastroController.deleteById(req,res));

    
export default router;
