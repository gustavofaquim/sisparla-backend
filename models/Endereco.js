import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Religiao from "./Bairro.js";

const Endereco = sequelize.define('Endereco', {

    idEndereco:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    Bairro:{
        type: DataTypes.INTEGER,
        references: {
            model: Bairro,
            key: 'IdBairro'
        }
    },
    Numero:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Quadra: {
        type: DataTypes.STRING,
        allowNull: true
    },
    PontoReferencia:{
        type: DataTypes.STRING,
        allowNull: true
    }

});