const {
  import_csv,
  export_csv,
  bulk_role,search_employee_ids,
  add_validator
} = require('../controller/user');

const express=require('express')
const router=express.Router()
const upload=require('../midleware/multer')
const {signup,login,logout,my_profile,generate_emp_id,generate_dept,reporting_manager}=require('../controller/user')
const {token_decode}=require('../midleware/jwt')
const {user_overview}=require("../controller/user")
const check_user=require('../midleware/checking_user')
const validate=require('../midleware/zod_validation')
const {user_id,user_login,new_validator}=require('../zod_schema/user_schema')

router.route('/signup').post(token_decode,check_user('admin'),signup)
router.route('/add_validator').post(token_decode,check_user('admin'),validate(new_validator),add_validator)
router.route('/login').post(validate(user_login),login)
router.route('/profile').get(token_decode,my_profile)
router.route('/logout').get(logout)
router.route('/manager').get(reporting_manager)
router.route('/overview').get(user_overview)
router.route('/import-csv').post(upload.single('file'), import_csv);
router.route('/export-csv').get(export_csv)
router.route('/bulk-role').post(bulk_role)
router.route('/generate_id').get(token_decode,check_user('admin'),generate_emp_id)
router.route('/generate_dept').get(token_decode,check_user('admin'),generate_dept)
router.route('/search-emp-id').get(
  token_decode,
  check_user("admin"),
  search_employee_ids
);
module.exports=router