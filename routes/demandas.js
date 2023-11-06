import express from 'express';

const router = express.Router();


import demandaController from '../controllers/demandaController.js';

router
    .route("/demandas")
    .get((req,res) => demandaController.findAll(req,res));

router
    .route("/demandas")
    .post((req,res) => demandaController.create(req,res));

router
    .route("/demandas/:id")
    .get((req,res) => demandaController.findById(req,res));

router
    .route("/demandas/:id")
    .put((req,res) => apoiadorController.updateById(req,res));

    
export default router;
