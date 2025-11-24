"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { ChatApp } from "@/components/chat-app"
import { api } from "@/lib/api"

export default function ChatPage() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    if (user) {
      api.syncClerkUser({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        name: user.fullName || user.username || 'User',
        avatar: user.imageUrl,
      }).catch(console.error);
    }
  }, [user]);

  if (!isLoaded || !isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
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
