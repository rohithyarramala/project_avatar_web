import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const supabase = await createClient()

    // Verify webhook token
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

    // Process incoming WhatsApp messages
    const { messages } = body?.entry?.[0]?.changes?.[0]?.value || {}

    if (messages) {
      for (const message of messages) {
        const { from, text } = message

        // Create or find conversation
        // Send message to AI agent
        // Get response
        // Send response back via WhatsApp
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Webhook verification endpoint
  const mode = request.nextUrl.searchParams.get("hub.mode")
  const token = request.nextUrl.searchParams.get("hub.verify_token")
  const challenge = request.nextUrl.searchParams.get("hub.challenge")

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge)
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}
