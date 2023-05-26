const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

router.post("/",async function(req,res){
    try{
        const email = req.body.email
        const password = req.body.password
        const [usuario] = await User.find({email})

        if(usuario){
            if(usuario.email == email){
                const validPassword = bcrypt.compareSync(password,usuario.senha)
                if(validPassword){
                    res.json(usuario)
                }else{
                    res.json({
                        error:true,
                        message:"Usuário ou senha inválidos"
                    })
                }
            }else{
                res.json({
                    error:true,
                    message:"Usuário ou senha inválidos"
                })
            }
        }else{
            res.json({
                error:true,
                message:"Usuário ou senha inválidos"
            })
        }

    }catch(error){
        res.json({
            error:true,
            message:error.message
        })
    }
})

module.exports = router