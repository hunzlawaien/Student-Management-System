import { useState } from "react";
import { X } from "lucide-react";

function EditForm({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: student.name || "",
    email: student.email || "",
    grade: student.grade || "Class 1",
    section: student.section || "A",
    rollNumber: student.rollNumber || "",
    status: student.status || "Active",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.rollNumber.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const result = onSave({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      rollNumber: formData.rollNumber.trim(),
    });

    if (result !== false) {
      onCancel();
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Edit Student</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update the student's information.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          aria-label="Close edit form"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Roll Number *
            </label>
            <input
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Class *
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className={inputClass}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={`Class ${index + 1}`}>
                  Class {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Section *
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
