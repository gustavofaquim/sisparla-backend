import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';
import apoiadorController from '../controllers/apoiadorController.js';


const router = express.Router();


// Rota protegida com verificação de token
router.use('/apoiadores', verificarToken);


router
    .route("/apoiadores")
    .get((req,res) => apoiadorController.findAll(req,res));


router
    .route("/view-apoiadores")
    .get((req,res) => apoiadorController.viewApoiadores(req,res));

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