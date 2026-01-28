const {db}=require('../db/db')
const {feedback}=require('../model/feedback')

const add_feedback=async(req,res,next)=>{
    try{
        const{msg,rating}=req.body
        const id=req.user
        if(!msg||!rating||!id){
            return res.status(400).json({
                msg:'The data is missing'
            })
        }
        let fb_id='FBI_11111'
        const prv_id=await db.select({id:feedback.feedback_id}).from(feedback)
        if(prv_id[prv_id.length-1]){
            prv_id=prv_id[prv_id.length-1].id.split('_')[1]
            fb_id=`FBI_${Number(prv_id)+1}`
        }
        const result=await db.insert(feedback).values({rating:rating,cmd:msg,profile_id:id,feedback_id:fb_id})
        if(!result){
            return res.status(400).json({
                msg:'invalid'
            })
        }
        res.status(200).json({
            msg:'Thanks for your valid feedback'
        })
    }catch(err){
        next(err)
    }
}

const show_feedback=async(req,res,next)=>{
    try{
        const feedback_detail=await db.select().from(feedback)
        if(!feedback_detail){
            return res.status(200).json({
                msg:'The feedback is empty'
            })
        }
        res.status(200).json({
            feedback_detail
        })
    }catch(err){
        next(err)
    }
}

module.exports={add_feedback,show_feedback}