import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
const router = express.Router();


import dashboardController from '../controllers/dashboardController.js';


router 
    .route("/faixa-etaria")
    .get(verificarToken,  verificarPermissao('Vizualizar'),(req,res) => dashboardController.ageRange(req,res));

router 
    .route("/cidades-apoiadores")
    .get(verificarToken,  verificarPermissao('Vizualizar'),(req,res) => dashboardController.distributionCity(req,res));

    
export default router;