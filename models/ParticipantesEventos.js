import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Apoiador from "./Apoiador.js";
import Evento from "./Evento.js";

const ParticipantesEvento = sequelize.define("ParticipantesEvento",{
    Evento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Evento",
            key: "IdEvento"
        }
    },
    Apoiador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        references:{
            model: 'Apoiador',
            key: 'IdApoiador'
        }
    },

},{
    tableName: 'PARTIPANTES_EVENTO',
    timestamps: false
});

export default ParticipantesEvento;