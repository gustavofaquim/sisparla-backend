import express from 'express';

const router = express.Router();

import religiaoController from '../controllers/religiaoController.js';

router
    .route("/religioes")
    .get((req,res) => religiaoController.findAll(req,res));

export default router;

