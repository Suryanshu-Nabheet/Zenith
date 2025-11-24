"use client"
import { Heart, ThumbsUp, Laugh, Sunrise as Surprised, Salad as Sad, File as Fire } from "lucide-react"

interface MessageReactionsProps {
  messageId: string
  onReact: (emoji: string) => void
  reactions?: Record<string, number>
}

export function MessageReactions({ messageId, onReact, reactions }: MessageReactionsProps) {
  const reactionEmojis = [
    { emoji: "❤️", icon: Heart, label: "Love" },
    { emoji: "👍", icon: ThumbsUp, label: "Like" },
    { emoji: "😂", icon: Laugh, label: "Laugh" },
    { emoji: "😮", icon: Surprised, label: "Wow" },
    { emoji: "😢", icon: Sad, label: "Sad" },
    { emoji: "🔥", icon: Fire, label: "Fire" },
  ]

  return (
    <div className="flex gap-1 p-2 bg-card/80 rounded-full border border-border/50 shadow-lg">
      {reactionEmojis.map(({ emoji, label }) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="w-8 h-8 rounded-full hover:bg-primary/20 flex items-center justify-center text-sm transition-all hover:scale-110"
          title={label}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
