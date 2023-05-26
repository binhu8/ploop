const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    nome:String,
    dataNasc:Date,
    email:String,
    senha:String,
    seguidores:Array,
    seguindo:Array,
    avatar:String,
})

module.exports = mongoose.model("User",user)



