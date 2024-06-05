import jwt from "jsonwebtoken";


// Função para gerar o token JWT
function generateToken(IdApoiador) {
  // Chave secreta para assinar o token (deve ser mantida em segredo)
  const chaveSecreta = '51l40_qn%2b9ka+ydlf&6311yj^+7yhukwq-bx-vf!c=q_q_jc';

  // Dados que serão armazenados no token
  const payload = {
    IdApoiador: IdApoiador
  };

  // Opções do token, como tempo de expiração
  const opcoes = {
    expiresIn: '48h' // Token expira após 48 horas
  };

  // Gerar o token com os dados e as opções especificadas
  const token = jwt.sign(payload, chaveSecreta, opcoes);

  return token;
}

export default generateToken;


