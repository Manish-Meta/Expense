const express=require('express')
const router=express.Router()
const {signup,login,logout,profile,edit_profile}=require('../controller/user')
const {token_decode}=require('../midleware/jwt')

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile').get(token_decode,profile)
router.route('/edit').patch(token_decode,edit_profile)

module.exports=router