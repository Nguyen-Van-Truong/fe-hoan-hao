// Common API types

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  [key: string]: any;
}

// Auth types
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  countryCode: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
  };
}
