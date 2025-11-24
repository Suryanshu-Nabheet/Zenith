"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { PhoneOff, Mic, MicOff, Video, VideoOff, Share2, Settings, Eye } from "lucide-react"

interface VideoCallProps {
  contactId: string
  onEnd: () => void
  currentUser: { id: string; name: string; email: string }
}

export function VideoCall({ contactId, onEnd, currentUser }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [videoQuality, setVideoQuality] = useState("HD") // Video quality setting
  const [showSettings, setShowSettings] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((d) => d + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const contactName = contactId === "1" ? "Alice Johnson" : "Bob Smith"

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background via-background to-secondary/10 flex flex-col relative">
      <div className="flex-1 relative bg-gradient-to-br from-background to-card overflow-hidden">
        {/* Remote Video Feed */}
        <div className="absolute inset-0 flex items-center justify-center group">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-7xl font-bold text-primary">
                {contactName.split(" ")[0][0]}
                {contactName.split(" ")[1][0]}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground">{contactName}</h2>
            <p className="text-muted-foreground mt-2 text-lg">{formatDuration(callDuration)}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm text-green-400">Connected • {videoQuality} • Low Latency</p>
            </div>
          </div>

          <div className="absolute top-6 right-6 bg-card/90 backdrop-blur rounded-lg p-3 border border-border shadow-lg hidden group-hover:block">
            <div className="text-xs space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent" />
                <span className="text-foreground">Crystal HD Video</span>
              </div>
              <div className="text-muted-foreground text-xs">60 FPS • Zero Latency</div>
            </div>
          </div>
        </div>

        {/* Local Video Preview */}
        <div className="absolute bottom-6 right-6 w-48 h-48 bg-card rounded-xl border-2 border-accent shadow-2xl overflow-hidden transform hover:scale-105 transition-transform">
          {isVideoOn ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center border-2 border-primary/50">
              <div>
                <div className="text-5xl font-bold text-primary">{currentUser.name[0]}</div>
                <p className="text-xs text-primary/70 mt-2">You</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <VideoOff className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded text-xs text-white">{videoQuality}</div>
        </div>

        {/* Call Stats */}
        <div className="absolute top-6 left-6 bg-card/90 backdrop-blur rounded-lg p-4 border border-border shadow-lg space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Connected with</p>
            <p className="font-semibold text-foreground">{contactName}</p>
          </div>
          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Call Quality</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1 h-4 rounded-sm ${i < 4 ? "bg-green-500" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 border-t border-border bg-card/80 backdrop-blur-md">
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            variant={isMuted ? "destructive" : "outline"}
            onClick={() => setIsMuted(!isMuted)}
            className={`rounded-full w-16 h-16 transition-all ${
              isMuted ? "bg-red-500/80 hover:bg-red-600 text-white shadow-lg shadow-red-500/50" : "hover:bg-secondary"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            size="lg"
            variant={!isVideoOn ? "destructive" : "outline"}
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`rounded-full w-16 h-16 transition-all ${
              !isVideoOn
                ? "bg-red-500/80 hover:bg-red-600 text-white shadow-lg shadow-red-500/50"
                : "hover:bg-secondary"
            }`}
            title={isVideoOn ? "Stop Video" : "Start Video"}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 hover:bg-secondary bg-transparent"
            title="Share Screen"
          >
            <Share2 className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-full w-16 h-16 hover:bg-secondary relative"
            title="Video Quality Settings"
          >
            <Settings className="w-6 h-6" />
            {showSettings && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg whitespace-nowrap z-50">
                <div className="space-y-2">
                  {["360p", "720p", "1080p", "2K", "4K"].map((quality) => (
                    <button
                      key={quality}
                      onClick={() => {
                        setVideoQuality(quality)
                        setShowSettings(false)
                      }}
                      className={`block w-full text-left px-3 py-2 rounded text-sm ${
                        videoQuality === quality
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary text-foreground"
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Button>

          <Button
            size="lg"
            onClick={onEnd}
            className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/50 transition-all"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
