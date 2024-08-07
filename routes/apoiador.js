import express from 'express';
import {verificarToken, verificarPermissao} from '../middlewares/verificarToken.js';
import apoiadorController from '../controllers/apoiadorController.js';
import apoiadorRecadastramentoController from '../controllers/apoiadorRecadastramentoController.js';

const router = express.Router();



router
    .route("/apoiadores")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']),(req,res) => apoiadorController.findAll(req,res));


router
    .route("/lista-apoiadores")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']), (req,res) => apoiadorController.findList(req,res));

router
    .route("/filtro-apoiadores")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']), (req,res) => apoiadorController.filterAll(req,res));

router
    .route("/apoiadores-total")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']),(req,res) => apoiadorController.countFindAll(req,res));


router
    .route("/view-apoiadores")
    .get(verificarToken, verificarPermissao(['Emitir Relatório'], ['apoidores']), (req,res) => apoiadorController.viewApoiadores(req,res));

router
    .route("/count-apoiadores")
    .get(verificarToken, verificarPermissao(['Emitir Relatório'], ['apoiadores']), (req,res) => apoiadorController.count(req,res));


router
    .route("/apoiadores/:id")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['apoiadores']),(req,res) => apoiadorController.findById(req,res));


router
    .route("/aniversariantes")
    .get(verificarToken, verificarPermissao(['Visualizar'], ['aniversariantes']),(req,res) => apoiadorController.findByBirthday(req,res));


router
    .route("/apoiador/:id")
    .delete(verificarToken, verificarPermissao(['Deletar'], ['apoiadores']), (req,res) => apoiadorController.deleteById(req,res));


router
    .route("/apoiadores")
    .post(verificarToken, verificarPermissao(['Criar'], ['apoiadores']),(req,res) => apoiadorController.create(req,res));


router
    .route("/apoiadores/:id")
    .put(verificarToken, verificarPermissao(['Atualizar'], ['apoiadores']), (req,res) => apoiadorController.updateById(req,res));




router
    .route("/recadastramento-apoiador/")
    .get((req,res) => apoiadorRecadastramentoController.findByToken(req,res));

router
    .route("/recadastramento-apoiador/")
    .put((req,res) => apoiadorRecadastramentoController.updateByToken(req,res));


export default router;