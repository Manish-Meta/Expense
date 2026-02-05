const { eq } = require('drizzle-orm')
const {db}=require('../db/db')
const {new_programme}=require('../model/policy/new_programme')
const {policy_setting}=require('../model/policy/policy_setting')
const {transaction_setting}=require('../model/policy/transaction_setting')
const {policy}=require('../zod_schema/policy_schema')

const add_programme=async(req,res,next)=>{
    try{
        const policy_schema=policy.safeParse(req.body)
        const id=req.user
        if(!policy_schema.success){
            res.status(400).json({
                msg:'Invalid format'
            })
            return
        }
        const {policy_name,description,category,currency}=policy_schema.data
        if(!policy_name||!description||!category||!currency||!id){
            res.status(400).json({
                msg:'Invalid data'
            })
            return
        }
        // create policy id
        let policy_id='P_111111'
        let id_detail = await db.select().from(new_programme);
        if(id_detail[id_detail.length-1]){
            id_detail=id_detail[id_detail.length-1].policy_id.split('_')[1]
            policy_id=`P_${Number(id_detail)+1}`
        }
        const policy_insert_detail=await db.insert(new_programme).values({
            policy_id:policy_id,
            profile_id:id,
            group_name:policy_name,
            description:description,
            category:category,
            currency:currency
        })
        if(policy_insert_detail.rowCount==0){
            res.status(400).json({
                msg:'something wrong'
            })
            return
        }
        await db.insert(policy_setting).values({
            policy_id:policy_id
        })

        await db.insert(transaction_setting).values({
            policy_id:policy_id
        })

        res.status(200).json({
            msg:'policy created'
        })
    }catch(err){
        next(err)
    }
}

const edit_policy=async(req,res,next)=>{
    try{
        const {policy_id}=req.params
        if(!policy_id){
            res.status(400).json({
                msg:'Invalid'
            })
            return
        }
        
    }catch(err){
        next(err)
    }
}

const my_policies=async(req,res,next)=>{
    try{
        const id=req.user
        const policy_detail=await db.select().from(new_programme).where(eq(new_programme.profile_id,id))
        if(!policy_detail){
            res.status(200).json({
                msg:'The policy is empty'
            })
            return
        }
        res.status(200).json({
            msg:'policy',
            policy_detail
        })
    }catch(err){
        next(err)
    }
}

module.exports={add_programme}