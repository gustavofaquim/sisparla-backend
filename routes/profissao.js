import express from "express";
import {verificarToken} from '../middlewares/verificarToken.js';

import profissaoController from '../controllers/profissaoController.js';

const router = express.Router();

router
    .route("/profissoes")
    .get(verificarToken,(req,res) => profissaoController.findAll(req,res));

router
    .route("/profissoes-total")
    .get(verificarToken,(req,res) => profissaoController.countFindAll(req,res));    

router
    .route("/profissao/:id")
    .get(verificarToken,(req,res) => profissaoController.findById(req,res));

router
    .route("/profissao")
    .post(verificarToken, (req,res) => profissaoController.create(req,res));

router
    .route("/profissao/:id")
    .put(verificarToken,(req,res) => profissaoController.updateById(req,res));

    router
    .route("/profissao/:id")
    .delete(verificarToken, (req,res) => profissaoController.deleteById(req,res));


export default router;