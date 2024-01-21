import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Endereco from "./Endereco.js";

const Credor = sequelize.define('Credor', {
    IdCredor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Endereco:{
        type: DataTypes.INTEGER,
        references:{
            model: Endereco,
            key: 'IdEndereco'
        }
    },
    Telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Documento: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },

},{
    tableName: 'CREDOR',
    timestamps: false
});

Credor.belongsTo(Endereco, {
    foreignKey: 'Endereco',
    as: 'EnderecoPessoa'
});

export default Credor;