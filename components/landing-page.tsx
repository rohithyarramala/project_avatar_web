"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, Zap, MessageCircle, Phone, Video, BarChart3, Lock, Globe } from "lucide-react"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Avatar AI
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* SECTION 1: Hero with 3D Effect */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background" />

        {/* 3D background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4 slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">Next-Gen AI Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
              Build Intelligent Agents,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Deploy Instantly
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create AI agents that understand your business. Deploy across voice, video, chat, and WhatsApp—all from
              one powerful platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-base">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-base bg-transparent">
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Hero 3D visual */}
          <div className="relative mt-20 h-96 rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-2xl border border-accent/20"
              style={{ transform: `rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.01}deg)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="float text-6xl">🤖</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2: Multi-Channel Support */}
      <section id="features" className="relative py-24 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Deploy Across All Channels</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              One agent. Unlimited channels. Seamless integration across your entire customer ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                label: "Voice Calls",
                desc: "Real-time voice conversations with natural language understanding",
              },
              { icon: Video, label: "Video Calls", desc: "Video meetings with advanced visual recognition" },
              { icon: MessageCircle, label: "WhatsApp", desc: "Direct messaging through WhatsApp Business" },
              { icon: Globe, label: "Web Chat", desc: "Embedded chat widget for your website" },
            ].map((channel, i) => (
              <Card
                key={i}
                className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <channel.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{channel.label}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{channel.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: How It Works */}
      <section id="how-it-works" className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Three Steps to AI Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From creation to deployment in minutes, not months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Agent",
                desc: "Define your AI agent's personality, expertise, and behavior with our intuitive builder.",
              },
              {
                step: "02",
                title: "Add Knowledge",
                desc: "Connect data sources, upload documents, and train your agent with custom knowledge.",
              },
              {
                step: "03",
                title: "Deploy & Monitor",
                desc: "Launch across channels instantly and track performance with real-time analytics.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="flex flex-col h-full">
                  <div className="text-6xl font-bold text-accent/20 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground flex-1">{item.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute -right-4 top-12 text-2xl text-accent/30">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Key Features */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Enterprise-Grade Features</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: "Enterprise Security",
                desc: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Track agent performance, customer satisfaction, and ROI metrics",
              },
              { icon: Zap, title: "Lightning Fast", desc: "Sub-second response times powered by edge computing" },
              { icon: Globe, title: "Global Scale", desc: "Deploy worldwide with auto-scaling infrastructure" },
            ].map((feature, i) => (
              <Card key={i} className="border-border/50 scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Use Cases */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Built for Every Industry</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { industry: "Customer Support", icon: "💬", desc: "24/7 automated support with human handoff" },
              { industry: "Sales", icon: "📈", desc: "Lead qualification and appointment booking" },
              { industry: "Healthcare", icon: "🏥", desc: "Patient intake and appointment scheduling" },
              { industry: "Real Estate", icon: "🏠", desc: "Property inquiry and tour scheduling" },
              { industry: "Education", icon: "📚", desc: "Student support and enrollment assistance" },
              { industry: "E-Commerce", icon: "🛍️", desc: "Product recommendations and order support" },
            ].map((usecase, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="text-4xl">{usecase.icon}</div>
                  <h3 className="font-semibold text-lg">{usecase.industry}</h3>
                  <p className="text-sm text-muted-foreground">{usecase.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Pricing */}
      <section id="pricing" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Start free, scale as you grow. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$0",
                desc: "Perfect for trying out",
                features: ["1 Agent", "1,000 conversations/month", "Email support", "Basic analytics"],
              },
              {
                name: "Professional",
                price: "$99",
                desc: "For growing businesses",
                features: [
                  "10 Agents",
                  "50,000 conversations/month",
                  "Priority support",
                  "Advanced analytics",
                  "Custom integrations",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For large organizations",
                features: [
                  "Unlimited Agents",
                  "Unlimited conversations",
                  "24/7 phone support",
                  "Custom SLA",
                  "Dedicated account manager",
                ],
              },
            ].map((plan, i) => (
              <Card
                key={i}
                className={`border-2 transition-all duration-300 ${
                  plan.highlight ? "border-accent bg-accent/5 md:scale-105" : "border-border/50 hover:border-border"
                }`}
              >
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                  </div>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CTA & Footer */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Transform Customer Interactions?</h2>
            <p className="text-lg text-muted-foreground">
              Join innovative companies building the future with Avatar AI.
            </p>
          </div>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-base">
              Start Your Free Trial Today
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">14 days free trial. No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-secondary/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-lg font-bold mb-4">Avatar AI</div>
            <p className="text-sm text-muted-foreground">The intelligent platform for enterprise AI agents.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Avatar AI. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition">
              Twitter
            </a>
            <a href="#" className="hover:text-foreground transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-foreground transition">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
