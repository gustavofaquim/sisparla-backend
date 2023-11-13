import express from 'express';

const router = express.Router();

import eventoController from '../controllers/eventoController.js';

router
    .route("/eventos")
    .get((req, res) => eventoController.findAll(req,res));

router 
    .route("/eventos/:id")
    .get((req,res) => eventoController.findById(req,res));

 
router 
    .route("/eventos")
    .post((req,res) => eventoController.create(req,res));


router 
    .route("/eventos/:id")
    .put((req,res) => eventoController.updateById(req,res));

    
export default router;