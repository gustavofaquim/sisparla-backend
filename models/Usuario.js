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
    RegraAcesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Perfil: {
        type: DataTypes.STRING,
        references:{
            model: PerfilAcesso,
            key: 'IdPerfil'
        },
    },
    Status: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
},{ 
    tableName: 'USUARIO',
    timestamps: false,
})

Usuario.belongsTo(PerfilAcesso, {
    foreignKey: 'Perfil',
    as: 'PerfilAcesso'
});


export default Usuario;