import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FieldCard({ field, onEdit, onRemove }) {
    const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.field_id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        <span {...attributes} {...listeners} className="cursor-grab">
          <GripVertical size={16} className="text-gray-400" />
        </span>

        <div>
          <p className="text-sm font-medium">{field.field_name}</p>
          <p className="text-xs text-gray-500">
            {field.field_type}  {field.required ? "Required" : "Optional"}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
      
        {field.editable && (
          <button
            onClick={() => onEdit(field)}
            className="px-3 py-1 text-xs border rounded-lg cursor-pointer hover:shadow-lg transition hover:bg-orange-100"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onRemove(field.field_id)}
          className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded-lg cursor-pointer hover:shadow-lg transition hover:bg-red-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}