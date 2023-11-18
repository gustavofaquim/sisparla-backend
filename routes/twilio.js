import express from 'express';
import mensagemController from '../controllers/mensagemController.js';
import upload from "../config/multer.js";



const router = express.Router();

router
    .route("/send")
    .post(upload.array("arquivos"), (req, res) => mensagemController.send(req, res)); 

export default router;
