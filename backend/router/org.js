const express=require('express')
const router=express.Router()
const {create_org}=require('../controller/organization')


router.route('/create_org').post()
