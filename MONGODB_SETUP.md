# 🔧 MongoDB Setup Required

The app needs MongoDB. Choose one option:

## Option 1: Use MongoDB Atlas (Recommended - FREE)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster (M0 Sandbox - FREE forever)
3. Get your connection string
4. Update `server/.env`:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/zenith?retryWrites=true&w=majority"
   ```

## Option 2: Install MongoDB Locally

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Then verify
mongosh
```

Then restart backend:

```bash
pnpm dev
```

**That's it!** MongoDB Atlas is easier and free.
