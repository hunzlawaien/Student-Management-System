import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  function login(email, password) {
    const savedUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );

    const matchedUser = savedUsers.find(
      (savedUser) =>
        savedUser.email.toLowerCase() === email.trim().toLowerCase() &&
        savedUser.password === password,
    );

    if (!matchedUser) {
      return { success: false, message: "Invalid email or password." };
    }

    const loggedInUser = {
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
    };

    localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return { success: true };
  }

  function register(userData) {
    const savedUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]",
    );

    const emailExists = savedUsers.some(
      (savedUser) =>
        savedUser.email.toLowerCase() === userData.email.trim().toLowerCase(),
    );

    if (emailExists) {
      return { success: false, message: "This email is already registered." };
    }

    const newUser = {
      name: userData.name.trim(),
      email: userData.email.trim(),
      password: userData.password,
      role: userData.role,
    };

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...savedUsers, newUser]),
    );

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
