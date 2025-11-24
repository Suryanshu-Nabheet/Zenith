"use client"

import { Users, UserPlus, Shield, Zap } from "lucide-react"

export function GroupChatFeatures() {
  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Unlimited Members",
      description: "Create groups with unlimited participants",
    },
    {
      icon: <UserPlus className="w-5 h-5" />,
      title: "Admin Controls",
      description: "Manage members, roles, and permissions",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Group Encryption",
      description: "End-to-end encrypted group messages",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Group Calls",
      description: "Crystal-clear video calls up to 100 participants",
    },
  ]

  return (
    <div className="space-y-4">
      {features.map((feature, i) => (
        <div
          key={i}
          className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
