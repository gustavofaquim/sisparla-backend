import { DataTypes } from "sequelize";

import Sequelize from "sequelize";

import sequelize from "../db/conn.js";

import PessoaJuridicaFisica from "./PessoaJuridicaFisica.js";
import OrigemDespesa from "./OrigemDespesa.js";
import TipoDespesa from "./TipoDespesa.js";

const Despesa = sequelize.define('Despesa', {

    IdDespesa:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Detalhamento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Valor: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Data: {
       type: DataTypes.DATE,
       allowNull: false 
    },
    PessoaJuridicaFisica: {
        type: DataTypes.DOUBLE,
        references: {
            model: 'PessoaJuridicaFisica',
            key: 'IdPessoaJuridicaFisica'
        }
    },
    Origem: {
        type: DataTypes.INTEGER,
        references:{
            model: 'OrigemDespesa',
            key: 'IdOrigem'
        }
    },
    Tipo: {
        type: DataTypes.INTEGER,
        references:{
            model: 'TipoDespesa',
            key: 'IdTipo'
        }
    }
},{
    tableName: 'DESPESA',
    timestamps: false
});

Despesa.belongsTo(PessoaJuridicaFisica, {
    foreignKey: 'PessoaJuridicaFisica',
    as: 'PessoaFisicaJuridica'
});

Despesa.belongsTo(OrigemDespesa, {
    foreignKey: 'Origem',
    as: 'OrigemDespesa'
});

Despesa.belongsTo(TipoDespesa, {
    foreignKey: 'Tipo',
    as: 'TipoDespesa'
});

export default Despesa;