import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';

const router = express.Router();


import demandaController from '../controllers/demandaController.js';

router
    .route("/demandas")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['demandas']),(req,res) => demandaController.findAll(req,res));

router
    .route("/userDemands/:id")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['demandas']),(req,res) => demandaController.userDemands(req,res));

router
    .route("/view-demandas")
    .get(verificarToken, verificarPermissao('Emitir Relatório'),(req,res) => demandaController.viewDemandas(req,res));

router
    .route("/count-demandas")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['indicadores']),(req,res) => demandaController.countDemandas(req,res));

router
    .route("/demandas")
    .post(verificarToken, verificarPermissao(['Criar'], ['demandas']),(req,res) => demandaController.create(req,res));

router
    .route("/demandas/:id")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['demandas']),(req,res) => demandaController.findById(req,res));

router
    .route("/demandas/:id")
    .put(verificarToken, verificarPermissao(['Atualizar'], ['demandas']),(req,res) => demandaController.updateById(req,res));

router
    .route("/muda-situacao-demanda/:id")
    .put(verificarToken, verificarPermissao(['Atualizar'], ['demandas']),(req,res) => demandaController.updateSituacaoById(req,res));

router
    .route("/demandas/:id")
    .delete(verificarToken, verificarPermissao(['Deletar'], ['demandas']),(req,res) => demandaController.deleteById(req,res));
    
export default router;
