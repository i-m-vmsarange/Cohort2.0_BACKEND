import { createContext, useEffect, useState } from "react";
import { register, login, getUser, logout } from "./pages/services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      console.log(response);
      setUser(response.user);
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password, bio, profileImg) => {
    setLoading(true);

    try {
      const response = await register(
        username,
        email,
        password,
        bio,
        profileImg,
      );
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    setLoading(true);
    try {
      const response = await getUser();
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const response = await logout();
      setUser(null);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        handleLogin,
        handleRegister,
        user,
        setUser,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
