const express=require('express')
const router=express.Router()
const {new_expense,show_all_expenses,my_expenses,validate_status,admin_status,status_reject}=require('../controller/expense')
const {token_decode}=require('../midleware/jwt')

router.route('/new_expense').post(token_decode,new_expense)
router.route('/my_expense').get(token_decode,my_expenses)
router.route('/all_expense').get(show_all_expenses)

module.exports=router