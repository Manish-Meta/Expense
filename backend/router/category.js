const express=require('express')
const router=express.Router()
const {cre_category, show_category, delete_category,update_category,permission_cat}=require('../controller/category')
const {token_decode}=require('../midleware/jwt')
const check_user=require('../midleware/checking_user')

router.route('/new_category').post(token_decode,check_user('admin'),cre_category)
router.route('/all_category').get(token_decode,show_category)
router.route('/delete_category/:id').delete(token_decode,check_user('admin'),delete_category)
router.route('/update_category/:id').patch(token_decode,check_user('admin'),update_category)
router.route('/user_category').get(token_decode,permission_cat)


module.exports=router