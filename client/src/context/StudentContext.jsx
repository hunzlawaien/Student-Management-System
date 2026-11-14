import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest, useAuth } from "./AuthContext";

const StudentContext = createContext(null);
const API_URL = "/api/students";

export function StudentProvider({ children }) {
  const { user, authLoading } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStudents = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest(API_URL, { signal });

      const studentList = Array.isArray(data) ? data : data.students;

      if (!Array.isArray(studentList)) {
        throw new Error("The server returned an unexpected student list.");
      }

      if (signal?.aborted) return;
      setStudents(studentList);
    } catch (requestError) {
      if (signal?.aborted) return;
      setError(requestError.message || "Unable to load students.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setStudents([]);
      setError("");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    refreshStudents(controller.signal);

    return () => controller.abort();
  }, [authLoading, user, refreshStudents]);

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        loading,
        error,
        setError,
        refreshStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
}
