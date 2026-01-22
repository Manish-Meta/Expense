const express=require('express')
const router=express.Router()
const {new_expense,my_exp,show_particuler_expense}=require('../controller/expense')
const {token_decode}=require('../midleware/jwt')

router.route('/new_expense').post(token_decode,new_expense)
router.route('/my_expense').get(token_decode,my_exp)
router.route('/my_expense/:id').get(token_decode,show_particuler_expense)

module.exports=router