const { eq } = require('drizzle-orm')
const {db}=require('../db/db')
const {dept}=require('../model/user/dept')
const {add_dept_schema}=require('../zod_schema/dept_schema')

const add_dept=async(req,res,next)=>{
    try{
        const recieved_data=add_dept_schema.safeParse(req.body);
        if(!recieved_data.success){
            return res.status(400).json({
                msg:"Invalid formate"
            })
        }
        const {dept_name}=recieved_data.data
        if(!dept_name){
            return res.status(400).json({
                msg:'Invalid'
            })
        }
        const last_data=await db.select({dept_id:dept.deptartment_id}).from(dept)
        let inc='D_111001'
        if(last_data[last_data.length-1]){
            inc=last_data[last_data.length-1].dept_id.split('_')[1]
        }
        const value=await db.insert(dept).values({deptartment_id:`D_${Number(inc)+1}`,name:dept_name})
        if(!value){
            res.status(400).json({
                msg:"Something Went Wrong"
            })
            return
        }
        res.status(200).json({
            msg:"Added the department"
        })
    }catch(err){
        next(err)
    }
}

const delete_dept=async(req,res,next)=>{
    try{
        const {id}=req.params
        if(!id){
            res.status(404).json({
                msg:"Invalid data"
            })
            return
        }
        const value=await db.delete(dept).where(eq(dept.deptartment_id,id))
        if(!value){
            res.status(404).json({
                msg:"Invalid data's"
            })
            return
        }
        res.status(200).json({
            msg:"Data Deleted"
        })
    }catch(err){
        next(err)
    }
}

const show_dept=async(req,res,next)=>{
    try{
        const result=await db.select().from(dept)
        if(result.length==0){
            return res.status(200).json({
                msg:'The dept is empty'
            })
        }
        res.status(200).json({
            msg:'Dept',
            data:result
        })
    }catch(err){
        next(err)
    }
}
module.exports={add_dept,delete_dept,show_dept}