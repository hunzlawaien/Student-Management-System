import { ArrowLeft, GraduationCap, Mail, UserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from "../context/StudentContext";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students } = useStudents();

  const student = students.find((item) => String(item._id || item.id) === id);

  if (!student) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <UserRound size={40} className="mx-auto mb-3 text-gray-400" />

        <h2 className="text-xl font-semibold text-gray-900">
          Student not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          This student may have been deleted or the link may be incorrect.
        </p>

        <button
          type="button"
          onClick={() => navigate("/students")}
          className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Back to Students
        </button>
      </div>
    );
  }

  const studentDetails = [
    { label: "Roll Number", value: student.rollNumber },
    { label: "Class", value: student.grade ? `Class ${student.grade}` : "" },
    { label: "Section", value: student.section },
    { label: "Email", value: student.email },
    { label: "Student Phone", value: student.phone },
    { label: "Gender", value: student.gender },
    {
      label: "Date of Birth",
      value: student.dateOfBirth
        ? new Date(student.dateOfBirth).toLocaleDateString()
        : "",
    },
  ].filter(
    (detail) =>
      detail.value !== undefined &&
      detail.value !== null &&
      detail.value !== "",
  );

  const guardianDetails = [
    { label: "Guardian Name", value: student.guardianName },
    { label: "Guardian Phone", value: student.guardianPhone },
    { label: "Home Address", value: student.address },
  ].filter(
    (detail) =>
      detail.value !== undefined &&
      detail.value !== null &&
      detail.value !== "",
  );

  const isInactive = student.status === "Inactive";

  function renderDetails(details) {
    if (details.length === 0) {
      return (
        <p className="text-sm text-gray-500">
          No information has been added yet.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4"
          >
            <p className="text-sm text-gray-500">{detail.label}</p>
            <p className="mt-1 break-words font-medium text-gray-900">
              {detail.value}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("/students")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-700"
      >
        <ArrowLeft size={18} />
        Back to Students
      </button>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
              <GraduationCap size={34} />
            </div>

            <div className="flex-1">
              <p className="text-sm text-emerald-100">Student Profile</p>
              <h1 className="mt-1 text-2xl font-bold">{student.name}</h1>
              <p className="mt-1 text-sm text-emerald-100">
                Roll Number: {student.rollNumber || "Not provided"}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${
                isInactive
                  ? "bg-gray-100 text-gray-700"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {student.status || "Active"}
            </span>
          </div>
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <section>
            <div className="mb-5 flex items-center gap-2">
              <UserRound size={20} className="text-emerald-700" />
              <h2 className="text-lg font-semibold text-gray-900">
                Student Information
              </h2>
            </div>

            {renderDetails(studentDetails)}
          </section>

          <section className="border-t border-gray-200 pt-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Guardian Information
            </h2>

            {renderDetails(guardianDetails)}
          </section>

          {student.email && (
            <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-4">
              <Mail size={20} className="shrink-0 text-emerald-700" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="break-all text-sm font-medium text-gray-800">
                  {student.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
