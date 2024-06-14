import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Sexo = sequelize.define('Sexo', {
    IdSexo:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{
    tableName: 'SEXO',
    timestamps: false,
});

export default Sexo;