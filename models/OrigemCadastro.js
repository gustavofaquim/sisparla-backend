import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";


const OrigemCadastro = sequelize.define('OrigemCadastro', {
    
    IdOrigem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Descricao:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{ 
    tableName: 'ORIGEM_CADASTRO',
    timestamps: false,
});

export default OrigemCadastro;