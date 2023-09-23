import express from 'express';

const router = express.Router();


import enderecoController from '../controllers/enderecoController.js';


router
    .route("/enderecos")
    .get((req,res)=> enderecoController.findAll(req,res));


router
    .route("/enderecos")
    .post((req,res) => enderecoController.create(req,res));

export default router;