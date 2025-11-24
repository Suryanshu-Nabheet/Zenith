"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClerk, useAuth } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { VideoCall } from "./video-call"
import { UserSettings } from "./user-settings"
import { UserProfile } from "./user-profile"
import { socketClient } from "@/lib/socket"
import { api } from "@/lib/api"

interface ChatAppProps {
  user: { id: string; name: string; email: string }
}

export function ChatApp({ user }: ChatAppProps) {
  const router = useRouter()
  const { signOut } = useClerk()
  const { getToken } = useAuth()
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [inCall, setInCall] = useState(false)
  const [callContact, setCallContact] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<"chat" | "settings" | "profile">("chat")
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null)

  // Connect to WebSocket on mount
  useEffect(() => {
    const initSocket = async () => {
      try {
      try {
        // Set token providers
        socketClient.setTokenProvider(getToken);
        api.setTokenProvider(getToken);
        
        await socketClient.connect();
      } catch (error) {
        console.error('Socket connection error:', error);
      }
      } catch (error) {
        console.error('Socket connection error:', error);
      }
    };

    initSocket();

    return () => {
      socketClient.disconnect();
    };
  }, [getToken]);

  const handleLogout = async () => {
    socketClient.disconnect();
    api.clearAuthToken();
    await signOut()
    router.push("/landing")
  }

  const handleStartCall = (contactId: string) => {
    setCallContact(contactId)
    setInCall(true)
  }

  const handleEndCall = () => {
    setInCall(false)
    setCallContact(null)
  }

  if (inCall && callContact) {
    return <VideoCall contactId={callContact} onEnd={handleEndCall} currentUser={user} />
  }

  if (currentView === "settings") {
    return (
      <motion.div 
        className="flex h-screen bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ChatSidebar
          user={user}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          onLogout={handleLogout}
          onOpenSettings={() => setCurrentView("settings")}
        />
        <UserSettings user={user} onClose={() => setCurrentView("chat")} onLogout={handleLogout} />
      </motion.div>
    )
  }

  if (currentView === "profile" && viewingProfileId) {
    return (
      <motion.div 
        className="flex h-screen bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ChatSidebar
          user={user}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          onLogout={handleLogout}
          onOpenSettings={() => setCurrentView("settings")}
        />
        <UserProfile
          userId={viewingProfileId}
          currentUser={user}
          onClose={() => {
            setCurrentView("chat")
            setViewingProfileId(null)
          }}
        />
      </motion.div>
    )
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <ChatSidebar
        user={user}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
        onLogout={handleLogout}
        onOpenSettings={() => setCurrentView("settings")}
        onViewProfile={(profileId) => {
          setViewingProfileId(profileId)
          setCurrentView("profile")
        }}
      />
      {selectedContact ? (
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChatWindow
            contactId={selectedContact}
            user={user}
            onStartCall={handleStartCall}
            onViewProfile={(profileId) => {
              setViewingProfileId(profileId)
              setCurrentView("profile")
            }}
          />
        </motion.div>
      ) : (
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-md">
            <motion.div 
              className="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-6 border border-blue-600/20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img src="/icon.svg" alt="Zenith" className="w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3">Welcome to Zenith</h2>
            <p className="text-zinc-400 leading-relaxed">
              Select a conversation from the sidebar to start messaging
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
