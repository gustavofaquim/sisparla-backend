import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();

import eventoController from '../controllers/eventoController.js';

router
    .route("/eventos")
    .get(verificarToken, (req, res) => eventoController.findAll(req,res));

router 
    .route("/eventos/:id")
    .get(verificarToken,(req,res) => eventoController.findById(req,res));

router 
    .route("/eventos-do-dia")
    .get(verificarToken,(req,res) => eventoController.findEventsDay(req,res));

router 
    .route("/eventos")
    .post(verificarToken,(req,res) => eventoController.create(req,res));


router 
    .route("/eventos/:id")
    .put(verificarToken,(req,res) => eventoController.updateById(req,res));

router 
    .route("/evento/:id")
    .delete(verificarToken,(req,res) => eventoController.deleteById(req,res));

    
export default router;