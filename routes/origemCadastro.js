import express from 'express';
import {verificarPermissao, verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import origemCadastroController from '../controllers/origemCadastroController.js';

router
    .route("/origens")
    .get(verificarToken,(req,res) => origemCadastroController.findAll(req,res));


router
    .route("/origem")
    .post(verificarToken, verificarPermissao(['Criar'], ['origens']),(req,res) => origemCadastroController.create(req,res));

router
    .route("/origem/:id")
    .get(verificarToken, verificarPermissao(['Visualizar', 'Criar'], ['origens']),(req,res) => origemCadastroController.findById(req,res));

router
    .route("/origem/:id")
    .delete(verificarToken, verificarPermissao(['Deletar'], ['origens']),(req,res) => origemCadastroController.deleteById(req,res));

    
export default router;
