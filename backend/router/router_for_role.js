const express = require('express')
const router=express.Router()
const {add_roles,delete_role}=require('../controller/role')

router.route('/add_role').post(add_roles)
router.route('/delete/:id').delete(delete_role)

module.exports=router