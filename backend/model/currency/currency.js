const { boolean } = require('drizzle-orm/pg-core')
const {pgTable,integer,numeric,varchar,timestamp,text}=require('drizzle-orm/pg-core')

const currency=pgTable('currency',{
    currency_id:varchar('currency_id',{length:20}).primaryKey(),
    currency_code:varchar('currency_code',{length:20}),
    currency_name:varchar('currency_name',{length:30}),
    country_code:varchar('country_code',{length:30}),
    current_price:integer('current_price'),
    auto_update:boolean('auto_update'),
    multiple_cur_support:boolean('multiple_cur_support'),
    exchange_rate_provider:text('exchange_rate_provider'),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={currency}