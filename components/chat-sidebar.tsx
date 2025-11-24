"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Plus, Search, Settings, Loader2 } from "lucide-react"
import { api } from "@/lib/api"

interface Contact {
  id: string
  name: string
  email: string
  avatar?: string
  status?: string
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
  const [contacts, setContacts] = useState<Contact[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState<Contact[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Load user's conversations on mount
  useEffect(() => {
    loadConversations()
  }, [])

  // Search users when typing
  useEffect(() => {
    if (search.trim().length > 0) {
      searchUsers()
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }, [search])

  const loadConversations = async () => {
    setLoading(true)
    try {
      const data = await api.getConversations()
      // Transform conversations to contacts format
      const conversationContacts = data.conversations?.map((conv: any) => ({
        id: conv.id,
        name: conv.participants?.[0]?.name || 'Unknown User',
        email: conv.participants?.[0]?.email || '',
        avatar: conv.participants?.[0]?.avatar,
        status: 'online',
        lastMessage: conv.lastMessage?.content || 'No messages yet',
        lastMessageTime: conv.lastMessage?.createdAt 
          ? new Date(conv.lastMessage.createdAt).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
          : '',
        unread: 0
      })) || []
      setContacts(conversationContacts)
    } catch (error) {
      console.error('Failed to load conversations:', error)
      // Use mock data as fallback
      setContacts([
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          status: "online",
          unread: 2,
          lastMessage: "That sounds awesome!",
          lastMessageTime: "2:30 PM"
        },
        { 
          id: "2", 
          name: "Bob Smith", 
          email: "bob@example.com",
          status: "online",
          lastMessage: "See you tomorrow!",
          lastMessageTime: "1:15 PM"
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const searchUsers = async () => {
    setIsSearching(true)
    try {
      const data = await api.getUsers(search)
      setSearchResults(data.users || [])
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleCreateConversation = async (userId: string) => {
    try {
      const data = await api.createConversation(userId)
      if (data.conversation) {
        await loadConversations()
        onSelectContact(data.conversation.id)
      }
    } catch (error) {
      console.error('Failed to create conversation:', error)
    }
  }

  const displayContacts = search.trim().length > 0 ? searchResults : contacts
  const showSearchMode = search.trim().length > 0

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
          {isSearching ? (
            <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          )}
          <Input
            placeholder={showSearchMode ? "Search users..." : "Search conversations"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-600 rounded-lg h-10"
          />
        </div>
      </div>

      {/* Chats/Search List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-blue-500 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-zinc-500">Loading conversations...</p>
          </div>
        ) : displayContacts.length > 0 ? (
          <div className="py-2">
            {showSearchMode && searchResults.length > 0 && (
              <div className="px-4 py-2">
                <p className="text-xs text-zinc-500 uppercase font-semibold">Search Results</p>
              </div>
            )}
            <AnimatePresence>
              {displayContacts.map((contact) => (
                <motion.button
                  key={contact.id}
                  onClick={() => {
                    if (showSearchMode) {
                      handleCreateConversation(contact.id)
                    } else {
                      onSelectContact(contact.id)
                    }
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    selectedContact === contact.id
                      ? "bg-zinc-900"
                      : "hover:bg-zinc-900/50"
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  whileHover={{ x: 2 }}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-white text-sm">
                      {contact.avatar || contact.name.charAt(0).toUpperCase()}
                    </div>
                    {contact.status === "online" && !showSearchMode && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950"></div>
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-white text-sm truncate">
                        {contact.name}
                      </p>
                      {!showSearchMode && contact.lastMessageTime && (
                        <span className="text-xs text-zinc-500 flex-shrink-0 ml-2">
                          {contact.lastMessageTime}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-zinc-400 truncate">
                        {showSearchMode ? contact.email : (contact.lastMessage || "No messages")}
                      </p>
                      {!showSearchMode && contact.unread && contact.unread > 0 && (
                        <span className="flex-shrink-0 ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-medium">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-zinc-800 mx-auto mb-3" />
            <p className="text-sm text-zinc-500">
              {showSearchMode ? "No users found" : "No conversations yet"}
            </p>
            {!showSearchMode && (
              <p className="text-xs text-zinc-600 mt-2">
                Search for users to start chatting
              </p>
            )}
          </div>
        )}
      </div>

      {/* New Chat Button */}
      {!showSearchMode && (
        <div className="p-4 border-t border-zinc-900">
          <Button
            onClick={() => setSearch(" ")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg h-11"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </Button>
        </div>
      )}
    </div>
  )
}
