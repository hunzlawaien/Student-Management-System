import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_URL = "/api/auth";
const TOKEN_KEY = "smsToken";
const USER_KEY = "smsUser";

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function apiRequest(url, options = {}) {
  const token = getAuthToken();

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data =
    response.status === 204 ? {} : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}

function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);
  const [authLoading, setAuthLoading] = useState(() => Boolean(getAuthToken()));

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      setAuthLoading(false);
      return;
    }

    let cancelled = false;

    async function loadCurrentUser() {
      try {
        const data = await apiRequest(`${API_URL}/me`);

        if (!cancelled) {
          setUser(data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
      } catch {
        if (!cancelled) {
          clearSession();
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  async function login(email, password) {
    try {
      const data = await apiRequest(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      saveSession(data.token, data.user);
      setUser(data.user);

      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Unable to log in.",
      };
    }
  }

  async function register(userData) {
    try {
      const data = await apiRequest(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });

      return {
        success: true,
        message: data.message || "Registration successful.",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Unable to register.",
      };
    }
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
