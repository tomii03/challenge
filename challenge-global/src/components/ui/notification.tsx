"use client"

import { useEffect, useState } from "react"

interface NotificationProps {
  message: string
  duration?: number
  onClose: () => void
}

export function Notification({ message, duration = 3000, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
      {message}
    </div>
  )
} 