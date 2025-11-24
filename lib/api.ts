import axios, { AxiosInstance, AxiosError } from 'axios';
import { auth } from '@clerk/nextjs/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Request interceptor - add Clerk token
    this.client.interceptors.request.use(
      async (config) => {
        if (typeof window !== 'undefined') {
          // Client-side: get token from Clerk
          try {
            const clerk = (window as any).Clerk;
            if (clerk) {
              const token = await clerk.session?.getToken();
              if (token) {
                config.headers.Authorization = `Bearer ${token}`;
              }
            }
          } catch (error) {
            console.error('Error getting Clerk token:', error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  // User endpoints
  async getUsers(search?: string) {
    const response = await this.client.get('/users', {
      params: { search },
    });
    return response.data.data;
  }

  async getUserById(id: string) {
    const response = await this.client.get(`/users/${id}`);
    return response.data.data;
  }

  async updateProfile(data: { name?: string; avatar?: string; status?: string }) {
    const response = await this.client.put('/users/profile', data);
    return response.data.data;
  }

  // Conversation endpoints
  async getConversations() {
    const response = await this.client.get('/conversations');
    return response.data.data;
  }

  async getConversationById(id: string) {
    const response = await this.client.get(`/conversations/${id}`);
    return response.data.data;
  }

  async createConversation(participantId: string) {
    const response = await this.client.post('/conversations', { participantId });
    return response.data.data;
  }

  async getMessages(conversationId: string, page = 1, limit = 50) {
    const response = await this.client.get(`/conversations/${conversationId}/messages`, {
      params: { page, limit },
    });
    return response.data.data;
  }

  async deleteConversation(id: string) {
    const response = await this.client.delete(`/conversations/${id}`);
    return response.data;
  }

  // Sync Clerk user to backend
  async syncClerkUser(userData: { clerkId: string; email: string; name: string; avatar?: string }) {
    const response = await this.client.post('/auth/clerk-sync', userData);
    return response.data.data;
  }
}

export const api = new APIClient();
export default api;
