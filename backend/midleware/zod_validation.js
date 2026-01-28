const validate=(schema)=>{
    (req,res,next)=>{
        let data=schema.safeParse(req.body)
        if(!data.success){
            return res.status(400).json({
                msg:'Invalid data formate',
                err:data.error.flatten()
            })
        }
        req.body=data.data
        next()
    }
}
module.exports=validate