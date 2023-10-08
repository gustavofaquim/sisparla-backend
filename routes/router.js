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


export default router;