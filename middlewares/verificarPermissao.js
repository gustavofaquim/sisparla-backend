const verificarPermissao = (requiredPermissions, telas) => {
    return (req, res, next) => {
        const { usuario } = req;

        if (!usuario || !usuario.telas || usuario.telas.length === 0) {
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }

        // Flatten the user's permissions into a more usable format
        const permissoesPorTela = usuario.telas.reduce((acc, telaPermissoes) => {
            const tela = telaPermissoes.Tela;
            const permissoes = Array.isArray(telaPermissoes.permissoes)
                ? telaPermissoes.permissoes
                : [telaPermissoes.permissoes];

            if (!acc[tela]) {
                acc[tela] = [];
            }
            acc[tela] = acc[tela].concat(permissoes.map(perm => perm.Nome));

            return acc;
        }, {});

        // Check if the user has any of the required permissions for any of the specified screens
        const hasPermission = telas.some(tela => {
            const permissoes = permissoesPorTela[tela];
            if (!permissoes) {
                return false;
            }
            return requiredPermissions.some(requiredPermission => permissoes.includes(requiredPermission));
        });

        if (!hasPermission) {
            return res.status(403).json({ msg: 'Você não tem permissão para acessar este recurso.' });
        }

        next();
    };
};

export default verificarPermissao;
