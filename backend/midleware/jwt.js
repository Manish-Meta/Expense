const jwt = require('jsonwebtoken')

const token_generate=(id,res)=>{
    const token=jwt.sign({id:id},process.env.jwt_sceret_key,{expiresIn:'7d'})
    res.cookie('token',token,{maxAge:7*24*60*60})
}

const token_decode=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        const data=jwt.decode(token,process.env.jwt_sceret_key)
        if(!data){
            res.status(404).json({
                msg:"user not found,go to login"
            })
            return
        }
        req.user=data.id
        next()
    }catch(err){
        console.log(err)
        res.status(err).json({
            msg:"internal server err"
        })
    }
}
module.exports={token_decode,token_generate}