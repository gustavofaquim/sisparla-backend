import express from 'express';

const router = express.Router();

import despesaController from '../controllers/despesaController.js';
import tipoDespesaController from '../controllers/tipoDespesa.js';
import origemDespesaController from "../controllers/origemDespesa.js";
import credorController from '../controllers/credorController.js';

router
    .route("/despesas")
    .get((req,res) => despesaController.findAll(req,res));


router
    .route("/despesas/:id")
    .get((req,res) => despesaController.findById(req,res));

router
    .route("/despesa")
    .post((req,res) => despesaController.create(req,res));

router
    .route("/tipos-despesas")
    .get((req,res) => tipoDespesaController.findAll(req,res));


router
    .route("/origens-despesas")
    .get((req,res) => origemDespesaController.findAll(req,res));

router
    .route("/credores")
    .get((req,res) => credorController.findAll(req,res));

router
    .route("/credor")
    .post((req,res) => credorController.create(req,res));

export default router;