const express=require('express')
const router=express.Router()
const {token_decode}=require('../midleware/jwt')
const { add_feedback,show_feedback } = require('../controller/feedback')

router.route('/add_feedback').post(token_decode,add_feedback)
router.route('/all_feedback').get(show_feedback)

module.exports=router