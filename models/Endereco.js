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
    Numero:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Lagradouro:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Quadra: {
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
    as: 'CidadeApoiador'
});

export default Endereco;