import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();

import religiaoController from '../controllers/religiaoController.js';

router
    .route("/religioes")
    .get(verificarToken,(req,res) => religiaoController.findAll(req,res));

router
    .route("/religiao/:id")
    .get(verificarToken,(req,res) => religiaoController.findById(req,res));

router
    .route("/religiao")
    .post(verificarToken,(req,res) => religiaoController.create(req,res));

router
    .route("/religiao/:id")
    .delete(verificarToken, (req,res) => religiaoController.deleteById(req,res));

export default router;

