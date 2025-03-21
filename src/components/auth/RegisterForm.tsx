import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Calendar } from "lucide-react";
import { registerUser } from "@/api";
import { toast } from "react-hot-toast";

// Schema xác thực
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z
      .string()
      .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema> & {
  countryCode: string;
};

const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      phoneNumber: "",
      countryCode: "+84",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      // Gọi API đăng ký
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        countryCode: data.countryCode,
        phoneNumber: data.phoneNumber || "",
      };

      const response = await registerUser(userData);

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Đã xảy ra lỗi khi đăng ký");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="text-center">
        <div className="flex flex-col items-center mb-2">
          <img
            src="/logointab.png"
            alt="Hoàn Hảo Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-2xl font-bold">Tham gia Hoàn Hảo</h1>
          <p className="text-muted-foreground mt-2">
            Đăng ký để kết nối và chia sẻ những khoảnh khắc đáng nhớ
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Họ tên
          </label>
          <Input
            id="fullName"
            placeholder="Nguyễn Văn A"
            {...register("fullName")}
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && (
            <p className="text-destructive text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Tên người dùng
          </label>
          <Input
            id="username"
            placeholder="username123"
            {...register("username")}
            className={errors.username ? "border-destructive" : ""}
          />
          {errors.username && (
            <p className="text-destructive text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            placeholder="email@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="dateOfBirth" className="text-sm font-medium">
            Ngày sinh
          </label>
          <div className="relative">
            <Input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className={errors.dateOfBirth ? "border-destructive" : ""}
            />
            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          {errors.dateOfBirth && (
            <p className="text-destructive text-sm">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Số điện thoại (tùy chọn)
          </label>
          <div className="flex">
            <div className="w-20 mr-2">
              <Input
                id="countryCode"
                defaultValue="+84"
                {...register("countryCode")}
              />
            </div>
            <Input
              id="phoneNumber"
              placeholder="0987654321"
              {...register("phoneNumber")}
              className={errors.phoneNumber ? "border-destructive" : ""}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-destructive text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mật khẩu
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={errors.password ? "border-destructive" : ""}
          />
          {errors.password && (
            <p className="text-destructive text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Xác nhận mật khẩu
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-destructive" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-destructive text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng ký...
            </>
          ) : (
            "Đăng ký"
          )}
        </Button>
      </form>

      <div className="text-center text-sm">
        <p>
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Hoặc đăng ký với
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 mr-2"
          >
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button variant="outline" className="w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 mr-2"
          >
            <path
              fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
            />
          </svg>
          Facebook
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
