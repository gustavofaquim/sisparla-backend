import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Profissao from "./Profissao.js";
import Religiao from "./Religiao.js";
import Endereco from "./Endereco.js";
import Classificacao from "./Classificacao.js";
import SituacaoCadastro from "./SituacaoCadastro.js";

const Apoiador = sequelize.define('Apoiador', {

    IdApoiador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    Nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    Apelido:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DataNascimento:{
        type: DataTypes.DATE,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante que o email seja único
    },
    Profissao:{
        type: DataTypes.INTEGER,
        references: {
            model: Profissao,
            key: 'IdProfissao'
        }
    },
    Religiao:{
        type: DataTypes.INTEGER,
        references:{
            model: Religiao,
            key: 'IdReligiao'
        }
    },
    Endereco:{
        type: DataTypes.INTEGER,
        references:{
            model: Endereco,
            key: 'IdEndereco'
        }
    },
    Classificacao:{
        type: DataTypes.INTEGER,
        references:{
            model: Classificacao,
            key: 'IdClassificacao'
        }
    },
    Situacao:{
        type: DataTypes.INTEGER,
        references:{
            model: SituacaoCadastro,
            key: "IdSituacao"
        }
    },
    InformacaoAdicional:{
        type: DataTypes.STRING,
        allowNull: true
    }  

}, { 
    tableName: 'APOIADOR',
    timestamps: false,
    }
);

Apoiador.belongsTo(Profissao, {
    foreignKey: 'Profissao',
    as: 'ProfissaoApoiador'
});

Apoiador.belongsTo(Religiao, {
    foreignKey: 'Religiao',
    as: 'ApoiadorReligiao'
});

Apoiador.belongsTo(Endereco, {
    foreignKey: 'Endereco',
    as: 'EnderecoApoiador'
});

Apoiador.belongsTo(Classificacao, {
    foreignKey: 'Classificacao',
    as: 'ClassificacaoApoiador'
});

Apoiador.belongsTo(SituacaoCadastro, {
    foreignKey: 'Situacao',
    as: 'SituacaoCadastroApoiador'
});



export default Apoiador;

