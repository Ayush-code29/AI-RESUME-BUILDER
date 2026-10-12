
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  clearSession,
  getAuthToken,
  getStoredUser,
  loginUser,
  registerUser,
} from "../api/authApi";
const AuthContext = createContext(null);
export default AuthContext;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getAuthToken);

  const refreshSession = useCallback(() => {
    setUser(getStoredUser());
    setToken(getAuthToken());
  }, []);

  useEffect(() => {
    window.addEventListener("auth:changed", refreshSession);

    return () => {
      window.removeEventListener("auth:changed", refreshSession);
    };
  }, [refreshSession]);

  const login = async (credentials) => {
    const result = await loginUser(credentials);
    refreshSession();
    return result.user;
  };

  const register = async (details) => {
    const result = await registerUser(details);
    refreshSession();
    return result.user;
  };

  const logout = () => {
    clearSession();
    refreshSession();
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
