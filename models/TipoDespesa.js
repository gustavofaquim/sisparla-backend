import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const TipoDespesa = sequelize.define("TIPO_DESPESA", {
    IdTipo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'TIPO_DESPESA',
    timestamps: false,
})

export default TipoDespesa;