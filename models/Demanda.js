import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Apoiador from "./Apoiador.js";
import CategoriaDemanda from "./CategoriaDemanda.js";
import SituacaoDemanda from "./SituacaoDemanda.js";
import Responsavel from "./Usuario.js";

const Demanda = sequelize.define('Demanda', {
    IdDemanda:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    Assunto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Apoiador:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },
    Categoria: {
        type: DataTypes.INTEGER,
        references:{
            model: 'CategoriaDemanda',
            key: 'IdCategoria'
        }
    },
    Situacao: {
        type: DataTypes.INTEGER,
        references:{
            model: 'SituacaoDemanda',
            key: 'IdSituacao'
        }
    },
    Responsavel: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Responsavel',
            key: 'IdUsuario'
        }
    },
    Valor: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    EmendaParlamentar:{
        type: DataTypes.STRING,
        allowNull: true,
        default: 'N'
    }
}, {
    tableName: 'DEMANDA',
    timestamps: false
})

Demanda.belongsTo(Apoiador, {
    foreignKey: 'Apoiador',
    as: 'DemandaApoiador'
});

Demanda.belongsTo(CategoriaDemanda, {
    foreignKey: 'Categoria',
    as: 'DemandaCategoria'
});

Demanda.belongsTo(SituacaoDemanda, {
    foreignKey: 'Situacao',
    as: 'DemandaSituaco'
});

Demanda.belongsTo(Responsavel, {
    foreignKey: 'Responsavel',
    as: 'DemandaResponsavel'
});


export default Demanda;