"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, X, Zap } from "lucide-react"

interface AIAssistantProps {
  onClose: () => void
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const aiFeatures = [
    { icon: "✨", title: "Smart Reply", description: "AI-generated response suggestions" },
    { icon: "🌍", title: "Translation", description: "Real-time message translation" },
    { icon: "📝", title: "Message Rewrite", description: "Rephrase messages with different tones" },
    { icon: "🔍", title: "Search Enhance", description: "Semantic search across conversations" },
    { icon: "🎯", title: "Sentiment Analysis", description: "Understand conversation sentiment" },
    { icon: "⏰", title: "Scheduling", description: "Schedule messages for later" },
  ]

  const handleGenerateSuggestions = async () => {
    setIsLoading(true)
    // Simulate AI generation
    setTimeout(() => {
      setSuggestions(["That's great news!", "Sounds perfect to me!", "Looking forward to it!"])
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-96 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Zenith AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Powered by Advanced AI</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-3">
            {aiFeatures.map((feature, i) => (
              <button
                key={i}
                className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition text-left"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </button>
            ))}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-3">AI Suggestions:</p>
              <div className="space-y-2">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    className="w-full text-left p-2 rounded hover:bg-primary/20 text-sm text-foreground transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex gap-2">
          <Input
            placeholder="Ask AI anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-input border-border text-foreground flex-1"
          />
          <Button
            onClick={handleGenerateSuggestions}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground gap-2"
          >
            {isLoading ? <span className="animate-spin">⚡</span> : <Zap className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
