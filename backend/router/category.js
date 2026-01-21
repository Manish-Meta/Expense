const express=require('express')
const router=express.Router()
const {cre_category, show_category, delete_category,update_category}=require('../controller/category')
const {token_decode}=require('../midleware/jwt')

router.route('/new_category').post(token_decode,cre_category)
router.route('/all_category').get(show_category)
router.route('/delete_category/:id').delete(delete_category)
router.route('/update_category/:id').patch(update_category)

module.exports=router