import { API_BASE_URL, API_ENDPOINTS } from "./config";
import { ApiResponse, RegisterRequest } from "./types";

export const registerUser = async (
  userData: RegisterRequest,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi đăng ký");
  }
};
