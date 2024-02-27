import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';
const router = express.Router();

import entidadeController from '../controllers/entidadeController.js';

router
    .route("/entidades")
    .get(verificarToken,(req,res) => entidadeController.findAll(req,res));


router
    .route("/entidades/:id")
    .get(verificarToken,(req,res) => entidadeController.findByType(req,res))


router
    .route("/entidadesn/:id")
    .get(verificarToken,(req,res) => entidadeController.findByNot(req,res))   
    
    
export default router