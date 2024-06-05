import jwt from "jsonwebtoken";

// Função para decodificar o token e obter os dados do apoiador
function decodeToken(token) {
    // Chave secreta utilizada para verificar a autenticidade do token
    const chaveSecreta = '51l40_qn%2b9ka+ydlf&6311yj^+7yhukwq-bx-vf!c=q_q_jc';
  
    try {
      // Decodificar o token utilizando a chave secreta
      const decoded = jwt.verify(token, chaveSecreta);
  
      // Verificar se o token está expirado
      const agora = Math.floor(Date.now() / 1000); // Tempo atual em segundos
      if (decoded.exp <= agora) {
        console.log('Token expirado');
        return null;
      }
  
      // Retornar os dados do apoiador contidos no token
      return decoded;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
}

export default decodeToken;