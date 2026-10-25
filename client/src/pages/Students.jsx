import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import { apiRequest } from "../context/AuthContext";
import StudentForm from "../components/StudentForm";
import StudentFilters from "../components/StudentFilters";
import StudentTable from "../components/StudentTable";
import EditForm from "../components/EditForm";
import { usePermissions } from "../hooks/usePermissions";

const API_URL = "/api/students";

function Students() {
  const { students, setStudents } = useStudents();
  const navigate = useNavigate();

  const { canAddStudent, canEditStudent, canDeleteStudent } = usePermissions();

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSection, setSelectedSection] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState("");

  const handleAddStudent = (savedStudent) => {
    setStudents((currentStudents) => [savedStudent, ...currentStudents]);

    setShowForm(false);
    setError("");
    setCurrentPage(1);
  };

  const handleDeleteStudent = async (studentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) return;

    try {
      setError("");

      if (!studentId || studentId === "undefined") {
        throw new Error("Student ID is missing. Cannot delete this record.");
      }

      await apiRequest(`${API_URL}/${studentId}`, {
        method: "DELETE",
      });

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) => String(student._id || student.id) !== String(studentId),
        ),
      );

      if (
        editingStudent &&
        String(editingStudent._id || editingStudent.id) === String(studentId)
      ) {
        setEditingStudent(null);
      }
    } catch (error) {
      setError(error.message || "Unable to delete student.");
    }
  };

  async function handleSaveEdit(updatedStudent) {
    try {
      const studentId = updatedStudent._id || updatedStudent.id;

      if (!studentId) {
        throw new Error("Student ID is missing. Cannot update this record.");
      }

      const studentData = {
        name: updatedStudent.name,
        email: updatedStudent.email,
        grade: updatedStudent.grade,
        section: updatedStudent.section,
        rollNumber: updatedStudent.rollNumber,
        status: updatedStudent.status,
        guardianName: updatedStudent.guardianName || "",
        guardianPhone: updatedStudent.guardianPhone || "",
        address: updatedStudent.address || "",
      };

      const data = await apiRequest(`${API_URL}/${studentId}`, {
        method: "PUT",
        body: JSON.stringify(studentData),
      });

      const savedStudent = data.student || data;

      setStudents((currentStudents) =>
        currentStudents.map((student) =>
          String(student._id || student.id) === String(studentId)
            ? savedStudent
            : student,
        ),
      );

      setEditingStudent(null);
      setError("");
    } catch (error) {
      setError(error.message || "Unable to update student.");
      throw error;
    }
  }

  const handleViewStudent = (student) => {
    const studentId = student._id || student.id;

    if (!studentId) {
      setError("Student ID is missing. Cannot open this record.");
      return;
    }

    navigate(`/students/${studentId}`);
  };

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch = [
      student.name,
      student.email,
      student.rollNumber,
      student.section,
      student.guardianName,
      student.guardianPhone,
    ].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(search),
    );

    const matchesGrade =
      selectedGrade === "All" ||
      Number(student.grade) === Number(selectedGrade);

    const matchesSection =
      selectedSection === "All" || student.section === selectedSection;

    return matchesSearch && matchesGrade && matchesSection;
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage student records, academic details, and enrollment.
          </p>
        </div>

        {canAddStudent && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setShowForm(true);
              setEditingStudent(null);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add Student
          </button>
        )}
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

      {showForm && canAddStudent && (
        <StudentForm
          students={students}
          onAdd={handleAddStudent}
          onCancel={() => {
            setShowForm(false);
            setError("");
          }}
        />
      )}

      {editingStudent && canEditStudent && (
        <EditForm
          student={editingStudent}
          students={students}
          onSave={handleSaveEdit}
          onCancel={() => {
            setEditingStudent(null);
            setError("");
          }}
        />
      )}

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => setError("")}
            className="font-medium hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      <StudentFilters
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
        selectedGrade={selectedGrade}
        setSelectedGrade={(value) => {
          setSelectedGrade(value);
          setCurrentPage(1);
        }}
        selectedSection={selectedSection}
        setSelectedSection={(value) => {
          setSelectedSection(value);
          setCurrentPage(1);
        }}
      />

      <StudentTable
        students={currentStudents}
        onView={handleViewStudent}
        onEdit={canEditStudent ? setEditingStudent : undefined}
        onDelete={canDeleteStudent ? handleDeleteStudent : undefined}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredStudents.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of{" "}
          {filteredStudents.length} students
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage <= 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-2 text-sm text-gray-600">
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={totalPages === 0 || currentPage >= totalPages}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Students;
