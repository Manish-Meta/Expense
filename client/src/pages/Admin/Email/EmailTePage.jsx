import { CircleX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useGlobalContext from "../../../config/GlobalStateContext";

const ACTION_TYPES = [
  "EXPENSE_SUBMITTED",
  "EXPENSE_APPROVED",
  "EXPENSE_APPROVEL",
  "EXPENSE_REJECTED",
];

const PLACEHOLDERS = [
  "employeeName",
  "status",
  "taskName",
  "actionBy",
  "date"
];

export default function EmailTemplateForm() {
   const {setCloseEmailTab, editId, setEditId} = useGlobalContext();
  const [form, setForm] = useState({
    actionType: "",
    subject: "",
    body: "",
    isActive: true
  });

  useEffect(()=>{
    if(editId != ""){

    setForm((prev)=>({ ...prev, 
      actionType:editId?.emailtemplate?.actionType,
      subject:editId?.emailtemplate?.subject, body: editId?.emailtemplate?.body,
      isActive:editId?.emailtemplate?.isActive
}))

  }
  },[editId])

console.log(form)
 

// if(editId !=""){
//   console.log("Editted --------------> ")
//   console.log(editId.emailtemplate.actionType)
// }

  const bodyRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const insertPlaceholder = (placeholder) => {
    const textarea = bodyRef.current;
     const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = form.body;

    const text = `{{${placeholder}}}`;
    const updated =
      value.substring(0, start) + text + value.substring(end);

    setForm(prev => ({ ...prev, body: updated }));

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + text.length;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_BACKEND_URL+"send_email/email", {
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    })
    .then((e)=> e.json())
    .then((e)=> {
      setCloseEmailTab(false)
     setForm({
    actionType: "",
    subject: "",
    body: "",
    isActive: true
  })})
    .catch((e)=> console.log(e))
  };



  return (
    <form
      onSubmit={handleSubmit}
      
      className=" mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 border border-orange-200"
    >
      <div className="flex justify-between  items-center">
        <h2 className="text-sm font-semibold text-gray-800">
        {editId != "" ? "Update Email Template":"Create Email Template"}
      </h2>
      <CircleX className="size-4.5 text-red-400" onClick={()=>{
        setEditId("")
      setForm({
    actionType: "",
    subject: "",
    body: "",
    isActive: true
  });
  
         setCloseEmailTab(false)
      }}/>
      </div>

      {/* Action Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700">
          Action Type
        </label>
        <select
          name="actionType"
          value={form?.actionType}
          onChange={handleChange}
          required
          className="mt-1 p-2 w-full text-xs rounded-md border-gray-300 border focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select action</option>
          {ACTION_TYPES.map(type => (
            <option key={type} value={type} className="text-xs">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
         <label className="block text-xs font-medium text-gray-700">
          Email Subject
        </label>
        <input
          type="text"
          name="subject"
          value={form?.subject}
          onChange={handleChange}
          required
          placeholder="Your task {{taskName}} is {{status}}"
          className="mt-1 p-2 w-full rounded-md border-gray-300 border text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs font-medium text-gray-700">
          Email Body
        </label>
        <textarea
          ref={bodyRef}
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={8}
          required
          placeholder="Hi {{employeeName}}, your task {{taskName}} was {{status}}."
          className="mt-1 w-full text-xs p-2 border rounded-md  shadow-sm "
        />
      </div>

      {/* Placeholders */}
      <div>
        <p className="text-xs font-medium text-gray-700 mb-2">
          Available Placeholders
        </p>
        <div className="flex flex-wrap gap-2">
          {PLACEHOLDERS.map(p => (
            <button
              type="button"
              key={p}
              onClick={() => insertPlaceholder(p)}
              className="px-3 py-1 text-xs bg-oragne-100 border border-orange-200 text-orange-700 rounded hover:bg-orange-200"
            >
              {`{{${p}}}`}
            </button>
          ))}
        </div>
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={form?.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">
          Template is active
        </label>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        {
          editId != "" ?
          <button
          type="submit"
          className="px-2 text-xs py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
        >
          Update Template
        </button>
        :
        <button
          type="submit"
          className="px-2 text-xs py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
        >
          Save Template
        </button>
        }
        
      </div>
    </form>
  );
}
