import express from "express";
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

import profissaoController from '../controllers/profissaoController.js';

const router = express.Router();

router
    .route("/profissoes")
    .get(verificarToken,verificarPermissao(['Visualizar','Criar'], ['profissoes', 'apoiadores']),(req,res) => profissaoController.findAll(req,res));

router
    .route("/lista-profissoes/")
    .get((req,res) => profissaoController.findByList(req,res));
    
    
router
    .route("/profissoes-total")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['profissoes']),(req,res) => profissaoController.countFindAll(req,res));    

router
    .route("/profissao/:id")
    .get(verificarToken,verificarPermissao(['Visualizar'], ['profissoes']),(req,res) => profissaoController.findById(req,res));

router
    .route("/profissao")
    .post(verificarToken,verificarPermissao(['Criar'], ['profissoes']), (req,res) => profissaoController.create(req,res));

router
    .route("/profissao/:id")
    .put(verificarToken,verificarPermissao(['Atualizar'], ['profissoes']),(req,res) => profissaoController.updateById(req,res));

    router
    .route("/profissao/:id")
    .delete(verificarToken,verificarPermissao(['Deletar'], ['profissoes']), (req,res) => profissaoController.deleteById(req,res));


export default router;