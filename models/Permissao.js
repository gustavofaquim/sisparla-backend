import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

import PerfilPermissao from "./PerfilPermissao.js";

const Permissao = sequelize.define('Permissao', {

    IdPermissao:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{ 
    tableName: 'PERMISSAO',
    timestamps: false,
    }
);

Permissao.hasMany(PerfilPermissao, {
    foreignKey: 'IdPermissao',
    //as: 'TelefoneApoiador'
});


export default Permissao;