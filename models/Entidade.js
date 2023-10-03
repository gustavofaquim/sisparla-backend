import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Entidade = sequelize.define("Entidade", {
    IdEntidade:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Sigla: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Tipo:{
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'ENTIDADE',
    timestamps: false
})

export default Entidade;