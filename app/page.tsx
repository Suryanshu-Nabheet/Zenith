"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/landing")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin"></div>
    </div>
  )
}
