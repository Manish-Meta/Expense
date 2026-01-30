const {z}=require('zod')

const new_workflow_schema=z.object({
            work_name:z.string(),
            work_type:z.string(),
            description:z.string(),
            department:z.string(),
            expense_type:z.string(),
            min_amount:z.number(),
            max_amount:z.number(),
            approval:z.string(),
            default_process_time:z.string(),
            warning:z.string(),
            email_notify:z.boolean(),
            slack_alert:z.boolean(),
            sms_remainder:z.number(),
            approve_stage:z.array(
                z.object({
                        workflow_id:z.string(),
                        approver_type:z.string(),
                        stage_name:z.string(),
                        processing_time:z.number(),
                        stage_id:z.string
                })
            )
})

module.exports={new_workflow_schema}