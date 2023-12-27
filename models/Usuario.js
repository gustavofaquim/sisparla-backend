import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

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
    RegraAcesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sistema:{
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{ 
    tableName: 'USUARIO',
    timestamps: false,
})

export default Usuario;