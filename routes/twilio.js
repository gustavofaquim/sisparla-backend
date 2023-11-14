import express from 'express';

const router = express.Router();

import twilioController from '../controllers/twilioController.js';

router
    .route("/eventos")
    .get((req, res) => twilioController.send(req,res));

export default router;