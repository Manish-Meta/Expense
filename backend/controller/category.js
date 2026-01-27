const { eq } = require('drizzle-orm')
const {db}=require('../db/db')
const {category}=require('../model/expense/category')
const {allow_category}=require('../model/user/allowed_category')
const { date } = require('drizzle-orm/mysql-core')

const cre_category=async(req,res,next)=>{
    try{
        const id=req.user
        const {cat_name,limit,rec_req,is_active,description}=req.body
        if(!cat_name || !limit){
            return res.status(400).json({
                msg:'Invalid data'
            })
        }
        const last_data=await db.select({category_id:category.category_id}).from(category)
        let value=last_data[last_data.length-1].category_id.split('_')[1]
        const result=await db.insert(category).values({category_id:`CATE_${Number(value)+1}`,cat_name:cat_name,limit:limit,description:description,rec_req:rec_req,is_active:is_active,profile_id:id})
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
        next(err)
    }
}

const show_category=async(req,res,next)=>{
    try{
        const id=req.user
        if(!id){
            return res.status(400).json({
                msg:'invalid data'
            })
        }

        const result=await db.select({cat_name:category.cat_name,id:category.category_id,description:category.description,limit:category.limit,is_active:category.is_active,rec_req:category.rec_req}).from(category).where(eq(category.profile_id,id))
        if(!result){
            return res.status(400).json({
                msg:"the empty, go to add category"
            })
        }
        res.status(201).json({
            msg:"category",
            data:result
        })
    }catch(err){
        next(err)
    }
}

const delete_category=async(req,res,next)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json({
                msg:"Data missing"
            })
        }
        const result=await db.delete(category).where(eq(category.category_id,id))
        if(result.rowCount==0){
            return res.status(400).json({
                msg:"Invalid data"
            })
        }
        res.status(200).json({
            msg:"category deleted"
        })
    }catch(err){
        next(err)
    }
}

const update_category=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {cat_name,limit,rec_req,is_active,description}=req.body
        if(!id){
            return res.status(404).json({
                msg:"category not found"
            })
        }
        const result=await db.update(category).set({
            cat_name:cat_name?cat_name:category.cat_name,
            limit:limit?limit:category.limit,
            rec_req:rec_req!=undefined?rec_req:category.rec_req,
            is_active:is_active!=undefined?is_active:category.is_active,
            description:description?description:category.description,
            updated_at:new Date()
        }).where(eq(category.category_id,id))
        if(!result){
            return res.status(400).json({
                msg:'Data not updated'
            })
        }
        res.status(200).json({
            msg:'The category updated'
        })

    }catch(err){
        next(err)
    }
}

const permission_cat=async(req,res,next)=>{
    try{
        const id=req.user
        let send_category=[]
        const detail=await db.select({id:allow_category.category}).from(allow_category).where(eq(allow_category.profile_id,id))
        
        for(let data of detail){
            if(data.id=='ALL'){

                const category_filter=await db.select({category_id:category.category_id,category:category.cat_name,category_limit:category.limit,description:category.description}).from(category).where(eq(category.is_active,true))
                if(category_filter.length==0){
                    return res.status(200).json({
                        msg:'the category is empty'
                    })
                }
                return res.status(200).json({
                  data:category_filter  
                })
            }
            const uniq_category=await db.select({category_id:category.category_id,category:category.cat_name,category_limit:category.limit,description:category.description}).from(category).where(eq(category.category_id,data.id),eq(category.is_active,true))
            send_category.push(uniq_category)
        }
        res.status(200).json({
            date:send_category
        })
    }catch(err){
        next(err)
    }
}

module.exports={cre_category,show_category,delete_category,update_category,permission_cat}