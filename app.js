import express  from "express";
import cors  from "cors";

const app = express();

app.use(cors());

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
