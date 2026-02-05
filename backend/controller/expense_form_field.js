const { db } = require("../db/db");
const { expense_form_fields } = require("../model/expense/expense_form_fields");
const { eq, and } = require("drizzle-orm");
const {v4:uuid}=require("uuid");

const getFieldsByCategory = async (req, res) => {
  const { formId, categoryId } = req.params;

  const fields = await db
    .select()
    .from(expense_form_fields)
    .where(
      and(
        eq(expense_form_fields.form_id, formId),
        eq(expense_form_fields.category_id, categoryId),
        eq(expense_form_fields.is_active, true)
      )
    )
    .orderBy(expense_form_fields.order_index);

  res.json({ data: fields });
};
const reorderFields = async (req, res) => {
  const updates = req.body;

  await db.transaction(async (tx) => {
    for (const item of updates) {
      await tx
        .update(expense_form_fields)
        .set({ order_index: item.order_index })
        .where(eq(expense_form_fields.field_id, item.field_id));
    }
  });

  res.json({ msg: "Order updated" });
};

const getFormFields = async (req, res, next) => {
  try {
    const { formId, categoryId } = req.params;

    if (!formId || !categoryId) {
      return res.status(400).json({
        msg: "formId and categoryId are required",
      });
    }

    const fields = await db
      .select({
        field_id: expense_form_fields.field_id,
        field_name: expense_form_fields.field_name,
        field_key: expense_form_fields.field_key,
        field_type: expense_form_fields.field_type,
        required: expense_form_fields.required,
        editable: expense_form_fields.editable,
        order_index: expense_form_fields.order_index,
      })
      .from(expense_form_fields)
      .where(
        and(
          eq(expense_form_fields.form_id, formId),
          eq(expense_form_fields.category_id, categoryId),
          eq(expense_form_fields.is_active, true)
        )
      )
      .orderBy(expense_form_fields.order_index);

    return res.status(200).json({
      data: fields,
    });
  } catch (err) {
    next(err);
  }
};
const createField = async (req, res, next) => {
  try {
    const payload = {
      field_id: `FI_${uuid().slice(0, 8)}`,
      ...req.body,
    };

    await db.insert(expense_form_fields).values(payload);

    return res.status(201).json({
      msg: "Field created",
      data: payload,
    });
  } catch (err) {
    next(err);
  }
};
const updateExpenseField = async (req, res, next) => {
  try {
    const { fieldId } = req.params;
    const payload = req.body;

    await db
      .update(expense_form_fields)
      .set(payload)
      .where(eq(expense_form_fields.field_id, fieldId));

    res.json({ msg: "Field updated successfully" });
  } catch (err) {
    next(err);
  }
};
const deleteExpenseField = async (req, res, next) => {
  console.log("DELETE HIT:", req.params.fieldId);

  await db
    .update(expense_form_fields)
    .set({ is_active: false })
    .where(eq(expense_form_fields.field_id, req.params.fieldId));

  res.json({ msg: "Field deleted successfully" });
};

module.exports={reorderFields,getFieldsByCategory,createField,getFormFields,updateExpenseField,deleteExpenseField};