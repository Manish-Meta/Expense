const express=require('express')
const router=express.Router()
const {add_dept,delete_dept,show_dept}=require('../controller/dept')

router.route('/add_dept').post(add_dept)
router.route('/delete_dept/:id').delete(delete_dept)
router.route('/all_dept').get(show_dept)

module.exports=router