const express = require("express");
const app = express();
const porta = process.env.PORT || 4005;
const database = require("./src/database/database.js");
const cors = require('cors')


app.use(cors())
app.use(express.json());
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

