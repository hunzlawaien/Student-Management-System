import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap } from "lucide-react";

function AppLayout({ children }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black md:flex">
      <aside className="w-full bg-black p-5 text-white md:min-h-screen md:w-64 md:shrink-0">
        <div className="flex items-center gap-3">
          <GraduationCap size={28} />
          <h1 className="text-xl font-semibold">SMS</h1>
        </div>

        <p className="mt-2 text-sm text-gray-400">Student Management System</p>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-white font-medium text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 px-6 md:px-8">
          <div></div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
            S
          </div>
        </header>

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
