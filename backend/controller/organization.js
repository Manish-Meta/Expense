const {db}=require('../db/db')
const {org}=require('../model/org')
const {loc}=require('../model/location')
const {currency}=require('../model/currency/currency')
const { eq } = require("drizzle-orm");
const add_secure_detail=require('../utils/add_security_detail')
const {secure_password}=require('../model/secure')
 
const create_org=async(req,res,next)=>{
  try{
    const file=req.file
    const {
      org_name,
      industry_type,
      employee_count,
      address,
      ph_num,
      web_url,
      currency_detail,
      multi_cur,
      auto_update_rate,
      ex_rate_pro,
      start_month,
      year,
      tax_jurisdiction,
      tax_cal
    }=req.body
    const id=req.user
    if(!file||!id){
      return res.status(400).json({
        msg:'Data missing'
      })
    }
    let org_id='ORG_11111'
    let cur_id=`AMT_33333`
    let money=currency_detail.split('-')
    console.log(money)
    let money_name=money[1]
    let money_code=money[0].split(' ')[1]
    let coun_code=money[0].split(' ')[0]
    let value=await db.select({id:org.organization_id}).from(org)
    if(value[value.length-1]){
      value=value[value.length-1].id.split('_')[1]
      org_id=`ORG_${Number(value)+1}`
    }

    let cur_value=await db.select({id:currency.currency_id}).from(currency)
    if(cur_value[cur_value.length-1]){
      cur_value=cur_value[cur_value.length-1].id.split('_')[1]
      cur_id=`AMT_${Number(cur_value)+1}`
    }
    await db.transaction(async(table)=>{
    let loc_id=`LOC_33333`
    let value=await table.select({id:loc.location_id}).from(loc)
    if(value[value.length-1]){
      value=value[value.length-1].id.split('_')[1]
      loc_id=`LOC_${Number(value)+1}`
    }
     const new_currency=await table.insert(currency).values({
      currency_id:cur_id,
      currency_code:money_code,
      country_code:coun_code,
      currency_name:money_name,
      auto_update:auto_update_rate,
      multiple_cur_support:multi_cur,
      exchange_rate_provider:ex_rate_pro,
    })
    const location=await table.insert(loc).values({
      area:address,
      location_id:loc_id
    })
    const organization=await table.insert(org).values({
      profile_id:id,
      organization_id:org_id,
      organization_name:org_name,
      org_logo:file.originalname,
      industry_type:industry_type,
      emp_counut:employee_count,
      address:loc_id,
      ph_num:ph_num,
      cur_id:cur_id,
      web_url:web_url,
      start_month:start_month,
      year:year,
      tax_jurisdiction:tax_jurisdiction,
      tax_cal:tax_cal

    })
   
      const result=await add_secure_detail(next,org_id,table,id)
      if(!result||organization.rowCount==0||location.rowCount==0||new_currency.rowCount==0){
        table.rollback()
        return res.status(400).json({
          msg:'Invalid'
        })
      }
      return
    })

    res.status(201).json({
      msg:'organization created success'
    })
  }catch(err){
    next(err)
  }
}

const update_organization=async(req,res,next)=>{
  try{
    
  }catch(err){
    next(err)
  }
}

const update_security=async(req,res,next)=>{
  try{
    const {
        min_length,
        uppercase,
        req_length,
        req_symbol,
        password_exp,
        req_mfa,
        sms_auth,
        email_auth,
        authenticator_app,
        hardware_token,
        sso,
        identity_provider,
        session_timeout,
        max_session,
        ip_restriction,
        field_level_enc,
        audit_log,
        log_retention
      }=req.body
      const id=req.user

      const security_update=await db.update(secure_password).set({
        min_length:min_length,
        uppercase:uppercase,
        req_length:req_length,
        req_symbol:req_symbol,
        req_mfa:req_mfa,
        password_exp:password_exp,
        sms_auth:sms_auth,
        email_auth:email_auth,
        authenticator_app:authenticator_app,
        hardware_token:hardware_token,
        sso:sso,
        identity_provider:identity_provider,
        session_timeout:session_timeout,
        max_session:max_session,
        ip_restriction:ip_restriction,
        field_level_enc:field_level_enc,
        audit_log:audit_log,
        log_retention:log_retention
      }).where(eq(secure_password.founder,id))
      if(security_update.rowCount==0){
        return res.status(400).json({
          msg:'can\'t update the data'
        })
      }
      res.status(200).json({
        msg:'Updated'
      })
  }catch(err){
    next(err)
  }
}
module.exports={create_org,update_security}