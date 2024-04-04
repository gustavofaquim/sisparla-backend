import { Sequelize, DataTypes } from "sequelize";

let Apoiador;

const Telefone = sequelize.define('Telefone', {
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
            get() {
                return Apoiador === undefined ? undefined : Apoiador.IdApoiador;
            },
            model() {
                return Apoiador === undefined ? undefined : Apoiador;
            },
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

import sequelize from "../db/conn.js";

// Importação tardia do modelo Apoiador
(async () => {
    const module = await import("./Apoiador.js");
    Apoiador = module.default;
})();
