import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Profissao from "./Profissao.js";


const Religiao = sequelize.define('Religiao', {

    IdReligiao:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{ 
    tableName: 'RELIGIAO',
    timestamps: false,
    });

export default Religiao;