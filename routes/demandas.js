import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();


import demandaController from '../controllers/demandaController.js';

router
    .route("/demandas")
    .get(verificarToken,(req,res) => demandaController.findAll(req,res));

router
    .route("/userDemands/:id")
    .get(verificarToken,(req,res) => demandaController.userDemands(req,res));

router
    .route("/view-demandas")
    .get(verificarToken,(req,res) => demandaController.viewDemandas(req,res));

router
    .route("/count-demandas")
    .get(verificarToken,(req,res) => demandaController.countDemandas(req,res));

router
    .route("/demandas")
    .post(verificarToken,(req,res) => demandaController.create(req,res));

router
    .route("/demandas/:id")
    .get(verificarToken,(req,res) => demandaController.findById(req,res));

router
    .route("/demandas/:id")
    .put(verificarToken,(req,res) => demandaController.updateById(req,res));

router
    .route("/muda-situacao-demanda/:id")
    .put(verificarToken,(req,res) => demandaController.updateSituacaoById(req,res));

router
    .route("/demandas/:id")
    .delete(verificarToken,(req,res) => demandaController.deleteById(req,res));
    
export default router;
