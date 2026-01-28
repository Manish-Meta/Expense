const express=require('express')
const router=express.Router()
const {new_expense,my_exp,show_particuler_expense,show_pending_expense,expense_validate, show_admin_expense,admin_approve_expense,expense_withdraw}=require('../controller/expense')
const {token_decode}=require('../midleware/jwt')
const upload=require('../midleware/multer')
const check_user_role=require('../midleware/checking_user')
const {need_information}=require('../controller/expense')


router.route('/new_expense').post(token_decode,upload.array('receipt',10),new_expense)
router.route('/my_expense').get(token_decode,my_exp)
router.route('/my_expense/:id').get(token_decode,show_particuler_expense)
router.route('/withdraw/:id').get(token_decode,check_user_role('employee'),expense_withdraw)
router.route('/show_pending').get(token_decode,check_user_role('validator'),show_pending_expense)
router.route('/change_status/:id').post(token_decode,check_user_role('validator'),expense_validate);
router.route('/admin_expense').get(token_decode,check_user_role('admin'),show_admin_expense)
router.route('/admin_change_status/:id').post(token_decode,check_user_role('admin'),admin_approve_expense)
router.route('/notification/:to_id').post(token_decode,upload.array('receipt',10),need_information)


module.exports=router