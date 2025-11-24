"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Bell, Lock, Eye, Shield, Zap, Smartphone, Globe, MessageSquare } from "lucide-react"

interface UserSettingsProps {
  user: { id: string; name: string; email: string }
  onClose: () => void
  onLogout: () => void
}

export function UserSettings({ user, onClose, onLogout }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: false,
    onlineStatus: true,
    darkMode: true,
    readReceipts: true,
    typingIndicator: true,
    messageExpiry: "never",
    desktopNotifications: true,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const tabs = [
    { id: "general", label: "General", icon: <Zap className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "account", label: "Account", icon: <Smartphone className="w-4 h-4" /> },
  ]

  return (
    <div className="flex-1 flex flex-col bg-background h-screen">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-card/50 to-background">
        <h2 className="text-lg font-bold text-foreground">Settings</h2>
        <Button size="sm" variant="ghost" onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4 border-b border-border/50 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Profile Information
                </h3>
                <div className="space-y-4 bg-card/50 rounded-xl p-4 border border-border/50">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      defaultValue={user.name}
                      className="bg-input border-border/50 text-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      defaultValue={user.email}
                      disabled
                      className="bg-input/50 border-border/50 text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Status Message</label>
                    <Input
                      placeholder="What's on your mind?"
                      className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground">
                    Save Changes
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Privacy & Security */}
          {activeTab === "privacy" && (
            <>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security
                </h3>
                <div className="space-y-3 bg-card/50 rounded-xl p-4 border border-border/50">
                  <SettingToggle
                    icon={<Lock className="w-5 h-5" />}
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security to your account"
                    checked={settings.twoFactor}
                    onChange={() => handleToggle("twoFactor")}
                  />
                  <SettingToggle
                    icon={<Eye className="w-5 h-5" />}
                    title="Online Status"
                    description="Show when you're online or away"
                    checked={settings.onlineStatus}
                    onChange={() => handleToggle("onlineStatus")}
                  />
                  <SettingToggle
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Read Receipts"
                    description="Let others see when you've read messages"
                    checked={settings.readReceipts}
                    onChange={() => handleToggle("readReceipts")}
                  />
                  <SettingToggle
                    icon={<Zap className="w-5 h-5" />}
                    title="Typing Indicator"
                    description="Show when you're typing"
                    checked={settings.typingIndicator}
                    onChange={() => handleToggle("typingIndicator")}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-accent" />
                  Encryption
                </h3>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-400">End-to-End Encryption Active</span>
                  </div>
                  <p className="text-sm text-green-400/80">
                    All your messages are encrypted with military-grade encryption
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Message Expiry</label>
                <select className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="never">Never expire</option>
                  <option value="1h">After 1 hour</option>
                  <option value="1d">After 1 day</option>
                  <option value="7d">After 7 days</option>
                </select>
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </h3>
                <div className="space-y-3 bg-card/50 rounded-xl p-4 border border-border/50">
                  <SettingToggle
                    icon={<Bell className="w-5 h-5" />}
                    title="Message Notifications"
                    description="Get notified when you receive messages"
                    checked={settings.notifications}
                    onChange={() => handleToggle("notifications")}
                  />
                  <SettingToggle
                    icon={<Smartphone className="w-5 h-5" />}
                    title="Desktop Notifications"
                    description="Show notifications on your desktop"
                    checked={settings.desktopNotifications}
                    onChange={() => handleToggle("desktopNotifications")}
                  />
                </div>
              </div>
            </>
          )}

          {/* Account */}
          {activeTab === "account" && (
            <>
              <div>
                <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  Active Sessions
                </h3>
                <div className="space-y-2 bg-card/50 rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">Chrome on macOS</p>
                      <p className="text-xs text-muted-foreground">Last active 2 minutes ago</p>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Current</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 space-y-3">
                <h3 className="text-base font-semibold text-red-400">Danger Zone</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SettingToggle({
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode
  title: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-background/30 transition border border-transparent hover:border-border/50">
      <div className="flex items-center gap-3">
        <div className="text-primary/60">{icon}</div>
        <div>
          <p className="font-medium text-foreground text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-border cursor-pointer"
      />
    </div>
  )
}

import { LogOut } from "lucide-react"
