"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"

interface Message {
  id: string
  sender_role: "user" | "agent"
  content: string
  created_at: string
}

export default function ChatPage() {
  const params = useParams()
  const agentId = params?.id as string
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize conversation
    const initializeConversation = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // Create or get existing conversation
      const { data: existingConv } = await supabase
        .from("conversations")
        .select("*")
        .eq("agent_id", agentId)
        .eq("user_id", user.id)
        .eq("channel", "web_chat")
        .single()

      if (existingConv) {
        setConversationId(existingConv.id)
        // Load existing messages
        const { data: existingMessages } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", existingConv.id)
          .order("created_at", { ascending: true })
        if (existingMessages) {
          setMessages(existingMessages)
        }
      } else {
        // Create new conversation
        const { data: newConv, error } = await supabase
          .from("conversations")
          .insert({
            agent_id: agentId,
            user_id: user.id,
            channel: "web_chat",
          })
          .select()
          .single()

        if (newConv && !error) {
          setConversationId(newConv.id)
        }
      }
    }

    initializeConversation()
  }, [agentId])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !conversationId) return

    setIsLoading(true)
    const userMessage = inputValue
    setInputValue("")

    try {
      const supabase = createClient()

      // Save user message
      const { error: messageError } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_role: "user",
        content: userMessage,
      })

      if (messageError) throw messageError

      // Add to UI
      const newUserMessage: Message = {
        id: Math.random().toString(),
        sender_role: "user",
        content: userMessage,
        created_at: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newUserMessage])

      // Simulate AI response (in production, call your AI service)
      setTimeout(async () => {
        const agentResponse = "Thank you for your message. This is a demo response from the AI agent."

        const { error: responseError } = await supabase.from("messages").insert({
          conversation_id: conversationId,
          sender_role: "agent",
          content: agentResponse,
        })

        if (!responseError) {
          const newAgentMessage: Message = {
            id: Math.random().toString(),
            sender_role: "agent",
            content: agentResponse,
            created_at: new Date().toISOString(),
          }

          setMessages((prev) => [...prev, newAgentMessage])
        }
      }, 1000)
    } catch (error) {
      console.error("Error sending message:", error)
      setInputValue(userMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto h-[calc(100vh-100px)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard">
            <Button variant="ghost">← Back</Button>
          </Link>
          <h1 className="text-2xl font-bold mt-2">Chat with Agent</h1>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-auto p-6 space-y-4 bg-secondary/30">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Start a conversation with your AI agent</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender_role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{new Date(message.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-card">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? "..." : "Send"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
