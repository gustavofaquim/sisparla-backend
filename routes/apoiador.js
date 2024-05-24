import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
import apoiadorController from '../controllers/apoiadorController.js';


const router = express.Router();



router
    .route("/apoiadores")
    .get(verificarToken, verificarPermissao('Vizualizar'), (req,res) => apoiadorController.findAll(req,res));


router
    .route("/filtro-apoiadores")
    .get(verificarToken, verificarPermissao('Vizualizar'), (req,res) => apoiadorController.filterAll(req,res));

router
    .route("/apoiadores-total")
    .get(verificarToken, verificarPermissao('Vizualizar'), (req,res) => apoiadorController.countFindAll(req,res));


router
    .route("/view-apoiadores")
    .get(verificarToken, verificarPermissao('Vizualizar'), (req,res) => apoiadorController.viewApoiadores(req,res));

router
    .route("/count-apoiadores")
    .get(verificarToken, verificarPermissao('Vizualizar'), (req,res) => apoiadorController.count(req,res));


router
    .route("/apoiadores/:id")
    .get(verificarToken, verificarPermissao('Vizualizar'),(req,res) => apoiadorController.findById(req,res));


router
    .route("/aniversariantes")
    .get(verificarToken, verificarPermissao('Vizualizar'),(req,res) => apoiadorController.findByBirthday(req,res));


router
    .route("/apoiador/:id")
    .delete(verificarToken, verificarPermissao('Deletar'), (req,res) => apoiadorController.deleteById(req,res));


router
    .route("/apoiadores")
    .post(verificarToken, verificarPermissao('Criar'),(req,res) => apoiadorController.create(req,res));


router
    .route("/apoiadores/:id")
    .put(verificarToken, verificarPermissao('Atualizar'), (req,res) => apoiadorController.updateById(req,res));



export default router;