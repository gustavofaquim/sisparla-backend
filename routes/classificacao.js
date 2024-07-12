import express from 'express';
const router = express.Router();


import classificacaoController from '../controllers/classificacaoController.js';


router 
    .route("/classificacoes")
    .get((req,res) => classificacaoController.findAll(req,res));

    
export default router;