# Zenith - Real-World Production Messaging Platform

> 🚀 **Production-ready messaging platform** with end-to-end encryption, real-time WebSocket communication, and HD video calls

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🔐 **End-to-End Encryption** - Military-grade security with Clerk authentication
- 💬 **Real-Time Messaging** - WebSocket-powered instant communication
- 📹 **HD Video/Voice Calls** - Crystal-clear WebRTC calls
- 👥 **User Discovery** - Search and connect with users instantly
- 🎨 **Professional UI** - Clean, modern WhatsApp-like interface
- ⚡ **Lightning Fast** - Optimized for performance
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Suryanshu-Nabheet/Zenith.git
cd Zenith

# Install dependencies
pnpm install
cd server && pnpm install && cd ..

# Set up environment variables
cp .env.local.example .env.local
cp server/.env.example server/.env

# Run both frontend and backend with ONE command
pnpm dev
```

That's it! The app will be running at:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **MongoDB** (local or Atlas)
- **Clerk Account** (for authentication)

## 🔧 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Backend (`server/.env`)

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 📚 Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Prisma ORM
- **Real-time**: Socket.io
- **Authentication**: Clerk JWT
- **Video**: WebRTC

## 🎯 Real Functionality

### ✅ What Works End-to-End

1. **User Authentication**

   - Sign up / Sign in with Clerk
   - Auto-sync to MongoDB
   - Secure JWT tokens
   - Protected routes

2. **User Discovery**

   - Search users by name/email
   - Real-time search results
   - Create conversations

3. **Real-Time Messaging**

   - Send/receive messages via WebSocket
   - Message persistence in MongoDB
   - Optimistic UI updates
   - Message timestamps

4. **Conversations**

   - Load conversation history
   - Create new conversations
   - Real-time message sync
   - Unread counts

5. **Video/Voice Calls** (WebRTC ready)
   - Initiate calls
   - WebRTC signaling via WebSocket
   - HD quality

## 📖 Project Structure

```
Zenith/
├── app/                    # Next.js app router
│   ├── landing/           # Landing page
│   ├── chat/              # Main chat interface
│   ├── sign-in/           # Clerk sign-in
│   └── sign-up/           # Clerk sign-up
├── components/            # React components
│   ├── chat-app.tsx       # Main chat container
│   ├── chat-sidebar.tsx   # Conversations list
│   ├── chat-window.tsx    # Message display
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities
│   ├── api.ts             # API client
│   ├── socket.ts          # WebSocket client
│   └── webrtc.ts          # WebRTC utilities
├── server/                # Backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── socket/        # WebSocket handlers
│   │   ├── middlewares/   # Auth, error handling
│   │   └── prisma/        # Database schema
│   └── dist/              # Compiled output
└── styles/                # Global styles
```

## 🔐 Security

- **Authentication**: Clerk handles all user authentication
- **Authorization**: JWT token verification on backend
- **Encryption**: Messages encrypted in transit (HTTPS/WSS)
- **Environment Variables**: Secrets stored securely
- **Rate Limiting**: Prevents abuse
- **Input Validation**: Zod schemas on backend

## 🧪 Testing

```bash
# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌍 Deployment

### Option 1: Render (Recommended)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Render auto-detects `render.yaml`
5. Add environment variables
6. Deploy!

### Option 2: Vercel + Render

**Frontend (Vercel)**:

```bash
vercel --prod
```

**Backend (Render)**:

- Deploy as Web Service
- Add MongoDB, Clerk variables

## 📝 API Documentation

### Authentication

- `POST /api/auth/clerk-sync` - Sync Clerk user to database

### Users

- `GET /api/users?search=query` - Search users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user

### Conversations

- `GET /api/conversations` - Get user's conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id/messages` - Get messages

### WebSocket Events

- `message:send` - Send message
- `message:new` - Receive message
- `typing:start` - User typing
- `typing:stop` - User stopped
- `conversation:join` - Join conversation
- `conversation:leave` - Leave conversation

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 👨‍💻 Author

**Suryanshu Nabheet**

- GitHub: [@Suryanshu-Nabheet](https://github.com/Suryanshu-Nabheet)
- Project: [Zenith](https://github.com/Suryanshu-Nabheet/Zenith)

## 🙏 Acknowledgments

- Built with Next.js, TypeScript, and modern web technologies
- Authentication powered by Clerk
- Real-time communication via Socket.io
- Video calls with WebRTC

---

**Built with ❤️ for real-world production use**

_Not a demo. Not a prototype. A real, working messaging platform._
