import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";
import Permissao from "./Permissao.js";
import PerfilPermissao from "./PerfilPermissao.js";


const PerfilAcesso = sequelize.define('PerfilAcesso', {

    IdPerfil:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{ 
    tableName: 'PERFIL_ACESSO',
    timestamps: false,
    }
);


PerfilAcesso.hasMany(PerfilPermissao, {
    foreignKey: 'IdPerfil',
    //as: 'TelefoneApoiador'
});




export default PerfilAcesso;