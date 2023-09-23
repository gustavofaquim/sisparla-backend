import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Profissao = sequelize.define('Profissao', {

    IdProfissao:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: true
    }

},{ 
    tableName: 'PROFISSAO',
    timestamps: false,
});

export default Profissao;