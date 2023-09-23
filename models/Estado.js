import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

const Estado = sequelize.define('Estado',{
    
    IdEstado:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    UF:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},{ 
    tableName: 'ESTADO',
    timestamps: false,
});

export default Estado;