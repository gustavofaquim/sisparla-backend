import express from 'express';
import {verificarPermissao, verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import origemCadastroController from '../controllers/origemCadastroController.js';

router
    .route("/origens")
    .get(verificarToken,verificarPermissao('Vizualizar'), (req,res) => origemCadastroController.findAll(req,res));


router
    .route("/origem")
    .post(verificarToken, verificarPermissao('Criar'),(req,res) => origemCadastroController.create(req,res));

router
    .route("/origem/:id")
    .get(verificarToken, verificarPermissao('Vizualizar'),(req,res) => origemCadastroController.findById(req,res));

router
    .route("/origem/:id")
    .delete(verificarToken, verificarPermissao('Deletar'),(req,res) => origemCadastroController.deleteById(req,res));

    
export default router;
