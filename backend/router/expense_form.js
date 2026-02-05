const router = require("express").Router();
const {getExpenseForms} = require("../controller/expense_form");
const {getFieldsByCategory,createField,getFormFields, reorderFields, updateExpenseField, deleteExpenseField} = require("../controller/expense_form_field");
router.route("/").get(getExpenseForms);
router.route("/:formId/:categoryId").get(getFieldsByCategory);
router.route("/form-field").post(createField);
router.route("/:formId/:categoryId/fields").get(getFormFields);
router.route("/form-field/reorder").patch(reorderFields)
router.route("/form-field/:fieldId").patch(updateExpenseField);
router.route("/form-field/:fieldId").delete(deleteExpenseField);
module.exports = router;
