import express from "express";

const router = express.Router();


// Apoiador router
import apoiadorRouter from "./apoiador.js";
router.use("/", apoiadorRouter);


//Endereco router
import enderecoRouter from "./endereco.js";
router.use("/", enderecoRouter);

export default router;