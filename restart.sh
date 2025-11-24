#!/bin/bash

echo "🔄 Restarting Zenith with fresh Prisma client..."

# Kill any processes on port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null || true

# Regenerate Prisma client
cd server
echo "📦 Generating Prisma client..."
pnpm prisma:generate

# Go back to root
cd ..

echo "✅ Prisma client regenerated!"
echo "🚀 Starting both servers..."

# Start both servers
pnpm dev
