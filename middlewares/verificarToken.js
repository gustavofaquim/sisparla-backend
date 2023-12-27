// verificarToken.js
import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const tokenObtido = req.headers.authorization;
  
  const token = tokenObtido.replace('Bearer ', '');
  
 if (!token) {
    return res.status(401).json({ msg: 'Token não fornecido' });
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

    console.log('Token verificado com sucesso:', decoded);
    
    req.usuario = decoded;
    next();
  });
};

export default verificarToken;
