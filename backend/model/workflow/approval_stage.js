const {varchar,text,integer,numeric,timestamp,pgTable}=require('drizzle-orm/pg-core')
const {approvel_history}=require('../workflow/workflow')

const approval_stage=pgTable('approval_stage',{
    workflow_id:varchar('workflow_id',{length:20}).references(()=>approvel_history.work_flow_id),
    stage_id:varchar('stage_id',{length:20}),
    approver_type:varchar('approver_type',{length:30}),
    stage_name:varchar('stage_name',{length:20}),
    processing_time:numeric('process_time'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={approval_stage}