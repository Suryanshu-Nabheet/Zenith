"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClerk } from "@clerk/nextjs"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { VideoCall } from "./video-call"
import { UserSettings } from "./user-settings"
import { UserProfile } from "./user-profile"
import { NotificationCenter } from "./notification-center"
import { AIAssistant } from "./ai-assistant"
import { socketClient } from "@/lib/socket"

interface ChatAppProps {
  user: { id: string; name: string; email: string }
}

export function ChatApp({ user }: ChatAppProps) {
  const router = useRouter()
  const { signOut } = useClerk()
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [inCall, setInCall] = useState(false)
  const [callContact, setCallContact] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<"chat" | "settings" | "profile">("chat")
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  // Connect to WebSocket on mount
  useEffect(() => {
    socketClient.connect();

    // Cleanup on unmount
    return () => {
      socketClient.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    socketClient.disconnect();
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
      <div className="flex h-screen bg-black overflow-hidden">
        <ChatSidebar
          user={user}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          onLogout={handleLogout}
          onOpenSettings={() => setCurrentView("settings")}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenAI={() => setShowAIAssistant(true)}
        />
        <UserSettings user={user} onClose={() => setCurrentView("chat")} onLogout={handleLogout} />
        {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
        {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
      </div>
    )
  }

  if (currentView === "profile" && viewingProfileId) {
    return (
      <div className="flex h-screen bg-black overflow-hidden">
        <ChatSidebar
          user={user}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          onLogout={handleLogout}
          onOpenSettings={() => setCurrentView("settings")}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenAI={() => setShowAIAssistant(true)}
        />
        <UserProfile
          userId={viewingProfileId}
          currentUser={user}
          onClose={() => {
            setCurrentView("chat")
            setViewingProfileId(null)
          }}
        />
        {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
        {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
      </div>
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
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenAI={() => setShowAIAssistant(true)}
      />
      {selectedContact ? (
        <ChatWindow
          contactId={selectedContact}
          user={user}
          onStartCall={handleStartCall}
          onViewProfile={(profileId) => {
            setViewingProfileId(profileId)
            setCurrentView("profile")
          }}
          onOpenAI={() => setShowAIAssistant(true)}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
              <div className="text-3xl">
                <img src="/icon.svg" alt="Icon" className="w-10 h-10" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Zenith</h2>
            <p className="text-zinc-400">
              Select a contact from the sidebar to start chatting or create a new conversation
            </p>
          </div>
        </div>
      )}
      {showNotifications && <NotificationCenter onClose={() => setShowNotifications(false)} />}
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
    </div>
  )
}
