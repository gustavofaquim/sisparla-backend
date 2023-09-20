import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Profissao from "./Profissao.js";

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

}, { 
    tableName: 'APOIADOR',
    timestamps: false,
    }
);

Apoiador.belongsTo(Profissao, {
    foreignKey: 'Profissao',
    as: 'ProfissaoApoiador'
});


Apoiador.prototype.getProfissao = async function() {
    const profissao = await Profissao.findByPk(this.Profissao);
    return profissao;
};

export default Apoiador;

