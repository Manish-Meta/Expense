const express=require('express');
const router=express.Router();
const {add_voucher}=require('../controller/voucher')
const {token_decode}=require('../midleware/jwt')
const image=require('../midleware/multer')

router.route('/add_voucher').post(token_decode,add_voucher)

module.exports=router
