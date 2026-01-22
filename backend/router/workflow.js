const express=require('express')
const router=express.Router()
const {create_workflow,show_workflow}=require('../controller/workflow')
const { token_decode } = require('../midleware/jwt')
const checking_user=require('../midleware/checking_user')

router.route('/new_workflow').post(token_decode,checking_user('admin'),create_workflow)
router.route('/my_workflow').get(token_decode,checking_user('admin'),show_workflow)

module.exports=router