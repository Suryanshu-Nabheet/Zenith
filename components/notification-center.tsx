"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Bell, MessageSquare, Phone, UserPlus, Clock, Trash2, CheckCheck } from "lucide-react"

interface Notification {
  id: string
  type: "message" | "call" | "friend" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationCenterProps {
  onClose: () => void
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Alice Johnson",
      message: "Hey! Are you available for a call?",
      timestamp: new Date(Date.now() - 120000),
      read: false,
    },
    {
      id: "2",
      type: "call",
      title: "Bob Smith",
      message: "Missed call",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: "3",
      type: "friend",
      title: "Carol White",
      message: "Accepted your friend request",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Security Alert",
      message: "New device signed in from Chrome on macOS",
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleClear = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-400" />
      case "call":
        return <Phone className="w-5 h-5 text-green-400" />
      case "friend":
        return <UserPlus className="w-5 h-5 text-purple-400" />
      case "system":
        return <Bell className="w-5 h-5 text-orange-400" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[32rem] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-card to-card/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Notifications</h2>
              {unreadCount > 0 && <p className="text-xs text-muted-foreground">{unreadCount} unread</p>}
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 transition-all hover:bg-primary/5 border-l-4 ${
                    !notif.read ? "border-l-primary bg-primary/5" : "border-l-transparent"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{notif.title}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{notif.message}</p>
                        </div>
                        <button
                          onClick={() => handleClear(notif.id)}
                          className="flex-shrink-0 text-muted-foreground hover:text-red-400 transition opacity-0 group-hover:opacity-100 hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground/60 flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3" />
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                  </div>
                  {!notif.read && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3 h-7 text-xs border-border/50 bg-primary/10 hover:bg-primary/20 text-primary gap-1"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      <CheckCheck className="w-3 h-3" />
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-6 py-3 border-t border-border/50 bg-card/50">
            <Button
              size="sm"
              variant="outline"
              className="w-full h-8 text-xs border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 bg-transparent"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
