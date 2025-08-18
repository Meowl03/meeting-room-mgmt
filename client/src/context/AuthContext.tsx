import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../api/axios";

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  phone: string;
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    phone: string,
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axiosInstance
        .get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (emailOrUsername: string, password: string) => {
    setLoading(true);
    const res = await axiosInstance.post("/auth/login", {
      emailOrUsername,
      password,
    });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setLoading(false);
  };

  const register = async (
    username: string,
    phone: string,
    email: string,
    password: string,
    fullName: string
  ) => {
    setLoading(true);
    const res = await axiosInstance.post("/auth/register", {
      username,
      phone,
      email,
      password,
      fullName,
    });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
