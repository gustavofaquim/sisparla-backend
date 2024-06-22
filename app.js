import express  from "express";
import multer from "./config/multer.js";
import path from "path";
import { fileURLToPath } from 'url';
import cors  from "cors";
import bodyParser from 'body-parser';
import cronService from './services/cronService.js'; // Importe o agendador cron



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


// Servir arquivos estáticos diretamente da raiz
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.json({limit: '35mb'}));

app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '35mb',
      parameterLimit: 50000,
    }),
);

app.use(express.json());



// DB Connection
//import conn from "./db/conn.js";
//conn();



//Routes
import routes from "./routes/router.js";

app.use("/api", routes);



app.listen(3000, function(){
    console.log("Servidor Online! Porta 3000")
});
