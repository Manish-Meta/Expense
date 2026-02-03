const {pgTable,integer,text,numeric,varchar}=require('drizzle-orm/pg-core')
const {currency}=require('../currency/currency')
const {category}=require('../expense/category')
const {profile}=require('../user/profile')

const new_programme=pgTable('new_programme',{
    policy_id:varchar('policy_id',{length:20}).primaryKey(),
    profile_id:varchar('profile_id',{length:20}).references(()=>profile.profile_id),
    group_name:varchar('group_name'),
    description:text('description'),
    category:varchar('category',{length:20}).references(()=>category.category_id),
    currency:varchar('currency',{length:20}).references(()=>currency.currency_id)
})

module.exports={new_programme}