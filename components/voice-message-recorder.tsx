"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Send, Trash2 } from "lucide-react"

interface VoiceMessageRecorderProps {
  onSendVoice: (duration: number) => void
}

export function VoiceMessageRecorder({ onSendVoice }: VoiceMessageRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = () => {
    setIsRecording(true)
    setDuration(0)
    recordingIntervalRef.current = setInterval(() => {
      setDuration((d) => d + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isRecording && duration === 0) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={startRecording}
        className="border-border gap-2 hover:bg-primary/10 bg-transparent"
      >
        <Mic className="w-4 h-4" />
        Voice
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
      <div className="flex items-center gap-2 flex-1">
        <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-red-500/50"}`}></div>
        <span className="text-sm text-red-400 font-mono">{formatDuration(duration)}</span>
      </div>
      <Button size="sm" variant="ghost" onClick={stopRecording} className="h-6 w-6 p-0">
        <Square className="w-4 h-4" />
      </Button>
      <Button
        size="sm"
        onClick={() => {
          onSendVoice(duration)
          stopRecording()
          setDuration(0)
        }}
        className="h-6 gap-1 bg-green-500 hover:bg-green-600 text-white"
      >
        <Send className="w-3 h-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          stopRecording()
          setDuration(0)
        }}
        className="h-6 w-6 p-0 text-red-400 hover:text-red-500"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
