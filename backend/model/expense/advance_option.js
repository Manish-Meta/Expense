const {numeric,varchar,integer,timestamp,text,boolean,pgTable}=require('drizzle-orm/pg-core')
const {pay_met}=require('../enum')
const {loc}=require('../location')

const advance_option=pgTable('advance_option',{
    advance_opt_id:varchar('advance_opt_id',{length:20}).primaryKey(),
    project_name:varchar('project_name',{length:30}),
    location:varchar("location_id",{length:20}).references(()=>loc.location_id,{ onDelete: "cascade" }),
    payment_method:pay_met('payment_method'),
    attendees:varchar('attendees',{length:20}),
    billable_client:boolean('billable_client'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={advance_option}