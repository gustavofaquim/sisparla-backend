import express from 'express';

const router = express.Router();

import usuarioController from '../controllers/UsuarioController.js';

router
    .route('/logar')
    .post((req,res) => usuarioController.find(req,res));


export default router;