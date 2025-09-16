/**
 * Authentication utilities for FastAPI backend integration
 */

import { apiRequest } from './queryClient';

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

class AuthManager {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('bm_auth_token');
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with:', credentials.username);
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      const data: AuthResponse = await response.json();
      
      console.log('Login successful:', data);
      
      // Store token and user data
      this.token = data.access_token;
      this.user = data.user;
      localStorage.setItem('bm_auth_token', data.access_token);
      localStorage.setItem('bm_user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      const data: AuthResponse = await response.json();
      
      // Store token and user data
      this.token = data.access_token;
      this.user = data.user;
      localStorage.setItem('bm_auth_token', data.access_token);
      localStorage.setItem('bm_user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.token) {
      return null;
    }

    try {
      const response = await apiRequest('GET', '/api/auth/user');
      const user: User = await response.json();
      this.user = user;
      localStorage.setItem('bm_user', JSON.stringify(user));
      return user;
    } catch (error) {
      // Token might be expired, clear auth data
      this.logout();
      return null;
    }
  }

  async verifyToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      await apiRequest('GET', '/api/auth/verify');
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('bm_auth_token');
    localStorage.removeItem('bm_user');
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): User | null {
    if (!this.user) {
      const storedUser = localStorage.getItem('bm_user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }
}

// Export singleton instance
export const authManager = new AuthManager();