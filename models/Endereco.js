import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Cidade from "./Cidade.js";

const Endereco = sequelize.define('Endereco', {

    idEndereco:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Cidade:{
        type: DataTypes.INTEGER,
        references:{
            model: Cidade,
            key: 'IdCidade'
        }
    },
    CEP: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Bairro:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Complemento:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Logradouro:{
        type: DataTypes.STRING,
        allowNull: true
    },
    PontoReferencia:{
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    tableName: 'ENDERECO',
    timestamps: false,
});

Endereco.belongsTo(Cidade, {
    foreignKey: 'Cidade',
    as: 'CidadeEndereco'
});

export default Endereco;