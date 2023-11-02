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
    .route("/aniversariantes")
    .get((req,res) => apoiadorController.findByBirthday(req,res));



router
    .route("/apoiadores/:id")
    .delete((req,res) => apoiadorController.deleteById(req,res));


router
    .route("/apoiadores")
    .post((req,res) => apoiadorController.create(req,res));


router
    .route("/apoiadores/:id")
    .put((req,res) => apoiadorController.updateById(req,res));



export default router;