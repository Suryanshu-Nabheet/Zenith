"use client"

interface StatusIndicatorProps {
  status: "online" | "away" | "offline"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function StatusIndicator({ status, size = "md", showLabel = false }: StatusIndicatorProps) {
  const getColor = () => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-2 h-2"
      case "md":
        return "w-3 h-3"
      case "lg":
        return "w-4 h-4"
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`rounded-full animate-pulse ${getColor()} ${getSizeClass()}`} />
      {showLabel && <span className="text-xs font-medium text-muted-foreground capitalize">{status}</span>}
    </div>
  )
}
