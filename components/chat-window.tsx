"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Send, Paperclip, Info, Search, Trash2, Copy, Edit, Volume2, Sparkles } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  encrypted: boolean
}

interface ChatWindowProps {
  contactId: string
  user: { id: string; name: string; email: string }
  onStartCall: (contactId: string) => void
  onViewProfile?: (profileId: string) => void
  onOpenAI?: () => void
}

export function ChatWindow({ contactId, user, onStartCall, onViewProfile, onOpenAI }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: contactId,
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 300000),
      encrypted: true,
    },
    {
      id: "2",
      sender: user.id,
      content: "Great! Just finished a project. How about you?",
      timestamp: new Date(Date.now() - 120000),
      encrypted: true,
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: user.id,
      content: inputValue,
      timestamp: new Date(),
      encrypted: true,
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          sender: contactId,
          content: "That sounds awesome!",
          timestamp: new Date(),
          encrypted: true,
        },
      ])
    }, 500)
  }

  const contactName = contactId === "1" ? "Alice Johnson" : "Bob Smith"
  const filteredMessages = messages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Enhanced Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-card/50 to-background">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{contactName}</h2>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </p>
        </div>
        <div className="flex gap-2">
          {showSearch && (
            <div className="relative mr-2">
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-input border-border text-foreground placeholder:text-muted-foreground text-sm"
                autoFocus
              />
            </div>
          )}
          <Button size="sm" variant="outline" onClick={() => setShowSearch(!showSearch)} className="border-border">
            <Search className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenAI}
            className="border-border gap-1 hover:bg-primary/10 bg-transparent"
          >
            <Sparkles className="w-4 h-4" />
            AI
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStartCall(contactId)}
            className="border-border gap-2 hover:bg-primary/10"
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button size="sm" variant="outline" onClick={() => onViewProfile?.(contactId)} className="border-border">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {(searchQuery ? filteredMessages : messages).map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === user.id ? "justify-end" : "justify-start"} animate-slide-up group`}
            onMouseEnter={() => setSelectedMessage(message.id)}
            onMouseLeave={() => setSelectedMessage(null)}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-xl transition-all ${
                message.sender === user.id
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card text-foreground border border-border/50"
              } ${selectedMessage === message.id ? "shadow-lg" : ""}`}
            >
              <p className="text-sm break-words">{message.content}</p>
              <div
                className={`text-xs mt-2 flex items-center gap-2 ${
                  message.sender === user.id ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                <span>{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                <span>🔐</span>
              </div>

              {selectedMessage === message.id && (
                <div className="absolute -top-10 right-0 flex gap-1 bg-card border border-border rounded-lg p-1 shadow-lg">
                  <button
                    onClick={() => navigator.clipboard.writeText(message.content)}
                    className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition"
                    title="Reply"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition"
                    title="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  {message.sender === user.id && (
                    <button
                      onClick={() => setMessages(messages.filter((m) => m.id !== message.id))}
                      className="p-2 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input */}
      <div className="px-6 py-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-border text-muted-foreground bg-transparent hover:bg-secondary"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            placeholder="Type a message... (all encrypted)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground flex-1 focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground gap-1"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
