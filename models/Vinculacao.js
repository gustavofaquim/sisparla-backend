import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Apoiador from "./Apoiador.js";

const Vinculacao = sequelize.define('Vinculacao', {
    idVinculacao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    ApoiadorId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },
    Cargo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Lideranca: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'VINCULACAO',
    timestamps: false
});



export default Vinculacao;