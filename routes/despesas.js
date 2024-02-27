import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();

import despesaController from '../controllers/despesaController.js';
import tipoDespesaController from '../controllers/tipoDespesa.js';
import origemDespesaController from "../controllers/origemDespesa.js";
import credorController from '../controllers/credorController.js';

router
    .route("/despesas")
    .get(verificarToken,(req,res) => despesaController.findAll(req,res));

router
    .route("/despesas/:id")
    .get(verificarToken,(req,res) => despesaController.findById(req,res));

router
    .route("/despesa")
    .post(verificarToken,(req,res) => despesaController.create(req,res));

router
    .route("/despesa/:id")
    .put(verificarToken,(req,res) => despesaController.updateById(req,res));

router
    .route("/despesa/:id")
    .delete(verificarToken,(req,res) => despesaController.deleteByid(req,res));

router
    .route("/tipos-despesas")
    .get(verificarToken,(req,res) => tipoDespesaController.findAll(req,res));


router
    .route("/origens-despesas")
    .get(verificarToken,(req,res) => origemDespesaController.findAll(req,res));


router
    .route("/credores")
    .get(verificarToken,(req,res) => credorController.findAll(req,res));

router
    .route("/credor")
    .post(verificarToken,(req,res) => credorController.create(req,res));

router
    .route("/credor/:id")
    .get(verificarToken,(req,res) => credorController.findById(req,res));


router
    .route("/credor/:id")
    .put(verificarToken,(req,res) => credorController.updateById(req,res));

router
    .route("/credor/:id")
    .delete(verificarToken,(req,res) => credorController.deleteByid(req,res));



export default router;