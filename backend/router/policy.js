const express=require('express');
const router=express.Router();
const {add_programme}=require('../controller/policy');
const {token_decode}=require('../midleware/jwt')

router.route('/new_policy').post(token_decode,add_programme);

module.exports=router
