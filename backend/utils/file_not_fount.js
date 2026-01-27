const file_not_found=(req,res)=>{
    return res.status(404).json({
        msg:'The URL not found'
    })
}

module.exports=file_not_found
