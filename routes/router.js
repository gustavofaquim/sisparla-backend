import express from "express";

const router = express.Router();


// Apoiador router
import apoiadorRouter from "./apoiador.js";
router.use("/", apoiadorRouter);


//Endereco router
import enderecoRouter from "./endereco.js";
router.use("/", enderecoRouter);


// Profissao router
import profissaoRouter from "./profissao.js";
router.use("/", profissaoRouter);

// Classificacao
import classificacaoRouter from "./classificacao.js";
router.use("/", classificacaoRouter);


//Situacao Cadastrodo
import situacaoCadastroRouter from "./situacaoCadastro.js";
router.use("/", situacaoCadastroRouter);


// Tipo Entidade
import tipoEntidadeRouter from "./tipoEntidade.js";
router.use("/", tipoEntidadeRouter);


// Estados
import estadoRouter from "./estado.js";
router.use("/", estadoRouter);


// Entidades
import entidadeRouter from "./entidade.js";
router.use("/", entidadeRouter);


// usuarios
import usuarioRouter from "./usuario.js";
router.use("/", usuarioRouter);



// religioes
import religiaoRouter from "./religiao.js";
router.use("/", religiaoRouter);


// partidos
import partidoRouter from "./partido.js";
router.use("/", partidoRouter);



// Categoria de Demandas
import categoriaDemanda from "./categoriaDemanda.js";
router.use("/", categoriaDemanda);

// Situação de Demandas
import situacaoDemanda from "./situacaoDemanda.js";
router.use("/", situacaoDemanda);


// Demandas
import demandaRouter from "./demandas.js";
router.use("/", demandaRouter);


// Eventos
import eventoRouter from "./evento.js";
router.use("/", eventoRouter);

export default router;