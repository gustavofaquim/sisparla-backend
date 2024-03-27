const verificarPermissao = (requiredPermission) => {
    return (req, res, next) => {
    
        const { usuario } = req;
        if (!usuario || !usuario.regra || !(usuario.regra <= requiredPermission)) {
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }
     
        next();
    };
  };
  
  export default verificarPermissao;
  