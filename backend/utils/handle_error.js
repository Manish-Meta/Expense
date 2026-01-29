const handle_error=(err,req,res,next)=>{
   if(err){
     if(process.env.NODE_ENV=='Production'){
        return res.status(500).json({
        msg:'Internal server error', 
    })
    }else{
        console.log(err)
        return res.status(500).json({
            msg:'Internal error',
            stack:err.stack,
            message:err.message,
            error:err
        })
    }
   }
}
module.exports=handle_error