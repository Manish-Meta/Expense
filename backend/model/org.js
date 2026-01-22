const {pgTable,integer,numeric,uuid,varchar,text,timestamp,date,boolean}=require('drizzle-orm/pg-core')
const { profile } = require('./user/profile')
const {tax_cal_method}=require('./enum')
const {loc}=require('./location')
const {currency}=require('./currency/currency')

const org=pgTable('organization',{
    organization_id:varchar('organization_id').primaryKey(),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id,{ onDelete: "cascade" }),
    organization_name:varchar('org_name',{length:30}).unique(),
    industry_type:text('industry_type'),
    emp_counut:numeric('emp_count').notNull(),
    address:varchar('address',{length:20}).references(()=>loc.location_id,{ onDelete: "cascade" }),
    ph_num:numeric('ph_num').notNull(),
    web_url:varchar('web_url',{length:100}).notNull(),
    default_currency:varchar('default_currency',{length:20}).references(()=>currency.currency_id,{ onDelete: "cascade" }),
    multi_cur:boolean('mul_cur').default(false),
    auto_update_rate:boolean('auto_update_rates').default(false),
    ex_rate_pro:varchar('ex_rate_pro',{length:30}),
    start_month:varchar('start_month',{length:20}),
    year:numeric('year'),
    tax_jurisdiction:varchar('tax_jurisdiction',{length:30}),
    tax_cal:tax_cal_method('tax_cal_method').default('Tax Inclusive'),
    org_logo:text('org_logo'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={org}