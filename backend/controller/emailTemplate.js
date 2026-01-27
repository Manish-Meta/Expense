const {profile} = require("../model/user/profile")
const { emailtemplate } = require("../model/emailTemplate");
const {db}=require('../db/db')
const ShowAllEmailTemplates = async(req, res,next)=>{
 
    try {
        const emails =  await db.select({emailtemplate, profile:profile.profile_id.name }).from(emailtemplate).innerJoin(profile).innerJoin(eq(emailtemplate.profile_id, profile.profile_id))
 
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
 
const CreateEmailTemplates =async(req, res,next)=>{
 
    try{
        const {id,profile_id, actionType, subject, body, isActive } = req.body;
        console.log(req.body)
        const create = await db.insert(emailtemplate).values({
            id:id,
            profile_id:profile_id,
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