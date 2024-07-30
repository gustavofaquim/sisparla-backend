import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";


const ApoiadorCampanha =  sequelize.define('ApoiadorCampanha', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    IdApoiador: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    IdCampanha: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    DataUltimaVisita: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    DataProximaVisita: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    QuantidadeVisita: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    RecebeuMaterial: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    Doador: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
},{
    tableName: 'APOIADOR_CAMPANHA',
    timestamps: false,
});

export default ApoiadorCampanha;