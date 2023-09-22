import express from 'express';

const router = express.Router();

import apoiadorController from '../controllers/apoiadorController.js';


router
    .route("/apoiadores")
    .get((req,res) => apoiadorController.findAll(req,res));

router
    .route("/apoiadores/:id")
    .get((req,res) => apoiadorController.findById(req,res));


router
    .route("/apoiadores/:id")
    .delete((req,res) => apoiadorController.deleteById(req,res));



export default router;