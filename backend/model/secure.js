const {pgTable,integer,numeric,boolean,text,varchar}=require('drizzle-orm/pg-core')
const {org}=require('../model/org')

const secure_password=pgTable('security',{
    founder:varchar('founder',{length:20}),
    org_id:varchar('org_id',{length:20}).references(()=>org.organization_id),
    min_length:numeric('min_length'),
    uppercase:boolean('uppercase'),
    req_length:boolean('num_length'),
    req_symbol:boolean('req_symbol'),
    password_exp:numeric('paasword_exp'),
    req_mfa:boolean('req_mfa'),
    sms_auth:boolean('sms_auth'),
    email_auth:boolean('email_auth'),
    authenticator_app:boolean('authenticator_app'),
    hardware_token:boolean('hordware_token'),
    sso:boolean('sso'),
    identity_provider:text('identity_provider'),
    session_timeout:numeric('session_timeout'),
    max_session:numeric('max_session'),
    ip_restriction:boolean('ip_restriction'),
    field_level_enc:boolean('field_level_enc'),
    audit_log:boolean('audit_log'),
    log_retention:numeric('log_retention')
})

module.exports={secure_password}