import { DataTypes } from "sequelize";
import sequlize from "../db/conn.js";

const Telefone = sequlize.define('Telefone', {

    idTelefone:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Numero:{
        type: DataTypes.STRING,
        allowNull: false, 
    },
    Apoiador:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },
    WhatsApp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Principal:{
        type: DataTypes.STRING,
        allowNull: true, 
    }
},{ 
    tableName: 'TELEFONE',
    timestamps: false,
});

export default Telefone;