const {db}=require('../db/db')
const {approval_stage}=require('../model/workflow/approval_stage')
const {applicability_rule}=require('../model/workflow/applicability_rule')
const {approvel_history}=require('../model/workflow/workflow')
const { eq } = require('drizzle-orm')

const create_workflow=async(req,res)=>{
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
            sms_remainder,approve_stage}=req.body
            const {id}=req.user
            if(!id||!work_name||!work_type||!department||!expense_type||!approval||approve_stage.length==0){
                return res.status(400).json({
                    msg:'some data missing'
                })
            }
            const result=await db.transaction(async(table)=>{

                const rules=await table.insert(applicability_rule).values({
                    applicability_id:'2026_rule_001',
                    department:department,
                    expense_type:expense_type,
                    process_time:default_process_time,
                    min_amount:min_amount,
                    max_amount:max_amount,
                    
                }).returning(applicability_rule.applicability_id)
                if(!rules[0].applicability_id){
                    table.rollback()
                    return res.status(400).json({
                        msg:"something went wrong"
                    })
                }
                const work=await table.insert(approvel_history).values({
                    profile_id:id,
                    work_flow_id:'work_001',
                    work_name:work_name,
                    work_type:work_type,
                    description:description,
                    warning:warning,
                    email_notify:email_notify,
                    slack_alert:slack_alert,
                    sms_remainder:sms_remainder,
                    applicability_rule:result[0].applicability_id
                }).returning(work_flow_id)
                console.log("work : ",work," : rules : ",rules)
                for(let stage of approve_stage){
                    let value=await table.insert(approval_stage).values({
                        workflow_id:work,
                        approver_type:stage?.approver_type,
                        stage_name:stage?.stage_name,
                        processing_time:stage?.process_time
                    }).returning(work_flow_id)
                    if(!value){
                        return res.status(400).json({
                            msg:'something went wrong'
                        })
                    }
                }

                console.log("work : ",work)
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
        console.log("err : ",err)
        res.status(500).json({
            msg:'internal server error'
        })
    }
}

const show_workflow=async(req,res)=>{
    try{
        const {id}=req.user
        if(!id){
            return res.status(404).json({
                msg:'User not found'
            })
        }
        const result=await db.select().from(approvel_history)
        .innerJoin(applicability_rule,eq(applicability_rule.applicability_id,approvel_history.applicability_rule))
        .innerJoin(approval_stage,eq(approval_stage.workflow_id,approvel_history.work_flow_id))
        .where(eq(approvel_history.profile_id,id))
        if(!result){
            return res.status(400).json({
                msg:'The workflow is empty'
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:'internal server error'
        })
    }
}
module.exports={create_workflow}