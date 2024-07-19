import ExcelJS from 'exceljs';
import db from '../db/conn.js';

const exportDataToExcel = async (relatorio) => {
  try {
      
      const sql = `SELECT 
                    A.Nome,
                    DATE_FORMAT(A.DataNascimento, '%d/%m/%Y') AS DataNascimento,
                    E.CEP,
                    E.Logradouro AS Endereco,
                    E.Complemento,
                    E.Bairro,
                    CI.Nome AS Cidade,
                    ES.UF,
                    T.Numero as Celular,
                    A.Email,
                    A.Sexo as Genero,
                    CASE
                        WHEN (FP.Lideranca NOT LIKE '%n%') THEN 'Sim'
                        WHEN V.Lideranca NOT LIKE '%n%' THEN 'Sim'
                        ELSE 'Não'
                    END AS 'Lideranca?',
                    A.InformacaoAdicional AS 'Observação'
                FROM
                    APOIADOR A
                    LEFT JOIN ENDERECO E ON E.idEndereco = A.Endereco
                    LEFT JOIN CIDADE CI ON CI.IdCidade = E.Cidade
                    LEFT JOIN ESTADO ES ON ES.IdEstado = CI.Estado
                    LEFT JOIN TELEFONE T ON T.Apoiador = A.IdApoiador
                    LEFT JOIN FILIACAO_PARTIDARIA FP ON FP.IdFiliacao = A.Filiacao 
                    LEFT JOIN VINCULACAO V ON V.Apoiador = A.IdApoiador
                  ORDER BY A.DataInsercao DESC, A.Nome ASC;`
    

    if(!sql){
      res.status(500).send('Consulta do relatório não informada');
    }

    const [rows] = await db.query(sql);
    //const [rows] = await connection.execute(sql);

    const data = [
      ['Nome', 'DataNascimento', 'CEP', 'Endereco', 'Complemento', 'Bairro', 'Cidade', 'UF', 'Celular', 'Email', 'Genero', 'Lideranca', 'Observacao'],
      ...rows.map(row => [row.Nome, row.DataNascimento, row.CEP, row.Endereco, row.Complemento, row.Bairro, row.Cidade, row.UF, row.Celular, row.Email, row.Genero, row.Lideranca, row.Observacao])
    ]
    
    return data;

  } catch (error) {
    console.log(error)
    throw new Error('Erro ao buscar dados do MySQL');
  }
};

export { exportDataToExcel };
