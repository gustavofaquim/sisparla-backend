import express from 'express';

const router = express.Router();

import usuarioController from '../controllers/usuarioController.js';

router
    .route('/logar')
    .post((req,res) => usuarioController.find(req,res));

router
    .route('/logout')
    .delete((req,res) => usuarioController.removeToken(req,res));

router
    .route('/lista-usuarios')
    .get((req,res) => usuarioController.findAssets(req,res));


export default router;