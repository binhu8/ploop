const router = require("express").Router()
const Comentario = require("../models/comentario");
const Publication = require("../models/publication");
const User = require('../models/user')

router.get ("/:id",async function(req,res){
    try{
        const id = req.params.id
        const comentario = await Comentario.findById(id)
        res.json(comentario)
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
});

router.post("/comentarios", async (req, res) => {
    try{
        const payload = req.body;
        const comentarios = await Comentario.find({autor: {'$in': payload.comments}, publicacao: payload.publication});
        let data = [];

        for(comentario of comentarios){
            let user = await User.findById(comentario.autor);
            delete user.senha
            const response = {
                autor: user, 
                comment: comentario
            }
            
            data.push(response)
        }
        res.json(data)
    }catch(error){
        res.json({
            error: true, 
            message: error.message
        })
    }
})

router.get ("/getComentariosByPublication/:publication",async function(req,res){
    try{
        const publicacao = req.params.publication
        const comentarios = await Comentario.find({publicacao})
        res.json(comentarios)
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

router.post("/",async function(req,res){
    try{
        const comentario = req.body
        const publicacao = await Publication.findById(comentario.publicacao)
        publicacao.comentarios.push(comentario.autor);
        await Publication.findByIdAndUpdate(publicacao._id, publicacao);
        await Comentario(comentario).save()
        res.json({
            error: false, 
            message: "ok"
        })
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

router.put("/",async function (req,res){
    try{
        const comentario = req.body
        const comentarioAtualizado = await Comentario.findByIdAndUpdate(comentario._id,comentario)
        res.json(comentarioAtualizado)

    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

router.delete("/:id",async function (req,res){
    try{
        const id = req.params.id
        const comentarioDeletado = await Comentario.findByIdAndDelete(id)
        res.json({
            error:false,
            message:"Comentário deletado."
        })
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

module.exports = router