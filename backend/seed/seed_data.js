require('dotenv').config({path:"../.env"}); // load .env at the top
const fs = require('fs');
const path = require('path');
const { db } = require('../db/db');
const role_data=require('./data/role.json')
const category_data=require('../seed/data/category.json')
const dept_data=require('./data/dept.json')
const admin_data=require('./data/admin.json')
const user_data=require('./data/user.json')
const allow_cat_data =require('./data/allow_category.json')
const emp_role_data=require('./data/emp_roles.json')
const emp_config_data=require('./data/emp_config.json')

const {profile}=require('../model/user/profile')
const { roles } = require('../model/user/role');
const {user}=require('../model/user/user')
const {dept}=require('../model/user/dept')
const {employee_config}=require('../model/user/emp_config')
const {employee_roles}=require('../model/user/emp_role')
const {allow_category}=require('../model/user/allowed_category')
const {category}=require('../model/expense/category')
const {encrypt}=require('../midleware/pass_enc');

const seed = async () => {
  try {
      // role
      await db.delete(roles).execute()
    await db.insert(roles).values(role_data).onConflictDoNothing();

    // add dept
    await db.delete(dept).execute()
    await db.insert(dept).values(dept_data)

    // Add admin
    await db.delete(profile).execute()
    await db.insert(profile).values(admin_data);

    // add admin credential
    await db.delete(user).execute()
    let user_id='U_111111'
    let user_detail=await db.select().from(user)
    if(user_detail.length != 0){
        let value=user_detail[user_detail.length-1].user_id.split('_')[1]
        user_id=`U_${Number(value)+1}`
    }
    let hash_pass=await encrypt(admin_data[0].profile_id)
    await db.insert(user).values({user_id:user_id,profile_id:admin_data[0].profile_id,password_hash:hash_pass})

    // add category
    await db.delete(category).execute()
    await db.insert(category).values(category_data)

    // add employee
    await db.insert(profile).values(user_data)

    // add emp config
    await db.insert(employee_config).values(emp_config_data)

    // add emp credential
    user_id='U_111111'
    user_detail=await db.select().from(user)
    if(user_detail.length != 0){
        let value=user_detail[user_detail.length-1].user_id.split('_')[1]
        user_id=Number(value)+1
    }

    for(let login_data of user_data){
        let pass=await encrypt(login_data.profile_id)
        await db.insert(user).values({user_id:`U_${user_id}`,profile_id:login_data.profile_id,password_hash:pass})
        user_id+=1;
    }

    // add allow category each employee
    await db.delete(allow_category).execute()
    for(let all_cat_json of allow_cat_data){
        for(let id of all_cat_json.category_ids){
            await db.insert(allow_category).values({profile_id:all_cat_json.profile_id,category:id})
        }
    }

    // add emp_role
    await db.delete(employee_roles).execute();
    for(let emp_roles of emp_role_data){
        await db.insert(employee_roles).values({profile_id:emp_roles.profile_id,role_id:emp_roles.role_id,assigned_at:new Date(emp_roles.assigned_at)})
    }

    console.log('Seed finished');
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1)
  } 
};

seed();