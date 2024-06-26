import { Sequelize, DataTypes } from "sequelize";

import sequelize from "../db/conn.js";

import Profissao from "./Profissao.js";
import Religiao from "./Religiao.js";
import Telefone from "./Telefone.js";
import Endereco from "./Endereco.js";
import Classificacao from "./Classificacao.js";
import SituacaoCadastro from "./SituacaoCadastro.js";
import Vinculacao from "./Vinculacao.js";
import FiliacaoPartidaria from "./FiliacaoPartidaria.js";
//import Demanda from "./Demanda.js";
import Grupo from './Grupo.js';
import Usuario from "./Usuario.js";
import OrigemCadastro from "./OrigemCadastro.js";

const Apoiador = sequelize.define('Apoiador', {

    IdApoiador:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: true,
        unique: true, // Garante que o email seja único
    },
    Profissao:{
        type: DataTypes.INTEGER,
        references:{
            model: Profissao,
            key: 'IdProfissao'
        }
       
    },
    Religiao:{
        type: DataTypes.STRING,
        allowNull: true,
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

    Filiacao: {
        type: DataTypes.INTEGER,
        references:{
            model: FiliacaoPartidaria,
            key: "IdFiliacao"
        }
    },
    InformacaoAdicional:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Responsavel: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'IdUsuario'
        }
    },
    Grupo: {
        type: DataTypes.INTEGER,
        references: {
            model: Grupo,
            key: 'IdGrupo'
        }
    },
    Origem: {
        type: DataTypes.INTEGER,
        references: {
            model: OrigemCadastro,
            key: 'IdOrigem'
        } 
    },
    DataInsercao: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Obs: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    ApoiadorVinculado:{
        type: DataTypes.STRING,
        allowNull: true
    },
    Sexo:{
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

Apoiador.belongsTo(Endereco, {
    foreignKey: 'Endereco',
    as: 'EnderecoApoiador'
});


Apoiador.hasMany(Vinculacao, {
    foreignKey: 'Apoiador',
    as: 'Vinculacao'
});


Apoiador.belongsTo(FiliacaoPartidaria, {
    foreignKey: 'Filiacao',
    as: 'FiliacaoPartidaria'
});


Apoiador.belongsTo(Classificacao, {
    foreignKey: 'Classificacao',
    as: 'ClassificacaoApoiador'
});

Apoiador.belongsTo(Usuario, {
    foreignKey: 'Responsavel',
    as: 'ResponsavelCadastro'
});


Apoiador.belongsTo(Grupo, {
    foreignKey: 'Grupo',
    as: 'GrupoApoiador'
})


Apoiador.belongsTo(SituacaoCadastro, {
    foreignKey: 'Situacao',
    as: 'SituacaoCadastroApoiador'
});

Apoiador.belongsTo(OrigemCadastro, {
    foreignKey: 'Origem',
    as: 'OrigemApoiador'
});


/*
Apoiador.hasMany(Demanda, {
    foreignKey: 'Apoiador',
    as: 'Demanda'
});
*/


Apoiador.hasMany(Telefone, {
    foreignKey: 'Apoiador',
    as: 'TelefoneApoiador'
});

/* -- Relação ntre apoiaores
Apoiador.belongsTo(Apoiador, {
    foreignKey: 'ApoiadorVinculado', // Coluna que faz referência ao ID do Apoiador
    as: 'VinculacaoApoiador' // Alias para a relação
});*/

/* Apoiador.belongsTo(Vinculacao, {
    foreignKey: 'Apoiador',
    as: 'VinculacaoApoiador'
}); */



export default Apoiador;

