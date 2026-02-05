const express=require('express')
const router=express.Router()
const {need_information,expense_summary,
  monthly_expense_trend,
  category_summary,new_expense,my_exp,show_particuler_expense,show_pending_expense,expense_validate, show_admin_expense,admin_approve_expense,expense_withdraw}=require('../controller/expense')
const {token_decode}=require('../midleware/jwt')
const upload=require('../midleware/multer')
const check_user_role=require('../midleware/checking_user')



router.route('/new_expense').post(token_decode,upload.array('receipt',10),new_expense)
router.route('/my_expense/:id').get(token_decode,show_particuler_expense)
router.route('/my_expense').get(token_decode,my_exp)
router.route('/withdraw/:id').get(token_decode,expense_withdraw)
router.route('/show_pending').get(token_decode,show_pending_expense)
router.route('/change_status/:id').post(token_decode,expense_validate);
router.route('/admin_expense').get(token_decode,check_user_role('admin'),show_admin_expense)
router.route('/admin_change_status/:id').post(token_decode,check_user_role('admin'),admin_approve_expense)
router.route('/notification/:to_id').post(token_decode,upload.array('receipt',10),need_information)
router.route('/summary').get(token_decode,expense_summary)

router.route('/monthly-trend').get(token_decode,monthly_expense_trend)
router.route('/category-summary').get(token_decode,category_summary)
module.exports=router