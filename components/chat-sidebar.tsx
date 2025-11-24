"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LogOut, Plus, Search, Settings, Bell, Star, Archive, MessageCircle, Sparkles } from "lucide-react"

interface Contact {
  id: string
  name: string
  status: "online" | "away" | "offline"
  avatar: string
  unread?: number
  lastMessage?: string
  pinned?: boolean
}

interface ChatSidebarProps {
  user: { id: string; name: string; email: string }
  selectedContact: string | null
  onSelectContact: (contactId: string) => void
  onLogout: () => void
  onOpenSettings: () => void
  onViewProfile?: (profileId: string) => void
  onOpenNotifications?: () => void
  onOpenAI?: () => void
}

export function ChatSidebar({
  user,
  selectedContact,
  onSelectContact,
  onLogout,
  onOpenSettings,
  onViewProfile,
  onOpenNotifications,
  onOpenAI,
}: ChatSidebarProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Alice Johnson",
      status: "online",
      avatar: "AJ",
      unread: 2,
      lastMessage: "That sounds awesome!",
      pinned: true,
    },
    { id: "2", name: "Bob Smith", status: "online", avatar: "BS", lastMessage: "See you tomorrow!" },
    { id: "3", name: "Carol White", status: "away", avatar: "CW", unread: 1, lastMessage: "Thanks for the update" },
    { id: "4", name: "David Brown", status: "offline", avatar: "DB", lastMessage: "Talk soon" },
  ])
  const [search, setSearch] = useState("")
  const [showArchived, setShowArchived] = useState(false)

  const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const pinnedContacts = filteredContacts.filter((c) => c.pinned)
  const regularContacts = filteredContacts.filter((c) => !c.pinned)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-sidebar-border/50 bg-gradient-to-b from-sidebar to-sidebar/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-sidebar-foreground text-base">Zenith</h2>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user.name}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenNotifications}
              className="text-sidebar-foreground hover:bg-sidebar-accent/50 relative rounded-lg"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenSettings}
              className="text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-sidebar-foreground/40" />
          <Input
            placeholder="Search or start new chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-3 py-2 bg-sidebar-accent/50 border-sidebar-border/50 text-sidebar-foreground placeholder:text-sidebar-foreground/40 rounded-lg focus:bg-sidebar-accent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {pinnedContacts.length > 0 && (
          <div className="px-3 py-3">
            <p className="text-xs font-semibold text-sidebar-foreground/50 px-3 mb-2 uppercase">Pinned</p>
            {pinnedContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                isSelected={selectedContact === contact.id}
                onSelect={() => onSelectContact(contact.id)}
                onViewProfile={() => onViewProfile?.(contact.id)}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}

        {regularContacts.length > 0 && (
          <div className="px-3 py-3">
            {pinnedContacts.length > 0 && (
              <p className="text-xs font-semibold text-sidebar-foreground/50 px-3 mb-2 uppercase">Messages</p>
            )}
            {regularContacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                isSelected={selectedContact === contact.id}
                onSelect={() => onSelectContact(contact.id)}
                onViewProfile={() => onViewProfile?.(contact.id)}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}

        {filteredContacts.length === 0 && (
          <div className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-sidebar-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-sidebar-foreground/50">No contacts found</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-sidebar-border/50 space-y-2 bg-gradient-to-t from-sidebar to-sidebar/50">
        <Button
          variant="outline"
          className="w-full border-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/50 bg-sidebar-accent/20 rounded-lg gap-2"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
        <Button
          variant="outline"
          className="w-full border-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/50 bg-sidebar-accent/20 rounded-lg gap-2"
          onClick={onOpenAI}
        >
          <Sparkles className="w-4 h-4" />
          AI Assistant
        </Button>
        <Button
          variant="outline"
          className="w-full border-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/50 bg-sidebar-accent/20 rounded-lg gap-2"
        >
          <Archive className="w-4 h-4" />
          Archived
        </Button>
        <Button
          variant="outline"
          className="w-full border-sidebar-accent text-sidebar-foreground hover:bg-red-500/10 hover:text-red-400 bg-transparent rounded-lg gap-2"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

function ContactItem({
  contact,
  isSelected,
  onSelect,
  onViewProfile,
  getStatusColor,
}: {
  contact: Contact
  isSelected: boolean
  onSelect: () => void
  onViewProfile: () => void
  getStatusColor: (status: string) => string
}) {
  return (
    <button
      onClick={onSelect}
      onContextMenu={(e) => {
        e.preventDefault()
        onViewProfile()
      }}
      className={`w-full px-3 py-3 mb-1 flex items-center gap-3 rounded-xl transition-all group ${
        isSelected
          ? "bg-sidebar-primary/20 border border-sidebar-primary/30"
          : "hover:bg-sidebar-accent/30 border border-transparent"
      }`}
      title="Right-click to view profile"
    >
      <div className="relative flex-shrink-0">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center font-semibold text-sm text-sidebar-foreground shadow-md ${isSelected ? "ring-2 ring-sidebar-primary/50" : ""}`}
        >
          {contact.avatar}
        </div>
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-sidebar ${getStatusColor(
            contact.status,
          )}`}
        ></div>
        {contact.pinned && <Star className="absolute -top-1 -right-1 w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
      </div>

      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-medium truncate text-sm ${isSelected ? "text-sidebar-foreground" : "text-sidebar-foreground/90"}`}
          >
            {contact.name}
          </p>
          {contact.unread && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {contact.unread}
            </span>
          )}
        </div>
        <p className="text-xs text-sidebar-foreground/50 truncate mt-0.5">{contact.lastMessage || "No messages"}</p>
      </div>
    </button>
  )
}
