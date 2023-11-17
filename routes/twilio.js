import express from 'express';
import multer from 'multer';
import twilioController from '../controllers/twilioController.js';
import upload from "../config/multer.js";


const router = express.Router();

router
    .route("/send")
    .post(upload.array("selectedFiles"), (req, res) => twilioController.send(req, res));

export default router;
