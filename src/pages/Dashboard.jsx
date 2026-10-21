import { Users, UserCheck, UserRoundPlus } from "lucide-react";

function Dashboard() {
  const stats = [
    {
      label: "Total Students",
      value: 0,
      icon: Users,
    },
    {
      label: "Active Students",
      value: 0,
      icon: UserCheck,
    },
    {
      label: "Recently Added",
      value: 0,
      icon: UserRoundPlus,
    },
  ];

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-500">
          Overview of your student records.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon size={20} className="text-gray-500" />
              </div>

              <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
            </article>
          );
        })}
      </div>

      <section className="mt-8 rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold">Recent Registrations</h3>
      </section>
    </section>
  );
}

export default Dashboard;
