import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

const Profissao = sequelize.define('Profissao', {

    IdProfissao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

export default Profissao;