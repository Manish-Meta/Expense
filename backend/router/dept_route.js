const express=require('express')
const router=express.Router()
const {add_dept,delete_dept}=require('../controller/dept')

router.route('/add_dept').post(add_dept)
router.route('/delete_dept/:id').delete(delete_dept)

module.exports=router