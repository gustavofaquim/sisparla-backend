import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

const Cidade = sequelize.define('Cidade', {

    IdCidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    UF:{
        type: DataTypes.STRING,
        references: {
            model: UF,
            key: 'UF'
        }
    }
    
});