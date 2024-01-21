
import jwt from "jsonwebtoken";
import revokedTokens from "./revokedTokens.js";

const verificarToken = (req, res, next) => {

  const tokenObtido = req.headers.authorization;
  const token = tokenObtido.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  // Verifica se o token foi revogado
  if (revokedTokens.has(token)) {
    //console.log('Toke revogado');
    return res.status(401).json({ msg: 'Token revogado' });
  }


  jwt.verify(token,'secreto', (err, decoded) => {
    
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('Token expirado:', err.message);
        return res.status(401).json({ msg: 'Token expirado' });
      }

      console.log('Erro ao verificar o token:', err.message);
      return res.status(401).json({ msg: 'Token inválido' });
    }
    
    req.usuario = decoded;
    next();
  });
};

export default verificarToken;
