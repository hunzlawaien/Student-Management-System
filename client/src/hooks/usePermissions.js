import { useAuth } from "../context/AuthContext";

export function usePermissions() {
  const { user } = useAuth();

  const isAdmin = user?.role === "Administrator";
  const isTeacher = user?.role === "Teacher";

  return {
    isAdmin,
    isTeacher,
    canAddStudent: isAdmin,
    canEditStudent: isAdmin,
    canDeleteStudent: isAdmin,
    canViewStudents: isAdmin || isTeacher,
  };
}
