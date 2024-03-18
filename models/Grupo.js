import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Usuario from "../models/Usuario.js";


const Grupo = sequelize.define('Gruop', {

    IdGrupo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Responsavel:{
        type: DataTypes.INTEGER,
        references:{
            model: Usuario,
            key: 'IdUsuario'
        }
    },
},{ 
    tableName: 'GRUPO',
    timestamps: false,
    }
);
Grupo.belongsTo(Usuario, {
    foreignKey: 'Responsavel',
    as: 'ResponsavelGrupo'
});

export default Grupo;