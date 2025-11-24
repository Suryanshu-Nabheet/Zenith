"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Plus, Search, Settings } from "lucide-react"

interface Contact {
  id: string
  name: string
  status: "online" | "away" | "offline"
  avatar: string
  unread?: number
  lastMessage?: string
  lastMessageTime?: string
}

interface ChatSidebarProps {
  user: { id: string; name: string; email: string }
  selectedContact: string | null
  onSelectContact: (contactId: string) => void
  onLogout: () => void
  onOpenSettings: () => void
  onViewProfile?: (profileId: string) => void
}

export function ChatSidebar({
  user,
  selectedContact,
  onSelectContact,
  onLogout,
  onOpenSettings,
  onViewProfile,
}: ChatSidebarProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Johnson",
      status: "online",
      avatar: "AJ",
      unread: 2,
      lastMessage: "That sounds awesome!",
      lastMessageTime: "2:30 PM"
    },
    { 
      id: "2", 
      name: "Bob Smith", 
      status: "online", 
      avatar: "BS", 
      lastMessage: "See you tomorrow!",
      lastMessageTime: "1:15 PM"
    },
    { 
      id: "3", 
      name: "Carol White", 
      status: "away", 
      avatar: "CW", 
      unread: 1, 
      lastMessage: "Thanks for the update",
      lastMessageTime: "Yesterday"
    },
    { 
      id: "4", 
      name: "David Brown", 
      status: "offline", 
      avatar: "DB", 
      lastMessage: "Talk soon",
      lastMessageTime: "Yesterday"
    },
  ])
  const [search, setSearch] = useState("")

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="w-96 bg-zinc-950 border-r border-zinc-900 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-zinc-950 border-b border-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => onViewProfile?.(user.id)}>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-white text-base truncate">{user.name}</h2>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onOpenSettings}
              className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-9 w-9"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onLogout}
              className="text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-full h-9 w-9"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search conversations"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-600 rounded-lg h-10"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          <div className="py-2">
            {filteredContacts.map((contact) => (
              <motion.button
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                  selectedContact === contact.id
                    ? "bg-zinc-900"
                    : "hover:bg-zinc-900/50"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ x: 2 }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white">
                    {contact.avatar}
                  </div>
                  {contact.status === "online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950"></div>
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-white text-sm truncate">
                      {contact.name}
                    </p>
                    <span className="text-xs text-zinc-500 flex-shrink-0 ml-2">
                      {contact.lastMessageTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-400 truncate">
                      {contact.lastMessage || "No messages"}
                    </p>
                    {contact.unread && contact.unread > 0 && (
                      <span className="flex-shrink-0 ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-medium">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-zinc-800 mx-auto mb-3" />
            <p className="text-sm text-zinc-500">No conversations found</p>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-zinc-900">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg h-11"
        >
          <Plus className="w-5 h-5" />
          New Chat
        </Button>
      </div>
    </div>
  )
}
