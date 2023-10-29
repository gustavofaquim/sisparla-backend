import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Partido from "./Partido.js";

const Filiacao = sequelize.define("FiliacaoPartidaria", {
    IdFiliacao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Partido: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Partido',
            key: 'IdPartido'
        }
    },
    DiretorioMunicipio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    DiretorioUF:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Zona:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Secao:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Cargo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Lideranca: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    tableName: 'FILIACAO_PARTIDARIA',
    timestamps: false
});

Filiacao.belongsTo(Partido, {
    foreignKey: 'Partido',
    as: 'PartidoFiliacao'
});

export default Filiacao;