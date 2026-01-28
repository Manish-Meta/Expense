const { pgTable } = require("drizzle-orm/pg-core");
const express = require("express");
const {profile} = require("../model/user/profile")
const { emailTemplate } = require("../model/EmailTemplate/emailTemplate");


const ShowAllEmailTemplates = async(req, res)=>{

    try {
        const emails =  await db.select({emailTemplate, profile:profile.profile_id.name }).from(emailTemplate).innerJoin(profile).where(eq(emailTemplate.profile_id, profile.profile_id))

        if(!emails) {
            return res.status(201).json({data:"No EmailTemplates"})
        }
        res.status(200).json({data:emails});

    }
    catch(err){
            res.status(500).json({msg:"Server Error"});
    }
}

// single Template

const ShowSingleEmailTemplates = async(req, res)=>{
    const {ids} = req.body

    try {
        const email =  await db.select().from(emailTemplate).where(eq(emailTemplate.id,ids));

        if(!email) {
            return res.status(201).json({data:"Email Not found"})
        }
        req.status(200).json({data:email});

    }
    catch(err){
            res.status(500).json({msg:"Server Error"});
    }
}

const CreateEmailTemplates =async(req, res)=>{

    try{
        const {profile_id, actionType, subject, body, isActive } = req.body;

        const create = await db.insert(emailTemplate).values({
            "profile_id":profile_id,
            "actionType":actionType,
            "subject":subject,
            "body":body,
            "isActive":isActive
        });

        if(!create){
            return res.status(400).json({msg:"Email Template NotCreated"});
        }
        return res.status(200).json({msg:"Email Template Created"});

    }

    catch(err){
        return res.status(500).json({msg:"internal Error"});
    }
}


// patch email controller
const PatchEmailTemplate=(req, res)=>{}

module.exports = {ShowAllEmailTemplates, ShowSingleEmailTemplates, CreateEmailTemplates}