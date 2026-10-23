import { createContext, useContext, useEffect, useState } from "react";
import initialStudents from "../data/students";

const StudentContext = createContext(null);

function getSavedStudents() {
  try {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
      return JSON.parse(savedStudents);
    }
  } catch (error) {
    console.error("Error loading students:", error);
  }

  return initialStudents;
}

function StudentProvider({ children }) {
  const [students, setStudents] = useState(getSavedStudents);

  useEffect(() => {
    try {
      localStorage.setItem("students", JSON.stringify(students));
    } catch (error) {
      console.error("Error saving students:", error);
    }
  }, [students]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
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
