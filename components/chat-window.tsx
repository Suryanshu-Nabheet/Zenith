"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Video, Send, Paperclip, Smile, MoreVertical, Loader2 } from "lucide-react"
import { api } from "@/lib/api"
import { socketClient } from "@/lib/socket"

interface Message {
  id: string
  sender: string
  senderName?: string
  content: string
  timestamp: Date
  type?: string
}

interface ChatWindowProps {
  contactId: string
  user: { id: string; name: string; email: string }
  onStartCall: (contactId: string) => void
  onViewProfile?: (profileId: string) => void
}

export function ChatWindow({ contactId, user, onStartCall, onViewProfile }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [contactInfo, setContactInfo] = useState({ name: "Loading...", status: "offline", avatar: "?" })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadMessages()
    joinConversation()

    // Listen for new messages
    socketClient.on('message:new', handleNewMessage)

    return () => {
      socketClient.off('message:new', handleNewMessage)
      socketClient.leaveConversation(contactId)
    }
  }, [contactId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const loadMessages = async () => {
    setLoading(true)
    try {
      const data = await api.getMessages(contactId)
      const formattedMessages = data.messages?.map((msg: any) => ({
        id: msg.id,
        sender: msg.sender?.id || msg.senderId,
        senderName: msg.sender?.name,
        content: msg.content,
        timestamp: new Date(msg.createdAt || msg.timestamp),
        type: msg.type || 'text'
      })) || []
      setMessages(formattedMessages)
      
      // Get contact info from first message
      if (data.messages && data.messages.length > 0) {
        const otherUser = data.messages[0].sender?.id !== user.id 
          ? data.messages[0].sender 
          : data.messages[1]?.sender
        if (otherUser) {
          setContactInfo({
            name: otherUser.name || 'Unknown',
            status: 'online',
            avatar: otherUser.avatar || otherUser.name?.charAt(0) || '?'
          })
        }
      }
    } catch (error) {
      console.error('Failed to load messages:', error)
      // Fallback to mock data
      setMessages([
        {
          id: "1",
          sender: contactId,
          senderName: "Contact",
          content: "Hey! How are you doing?",
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "2",
          sender: user.id,
          senderName: user.name,
          content: "Great! Just finished a project. How about you?",
          timestamp: new Date(Date.now() - 3000000),
        },
      ])
      setContactInfo({ name: "Demo Contact", status: "online", avatar: "DC" })
    } finally {
      setLoading(false)
    }
  }

  const joinConversation = () => {
    socketClient.joinConversation(contactId)
  }

  const handleNewMessage = (message: any) => {
    if (message.conversationId === contactId) {
      const newMsg: Message = {
        id: message.id,
        sender: message.senderId,
        senderName: message.sender?.name,
        content: message.content,
        timestamp: new Date(message.createdAt || Date.now()),
        type: message.type || 'text'
      }
      setMessages(prev => [...prev, newMsg])
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || sending) return

    setSending(true)
    const tempId = Math.random().toString(36).substr(2, 9)
    const optimisticMessage: Message = {
      id: tempId,
      sender: user.id,
      senderName: user.name,
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    }

    // Optimistically add message
    setMessages(prev => [...prev, optimisticMessage])
    const messageContent = inputValue
    setInputValue("")

    try {
      // Send via WebSocket
      socketClient.sendMessage({
        conversationId: contactId,
        content: messageContent,
        type: 'text'
      })
    } catch (error) {
      console.error('Failed to send message:', error)
      // Keep optimistic update even on error
    } finally {
      setSending(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-500 mx-auto mb-3 animate-spin" />
          <p className="text-zinc-400">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-black h-screen">
      {/* Header */}
      <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 flex-1 cursor-pointer" 
          onClick={() => onViewProfile?.(contactId)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {contactInfo.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{contactInfo.name}</h3>
            <p className="text-xs text-zinc-400">{contactInfo.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onStartCall(contactId)}
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10"
          >
            <Phone className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onStartCall(contactId)}
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10"
          >
            <Video className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-zinc-500">No messages yet</p>
              <p className="text-zinc-600 text-sm mt-2">Send a message to start the conversation</p>
            </div>
          </div>
        ) : (
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
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-zinc-900 text-zinc-100 rounded-bl-md'
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
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-950 border-t border-zinc-900">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full h-10 w-10"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            disabled={sending}
            className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-600 rounded-xl h-11"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || sending}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-11 w-11 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
