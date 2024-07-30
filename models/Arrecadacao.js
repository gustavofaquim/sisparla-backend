import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


const Arrecadacao =  sequelize.define('Arrecadacao', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    IdApoiador: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IdCampanha: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Valor: {
        type: DataTypes.YEAR,
        allowNull: true,
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Data: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    tableName: 'ARRECADACAO',
    timestamps: false,
});

export default Arrecadacao;