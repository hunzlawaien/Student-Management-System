import { useState } from "react";
import { X } from "lucide-react";
import { apiRequest } from "../context/AuthContext";

const API_URL = "/api/students";

function StudentForm({ onAdd, onCancel, students = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "1",
    section: "A",
    rollNumber: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const student = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      grade: Number(formData.grade),
      section: formData.section,
      rollNumber: formData.rollNumber.trim(),
      guardianName: formData.guardianName.trim(),
      guardianPhone: formData.guardianPhone.trim(),
      address: formData.address.trim(),
    };

    if (
      !student.name ||
      !student.email ||
      !student.grade ||
      !student.section ||
      !student.rollNumber
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(student.name)) {
      setError("Please enter a valid student name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      student.guardianName &&
      !/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s.'-]*$/.test(student.guardianName)
    ) {
      setError("Please enter a valid guardian name.");
      return;
    }

    if (
      student.guardianPhone &&
      !/^[0-9+\-()\s]{7,20}$/.test(student.guardianPhone)
    ) {
      setError("Please enter a valid guardian phone number.");
      return;
    }

    const duplicateRollNumber = students.some(
      (existingStudent) =>
        String(existingStudent.rollNumber).trim().toLowerCase() ===
          student.rollNumber.toLowerCase() &&
        Number(existingStudent.grade) === student.grade &&
        String(existingStudent.section).toLowerCase() ===
          student.section.toLowerCase(),
    );

    if (duplicateRollNumber) {
      setError(
        "This roll number is already assigned in this class and section.",
      );
      return;
    }

    try {
      setSaving(true);

      const data = await apiRequest(API_URL, {
        method: "POST",
        body: JSON.stringify(student),
      });

      const savedStudent = data.student || data;
      await onAdd(savedStudent);
    } catch (error) {
      setError(error.message || "Unable to save the student.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Add New Student</h3>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="Close student form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student's full name"
              className={inputClass}
              maxLength={100}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={inputClass}
              maxLength={254}
              required
            />
          </div>

          <div>
            <label htmlFor="grade" className="mb-1 block text-sm font-medium">
              Class *
            </label>
            <select
              id="grade"
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
            <label htmlFor="section" className="mb-1 block text-sm font-medium">
              Section *
            </label>
            <select
              id="section"
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
              htmlFor="rollNumber"
              className="mb-1 block text-sm font-medium"
            >
              Roll Number *
            </label>
            <input
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="e.g. 5A002"
              className={inputClass}
              maxLength={30}
              required
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="mb-3 font-semibold text-gray-900">
            Guardian Information
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="guardianName"
                className="mb-1 block text-sm font-medium"
              >
                Guardian Name
              </label>
              <input
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Enter parent or guardian's name"
                className={inputClass}
                maxLength={100}
              />
            </div>

            <div>
              <label
                htmlFor="guardianPhone"
                className="mb-1 block text-sm font-medium"
              >
                Guardian Phone
              </label>
              <input
                id="guardianPhone"
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
                htmlFor="address"
                className="mb-1 block text-sm font-medium"
              >
                Home Address
              </label>
              <textarea
                id="address"
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
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
