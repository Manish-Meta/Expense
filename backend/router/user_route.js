const {
  import_csv,
  export_csv,
  bulk_role
} = require('../controller/user');

const express=require('express')
const multer = require('multer');
const router=express.Router()
const upload = multer({ dest: 'uploads/' });

const {signup,login,logout,my_profile}=require('../controller/user')
const {token_decode}=require('../midleware/jwt')
const {user_overview}=require("../controller/user")
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/profile').get(token_decode,my_profile)
router.route('/logout').get(logout)
router.route('/overview').get(user_overview)
router.route('/import-csv').post(upload.single('file'), import_csv);
router.route('/export-csv').get(export_csv)
router.route('/bulk-role').post(bulk_role)
module.exports=router