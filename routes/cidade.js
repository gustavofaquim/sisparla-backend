import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';

const router = express.Router();

import cidadeController from '../controllers/cidadeController.js';


router
    .route("/cidade")
    .get(verificarToken,(req,res) => cidadeController.findById(req,res));

export default router;