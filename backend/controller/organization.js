const {db}=require('../db/db')
const {org}=require('../model/org')
const {loc}=require('../model/location')
const { eq } = require("drizzle-orm");
 
const create_org=async(req,res)=>{
  try{
    const {
      org_name,
      industry_type,
      employee_count,
      address,
      ph_num,
      web_url,
      default_currency,
      multi_cur,
      auto_update_rate,
      ex_rate_pro,
      start_month,
      year,
      tax_jurisdiction,
      tax_cal
    }=req.body

    const id=req.user
    

  }catch(err){
    
  }
}