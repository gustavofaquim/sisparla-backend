import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Evento = sequelize.define("Evento", {
    IdEvento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Responsavel:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Local:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    DataHorario:{
        type: DataTypes.DATE,
        allowNull: true,
    },
    Relacao:{
        type: DataTypes.STRING,
        allowNull: true,
    },

},{
    tableName: 'EVENTO',
    timestamps: false
});

export default Evento;