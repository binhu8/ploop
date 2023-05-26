const mongoose = require("mongoose")
const uri = "mongodb+srv://blackreaper:blackreaper@cluster0.fzuumqc.mongodb.net/ploop"

mongoose.connect(uri)
.then(function(){

    console.log("Conectado com sucesso ao banco de dados.")
}).catch(function(error){

    console.log(error)
})

