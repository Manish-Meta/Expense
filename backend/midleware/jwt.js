const jwt = require('jsonwebtoken')

const token_generate=(id,res)=>{
    const token=jwt.sign({id:id},process.env.jwt_sceret_key,{expiresIn:'7d'})
    res.cookie('token',token,{
        maxAge:7*24*60*60*1000,
        httpOnly: true,       
        sameSite: "none",       
        secure: false
    })
    return token
}

const token_decode=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        console.log("token : ",token)
        if(!token){
            res.status(404).json({
                msg:'User not found,Go to login'
            })
            return
        }
        const data=jwt.decode(token,process.env.jwt_sceret_key)
    
        if(!data){
            return res.status(400).json({
                msg:"login expired"
            })
        }
        console.log('id : ',data)
        req.user=data.id
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server err"
        })
    }
}
module.exports={token_decode,token_generate}