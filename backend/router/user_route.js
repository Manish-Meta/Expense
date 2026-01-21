const express=require('express')
const router=express.Router()
const {signup,login,logout,my_profile}=require('../controller/user')
const {token_decode}=require('../midleware/jwt')
const {user_overview}=require("../controller/user")
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/profile').get(token_decode,my_profile)
router.route('/logout').get(logout)
router.route('/overview').get(user_overview)

module.exports=router