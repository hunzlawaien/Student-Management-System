import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest } from "./AuthContext";

const StudentContext = createContext(null);
const API_URL = "/api/students";

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest(API_URL);

      const studentList = Array.isArray(data) ? data : data.students;

      if (!Array.isArray(studentList)) {
        throw new Error("The server returned an unexpected student list.");
      }

      setStudents(studentList);
    } catch (requestError) {
      setError(requestError.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStudents();
  }, [refreshStudents]);

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
