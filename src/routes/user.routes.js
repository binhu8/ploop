const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.get('/email/:email', async(req, res )=> {
    try{
        const email = req.params.email;
        const [usuario] = await User.find({email: email});
        res.json(usuario)

    }catch(error){
        res.json({
            error: true, 
            message: error.message
        })
    }
})

router.get ("/:id",async function(req,res){
    try{
        const id = req.params.id
        const usuario = await User.findById(id);
        res.json(usuario)
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

router.post("/",async function(req,res){
    try{
        const usuario = req.body
        const [isExist] = await User.find({
            email:usuario.email
        })
        if(isExist){
            res.json({
                error:true,
                type: 'email',
                message:"E-mail já cadastrado."
            })
        }else{
            const salt = bcrypt.genSaltSync(10)
            usuario.senha = bcrypt.hashSync(usuario.senha,salt)
            const usuarioSalvo = await User(usuario).save()
            res.json(usuarioSalvo)
        }
        
    }catch(error){
        res.json({
            error:true,
            type: 'internal',
            message:error.message
        })
    }
})

router.put("/",async function (req,res){
    try{
        const usuario = req.body
        const usuarioAtualizado = await User.findByIdAndUpdate(usuario._id,usuario)
        res.json(usuarioAtualizado)

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
        const usuarioDeletado = await User.findByIdAndDelete(id)
        res.json({
            error:false,
            message:"Usuario deletado."
        })
    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
});



router.put('/seguindo/:id/:seguidor', async(req, res)=> {
    try{
        const id = req.params.id;
        const idSeguidor = req.params.seguidor
        const user = req.body;

        if(user.hasOwnProperty('nome')){
            const seguidor = await User.findById(idSeguidor);
            seguidor.seguidores.push(id);
            const updateSeguidor = await User.findByIdAndUpdate(idSeguidor,seguidor);
            const updatedUser = await User.findByIdAndUpdate(id, user);

            res.json({
                error: false, 
                message: "ok" 
            })
        }else{
            res.json({
                error: true, 
                message: 'Bad request'
            })
        }
        
    }catch(error){
        res.json({
            error: true,
            message: error.message
        })
    }
});

router.put('/unfollow/:id', async(req, res) => {
    try{
        let id = req.params.id
        const {loggedUser, unfollowUser} = req.body;
        await User.findByIdAndUpdate(loggedUser._id, loggedUser)
        await User.findByIdAndUpdate(unfollowUser._id, unfollowUser);

        res.json({
            error:false, 
            message: 'ok'
        });
    }catch(error){
        res.json({
            error: true,
            message: error.message
        })
    }
})


router.post('/seguidores', async (req, res)=> {
    try{
        const seguidoresId = req.body
        const seguidores = await User.find({_id: {'$in': seguidoresId}})
        res.json(seguidores)
    }catch(error){
        res.json({
            error: true,
            message: error.message
        })
    }
})

module.exports = router