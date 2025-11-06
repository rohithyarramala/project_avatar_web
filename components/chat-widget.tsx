"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function ChatWidget({ agentId }: { agentId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: inputValue }])
    setInputValue("")

    // Simulate agent response
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "agent", content: "Thanks for your message! How can I help?" }])
    }, 500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="w-96 h-96 flex flex-col mb-4">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat with our AI Agent</h3>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-2 bg-secondary/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded text-sm ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type message..."
                className="text-sm"
                size={1}
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </div>
        </Card>
      )}

      <Button onClick={() => setIsOpen(!isOpen)} className="rounded-full w-14 h-14 p-0">
        {isOpen ? "✕" : "💬"}
      </Button>
    </div>
  )
}
