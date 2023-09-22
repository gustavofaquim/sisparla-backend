import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";


const SituacaoCadastro = sequelize.define('SituacaoCadastro',{

    idSituacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

},{
    tableName: 'SITUACAO_CADASTRO',
    timestamps: false,
});

export default SituacaoCadastro;