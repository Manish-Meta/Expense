const express=require('express')
const router=express.Router()
const {create_org}=require('../controller/organization')
const { token_decode } = require('../midleware/jwt')
const check_user=require('../midleware/checking_user')
const upload=require('../midleware/multer')

router.route('/create_org').post(token_decode,check_user('admin'),upload.single('logo'),create_org)

module.exports=router
