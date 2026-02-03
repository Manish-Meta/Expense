export function validateField(field, value) {
  if (field.required && !value) {
    return `${field.field_name} is required`;
  }

  if (
    field.min_length &&
    value?.length < field.min_length
  ) {
    return `${field.field_name} minimum ${field.min_length} characters`;
  }

  if (
    field.max_length &&
    value?.length > field.max_length
  ) {
    return `${field.field_name} maximum ${field.max_length} characters`;
  }

  return null;
}
