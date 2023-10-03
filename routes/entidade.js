import express from 'express';

const router = express.Router();

import entidadeController from '../controllers/entidadeController.js';

router
    .route("/entidades")
    .get((req,res) => entidadeController.findAll(req,res));


router
    .route("/entidades/:id")
    .get((req,res) => entidadeController.findByType(req,res))


router
    .route("/entidadesn/:id")
    .get((req,res) => entidadeController.findByNot(req,res))   
    
    
export default router