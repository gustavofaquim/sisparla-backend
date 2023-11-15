import express  from "express";
import cors  from "cors";
import bodyParser from 'body-parser';

const app = express();


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
