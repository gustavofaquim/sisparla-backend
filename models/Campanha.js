import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


const Campanha =  sequelize.define('Campanha', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Ano: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},{
    tableName: 'CAMPANHA',
    timestamps: false,
});

export default Campanha;