import express from 'express';

const router = express.Router();

import cidadeController from '../controllers/cidadeController.js';


router
    .route("/cidade")
    .get((req,res) => cidadeController.findById(req,res));

export default router;