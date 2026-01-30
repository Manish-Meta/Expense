const {z}=require('zod')

const org_detail=z.object({
      org_name:z.string(),
      industry_type:z.string(),
      employee_count:z.number(),
      address:z.string(),
      ph_num:z.number().min(10).max(10),
      web_url:z.string(),
      currency_detail:z.string(),
      multi_cur:z.boolean(),
      auto_update_rate:z.boolean(),
      ex_rate_pro:z.string(),
      start_month:z.string(),
      year:z.number(),
      tax_jurisdiction:z.string(),
      tax_cal:z.string()
})

const details_for_security=z.object({
        min_length:z.number().optional(),
        uppercase:z.boolean().optional(),
        req_length:z.boolean().optional(),
        req_symbol:z.boolean().optional(),
        password_exp:z.number().optional(),
        req_mfa:z.boolean().optional(),
        sms_auth:z.boolean().optional(),
        email_auth:z.boolean().optional(),
        authenticator_app:z.boolean().optional(),
        hardware_token:z.boolean().optional(),
        sso:z.boolean().optional(),
        identity_provider:z.string().optional(),
        session_timeout:z.number().optional(),
        max_session:z.number().optional(),
        ip_restriction:z.boolean().optional(),
        field_level_enc:z.boolean(),
        audit_log:z.boolean(),
        log_retention:z.boolean()
})

module.exports={org_detail}