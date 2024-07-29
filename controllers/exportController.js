import { exportDataToExcel } from '../services/exportDados.js';
import ExcelJS from 'exceljs';

const exportExcel = async (req, res) => {
  try {

    const {relatorio} = req.body;


    const workbook = new ExcelJS.Workbook();

    
    const worksheet = workbook.addWorksheet('nome');

    const data = await exportDataToExcel(relatorio);

    if (!Array.isArray(data)) {
      throw new Error('Os dados não estão no formato esperado');
    }

    worksheet.addRows(data);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=dados.xlsx');

    const buffer = await workbook.xlsx.writeBuffer();
    res.send(buffer);


  } catch (error) {
    console.error('Erro ao exportar dados:', error);
    res.status(500).send('Erro ao exportar dados');
  }
};

export { exportExcel };