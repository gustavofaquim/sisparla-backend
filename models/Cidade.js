import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

import Estado from "./Estado.js";

const Cidade = sequelize.define('Cidade', {

    IdCidade:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Estado:{
        type: DataTypes.INTEGER,
        references: {
            model: Estado,
            key: 'IdEstado'
        }
    }
},
{ 
    tableName: 'CIDADE',
    timestamps: false,
});

Cidade.belongsTo(Estado, {
    foreignKey: 'Estado',
    as: 'EstadoApoiador'
});


export default Cidade;
