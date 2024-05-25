import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import enderecoController from '../controllers/enderecoController.js';


router
    .route("/enderecos")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res)=> enderecoController.findAll(req,res));


router
    .route("/enderecos")
    .post(verificarToken,verificarPermissao('Criar'),(req,res) => enderecoController.create(req,res));


router
    .route("/enderecos/:id")
    .put(verificarToken, verificarPermissao('Atualizar'),(req,res) => enderecoController.updateById(req,res));

export default router;