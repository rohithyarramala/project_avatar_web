"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function CreateAgentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [agentName, setAgentName] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [dataSource, setDataSource] = useState("")

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const { data, error: insertError } = await supabase
        .from("ai_agents")
        .insert({
          user_id: user.id,
          name: agentName,
          description,
          instructions,
          data_source: dataSource,
        })
        .select()
        .single()

      if (insertError) throw insertError

      router.push(`/dashboard/agent/${data.id}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost">← Back to Dashboard</Button>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create AI Agent</h1>
          <p className="text-muted-foreground">Configure your agent's behavior and capabilities</p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded ${step >= 1 ? "bg-primary" : "bg-secondary"}`}></div>
          <div className={`flex-1 h-2 rounded ${step >= 2 ? "bg-primary" : "bg-secondary"}`}></div>
          <div className={`flex-1 h-2 rounded ${step >= 3 ? "bg-primary" : "bg-secondary"}`}></div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Basic Information"}
              {step === 2 && "Agent Instructions"}
              {step === 3 && "Data Source"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Name and describe your AI agent"}
              {step === 2 && "Define how your agent should behave"}
              {step === 3 && "Configure data access for your agent"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAgent}>
              <div className="space-y-6">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Agent Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Customer Support Bot"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="What does this agent do?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {/* Step 2: Instructions */}
                {step === 2 && (
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Agent Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Define the agent's personality, response guidelines, and behavior rules..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={8}
                    />
                    <p className="text-sm text-muted-foreground">
                      Be specific about how the agent should respond, tone, expertise, and limitations.
                    </p>
                  </div>
                )}

                {/* Step 3: Data Source */}
                {step === 3 && (
                  <div className="space-y-2">
                    <Label htmlFor="dataSource">Data Source/Knowledge Base</Label>
                    <Textarea
                      id="dataSource"
                      placeholder="Provide URLs, documents, or context the agent should reference..."
                      value={dataSource}
                      onChange={(e) => setDataSource(e.target.value)}
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Add links to documentation, FAQ, or context data the agent should use.
                    </p>
                  </div>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}

                {/* Navigation Buttons */}
                <div className="flex gap-4 justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>

                  {step === 3 ? (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating..." : "Create Agent"}
                    </Button>
                  ) : (
                    <Button type="button" onClick={() => setStep(step + 1)}>
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
