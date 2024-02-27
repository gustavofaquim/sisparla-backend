import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();


import enderecoController from '../controllers/enderecoController.js';


router
    .route("/enderecos")
    .get(verificarToken,(req,res)=> enderecoController.findAll(req,res));


router
    .route("/enderecos")
    .post(verificarToken,(req,res) => enderecoController.create(req,res));


router
    .route("/enderecos/:id")
    .put(verificarToken, (req,res) => enderecoController.updateById(req,res));

export default router;