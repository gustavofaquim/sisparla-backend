import express from 'express';

const router = express.Router();

import apoiadorController from '../controllers/apoiadorController.js';


router
    .route("/apoiadores")
    .get((req,res) => apoiadorController.findAll(req,res));



export default router;