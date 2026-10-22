import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import StudentForm from "../components/StudentForm";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import EditForm from "../components/EditForm";

function Students() {
  const { students, setStudents } = useStudents();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState("");

  const handleAddStudent = (newStudent) => {
    setStudents((currentStudents) => [...currentStudents, newStudent]);

    setShowForm(false);
    setError("");
  };

  const handleDeleteStudent = (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    );
  };

  const handleSaveEdit = (updatedStudent) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );

    setEditingStudent(null);
  };

  const handleViewStudent = (student) => {
    navigate(`/students/${student.id}`);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(student.rollNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade =
      selectedGrade === "All" || String(student.grade) === selectedGrade;

    const matchesSection =
      selectedSection === "All" || student.section === selectedSection;

    return matchesSearch && matchesGrade && matchesSection;
  });

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage student records, academic details, and enrollment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
        <div className="rounded-lg bg-emerald-50 p-3">
          <Users size={24} className="text-emerald-700" />
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Students</p>

          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
        </div>
      </div>

      {showForm && (
        <StudentForm
          onAdd={handleAddStudent}
          onCancel={() => {
            setShowForm(false);
            setError("");
          }}
          error={error}
          setError={setError}
        />
      )}

      {editingStudent && (
        <EditForm
          student={editingStudent}
          onSave={handleSaveEdit}
          onCancel={() => setEditingStudent(null)}
        />
      )}

      <StudentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      <StudentTable
        students={filteredStudents}
        onView={handleViewStudent}
        onEdit={setEditingStudent}
        onDelete={handleDeleteStudent}
      />

      <p className="text-sm text-gray-500">
        Showing {filteredStudents.length} of {students.length} students
      </p>
    </div>
  );
}

export default Students;
