import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const OrigemDespesa = sequelize.define('ORIGEM_DESPESA', {

    IdOrigem:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Ano: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    tableName: 'ORIGEM_DESPESA',
    timestamps: false,
})

export default OrigemDespesa;