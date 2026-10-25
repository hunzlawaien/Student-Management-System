import { useState } from "react";
import { X } from "lucide-react";

function EditForm({ student, students = [], onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: student.name || "",
    email: student.email || "",
    grade: String(student.grade || 1),
    section: student.section || "A",
    rollNumber: student.rollNumber || "",
    status: student.status || "Active",
    guardianName: student.guardianName || "",
    guardianPhone: student.guardianPhone || "",
    address: student.address || "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const rollNumber = formData.rollNumber.trim();
    const guardianName = formData.guardianName.trim();
    const guardianPhone = formData.guardianPhone.trim();
    const address = formData.address.trim();

    if (
      !name ||
      !email ||
      !rollNumber ||
      !formData.grade ||
      !formData.section
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(name)) {
      setError("Please enter a valid student name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (guardianName && !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(guardianName)) {
      setError("Please enter a valid guardian name.");
      return;
    }

    if (guardianPhone && !/^[0-9+\-()\s]{7,20}$/.test(guardianPhone)) {
      setError("Please enter a valid guardian phone number.");
      return;
    }

    const studentId = String(student._id || student.id);

    const duplicateRollNumber = students.some(
      (existingStudent) =>
        String(existingStudent._id || existingStudent.id) !== studentId &&
        Number(existingStudent.grade) === Number(formData.grade) &&
        String(existingStudent.section).toLowerCase() ===
          formData.section.toLowerCase() &&
        String(existingStudent.rollNumber).trim().toLowerCase() ===
          rollNumber.toLowerCase(),
    );

    if (duplicateRollNumber) {
      setError(
        "This roll number is already assigned in this class and section.",
      );
      return;
    }

    const updatedStudent = {
      _id: student._id,
      id: student.id,
      name,
      email,
      rollNumber,
      grade: Number(formData.grade),
      section: formData.section,
      status: formData.status,
      guardianName,
      guardianPhone,
      address,
    };

    try {
      setSaving(true);
      await onSave(updatedStudent);
    } catch (error) {
      setError(error.message || "Unable to update student.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

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
            <label
              htmlFor="edit-name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              maxLength={100}
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              id="edit-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              maxLength={254}
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-rollNumber"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Roll Number *
            </label>
            <input
              id="edit-rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={inputClass}
              maxLength={30}
              required
            />
          </div>

          <div>
            <label
              htmlFor="edit-grade"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Class *
            </label>
            <select
              id="edit-grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className={inputClass}
              required
            >
              {Array.from({ length: 10 }, (_, index) => (
                <option key={index + 1} value={String(index + 1)}>
                  Class {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-section"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Section *
            </label>
            <select
              id="edit-section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="edit-status"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="edit-status"
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

        <div className="mt-5 border-t border-gray-200 pt-4">
          <h3 className="mb-3 font-semibold text-gray-900">
            Guardian Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="edit-guardianName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Guardian Name
              </label>
              <input
                id="edit-guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Parent or guardian's name"
                className={inputClass}
                maxLength={100}
              />
            </div>

            <div>
              <label
                htmlFor="edit-guardianPhone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Guardian Phone
              </label>
              <input
                id="edit-guardianPhone"
                name="guardianPhone"
                type="tel"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="e.g. 03001234567"
                className={inputClass}
                maxLength={20}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="edit-address"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Home Address
              </label>
              <textarea
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter student's home address"
                className={inputClass}
                rows={3}
                maxLength={500}
              />
            </div>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
