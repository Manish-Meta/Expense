const {profile} = require("../model/user/profile")
const { emailtemplate } = require("../model/emailTemplate");
const {eq}=require('drizzle-orm')
const {db}=require('../db/db')
const ShowAllEmailTemplates = async(req, res,next)=>{
 
    try {
        const id=req.user
        const emails =  await db.select({emailtemplate, profile:profile.username }).from(emailtemplate)
        .innerJoin(profile,eq(profile.profile_id,emailtemplate.profile_id))
        .where(eq(profile.profile_id,id))

 
        if(!emails) {
            return res.status(201).json({data:"No EmailTemplates"})
        }
        res.status(200).json({data:emails});
 
    }
    catch(err){
            next(err)
    }
}
 
// single Template
 
const ShowSingleEmailTemplates = async(req, res,next)=>{
    const {ids} = req.body
 
    try {
        const email =  await db.select().from(emailtemplate).where(eq(emailtemplate.id,ids));
 
        if(!email) {
            return res.status(201).json({data:"Email Not found"})
        }
        req.status(200).json({data:email});
 
    }
    catch(err){
            next(err)
    }
}
 
const CreateEmailTemplates =async(req,res,next)=>{

    try{
        const {actionType, subject, body, isActive } = req.body;
        const id=req.user
        let email_id='EM_34524'
        let email=await db.select({id:emailtemplate.id}).from(emailtemplate)
        if(email[email.length-1]){
            email=email[email.length-1].id.split('_')[1]
            email_id=`EM_${Number(email)+1}`
        }
        const create = await db.insert(emailtemplate).values({
            id:email_id,
            profile_id:id,
            actionType:actionType,
            subject:subject,
            body:body,
            isActive:isActive
        });
 
        
        if(!create){
            return res.status(400).json({msg:"Email Template NotCreated"});
        }
        res.status(200).json({msg:"Email Template Created"});
    }
    catch(err){
        next(err)
    }
}
 
 
module.exports = {ShowAllEmailTemplates, ShowSingleEmailTemplates, CreateEmailTemplates}