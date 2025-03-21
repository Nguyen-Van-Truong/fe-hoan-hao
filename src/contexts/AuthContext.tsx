import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  RegisterRequest, 
  LoginRequest, 
  TOKEN_STORAGE_KEY, 
  REFRESH_TOKEN_STORAGE_KEY,
  loginUser as apiLoginUser,
  registerUser as apiRegisterUser,
  requestPasswordReset as apiRequestPasswordReset,
  resetPassword as apiResetPassword
} from "@/api";

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  confirmResetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user cho demo
const MOCK_USER: User = {
  id: "1",
  username: "nguoidung",
  email: "1@gmail.com",
  fullName: "Người Dùng",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
  createdAt: new Date().toISOString(),
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa khi component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get(TOKEN_STORAGE_KEY);
      if (token) {
        // Trong thực tế, bạn sẽ gọi API để xác thực token
        setUser(MOCK_USER);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Trong môi trường thực, gọi API đăng nhập
      // const response = await apiLoginUser({ email, password });
      // Cookies.set(TOKEN_STORAGE_KEY, response.accessToken, { expires: 7 });
      // if (response.refreshToken) {
      //   Cookies.set(REFRESH_TOKEN_STORAGE_KEY, response.refreshToken, { expires: 30 });
      // }
      // setUser(response.user);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiểm tra thông tin đăng nhập
      if (email === MOCK_USER.email && password === "123456") {
        // Lưu token vào cookie
        const mockToken =
          "mock-jwt-token-" + Math.random().toString(36).substring(2);
        Cookies.set(TOKEN_STORAGE_KEY, mockToken, { expires: 7 }); // Hết hạn sau 7 ngày

        setUser(MOCK_USER);
        toast.success("Đăng nhập thành công!");
        return true;
      } else {
        toast.error("Email hoặc mật khẩu không đúng");
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi khi đăng nhập");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đăng ký
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Trong môi trường thực, gọi API đăng ký
      await apiRegisterUser(userData);

      // Giả lập API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiểm tra email đã tồn tại chưa
      if (userData.email === MOCK_USER.email) {
        toast.error("Email đã được sử dụng");
        return false;
      }

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi khi đăng ký");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    Cookies.remove(TOKEN_STORAGE_KEY);
    Cookies.remove(REFRESH_TOKEN_STORAGE_KEY);
    setUser(null);
    navigate("/login");
    toast.success("Đã đăng xuất");
  };

  // Hàm khôi phục mật khẩu
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Trong môi trường thực, gọi API khôi phục mật khẩu
      // await apiRequestPasswordReset(email);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Kiểm tra email có tồn tại không
      if (email === MOCK_USER.email) {
        toast.success(
          "Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn",
        );
        return true;
      } else {
        toast.error("Email không tồn tại trong hệ thống");
        return false;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xác nhận đặt lại mật khẩu
  const confirmResetPassword = async (
    token: string,
    newPassword: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Trong môi trường thực, gọi API đặt lại mật khẩu
      // await apiResetPassword(token, newPassword);

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Mật khẩu đã được đặt lại thành công");
      return true;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi khi đặt lại mật khẩu");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Giá trị context
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    confirmResetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook để sử dụng context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider");
  }
  return context;
};
