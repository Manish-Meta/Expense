const {secure_password}=require('../model/secure')
const {db}=require('../db/db')
const { org } = require('../model/org')

const add_secure_details=async(next,org_id,id,table)=>{
    try{
        const secure=await table.insert(secure_password).values({
        founder:id,
        org_id:org_id,
        min_length:8,
        uppercase:true,
        req_length:true,
        req_symbol:true,
        password_exp:60,
        req_mfa:false,
        sms_auth:true,
        email_auth:true,
        authenticator_app:false,
        hardware_token:false,
        sso:true,
        identity_provider:'Azure',
        session_timeout:15,
        max_session:12,
        ip_restriction:true,
        field_level_enc:false,
        audit_log:true,
        log_retention:5
        })
        if(secure.rowCount==0){
            return false
        }
        return true
    }catch(err){
        next(err)
    }
}
module.exports=add_secure_details