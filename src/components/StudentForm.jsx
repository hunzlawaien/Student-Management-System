import { useState } from "react";
import { X } from "lucide-react";

function StudentForm({ onAddStudent, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "Class 1",
    section: "A",
    rollNumber: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const student = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      grade: formData.grade,
      section: formData.section,
      rollNumber: formData.rollNumber.trim(),
    };

    if (
      !student.name ||
      !student.email ||
      !student.grade ||
      !student.section ||
      !student.rollNumber
    ) {
      setError("Please fill in all fields.");
      return;
    }

    onAddStudent(student);
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-200 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Add New Student</h3>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-gray-100"
          aria-label="Close student form"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student's full name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="student@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label htmlFor="grade" className="mb-1 block text-sm font-medium">
            Class
          </label>

          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={`Class ${index + 1}`}>
                Class {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="section" className="mb-1 block text-sm font-medium">
            Section
          </label>

          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
            Roll Number
          </label>

          <input
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="e.g. 5A002"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
