const {db}=require('../db/db');
const {info}=require('../model/info')

const send_need_info=async(to_id,from_id,remark,next)=>{
    try{
        const result=await db.insert(info).values({
            from:from_id,
            to:to_id,
            information:remark
        })
        if(result.rowCount==0){
            return false
        }
        return true
    }catch(err){
        next(err)
        return false
    }
}

module.exports=send_need_info