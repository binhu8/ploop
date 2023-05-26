const express = require("express");
const app = express();
const porta = process.env.PORT || 4005;
const database = require("./src/database/database.js");
const cors = require('cors')

app.use(express.json());

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (req, res)=>{
    res.send('ploop  api')
})

app.use("/publication",require("./src/routes/publication.routes"))
app.use("/comentario",require("./src/routes/comentario.routes"))
app.use("/user",require("./src/routes/user.routes"))
app.use("/login",require("./src/routes/login.routes"))

app.listen(porta,function(){

    console.log("Servidor online!")

})

