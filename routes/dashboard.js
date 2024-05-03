import express from 'express';
import {verificarToken} from '../middlewares/verificarToken.js';
const router = express.Router();


import dashboardController from '../controllers/dashboardController.js';


router 
    .route("/faixa-etaria")
    .get(verificarToken,(req,res) => dashboardController.ageRange(req,res));

router 
    .route("/cidades-apoiadores")
    .get(verificarToken,(req,res) => dashboardController.distributionCity(req,res));

    
export default router;