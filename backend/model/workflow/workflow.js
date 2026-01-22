const {varchar,text,integer,numeric,timestamp,pgTable}=require('drizzle-orm/pg-core');
const { boolean } = require('drizzle-orm/gel-core');
const {applicability_rule}=require('./applicability_rule');
const { profile } = require('../user/profile');

const approvel_history=pgTable('approvel_history',{
    profile_id:varchar('profile_id',{lenght:20}).references(()=>profile.profile_id),
    work_flow_id:varchar('work_flow_id',{lenght:20}).primaryKey(),
    workflow_name:varchar('workflow_name',{length:20}).notNull(),
    workflow_type:varchar('workflow_type',{lenght:30}),
    description:text('description'),
    applicability_rule:varchar('applicability_rule').references(()=>applicability_rule.applicability_id),
    process_time:numeric('process_time'),
    warning:numeric('warning'),
    email_notify:boolean('email_notify'),
    slack_alert:boolean('slack_alert'),
    sms_remainder:boolean('sms_remainder'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={approvel_history}