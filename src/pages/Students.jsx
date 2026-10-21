import { useState } from "react";
import { Plus, Users } from "lucide-react";

import studentsData from "../data/students";
import StudentForm from "../components/StudentForm";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import EditForm from "../components/EditForm";

function Students() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState("");

  function handleAddStudent(studentData) {
    const duplicate = students.some(
      (student) =>
        student.email.toLowerCase() === studentData.email.toLowerCase() ||
        student.rollNumber.toLowerCase() ===
          studentData.rollNumber.toLowerCase(),
    );

    if (duplicate) {
      setError("A student with this email or roll number already exists.");
      return;
    }

    setStudents((previousStudents) => [
      ...previousStudents,
      {
        id: Date.now(),
        ...studentData,
        status: "Active",
      },
    ]);

    setError("");
    setShowForm(false);
  }

  function handleDeleteStudent(studentId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== studentId),
    );
  }

  function handleSaveEdit(updatedStudent) {
    const duplicate = students.some(
      (student) =>
        student.id !== editingStudent.id &&
        (student.email.toLowerCase() === updatedStudent.email.toLowerCase() ||
          student.rollNumber.toLowerCase() ===
            updatedStudent.rollNumber.toLowerCase()),
    );

    if (duplicate) {
      window.alert("Another student already uses this email or roll number.");
      return false;
    }

    setStudents((previousStudents) =>
      previousStudents.map((student) =>
        student.id === editingStudent.id
          ? { ...student, ...updatedStudent }
          : student,
      ),
    );

    setEditingStudent(null);
    return true;
  }

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      String(student.rollNumber).toLowerCase().includes(search);

    const matchesGrade =
      selectedGrade === "All" || student.grade === selectedGrade;

    const matchesSection =
      selectedSection === "All" || student.section === selectedSection;

    return matchesSearch && matchesGrade && matchesSection;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage students across classes 1 to 10.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm((previous) => !previous);
            setEditingStudent(null);
            setError("");
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Users size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Active Students</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {students.filter((student) => student.status !== "Inactive").length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Filtered Results</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            {filteredStudents.length}
          </p>
        </div>
      </div>

      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Add New Student
          </h2>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <StudentForm
            onAddStudent={handleAddStudent}
            onClose={() => {
              setShowForm(false);
              setError("");
            }}
          />
        </div>
      )}

      {editingStudent && (
        <EditForm
          key={editingStudent.id}
          student={editingStudent}
          onSave={handleSaveEdit}
          onCancel={() => setEditingStudent(null)}
        />
      )}

      <StudentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
      />

      <StudentTable
        students={filteredStudents}
        onEdit={(student) => {
          setShowForm(false);
          setError("");
          setEditingStudent(student);
        }}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
}

export default Students;
