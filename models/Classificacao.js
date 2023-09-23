import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Classificacao = sequelize.define('Classificacao', {
    idClassificacao:{
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
    tableName: 'CLASSIFICACAO',
    timestamps: false,
});

export default Classificacao;