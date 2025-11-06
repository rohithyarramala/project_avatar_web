"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"

export default function IntegrationsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [twilioEnabled, setTwilioEnabled] = useState(false)
  const [whatsappEnabled, setWhatsappEnabled] = useState(false)
  const [twilioAccountSid, setTwilioAccountSid] = useState("")
  const [twilioAuthToken, setTwilioAuthToken] = useState("")
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState("")
  const [whatsappPhoneId, setWhatsappPhoneId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveIntegrations = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would save the integration settings
      // For now, we'll just show a success message
      alert("Integration settings saved successfully!")
    } catch (error) {
      console.error("Error saving integrations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <Link href="/dashboard">
            <Button variant="ghost">← Back</Button>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Multi-Channel Integrations</h1>
          <p className="text-muted-foreground">Connect your agent to communication channels</p>
        </div>

        <form onSubmit={handleSaveIntegrations} className="space-y-6">
          {/* Twilio Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Twilio Voice & SMS</CardTitle>
              <CardDescription>Enable phone calls and SMS messages for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="twilio"
                  checked={twilioEnabled}
                  onChange={(e) => setTwilioEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="twilio">Enable Twilio Integration</Label>
              </div>

              {twilioEnabled && (
                <div className="space-y-4 pl-8 border-l-2 border-primary/20">
                  <div className="space-y-2">
                    <Label htmlFor="accountSid">Account SID</Label>
                    <Input
                      id="accountSid"
                      placeholder="Your Twilio Account SID"
                      value={twilioAccountSid}
                      onChange={(e) => setTwilioAccountSid(e.target.value)}
                      type="password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="authToken">Auth Token</Label>
                    <Input
                      id="authToken"
                      placeholder="Your Twilio Auth Token"
                      value={twilioAuthToken}
                      onChange={(e) => setTwilioAuthToken(e.target.value)}
                      type="password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+1234567890"
                      value={twilioPhoneNumber}
                      onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Get your credentials from the{" "}
                    <a
                      href="https://console.twilio.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Twilio Console
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* WhatsApp Integration */}
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business</CardTitle>
              <CardDescription>Connect your agent to WhatsApp for customer messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="whatsapp"
                  checked={whatsappEnabled}
                  onChange={(e) => setWhatsappEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="whatsapp">Enable WhatsApp Integration</Label>
              </div>

              {whatsappEnabled && (
                <div className="space-y-4 pl-8 border-l-2 border-primary/20">
                  <div className="space-y-2">
                    <Label htmlFor="phoneId">Phone Number ID</Label>
                    <Input
                      id="phoneId"
                      placeholder="Your WhatsApp Phone Number ID"
                      value={whatsappPhoneId}
                      onChange={(e) => setWhatsappPhoneId(e.target.value)}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Get your Phone Number ID from the{" "}
                    <a
                      href="https://developers.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Meta Business Platform
                    </a>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Web Chat Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Web Chat Widget</CardTitle>
              <CardDescription>Embed a chat widget on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Add this code to your website to enable chat:</p>
                <pre className="bg-secondary p-4 rounded text-xs overflow-auto">
                  {`<script src="https://avatar-ai.vercel.app/chat-widget.js"></script>
<avatar-chat-widget agent-id="[AGENT_ID]"></avatar-chat-widget>`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Integrations"}
            </Button>
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
