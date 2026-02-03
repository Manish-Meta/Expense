export default function FieldRenderer({ field, value, onChange, mode = "entry" }) {
  const {
    field_name,
    field_key,
    field_type,
    required,
    min_length,
    max_length,
    editable = true,
    editable_by = ["employee"],   // ✅ DEFAULT
    visible_to = ["employee"],    // ✅ DEFAULT
  } = field;

  const currentRole = "employee"; // later take from auth context

  // 🔐 VISIBILITY CHECK
  if (!visible_to.includes(currentRole)) {
    return null;
  }

  // ✏️ EDIT PERMISSION CHECK
  const isEditable =
    mode === "entry" && editable && editable_by.includes(currentRole);

  const commonProps = {
    value: value ?? "",
    onChange: (e) => onChange(e.target.value),
    className:
      "border w-full p-2 rounded-lg border-borderLine/30 text-sm",
    required,
    disabled: !isEditable,
  };

  switch (field_type) {
    case "text":
      return (
        <div>
          <label className="text-xs font-medium">
            {field_name} {required && "*"}
          </label>
          <input
            {...commonProps}
            minLength={min_length || undefined}
            maxLength={max_length || undefined}
          />
        </div>
      );

    case "number":
      return (
        <div>
          <label className="text-xs font-medium">
            {field_name} {required && "*"}
          </label>
          <input type="number" {...commonProps} />
        </div>
      );

    case "currency":
      return (
        <div>
          <label className="text-xs font-medium">
            {field_name} {required && "*"}
          </label>
          <input type="number" step="0.01" {...commonProps} />
        </div>
      );

    case "date":
      return (
        <div>
          <label className="text-xs font-medium">
            {field_name} {required && "*"}
          </label>
          <input type="date" {...commonProps} />
        </div>
      );

    case "email":
      return (
        <div>
          <label className="text-xs font-medium">
            {field_name} {required && "*"}
          </label>
          <input type="email" {...commonProps} />
        </div>
      );

    default:
      return null;
  }
}
