import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

import Cidade from "./Cidade.js";


const Bairro = sequelize.define('Bairro',{

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
},{
    tableName: 'BAIRRO',
    timestamps: false,
});


Bairro.belongsTo(Cidade, {
    foreignKey: 'Cidade',
    as: 'CidadeApoiador'
});


export default Bairro;