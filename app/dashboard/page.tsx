import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: agents } = await supabase
    .from("ai_agents")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your AI agents</p>
          </div>
          <Link href="/dashboard/create-agent">
            <Button size="lg">Create New Agent</Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agents?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active AI agents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Audio, Video, Chat</p>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your AI Agents</h2>
          {agents && agents.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <Link key={agent.id} href={`/dashboard/agent/${agent.id}`}>
                  <Card className="hover:border-primary/50 cursor-pointer transition-colors">
                    <CardHeader>
                      <CardTitle>{agent.name}</CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Audio</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Video</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Chat</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">No agents yet. Create your first AI agent!</p>
                <Link href="/dashboard/create-agent">
                  <Button>Create Agent</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
