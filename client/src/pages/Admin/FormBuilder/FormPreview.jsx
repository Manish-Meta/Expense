import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import FieldCard from "./FieldCard";
import FieldDialog from "./FieldDialog";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

export default function FormPreview({ category, formId, onBack }) {
  const [fields, setFields] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editField, setEditField] = useState(null);

  const fetchFields = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}forms/${formId}/${category.id}/fields`,
      { credentials: "include" }
    );
    const json = await res.json();
    setFields(json.data || []);
  };

  useEffect(() => {
    fetchFields();
  }, [formId, category.id]);

 
  const openAddDialog = () => {
    setEditField(null);
    setDialogOpen(true);
  };

  const handleEdit = (field) => {
    setEditField(field);
    setDialogOpen(true);
  };

 
  const handleRemove = async (fieldId) => {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}forms/form-field/${fieldId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    setFields((prev) => prev.filter((f) => f.field_id !== fieldId));
  };

 
  const handleSubmitField = async (payload, isEdit) => {
    const url = isEdit
      ? `${import.meta.env.VITE_BACKEND_URL}forms/form-field/${payload.field_id}`
      : `${import.meta.env.VITE_BACKEND_URL}forms/form-field`;

    await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await fetchFields();

    if (isEdit) {
      setFields((prev) =>
        prev.map((f) =>
          f.field_id === payload.field_id ? payload : f
        )
      );
    } else {
      const handleSubmitField = async (payload, isEdit) => {
  const url = isEdit
    ? `${import.meta.env.VITE_BACKEND_URL}forms/form-field/${payload.field_id}`
    : `${import.meta.env.VITE_BACKEND_URL}forms/form-field`;

  await fetch(url, {
    method: isEdit ? "PATCH" : "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  await fetchFields();  
};
      
};

    }
  
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setFields((prev) => {
      const oldIndex = prev.findIndex((f) => f.field_id === active.id);
      const newIndex = prev.findIndex((f) => f.field_id === over.id);

      const reordered = arrayMove(prev, oldIndex, newIndex);

      saveOrder(reordered);
      return reordered;
    });
  };

  const saveOrder = async (reorderedFields) => {
    const payload = reorderedFields.map((f, index) => ({
      field_id: f.field_id,
      order_index: index + 1,
    }));

    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}forms/form-field/reorder`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Back
          </button>
          <h2 className="text-lg font-semibold">
            Form Preview – {category.cat_name}
          </h2>
        </div>

        <button
          onClick={openAddDialog}
          className="flex items-center gap-2 px-4 py-2 text-xs hover:bg-orange-100 rounded-lg border hover:shadow-lg transition bg-white cursor-pointer"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

   
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.field_id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {fields.map((field) => (
              <FieldCard
                key={field.field_id}
                field={field}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <FieldDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmitField}
        formId={formId}
        categoryId={category.id}
        nextOrder={fields.length + 1}
        editField={editField}
      />
    </div>
  );
}
