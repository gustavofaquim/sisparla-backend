import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Apoiador from "./Apoiador.js";
import Entidade from "./Entidade.js";

const Vinculacao = sequelize.define('Vinculacao', {
    idVinculacao:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Apoiador:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },
    Cargo:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Entidade: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Entidade',
            key: 'IdEntidade'
        }
    },
    Lideranca: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'VINCULACAO',
    timestamps: false
});

Vinculacao.belongsTo(Entidade, {
    foreignKey: 'Entidade',
    as: 'VinculacaoEntidade'
});


export default Vinculacao;