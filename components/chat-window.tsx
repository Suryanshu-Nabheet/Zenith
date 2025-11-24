"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Video, Send, Paperclip, Smile, MoreVertical, User } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
}

interface ChatWindowProps {
  contactId: string
  user: { id: string; name: string; email: string }
  onStartCall: (contactId: string) => void
  onViewProfile?: (profileId: string) => void
}

// Mock contact data
const contactData: Record<string, { name: string; status: string; avatar: string }> = {
  "1": { name: "Alice Johnson", status: "online", avatar: "AJ" },
  "2": { name: "Bob Smith", status: "online", avatar: "BS" },
  "3": { name: "Carol White", status: "typing...", avatar: "CW" },
  "4": { name: "David Brown", status: "last seen recently", avatar: "DB" },
}

export function ChatWindow({ contactId, user, onStartCall, onViewProfile }: ChatWindowProps) {
  const contact = contactData[contactId] || { name: "Unknown", status: "offline", avatar: "?" }
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: contactId,
      content: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      sender: user.id,
      content: "Great! Just finished a project. How about you?",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      sender: contactId,
      content: "That's awesome! I'd love to hear more about it.",
      timestamp: new Date(Date.now() - 2400000),
    },
    {
      id: "4",
      sender: user.id,
      content: "Sure! It's a messaging platform with end-to-end encryption.",
      timestamp: new Date(Date.now() - 1800000),
    },
  ])
  const [inputValue, setInputValue] = useState("")
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
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Simulate reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          sender: contactId,
          content: "Thanks for sharing!",
          timestamp: new Date(),
        },
      ])
    }, 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 h-screen">
      {/* Header */}
      <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 flex-1 cursor-pointer" 
          onClick={() => onViewProfile?.(contactId)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {contact.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{contact.name}</h3>
            <p className="text-xs text-zinc-400">{contact.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onStartCall(contactId)}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-10 w-10"
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onStartCall(contactId)}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-10 w-10"
          >
            <Video className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-10 w-10"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => {
            const isOwnMessage = message.sender === user.id
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      isOwnMessage
                        ? 'bg-indigo-600 text-white rounded-br-md'
                        : 'bg-zinc-800 text-zinc-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words">{message.content}</p>
                  </div>
                  <p className={`text-xs text-zinc-500 mt-1 px-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-10 w-10"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full h-10 w-10"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-indigo-600 rounded-xl h-11"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-11 w-11 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
