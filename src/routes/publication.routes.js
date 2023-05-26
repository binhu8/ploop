const router = require("express").Router()
const Publication = require("../models/publication");
const User = require('../models/user');



router.get('/:userId', async(req, res)=>{
    try{
        const userId = req.params.userId;
        console.log(userId)
        const publications = await Publication.find({autor: userId}).sort({dataCriacao: -1})
        console.log(publications)
        res.json(publications)

    }catch(error){
        res.json({
            error: true, 
            message: error.message
        })
    }
})



router.post('/destaques', async(req, res)=> {
    try{
        const autores  = req.body
        let publicacoes = await Publication.find({autor: {'$in': autores}}).sort({curtidas: -1});
        publicacoes = publicacoes.filter(publicacao => {
            return publicacao.curtidas.length > 1
        })
        console.log(publicacoes)
    }catch(error){
        res.json({
            error: true, 
            message: error.message
        })
    }
})


router.get("/seguidores/:id", async(req, res) => {
    try{
        const id = req.params.id;
        const usuario = await User.findById(id);
        usuario.seguindo.push(id)
        const publications = await Publication.find({autor: {"$in": usuario.seguindo}}).sort({dataCriacao: -1})
        const data = []
        for(pub of publications){
            const autor = await User.findById(pub.autor);
            const obj = { pub: pub, autor: autor}
            data.push(obj)
        }
         res.json({
            error:false,
            data: data
        })
    }catch(error){
        res.json({
            error: true, 
            message: error.message
        })
    }
})

router.post("/",async function(req,res){
    try{
        const publication = req.body
        const publicationSalvo = await Publication(publication).save()
        res.json(publicationSalvo)
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

router.put("/",async function (req,res){
    try{
        const publication = req.body
        const publicationAtualizado = await Publication.findByIdAndUpdate(publication._id,publication)
        res.json(publicationAtualizado)

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
        const publicationDeletado = await Publication.findByIdAndDelete(id)
        res.json({
            error:false,
            message:"Publicação deletada."
        })
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
});

router.post('/curtir/:id', async (req, res)=> {
    try{
        const publication = req.body;
        console.log(publication)
        const id = req.params.id;
        await Publication.findByIdAndUpdate(id, publication);
        res.json({
            error: false,
            message: 'ok'
        })
        
    }catch(error){
        res.json({
            error: true,
            message: error.message
        })
    }
})



module.exports = router