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

// Codades
import cidadeRouter from "./cidade.js";
router.use("/", cidadeRouter);


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


// Despesas
import despesaRouter from "./despesas.js";
router.use("/", despesaRouter);


// Filtros
import filtroRouter from "./filtro.js";
router.use("/", filtroRouter);

// Grupos
import grupoRouter from "./grupo.js";
router.use("/", grupoRouter);

// Origem de Cadastros
import origemRouter from "./origemCadastro.js";
router.use("/", origemRouter);

// Origem de Cadastros
import dashboardRouter from "./dashboard.js";
router.use("/", dashboardRouter);


// Sexo
import sexoRouter from "./sexo.js";
router.use("/", sexoRouter);


import exportDados from "./exportRoutes.js";
router.use("/", exportDados);

// tTwilio
//import twilioRouter from "./twilio.js";
//router.use("/", twilioRouter);

// Mensagem
import mensagemRouter from "./mensagem.js";
router.use("/", mensagemRouter);

import localizacaoRouter from "./localizacao.js";
router.use("/", localizacaoRouter);

export default router;