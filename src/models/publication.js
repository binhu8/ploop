const mongoose = require("mongoose")
const Schema = mongoose.Schema

const publication = new Schema({
    curtidas:{
        type: Array,
        default: []
    },
    comentarios:{
        type: Array,
        default: []
    },
    conteudo:String,
    autor:{
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date, 
        default: Date.now
    }
    
})
module.exports = mongoose.model("Publication",publication)