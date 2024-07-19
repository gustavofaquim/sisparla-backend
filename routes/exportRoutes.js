import express from 'express';
const router = express.Router();



import { exportExcel } from '../controllers/exportController.js';

router.get('/export/excel', exportExcel);

export default router;