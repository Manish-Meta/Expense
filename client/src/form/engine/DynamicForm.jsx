import FieldRenderer from "./FieldRenderer";

export default function DynamicForm({
  fields = [],
  values = {},
  onChange,
  mode = "entry", // entry | preview | readonly
  role,
}) {
  const updateValue = (key, value) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  if (!fields.length) return null;

  return (
    <div className="space-y-4 mt-4">
      {fields.map((field) => (
        <FieldRenderer
          key={field.field_id}
          field={field}
          value={values[field.field_key]}
          onChange={(val) => updateValue(field.field_key, val)}
          role={role}
          mode={mode}
        />
      ))}
    </div>
  );
}
