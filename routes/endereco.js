import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import enderecoController from '../controllers/enderecoController.js';


router
    .route("/enderecos")
    .get(verificarToken,verificarPermissao(['Vizualizar', 'Criar'], ['apoiadores']),(req,res)=> enderecoController.findAll(req,res));


router
    .route("/enderecos")
    .post(verificarToken,verificarPermissao(['Criar'], ['apoiadores']),(req,res) => enderecoController.create(req,res));


router
    .route("/enderecos/:id")
    .put(verificarToken, verificarPermissao(['Atualizar'], ['apoiadores']),(req,res) => enderecoController.updateById(req,res));

export default router;