import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();

import entidadeController from '../controllers/entidadeController.js';

router
    .route("/entidades")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => entidadeController.findAll(req,res));


router
    .route("/entidades/:id")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => entidadeController.findByType(req,res))


router
    .route("/entidadesn/:id")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => entidadeController.findByNot(req,res))   


router
    .route("/lista-entidades")
    .get((req,res) => entidadeController.findAll(req,res));
    
    
export default router