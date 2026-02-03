import { useEffect, useState } from "react";

export default function FieldDialog({
  open,
  onClose,
  onSubmit,
  formId,
  categoryId,
  nextOrder,
  editField,
}) {
  const isEdit = Boolean(editField);

  const [field, setField] = useState({
    field_name: "",
    field_key: "",
    field_type: "number",
    required: false,
    editable: true,
    min_length: "",
    max_length: "",
  });

  useEffect(() => {
    if (editField) {
      setField(editField);
    } else {
      setField({
        field_name: "",
        field_key: "",
        field_type: "number",
        required: false,
        editable: true,
        min_length: "",
        max_length: "",
      });
    }
  }, [editField, open]);

  if (!open) return null;

  const handleChange = (key, value) => {
    setField((prev) => ({ ...prev, [key]: value }));
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
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl p-5 space-y-4">
        <h4 className="text-sm font-semibold">
          {isEdit ? "Edit Field" : "Add Field"}
        </h4>

        {/* Field Name */}
        <input
          className="border w-full p-2 rounded-lg text-sm"
          placeholder="Field name"
          value={field.field_name}
          onChange={(e) => handleChange("field_name", e.target.value)}
        />

        {/* Field Key */}
        <input
          className="border w-full p-2 rounded-lg text-sm"
          placeholder="Field key"
          value={field.field_key}
          disabled={isEdit} 
          onChange={(e) => handleChange("field_key", e.target.value)}
        />

        {/* Field Type
        <select
          className="border w-full p-2 rounded-lg text-sm"
          value={field.field_type}
          onChange={(e) => handleChange("field_type", e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="currency">Currency</option>
          <option value="date">Date</option>
          <option value="email">Email</option>
        </select> */}
        <select
  value={field.field_type}
  onChange={(e) =>
    setField({ ...field, field_type: e.target.value })
  }
  className="w-full border rounded-lg p-2 text-xs"
>
  <option value="text">Text</option>
  <option value="number">Number</option>
  <option value="currency">Currency</option>
  <option value="date">Date</option>
  <option value="email">Email</option>
  <option value="file">File</option>
</select>
{field.field_type === "text" && (
  <div className="grid grid-cols-2 gap-3">
    <div>
      <label className="text-xs font-medium">
        Minimum Length
      </label>
      <input
        type="number"
        min={0}
        value={field.min_length || ""}
        onChange={(e) =>
          setField({
            ...field,
            min_length: e.target.value,
          })
        }
        className="w-full border rounded-lg p-2 text-xs"
      />
    </div>

    <div>
      <label className="text-xs font-medium">
        Maximum Length
      </label>
      <input
        type="number"
        min={0}
        value={field.max_length || ""}
        onChange={(e) =>
          setField({
            ...field,
            max_length: e.target.value,
          })
        }
        className="w-full border rounded-lg p-2 text-xs"
      />
    </div>
  </div>
)}


        {/* Required */}
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange("required", e.target.checked)}
          />
          Required
        </label>
        {/* Editable
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={field.editable}
            onChange={(e) => handleChange("editable", e.target.checked)}
          />
          Editable
        </label> */}
        <label className="flex items-center gap-2 text-xs">
  <input
    type="checkbox"
    checked={field.editable}
    onChange={(e) =>
      setField(prev => ({ ...prev, editable: e.target.checked }))
    }
  />
  Editable
</label>



        <div className="flex justify-end gap-2 pt-3">
          <button
            onClick={onClose}
            className="text-xs border-red-500 hover:bg-red-100 px-4 py-2 border rounded-lg border:shadow transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-xs px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:shadow transition hover:bg-orange-200"
          >
            {isEdit ? "Update Field" : "Create Field"}
          </button>
        </div>
      </div>
    </div>
  );
}
