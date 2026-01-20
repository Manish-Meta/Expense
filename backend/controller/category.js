const { eq } = require('drizzle-orm')
const {db}=require('../db/db')
const {category}=require('../model/expense/category')

const cre_category=async(req,res)=>{
    try{
        // const {id}=req.user
        const {cat_name,limit,rec_req,is_active,description}=req.body
        console.log(cat_name,limit,rec_req,is_active,description)
        if(!cat_name || !limit){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        const result=await db.insert(category).values({category_id:'cat_123',cat_name:cat_name,limit:limit,description:description,rec_req:rec_req,is_active:is_active,profile_id:'emp_121'})
        if(!result){
            return res.status(400).json({
                msg:'Something went wrong'
            })
        }
        res.status(200).json({
            msg:'category added',
            result
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

const show_category=async(req,res)=>{
    try{
        const result=await db.select({name:category.cat_name,id:category.category_id,description:category.description,limit:category.limit,is_active:category.is_active,receipt_req:category.rec_req}).from(category)
        if(!result){
            return res.status(400).json({
                msg:"No response"
            })
        }
        res.status(201).json({
            msg:"category",
            data:result
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

const delete_category=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                msg:"Data missing"
            })
        }
        const result=await db.delete(category).where(eq(category.category_id,id))
        if(!result){
            return res.status(400).json({
                msg:"Invalid data"
            })
        }
        res.status(204).json({
            msg:"category deleted"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={cre_category,show_category,delete_category}