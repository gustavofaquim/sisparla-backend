import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

import profissaoController from '../controllers/profissaoController.js';

const router = express.Router();

router
    .route("/profissoes")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => profissaoController.findAll(req,res));

router
    .route("/lista-profissoes/")
    .get((req,res) => profissaoController.findByList(req,res));
    
    
router
    .route("/profissoes-total")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => profissaoController.countFindAll(req,res));    

router
    .route("/profissao/:id")
    .get(verificarToken,verificarPermissao('Vizualizar'),(req,res) => profissaoController.findById(req,res));

router
    .route("/profissao")
    .post(verificarToken,verificarPermissao('Criar'), (req,res) => profissaoController.create(req,res));

router
    .route("/profissao/:id")
    .put(verificarToken,verificarPermissao('Atualizar'),(req,res) => profissaoController.updateById(req,res));

    router
    .route("/profissao/:id")
    .delete(verificarToken,verificarPermissao('Deletar'), (req,res) => profissaoController.deleteById(req,res));


export default router;