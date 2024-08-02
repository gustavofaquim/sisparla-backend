import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";
import Apoiador from "./Apoiador.js";
import Campanha from "./Campanha.js";


const Doacao = sequelize.define('Doacao', {

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        unique: true
    },
    IdApoiador:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    IdCampanha: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:'Campanha',
            key: 'Id'
        }
    },
    Valor:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Data: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'ARRECADACAO',
    timestamps: false
})

Doacao.belongsTo(Apoiador, {
    foreignKey: 'IdApoiador',
    as: 'ApoiadorDoacao'
});

Doacao.belongsTo(Campanha, {
    foreignKey: 'IdCampanha',
    as: 'DoacaoCampanha'
});

export default Doacao;