import express from 'express';

const router = express.Router();

import despesaController from '../controllers/despesaController.js';
import tipoDespesaController from '../controllers/tipoDespesa.js';
import origemDespesaController from "../controllers/origemDespesa.js";
import pessoaFisicaJuridicaController from '../controllers/pessoaJuridicaFisicaController.js';

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
    .route("/pessoas-despesas")
    .get((req,res) => pessoaFisicaJuridicaController.findAll(req,res));

export default router;