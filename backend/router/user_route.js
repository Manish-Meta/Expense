const express=require('express')
const router=express.Router()
const {signup,login,logout,my_profile}=require('../controller/user')
const {token_decode}=require('../midleware/jwt')
const {user_overview}=require("../controller/user")

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/my_profile').get(token_decode,my_profile)
router.route('/logout').get(logout)
router.route('/overview').get(token_decode,user_overview)

module.exports=router