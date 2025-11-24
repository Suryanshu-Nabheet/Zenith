"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { X, MessageSquare, Phone, Shield, Clock, Zap, Award } from "lucide-react"

interface UserProfileProps {
  userId: string
  currentUser: { id: string; name: string; email: string }
  onClose: () => void
}

export function UserProfile({ userId, currentUser, onClose }: UserProfileProps) {
  const contactName = userId === "1" ? "Alice Johnson" : "Bob Smith"
  const contactEmail = userId === "1" ? "alice@example.com" : "bob@example.com"
  const contactStatus = userId === "1" ? "online" : "away"

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-background to-secondary/5 h-screen overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-card/50 to-background">
        <h2 className="text-lg font-bold text-foreground">Profile</h2>
        <Button size="sm" variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center mx-auto mb-4 shadow-2xl border-2 border-primary/30">
              <span className="text-6xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                {contactName.split(" ")[0][0]}
                {contactName.split(" ")[1][0]}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">{contactName}</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div
                className={`w-3 h-3 rounded-full ${contactStatus === "online" ? "bg-green-500" : "bg-yellow-500"} animate-pulse`}
              ></div>
              <p className="text-sm text-muted-foreground capitalize">{contactStatus}</p>
            </div>
          </div>

          <div className="bg-card/50 rounded-xl border border-border/50 p-6 space-y-4 backdrop-blur-sm">
            <div className="pb-4 border-b border-border/50">
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Email Address</p>
              <p className="text-foreground text-sm">{contactEmail}</p>
            </div>
            <div className="pb-4 border-b border-border/50">
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">User ID</p>
              <p className="text-foreground font-mono text-sm opacity-75">{userId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Member Since</p>
              <p className="text-foreground">January 15, 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <StatusCard icon={<Shield className="w-5 h-5" />} label="Encryption" value="Verified" color="green" />
            <StatusCard icon={<Clock className="w-5 h-5" />} label="Last Seen" value="2m ago" color="blue" />
            <StatusCard icon={<Award className="w-5 h-5" />} label="Trust Score" value="98%" color="purple" />
          </div>

          {/* Stats */}
          <div className="bg-card/50 rounded-xl border border-border/50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Conversations</span>
              <span className="font-semibold text-foreground">24</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Messages Shared</span>
              <span className="font-semibold text-foreground">1,234</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Calls</span>
              <span className="font-semibold text-foreground">42</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Message
            </Button>
            <Button variant="outline" className="w-full border-border bg-transparent hover:bg-secondary/50 gap-2">
              <Phone className="w-4 h-4" />
              Start Video Call
            </Button>
            <Button variant="outline" className="w-full border-border bg-transparent hover:bg-secondary/50 gap-2">
              <Zap className="w-4 h-4" />
              Create Group
            </Button>
          </div>

          {/* About Section */}
          <div className="bg-card/50 rounded-xl border border-border/50 p-6">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              About
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Security-focused developer passionate about encrypted communications and privacy. Always available for new
              projects and collaborations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: "green" | "blue" | "purple"
}) {
  const colorClasses = {
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  }

  return (
    <div className={`${colorClasses[color]} rounded-lg border p-3 text-center`}>
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}
