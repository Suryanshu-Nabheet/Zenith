"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { ChatApp } from "@/components/chat-app"
import { api } from "@/lib/api"

export default function ChatPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const { user } = useUser()
  const [tokenReady, setTokenReady] = useState(false)

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  // Initialize API token and sync user
  useEffect(() => {
    const initAuth = async () => {
      if (user && getToken) {
        try {
          // Get Clerk token
          const token = await getToken()
          if (token) {
            // Set token provider in API client
            api.setTokenProvider(getToken)
            
            // Then sync user
            await api.syncClerkUser({
              clerkId: user.id,
              email: user.primaryEmailAddress?.emailAddress || '',
              name: user.fullName || user.username || 'User',
              avatar: user.imageUrl,
            })
            
            setTokenReady(true)
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
        }
      }
    }

    initAuth()
  }, [user, getToken])

  // Show loading while auth is initializing
  if (!isLoaded || !isSignedIn || !user || !tokenReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600/20 border-t-blue-600 animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading Zenith...</p>
        </div>
      </div>
    )
  }

  return (
    <ChatApp
      user={{
        id: user.id,
        name: user.fullName || user.username || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
      }}
    />
  )
}
