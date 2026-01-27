const {db}=require('../db/db')
const {org}=require('../model/org')
const {loc}=require('../model/location')
const { eq } = require("drizzle-orm");
 
const create_org=async(req,res,next)=>{
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
    const file=req.file
    console.log('files : ',file)
    const id=req.user
    const organization=await db.insert(org).values({
      profile_id:id,
      organization_id:'',
      org_logo:'',

    })

  }catch(err){
    next(err)
  }
}

module.exports={create_org}