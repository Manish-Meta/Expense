const {new_programme}=require('../policy/new_programme')
const {pgTable,varchar,integer,numeric,boolean}=require('drizzle-orm/pg-core')


const transaction_setting=pgTable('transaction_setting',{
    policy_id:varchar('policy_id',{length:20}).references(()=>new_programme.policy_id),
    outstation_travel:varchar('outstation_travel',{length:20}),
    flight_transaction:boolean('flight_transaction').default(true),
    bus_transaction:boolean('bus_transaction').default(true),
    hotel_transaction:boolean('hotel_transaction').default(true),
    cab_transaction:boolean('cab_transaction').default(true),
    recharge_transaction:boolean('recharge_transaction').default(true)
})

module.exports={transaction_setting}