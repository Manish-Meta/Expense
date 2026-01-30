const {db}=require('../db/db')
const {approval_stage}=require('../model/workflow/approval_stage')
const {applicability_rule}=require('../model/workflow/applicability_rule')
const {approvel_history}=require('../model/workflow/workflow')
const { eq } = require('drizzle-orm')
const {new_workflow_schema}=require('../zod_schema/workflow_schema')

const create_workflow=async(req,res,next)=>{
    try{
        const {
            work_name,
            work_type,
            description,
            department,
            expense_type,
            min_amount,
            max_amount,
            approval,
            default_process_time,
            warning,
            email_notify,
            slack_alert,
            sms_remainder,
            approve_stage}=req.body
            const id=req.user
            if(!id||!work_name||!work_type||!department||!expense_type||!approval||approve_stage.length==0){
                return res.status(400).json({
                    msg:'some data missing'
                })
            }
            const result=await db.transaction(async(table)=>{
                let applicable_id='2026_rule_111'
                let data=await table.select({id:applicability_rule.applicability_id}).from(applicability_rule)
                if(data[data.length-1]?.id){
                    data=data[data.length-1].id.split('_')[2]
                    applicable_id=`2026_rule_${Number(data)+1}`
                }
                const rules=await table.insert(applicability_rule).values({
                    applicability_id:applicable_id,
                    department:department,
                    expense_type:expense_type,
                    process_time:default_process_time,
                    min_amount:min_amount,
                    max_amount:max_amount,
                    
                }).returning({rule_id:applicability_rule.applicability_id})
                if(!rules[0].rule_id){
                    table.rollback()
                    return res.status(400).json({
                        msg:"something went wrong"
                    })
                }
                let work_id='WF_11111'
                let make_id=await table.select({id:approvel_history.work_flow_id}).from(approvel_history)
                if(make_id[make_id.length-1]){
                    make_id=make_id[make_id.length-1].id.split('_')[1]
                    work_id=`WF_${Number(make_id)+1}`
                }
                const work=await table.insert(approvel_history).values({
                    profile_id:id,
                    work_flow_id:work_id,
                    workflow_name:work_name,
                    workflow_type:work_type,
                    description:description,
                    warning:warning,
                    process_time:default_process_time,
                    email_notify:email_notify,
                    slack_alert:slack_alert,
                    sms_remainder:sms_remainder,
                    applicability_rule:rules[0]?.rule_id
                }).returning()
                let stage_id=1111
                let add_id=false
                let stage_data=await table.select({id:approval_stage.stage_id}).from(approval_stage)
                if(stage_data[stage_data.length-1]?.id){
                    stage_data=stage_data[stage_data.length-1].id.split('_')[2]
                    stage_id=Number(stage_data)
                    add_id=true
                }
                for(let stage of approval){
                    stage_id+=1;
                    let value=await table.insert(approval_stage).values({
                        workflow_id:work_id,
                        approver_type:stage?.approver_type,
                        stage_name:stage?.stage_name,
                        processing_time:stage?.process_time,
                        stage_id:add_id?`AS_${stage_id}`:`AS_${stage_id}`
                    })
                    if(!value){
                        table.rollback()
                        return res.status(400).json({
                            msg:'something went wrong'
                        })
                    }
                }
              return true
            })
            if(!result){
                return res.status(400).json({
                    msg:'Invalid'
                })
            }

            res.status(200).json({
                msg:"The stage is added"
            })

    }catch(err){
        next(err)
    }
}

const show_workflow=async(req,res,next)=>{
    try{
        const id=req.user
        if(!id){
            return res.status(404).json({
                msg:'User not found'
            })
        }
        const result=await db.select({work_flow:approvel_history,applicability_rule:applicability_rule,approval_stage:approval_stage}).from(approvel_history)
        .innerJoin(applicability_rule,eq(applicability_rule.applicability_id,approvel_history.applicability_rule))
        .innerJoin(approval_stage,eq(approval_stage.workflow_id,approvel_history.work_flow_id))
        .where(eq(approvel_history.profile_id,id))
        if(!result){
            return res.status(400).json({
                msg:'The workflow is empty'
            })
        }
        res.status(200).json({
            msg:'your workflow here',
            result
        })
    }catch(err){
        next(err)
    }
}

const update_workflow=async(req,res,next)=>{
    try{
        const {id}=req.params
        const {
            work_name,
            work_type,
            description,
            department,
            expense_type,
            min_amount,
            max_amount,
            approval,
            default_process_time,
            warning,
            email_notify,
            slack_alert,
            sms_remainder,
            approve_stage
        }=req.body
    }catch(err){
        next(err)
    }
}
module.exports={create_workflow,show_workflow}