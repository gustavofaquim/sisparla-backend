import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


const Bairro = sequelize.define('bairro',{

    IdBairro:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    Cidade:{
        type: DataTypes.INTEGER,
        references: {
            model: Cidade,
            key: 'IdCIdade'
        }
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    CEP:{
        type: DataTypes.STRING,
        allowNull: true
    }
}); 