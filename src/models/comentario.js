const mongoose = require("mongoose")
const Schema = mongoose.Schema

const comentario = new Schema({
    autor:String,
    conteudo:String,
    respostas:Array,
    curtidas:Array,
    publicacao:String,
})

module.exports = mongoose.model("Comentario",comentario)