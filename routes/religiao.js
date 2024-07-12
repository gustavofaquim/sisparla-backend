import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();

import religiaoController from '../controllers/religiaoController.js';

router
    .route("/religioes")
    .get((req,res) => religiaoController.findAll(req,res));

router
    .route("/religiao/:id")
    .get(verificarToken,verificarPermissao(['Criar']),(req,res) => religiaoController.findById(req,res));

router
    .route("/religiao")
    .post(verificarToken,verificarPermissao(['Criar']),(req,res) => religiaoController.create(req,res));

router
    .route("/religiao/:id")
    .delete(verificarToken,verificarPermissao('Deletar'), (req,res) => religiaoController.deleteById(req,res));

export default router;

