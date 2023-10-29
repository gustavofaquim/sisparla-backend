import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Partido = sequelize.define("Partido", {

    IdPartido:{
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
    }

},{
    tableName: 'PARTIDO',
    timestamps: false
});


export default Partido;