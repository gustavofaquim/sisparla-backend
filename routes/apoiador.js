import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';
import apoiadorController from '../controllers/apoiadorController.js';


const router = express.Router();




router
    .route("/apoiadores")
    .get(verificarToken, (req,res) => apoiadorController.findAll(req,res));


router
    .route("/view-apoiadores")
    .get(verificarToken,(req,res) => apoiadorController.viewApoiadores(req,res));


router
    .route("/apoiadores/:id")
    .get(verificarToken,(req,res) => apoiadorController.findById(req,res));


router
    .route("/aniversariantes")
    .get(verificarToken,(req,res) => apoiadorController.findByBirthday(req,res));


router
    .route("/apoiador/:id")
    .delete(verificarToken, (req,res) => apoiadorController.deleteById(req,res));


router
    .route("/apoiadores")
    .post(verificarToken,(req,res) => apoiadorController.create(req,res));


router
    .route("/apoiadores/:id")
    .put(verificarToken, (req,res) => apoiadorController.updateById(req,res));



export default router;