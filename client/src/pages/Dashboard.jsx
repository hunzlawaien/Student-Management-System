import { Users, UserCheck, UserX } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import { usePermissions } from "../hooks/usePermissions";

function Dashboard() {
  const { students } = useStudents();
  const { isAdmin } = usePermissions();

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status !== "Inactive",
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive",
  ).length;

  const recentRegistrations = [...students]
    .sort((a, b) => {
      const idA = String(a._id ?? a.id ?? "");
      const idB = String(b._id ?? b.id ?? "");

      return idB.localeCompare(idA, undefined, {
        numeric: true,
      });
    })
    .slice(0, 5);

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Students",
      value: activeStudents,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      icon: UserX,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isAdmin ? "Administrator Dashboard" : "Teacher Dashboard"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isAdmin
            ? "Manage student records and monitor school activity."
            : "View student records and monitor school activity."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Registrations
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The five latest student records.
          </p>
        </div>

        {recentRegistrations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Student</th>
                  <th className="px-6 py-3 font-medium">Roll Number</th>
                  <th className="px-6 py-3 font-medium">Class</th>
                  <th className="px-6 py-3 font-medium">Section</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentRegistrations.map((student, index) => (
                  <tr
                    key={student._id ?? student.id ?? `student-${index}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {student.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.rollNumber}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.grade}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.section}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          student.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {student.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-gray-500">
            No registrations yet. Add a student to see them here.
          </p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
