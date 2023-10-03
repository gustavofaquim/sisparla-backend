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
    Apoiador: {
        type: DataTypes.INTEGER,
        references: {
            modal: Apoiador,
            key: 'IdApoiador'
        }
    },
    Cargo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Lideranca: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    tableName: 'VINCULACAO',
    timestamps: false,
})

Entidade.belongsTo(Apoiador, {
    foreignKey: 'IdApoiador',
    as: 'Vinculacao'
});

export default Vinculacao;