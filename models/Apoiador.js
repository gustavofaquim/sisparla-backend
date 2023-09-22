import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Profissao from "./Profissao.js";

import Religiao from "./Religiao.js";

const Apoiador = sequelize.define('Apoiador', {

    IdApoiador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    Apelido:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
    },
    Profissao:{
        type: DataTypes.INTEGER,
        references: {
            model: Profissao,
            key: 'IdProfissao'
        }
    },
    Religiao:{
        type: DataTypes.INTEGER,
        references:{
            model: Religiao,
            key: 'IdReligiao'
        }
    }

}, { 
    tableName: 'APOIADOR',
    timestamps: false,
    }
);

Apoiador.belongsTo(Profissao, {
    foreignKey: 'Profissao',
    as: 'ProfissaoApoiador'
});

Apoiador.belongsTo(Religiao, {
    foreignKey: 'Religiao',
    as: 'ApoiadorReligiao'
});



export default Apoiador;

