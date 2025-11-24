import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

class SocketClient {
  private socket: Socket | null = null;
  private listeners: Map<string, Function[]> = new Map();

  async connect(): Promise<void> {
    if (this.socket?.connected) {
      return;
    }

    // Get Clerk token
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      const { useAuth } = await import('@clerk/nextjs');
      const { getToken } = useAuth();
      token = await getToken();
    }

    if (!token) {
      console.error('No Clerk token found. Cannot connect to socket.');
      return;
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Re-register all listeners
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach((callback) => {
        this.socket?.on(event, callback as any);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Message events
  sendMessage(data: { conversationId: string; content: string; type?: string }): void {
    this.socket?.emit('message:send', data);
  }

  markAsDelivered(messageId: string): void {
    this.socket?.emit('message:delivered', { messageId });
  }

  markAsRead(messageId: string): void {
    this.socket?.emit('message:read', { messageId });
  }

  startTyping(conversationId: string): void {
    this.socket?.emit('message:typing', { conversationId });
  }

  stopTyping(conversationId: string): void {
    this.socket?.emit('message:stop-typing', { conversationId });
  }

  deleteMessage(messageId: string): void {
    this.socket?.emit('message:delete', { messageId });
  }

  editMessage(messageId: string, newContent: string): void {
    this.socket?.emit('message:edit', { messageId, newContent });
  }

  // Call events
  initiateCall(data: { receiverId: string; type: 'voice' | 'video' }): void {
    this.socket?.emit('call:initiate', data);
  }

  acceptCall(callId: string): void {
    this.socket?.emit('call:accept', { callId });
  }

  rejectCall(callId: string): void {
    this.socket?.emit('call:reject', { callId });
  }

  endCall(callId: string): void {
    this.socket?.emit('call:end', { callId });
  }

  sendIceCandidate(receiverId: string, candidate: RTCIceCandidateInit): void {
    this.socket?.emit('call:ice-candidate', { receiverId, candidate });
  }

  sendOffer(receiverId: string, offer: RTCSessionDescriptionInit): void {
    this.socket?.emit('call:offer', { receiverId, offer });
  }

  sendAnswer(callerId: string, answer: RTCSessionDescriptionInit): void {
    this.socket?.emit('call:answer', { callerId, answer });
  }

  // Presence events
  updateStatus(status: string): void {
    this.socket?.emit('user:status-update', { status });
  }

  checkOnlineStatus(userIds: string[]): void {
    this.socket?.emit('user:check-online', { userIds });
  }

  // Event listeners
  on<T = any>(event: string, callback: (data: T) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);

    if (this.socket) {
      this.socket.on(event, callback as any);
    }
  }

  off(event: string, callback?: Function): void {
    if (callback) {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      this.socket?.off(event, callback as any);
    } else {
      this.listeners.delete(event);
      this.socket?.off(event);
    }
  }

  once<T = any>(event: string, callback: (data: T) => void): void {
    this.socket?.once(event, callback as any);
  }
}

export const socketClient = new SocketClient();
export default socketClient;
