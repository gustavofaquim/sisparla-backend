import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


import PerfilAcesso from "./PerfilAcesso.js";

const Usuario = sequelize.define('Usuario', {
    IdUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    NomeUsuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefone: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    PerfilAcesso: {
        type: DataTypes.INTEGER,
        references:{
            model: PerfilAcesso,
            key: 'IdPerfil'
        },
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Avatar: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{ 
    tableName: 'USUARIO',
    timestamps: false,
})

Usuario.belongsTo(PerfilAcesso, {
    foreignKey: 'PerfilAcesso',
    as: 'PerfilAcessoUsuario'
});


export default Usuario;