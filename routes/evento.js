import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();

import eventoController from '../controllers/eventoController.js';

router
    .route("/eventos")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['eventos']), (req, res) => eventoController.findAll(req,res));


router
    .route("/count-eventos")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['indicadores']), (req, res) => eventoController.countEventos(req,res));

router 
    .route("/eventos/:id")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['eventos']),(req,res) => eventoController.findById(req,res));

router 
    .route("/eventos-do-dia")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['eventos']),(req,res) => eventoController.findEventsDay(req,res));

router 
    .route("/eventos")
    .post(verificarToken,verificarPermissao(['Criar'], ['eventos']),(req,res) => eventoController.create(req,res));


router 
    .route("/eventos/:id")
    .put(verificarToken,verificarPermissao(['Atualizar'], ['eventos']),(req,res) => eventoController.updateById(req,res));

router 
    .route("/evento/:id")
    .delete(verificarToken,verificarPermissao(['Deletar'], ['eventos']),(req,res) => eventoController.deleteById(req,res));

    
export default router;