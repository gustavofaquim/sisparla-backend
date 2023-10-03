import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const TipoEntidade = sequelize.define("TIPO_ENTIDADE", {
    IdTipo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'TIPO_ENTIDADE',
    timestamps: false,
})

export default TipoEntidade;