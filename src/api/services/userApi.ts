import { API_BASE_URL } from "../config";
import { ApiResponse, User, UpdateUserProfileRequest } from "../types";

const USER_ENDPOINTS = {
  PROFILE: "/users/profile",
  UPDATE_PROFILE: "/users/profile",
  FRIENDS: "/users/friends",
  FRIEND_REQUESTS: "/users/friend-requests",
  FRIEND_SUGGESTIONS: "/users/suggestions",
};

/**
 * Lấy thông tin profile người dùng
 */
export const getUserProfile = async (
  userId?: string
): Promise<ApiResponse<User>> => {
  try {
    const endpoint = userId 
      ? `${USER_ENDPOINTS.PROFILE}/${userId}` 
      : USER_ENDPOINTS.PROFILE;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể lấy thông tin người dùng");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi lấy thông tin người dùng");
  }
};

/**
 * Cập nhật thông tin profile người dùng
 */
export const updateUserProfile = async (
  profileData: UpdateUserProfileRequest
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${USER_ENDPOINTS.UPDATE_PROFILE}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(profileData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể cập nhật thông tin người dùng");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi cập nhật thông tin người dùng");
  }
};

/**
 * Lấy danh sách bạn bè
 */
export const getFriends = async (
  userId?: string
): Promise<ApiResponse<User[]>> => {
  try {
    const endpoint = userId 
      ? `${USER_ENDPOINTS.FRIENDS}/${userId}` 
      : USER_ENDPOINTS.FRIENDS;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể lấy danh sách bạn bè");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi lấy danh sách bạn bè");
  }
};

/**
 * Lấy danh sách lời mời kết bạn
 */
export const getFriendRequests = async (): Promise<ApiResponse<User[]>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${USER_ENDPOINTS.FRIEND_REQUESTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể lấy danh sách lời mời kết bạn");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi lấy danh sách lời mời kết bạn");
  }
};

/**
 * Gửi lời mời kết bạn
 */
export const sendFriendRequest = async (
  userId: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${USER_ENDPOINTS.FRIEND_REQUESTS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ userId }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể gửi lời mời kết bạn");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi gửi lời mời kết bạn");
  }
};

/**
 * Phản hồi lời mời kết bạn
 */
export const respondToFriendRequest = async (
  requestId: string, 
  accept: boolean
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${USER_ENDPOINTS.FRIEND_REQUESTS}/${requestId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ accept }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể phản hồi lời mời kết bạn");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Đã xảy ra lỗi khi phản hồi lời mời kết bạn");
  }
}; 