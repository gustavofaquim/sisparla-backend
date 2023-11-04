import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const CategoriaDemanda = sequelize.define('CategoriaDemanda', {

    IdCategoria:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'CATEGORIA_DEMANDA',
    timestamps: false,
})

export default CategoriaDemanda;