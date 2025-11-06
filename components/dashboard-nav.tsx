"use client"

import type { User } from "@supabase/supabase-js"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export default function DashboardNav({ user }: { user: User | null }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <nav className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Avatar AI</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-6 space-y-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create-agent">
          <Button variant="ghost" className="w-full justify-start">
            New Agent
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </Link>
      </div>

      {/* User Section */}
      <div className="p-6 border-t border-border space-y-3">
        <div className="text-sm">
          <p className="font-medium text-foreground truncate">{user?.email}</p>
          <p className="text-xs text-muted-foreground">Signed in</p>
        </div>
        <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Logging out..." : "Sign Out"}
        </Button>
      </div>
    </nav>
  )
}
