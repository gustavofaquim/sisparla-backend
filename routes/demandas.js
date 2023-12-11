import express from 'express';

const router = express.Router();


import demandaController from '../controllers/demandaController.js';

router
    .route("/demandas")
    .get((req,res) => demandaController.findAll(req,res));

router
    .route("/userDemands/:id")
    .get((req,res) => demandaController.userDemands(req,res));

router
    .route("/view-demandas")
    .get((req,res) => demandaController.viewDemandas(req,res));

router
    .route("/demandas")
    .post((req,res) => demandaController.create(req,res));

router
    .route("/demandas/:id")
    .get((req,res) => demandaController.findById(req,res));

router
    .route("/demandas/:id")
    .put((req,res) => demandaController.updateById(req,res));

router
    .route("/muda-situacao-demanda/:id")
    .put((req,res) => demandaController.updateSituacaoById(req,res));

router
    .route("/demandas/:id")
    .delete((req,res) => demandaController.deleteById(req,res));
    
export default router;
