import { DataTypes } from "sequelize";

import sequelize from "../db/conn.js";


const Grupo = sequelize.define('Gruop', {

    IdGrupo:{
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
    tableName: 'GRUPO',
    timestamps: false,
    }
);

export default Grupo;