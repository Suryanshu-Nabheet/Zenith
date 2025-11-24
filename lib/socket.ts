import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';

class SocketClient {
  private socket: Socket | null = null;
  private token: string | null = null;

  async connect() {
    if (this.socket?.connected) return;

    // Get token from Clerk - must be called from React component
    // This will be set externally before connecting
    const token = this.token;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message);
    });
  }

  // Set token before connecting
  setToken(token: string) {
    this.token = token;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket?.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket?.emit(event, data);
  }

  sendMessage(data: { conversationId: string; content: string; type: string }) {
    this.emit('message:send', data);
  }

  joinConversation(conversationId: string) {
    this.emit('conversation:join', { conversationId });
  }

  leaveConversation(conversationId: string) {
    this.emit('conversation:leave', { conversationId });
  }

  startTyping(conversationId: string) {
    this.emit('typing:start', { conversationId });
  }

  stopTyping(conversationId: string) {
    this.emit('typing:stop', { conversationId });
  }
}

export const socketClient = new SocketClient();
