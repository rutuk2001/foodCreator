import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { loginRequest, registerRequest } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("mk-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const persist = (data) => {
    localStorage.setItem("mk-token", data.token);
    const { token, ...rest } = data;
    localStorage.setItem("mk-user", JSON.stringify(rest));
    setUser(rest);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await loginRequest({ email, password });
      persist(data.data);
      toast.success(`Welcome back, ${data.data.name.split(" ")[0]}`);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not sign in");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const { data } = await registerRequest(payload);
      persist(data.data);
      toast.success("Account created — welcome to the kitchen!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not create account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("mk-token");
    localStorage.removeItem("mk-user");
    setUser(null);
    toast.success("Signed out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
