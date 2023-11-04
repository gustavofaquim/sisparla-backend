import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const SituacaoDemanda = sequelize.define('SituacaoDemanda', {
    IdSituacao:{
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
    tableName: 'SITUACAO_DEMANDA',
    timestamps: false,
})

export default SituacaoDemanda;