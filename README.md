# Zenith

<div align="center">

![Zenith Logo](public/icon.svg)

**Next-Generation Secure Messaging Platform**

End-to-end encrypted real-time messaging with HD video/voice calls

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

[Demo](https://zenith-chat.app) · [Report Bug](https://github.com/Suryanshu-Nabheet/Zenith/issues) · [Request Feature](https://github.com/Suryanshu-Nabheet/Zenith/issues)

</div>

## ✨ Features

- 🔐 **End-to-End Encryption** - Military-grade encryption for all messages
- 💬 **Real-Time Messaging** - Instant message delivery with WebSocket
- 📹 **HD Video/Voice Calls** - Crystal clear video calls powered by WebRTC
- 👥 **Group Chats** - Create unlimited groups with custom permissions
- 📎 **File Sharing** - Share images, videos, and documents
- ✅ **Message Receipts** - Delivery and read status tracking
- ⌨️ **Typing Indicators** - See when someone is typing
- 🟢 **Online Status** - Real-time presence tracking
- 🎨 **Modern UI** - Clean, professional dark theme
- 📱 **Responsive Design** - Works perfectly on all devices

## 🚀 Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Clerk** - Authentication & user management
- **Socket.io Client** - WebSocket communication
- **WebRTC** - Peer-to-peer video/voice calls

### Backend

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **Prisma** - Next-generation ORM
- **MongoDB** - NoSQL database
- **JWT** - Secure token-based authentication

## 📋 Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm
- MongoDB database
- Clerk account (free tier available)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Suryanshu-Nabheet/Zenith.git
cd Zenith
```

### 2. Install dependencies

```bash
# Install frontend dependencies
pnpm install

# Install backend dependencies
cd server && pnpm install && cd ..
```

### 3. Environment Setup

#### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

#### Backend (server/.env)

```bash
PORT=8000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/zenith
JWT_SECRET=your_jwt_secret_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 4. Database Setup

```bash
cd server
pnpm prisma:generate
cd ..
```

### 5. Run the application

```bash
# Terminal 1 - Backend
cd server && pnpm dev

# Terminal 2 - Frontend
pnpm dev
```

Visit **http://localhost:3000** 🎉

## 📁 Project Structure

```
Zenith/
├── app/                    # Next.js app directory
│   ├── chat/              # Chat application
│   ├── landing/           # Landing page
│   ├── sign-in/           # Clerk sign-in
│   └── sign-up/           # Clerk sign-up
├── components/            # React components
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── socket.ts         # Socket.io client
│   └── webrtc.ts         # WebRTC client
├── server/               # Backend server
│   ├── prisma/          # Database schema
│   └── src/
│       ├── config/      # Configuration
│       ├── controllers/ # Route controllers
│       ├── middlewares/ # Express middlewares
│       ├── routes/      # API routes
│       ├── socket/      # WebSocket handlers
│       └── utils/       # Utilities
└── public/              # Static assets
```

## 🔧 Configuration

### Clerk Setup

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Copy publishable key and secret key
4. Add to environment variables

### MongoDB Setup

#### Local

```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Cloud (MongoDB Atlas)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster
3. Get connection string
4. Add to `DATABASE_URL` in server/.env

## 🚢 Deployment

### Deploy to Render

1. **Create Render account** at [render.com](https://render.com)

2. **Create Web Service** for backend:

   - Build Command: `cd server && pnpm install && pnpm prisma:generate && pnpm build`
   - Start Command: `cd server && pnpm start`
   - Add environment variables

3. **Create Static Site** for frontend:
   - Build Command: `pnpm install && pnpm build`
   - Publish Directory: `.next`
   - Add environment variables

### Environment Variables for Production

- Update `NEXT_PUBLIC_API_URL` to your backend URL
- Update `NEXT_PUBLIC_SOCKET_URL` to your backend URL
- Set `NODE_ENV=production`

## 📚 API Documentation

### REST Endpoints

#### Authentication

- `POST /api/auth/clerk-sync` - Sync Clerk user to database

#### Users

- `GET /api/users` - Get all users (with search)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/profile` - Update profile

#### Conversations

- `GET /api/conversations` - Get user conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/:id/messages` - Get messages

### WebSocket Events

#### Messages

- `message:send` - Send message
- `message:new` - Receive message
- `message:typing` - Typing indicator

#### Calls

- `call:initiate` - Start call
- `call:accept` - Accept call
- `call:offer/answer` - WebRTC signaling

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Suryanshu Nabheet**

- GitHub: [@Suryanshu-Nabheet](https://github.com/Suryanshu-Nabheet)
- Email: contact@suryanshunabheet.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Clerk](https://clerk.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Support

For support, email support@zenith-chat.app or open an issue on GitHub.

---

<div align="center">
Made with ❤️ by Suryanshu Nabheet
</div>
