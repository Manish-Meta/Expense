const {pgTable,numeric,varchar,text,boolean,timestamp}=require('drizzle-orm/pg-core')
const{category}=require('../expense/category')
const {loc}=require('../location')
const {advance_option}=require('../expense/advance_option')
const {new_voucher}=require('./new_voucher')
const {priority,compliance}=require('../enum')

const voucher_expense=pgTable('voucher_expense',{
    voucher_id:varchar('voucher_id',{length:20}).references(()=>new_voucher.voucher_id,{onDelete:'cascade'}),
    exp_id:varchar('exp_id',{length:20}).primaryKey(),
    amount:numeric('amount').notNull(),
    date:timestamp('date',{mode:'date'}),
    merchant:varchar('vendor',{length:25}),
    business_purpose:text('business_purpose'),
    cat_id:varchar('category_id',{lenght:20}).references(()=>category.category_id,{ onDelete: "cascade" }),
    reciept:text('reciept'),
    priority:priority('priority'),
    compliance:compliance('compliance'),
    remark:text(),
    created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
    updated_at: timestamp("updated_at", { mode: "date" }).defaultNow()
})

module.exports={voucher_expense}