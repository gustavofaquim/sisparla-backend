const verificarPermissao = (requiredPermission) => {
    return (req, res, next) => {
    
        const { usuario } = req;

  
        if(!usuario || usuario.permissoes?.length == 0){
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }


        const permissoes = usuario.permissoes;
        const permissaoExiste = permissoes.some(permissao => permissao.Nome === requiredPermission);
        

        if(!permissaoExiste ){
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }

        /*if (!usuario || !usuario.regra || !(usuario.regra <= requiredPermission)) {
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }*/
     
        next();
    };
  };
  
  export default verificarPermissao;
  