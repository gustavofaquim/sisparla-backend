import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


let Permissao;
let PerfilAcesso;

const PerfilPermissao = sequelize.define('PerfilPermissao', {
    IdPerfil:{
        type: DataTypes.INTEGER,
        references:{
            get() {
                return PerfilAcesso === undefined ? undefined : PerfilAcesso.IdPerfil;
            },
            model() {
                return PerfilAcesso === undefined ? undefined : PerfilAcesso;
            },
            key: 'IdPerfil'
        }, 
        primaryKey: true
    },
    IdPermissao: {
        type: DataTypes.INTEGER,
        references: {
            get() {
                return Permissao === undefined ? undefined : Permissao.IdPermissao;
            },
            model() {
                return Permissao === undefined ? undefined : Permissao;
            },
            key: 'IdPermissao'
        },
        primaryKey: true
    }
}, { 
    tableName: 'PERFIL_PERMISSAO',
    timestamps: false,
});


export default PerfilPermissao;


// Importação tardia do modelo Apoiador
(async () => {
    const modulePermissao = await import("./Permissao.js");
    Permissao = modulePermissao.default;

    const modeulePerfil = await import("./PerfilAcesso.js");
    PerfilAcesso = modeulePerfil.default;
})();
