"use client"
import Link from "next/link"
import { Video, Lock, MessageSquare, Zap, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Zenith</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
                Features
              </a>
              <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition">
                Security
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
                Pricing
              </a>
            </div>
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-4xl">
          {/* Background effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="text-sm text-accent font-semibold">Next Generation Communication</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-balance text-foreground leading-tight">
                Connect with{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Crystal Clarity
                </span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                The most secure, feature-rich messaging platform. End-to-end encrypted messaging, crystal-clear video
                calls, and AI-powered features that matter.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/sign-up">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-600/50">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline" className="gap-2 bg-zinc-900 border-zinc-700 hover:bg-zinc-800">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" />
                <span>E2E Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Beyond Messaging</h2>
            <p className="text-lg text-muted-foreground">Everything you need for professional communication</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards */}
            {[
              {
                icon: <Lock className="w-8 h-8" />,
                title: "End-to-End Encrypted",
                description: "Military-grade encryption keeps your conversations private",
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "Crystal HD Video Calls",
                description: "Up to 8K resolution video calls with zero latency",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Group Collaboration",
                description: "Create groups with unlimited members and custom permissions",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Rich Messaging",
                description: "Voice messages, document sharing, and disappearing messages",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "AI Assistant",
                description: "Smart replies, message translation, and content generation",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Advanced Privacy",
                description: "Control who sees your status, profile, and message receipts",
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition">
                <div className="text-accent mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 border-t border-border/50 bg-secondary/10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Security First</h2>
            <p className="text-lg text-muted-foreground">Your privacy is our priority</p>
          </div>

          <div className="space-y-6">
            {[
              "Zero-knowledge architecture - we never see your messages",
              "Open-source security audits by leading cybersecurity firms",
              "Automatic message expiration and secure deletion",
              "Two-factor authentication with biometric support",
              "IP masking and VPN integration options",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-lg bg-background/50 border border-border/50">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Experience the Future?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of users who trust Zenith for secure, feature-rich communication
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-600/50">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-background/50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
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
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
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
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Zenith</span>
            </div>
            <p className="text-sm text-muted-foreground">2025 Zenith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
