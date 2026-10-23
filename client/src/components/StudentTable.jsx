import { Eye, Pencil, Trash2, Users } from "lucide-react";

function StudentTable({ students, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-5 py-4 font-semibold">Student</th>
              <th className="px-5 py-4 font-semibold">Roll Number</th>
              <th className="px-5 py-4 font-semibold">Class</th>
              <th className="px-5 py-4 font-semibold">Section</th>
              <th className="px-5 py-4 font-semibold">Email</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <span className="font-medium text-gray-900">
                    {student.name}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.rollNumber}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.grade}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.section}
                </td>

                <td className="px-5 py-4 text-sm text-gray-600">
                  {student.email}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      student.status === "Inactive"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {student.status || "Active"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView?.(student)}
                      aria-label={`View ${student.name}`}
                      title="View student"
                      className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Eye size={17} />
                    </button>

                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        aria-label={`Edit ${student.name}`}
                        title="Edit student"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={17} />
                      </button>
                    )}

                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(student.id)}
                        aria-label={`Delete ${student.name}`}
                        title="Delete student"
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
          <Users size={32} className="mb-3 text-gray-400" />

          <h3 className="font-semibold text-gray-800">No students found</h3>

          <p className="mt-1 text-sm text-gray-500">
            Try changing your search or filter settings.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudentTable;
