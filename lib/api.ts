import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Request interceptor - will be set from components
    this.client.interceptors.request.use(
      async (config) => {
        // Token will be added from calling component
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Set auth token
  setAuthToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Clear auth token
  clearAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Users
  async getUsers(search?: string) {
    try {
      const response = await this.client.get('/users', { params: { search } });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { users: [] };
    }
  }

  async getUser(userId: string) {
    try {
      const response = await this.client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async updateUser(userId: string, data: any) {
    try {
      const response = await this.client.put(`/users/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Conversations
  async getConversations() {
    try {
      const response = await this.client.get('/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return { conversations: [] };
    }
  }

  async createConversation(participantId: string) {
    try {
      const response = await this.client.post('/conversations', { participantId });
      return response.data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  async getMessages(conversationId: string) {
    try {
      const response = await this.client.get(`/conversations/${conversationId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { messages: [] };
    }
  }

  // Sync Clerk user to backend
  async syncClerkUser(userData: { clerkId: string; email: string; name: string; avatar?: string }) {
    try {
      const response = await this.client.post('/auth/clerk-sync', userData);
      return response.data.data;
    } catch (error: any) {
      console.error('Error syncing user:', error.message);
      // Don't throw - just log and continue
      return null;
    }
  }
}

export const api = new APIClient();
