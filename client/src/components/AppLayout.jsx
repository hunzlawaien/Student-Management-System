import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";

function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isAdmin } = usePermissions();

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

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-white text-black md:flex">
      <aside className="w-full bg-black p-5 text-white md:min-h-screen md:w-64 md:shrink-0">
        <div className="flex items-center gap-3">
          <GraduationCap size={28} />
          <h1 className="text-xl font-semibold">SMS</h1>
        </div>

        <p className="mt-2 text-sm text-gray-400">Student Management System</p>

        <p className="mt-3 inline-block rounded-full bg-gray-800 px-3 py-1 text-xs text-emerald-300">
          {isAdmin ? "Administrator" : "Teacher"} Account
        </p>

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

        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex min-h-16 items-center justify-between gap-4 border-b border-gray-200 px-6 py-3 md:px-8">
          <div>
            <p className="font-medium text-gray-900">
              {user?.name || "Welcome"}
            </p>

            <p className="text-xs text-gray-500">{user?.role || "User"}</p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
            {user?.name?.trim()?.charAt(0).toUpperCase() || "U"}
          </div>
        </header>

        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
