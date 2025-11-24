"use client"
import { Sparkles, Zap, Lock, Users, BarChart3, Shield } from "lucide-react"

export function PremiumFeatures() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Assistant",
      description: "Smart replies, message suggestions, and intelligent search",
      badge: "NEW",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning-Fast Calls",
      description: "8K video, 0ms latency, crystal-clear audio quality",
      badge: "PRO",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Advanced Encryption",
      description: "Military-grade end-to-end encryption on all data",
      badge: "SECURE",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Unlimited Groups",
      description: "Create unlimited group chats with up to 1000 members",
      badge: "UNLIMITED",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Insights",
      description: "Track communication patterns and statistics",
      badge: "ANALYTICS",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Advanced security controls and compliance features",
      badge: "ENTERPRISE",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-primary/5 transition group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="text-primary/80 group-hover:text-primary transition">{feature.icon}</div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">{feature.badge}</span>
          </div>
          <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
