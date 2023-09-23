import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Bairro from "./Bairro.js";

const Endereco = sequelize.define('Endereco', {

    idEndereco:{
        type: DataTypes.INTEGER,
        allowNull: true,
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

Endereco.belongsTo(Bairro, {
    foreignKey: 'Bairro',
    as: 'BairroApoiador'
});

export default Endereco;