import { useEffect, useState } from "react";

export default function FieldDialog({
  open,
  onClose,
  onSubmit,
  formId,
  categoryId,
  nextOrder,
  editField = null,
}) {
  const isEdit = Boolean(editField);

  const [field, setField] = useState({
    field_name: "",
    field_key: "",
    field_type: "text",
    required: false,
    editable: true,
    min_length: "",
    max_length: "",
  });

  useEffect(() => {
    if (editField) {
      setField(editField);
    }
  }, [editField]);

  if (!open) return null;

  const handleChange = (key, value) => {
    setField(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...field,
      form_id: formId,
      category_id: categoryId,
      order_index: isEdit ? field.order_index : nextOrder,
      is_active: true,
    };

    await onSubmit(payload, isEdit);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4">

        <h4 className="text-lg font-semibold">
          {isEdit ? "Edit Field" : "Add Field"}
        </h4>

        {/* Field Name */}
        <input
          className="w-full border p-2 rounded-lg"
          placeholder="Field Name"
          value={field.field_name}
          onChange={e => handleChange("field_name", e.target.value)}
        />

        {/* Field Key */}
        <input
          className="w-full border p-2 rounded-lg"
          placeholder="Field Key (e.g amount, remarks)"
          value={field.field_key}
          onChange={e => handleChange("field_key", e.target.value)}
        />

        {/* Field Type */}
        <select
          className="w-full border p-2 rounded-lg"
          value={field.field_type}
          onChange={e => handleChange("field_type", e.target.value)}
        >
          <option value="text">Text</option>
          <option value="textarea">Text Area</option>
          <option value="currency">Currency</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="dropdown">Dropdown</option>
        </select>

        {/* Conditional Length Fields */}
        {["text", "textarea"].includes(field.field_type) && (
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Length"
              className="border p-2 rounded-lg"
              value={field.min_length || ""}
              onChange={e => handleChange("min_length", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Length"
              className="border p-2 rounded-lg"
              value={field.max_length || ""}
              onChange={e => handleChange("max_length", e.target.value)}
            />
          </div>
        )}

        {/* Toggles */}
        <div className="flex items-center gap-6 text-sm">
          <label>
            <input
              type="checkbox"
              checked={field.required}
              onChange={e => handleChange("required", e.target.checked)}
            /> Required
          </label>

          <label>
            <input
              type="checkbox"
              checked={field.editable}
              onChange={e => handleChange("editable", e.target.checked)}
            /> Editable
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {isEdit ? "Update Field" : "Create Field"}
          </button>
        </div>
      </div>
    </div>
  );
}
