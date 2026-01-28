const express=require('express')
const router=express.Router()
 
const check_user = require('../midleware/checking_user')
const {token_decode}=require('../midleware/jwt')
const { ShowAllEmailTemplates, ShowSingleEmailTemplates, CreateEmailTemplates } = require('../controller/emailTemplate')
 
router.route('/allemail').get(token_decode,check_user('admin'),ShowAllEmailTemplates)
router.route('/email/:id').get(token_decode,check_user('admin'),ShowSingleEmailTemplates)
router.route('/email').post(token_decode,check_user('admin'),CreateEmailTemplates)
 
module.exports = router;