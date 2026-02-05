const {pgTable,varchar,text,integer,boolean,numeric}=require('drizzle-orm/pg-core')
const {new_programme}=require('../policy/new_programme')

const policy_setting=pgTable('policy_setting',{
    policy_id:varchar('policy_id',{length:20}).references(()=>new_programme.policy_id),
    monthly_limit:numeric('monthly_limit'),
    advance_limit:numeric('advance_limit'),
    adv_policy_plugin:boolean('adv_policy_plugin').default(false),
    auto_budget:boolean('auto_budget').default(true),
    event_meet:boolean('event_meet').default(true),
    allow_qr_voucher:boolean('allow_qr_voucher').default(false),
    show_balance:boolean('show_balance').default(false),
    restrict_alcohol:boolean('restrict_alcohol').default(false),
    mjs_restriction:boolean('mjs_restriction').default(false),
    hotel_restriction:numeric('hotel_restriction'),
    vendor_onboarding:boolean('vendor_onboarding').default(true)
})

module.exports={policy_setting}