const router = require("express").Router();
const {getExpenseForms} = require("../controller/expense_form");
const {getFieldsByCategory,createField,getFormFields, reorderFields} = require("../controller/expense_form_field");
router.route("/").get(getExpenseForms);
router.route("/:formId/:categoryId").get(getFieldsByCategory);
router.route("/form-field").post(createField);
router.route("/:formId/:categoryId/fields").get(getFormFields);
router.route("/form-field/reorder").patch(reorderFields)
module.exports = router;
