import { useAuth } from "../context/AuthContext";

export function usePermissions() {
  const { user } = useAuth();

  const role = user?.role?.toLowerCase();
  const isAdmin = role === "administrator";
  const isTeacher = role === "teacher";

  return {
    isAdmin,
    isTeacher,
    canAddStudent: isAdmin,
    canEditStudent: isAdmin,
    canDeleteStudent: isAdmin,
    canViewStudents: isAdmin || isTeacher,
  };
}
