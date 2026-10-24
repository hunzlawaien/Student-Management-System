import { createContext, useContext, useEffect, useState } from "react";

const StudentContext = createContext(null);

const API_URL = "http://localhost:5000/api/students";

function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Unable to load students. Please check the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        setStudents,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
}

export { StudentProvider, useStudents };
