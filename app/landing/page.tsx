"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { 
  MessageCircle, Shield, Video, Users, Zap, Lock, Globe, Sparkles,
  Check, Star, ArrowRight, Play, Phone, Image, FileText, Smile,
  Bell, Search, Mic, Camera, Share2
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-zinc-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8">
                <img src="/icon.svg" alt="Zenith" className="w-full h-full" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Zenith</span>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Features</a>
              <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">How It Works</a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">Pricing</a>
              <a href="#faq" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">FAQ</a>
            </div>
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="bg-transparent border-zinc-700 hover:bg-zinc-900 hover:border-zinc-600">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-transparent blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 border border-indigo-600/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-400 text-sm font-medium">Trusted by 100,000+ users worldwide</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                  Connect
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Securely
                </span>
              </h1>

              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                Experience the future of communication with military-grade encryption, crystal-clear HD video calls, and lightning-fast messaging—all in one beautiful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-lg shadow-indigo-600/50 text-lg px-8 py-7 group">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-zinc-700 hover:bg-zinc-900 text-lg px-8 py-7 group">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: "100K+", label: "Active Users" },
                  { number: "50M+", label: "Messages Sent" },
                  { number: "99.9%", label: "Uptime" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-indigo-400">{stat.number}</div>
                    <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - App Preview */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-3xl"></div>
                <div className="relative rounded-3xl border-2 border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 overflow-hidden">
                    <div className="text-center p-8">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      >
                        <MessageCircle className="w-24 h-24 text-indigo-500 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-zinc-500 text-sm">Secure Messaging Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-6 border-y border-zinc-800/50 bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            {["256-bit AES", "End-to-End Encrypted", "GDPR Compliant", "SOC 2 Certified", "ISO 27001"].map((badge) => (
              <div key={badge} className="text-zinc-600 font-medium text-sm">{badge}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Powerful features designed for modern communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Military-Grade Encryption",
                description: "End-to-end encryption ensures your messages stay completely private. Only you and your recipient can read them.",
                color: "indigo",
                gradient: "from-indigo-600 to-indigo-700"
              },
              {
                icon: Video,
                title: "HD Video & Voice Calls",
                description: "Crystal-clear video and voice calls powered by cutting-edge WebRTC technology. Works flawlessly even on slow connections.",
                color: "purple",
                gradient: "from-purple-600 to-purple-700"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Real-time message delivery with WebSocket technology. Your messages arrive instantly, every single time.",
                color: "blue",
                gradient: "from-blue-600 to-blue-700"
              },
              {
                icon: Users,
                title: "Group Chats",
                description: "Create unlimited groups with custom permissions. Perfect for teams, families, and communities.",
                color: "green",
                gradient: "from-green-600 to-green-700"
              },
              {
                icon: Image,
                title: "Media Sharing",
                description: "Share photos, videos, documents, and voice messages. All securely encrypted and compressed for fast delivery.",
                color: "orange",
                gradient: "from-orange-600 to-orange-700"
              },
              {
                icon: Lock,
                title: "Privacy First",
                description: "Your data is yours. We never store or access your private conversations. Zero data harvesting, guaranteed.",
                color: "red",
                gradient: "from-red-600 to-red-700"
              },
              {
                icon: Globe,
                title: "Cross-Platform",
                description: "Works seamlessly across all devices - desktop, mobile, and tablet. Your chats sync instantly everywhere.",
                color: "cyan",
                gradient: "from-cyan-600 to-cyan-700"
              },
              {
                icon: Share2,
                title: "Screen Sharing",
                description: "Share your screen during video calls for presentations, remote support, or collaborative work.",
                color: "pink",
                gradient: "from-pink-600 to-pink-700"
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Customizable notifications keep you informed without overwhelming you. Mute conversations anytime.",
                color: "yellow",
                gradient: "from-yellow-600 to-yellow-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc 700 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-zinc-400">Get started in seconds</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sign Up Free",
                description: "Create your account in seconds. No credit card required. Start messaging immediately.",
                icon: Sparkles
              },
              {
                step: "02",
                title: "Add Contacts",
                description: "Search for friends by email or username. Send connection requests with one click.",
                icon: Users
              },
              {
                step: "03",
                title: "Start Chatting",
                description: "Send messages, make calls, share media. Everything is encrypted and secure.",
                icon: MessageCircle
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-20 h-20 rounded-full bg-indigo-600/10 border-2 border-indigo-600/30 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="text-indigo-500 font-bold text-lg mb-3">STEP {item.step}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Loved by Users</h2>
            <p className="text-xl text-zinc-400">See what our community has to say</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Product Manager",
                content: "Zenith has completely transformed how our team communicates. The UI is beautiful and the security features give us peace of mind.",
                avatar: "SJ"
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                content: "Finally, a messaging app that doesn't compromise on privacy. The video quality is outstanding and it just works.",
                avatar: "MC"
              },
              {
                name: "Emily Davis",
                role: "Designer",
                content: "The interface is so clean and intuitive. I love how everything is where I expect it to be. Best messaging app I've used.",
                avatar: "ED"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Simple Pricing</h2>
            <p className="text-xl text-zinc-400">Choose the plan that's right for you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: [
                  "Unlimited messaging",
                  "HD video calls (up to 4 people)",
                  "5GB file storage",
                  "End-to-end encryption",
                  "Cross-platform sync"
                ],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: "$9",
                period: "per month",
                features: [
                  "Everything in Free",
                  "Unlimited group calls",
                  "100GB file storage",
                  "Priority support",
                  "Custom themes",
                  "Advanced security features"
                ],
                cta: "Start Free Trial",
                popular: true
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`p-8 rounded-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-2 border-indigo-600/50'
                    : 'bg-zinc-900/50 border border-zinc-800'
                } relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-zinc-500 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button 
                    size="lg" 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-zinc-400">Everything you need to know</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Is Zenith really free?",
                answer: "Yes! Our free plan includes unlimited messaging, HD video calls, and end-to-end encryption. You can upgrade to Pro for additional features."
              },
              {
                question: "How secure is Zenith?",
                answer: "Zenith uses military-grade end-to-end encryption. Your messages are encrypted on your device and can only be decrypted by the recipient. We never have access to your conversations."
              },
              {
                question: "Can I use Zenith on multiple devices?",
                answer: "Absolutely! Zenith works seamlessly across desktop, mobile, and tablet. Your conversations sync automatically across all your devices."
              },
              {
                question: "What makes Zenith different?",
                answer: "Zenith combines security, speed, and beautiful design. We're privacy-first, with no data harvesting, no ads, and complete transparency in how we operate."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl p-16 border-2 border-indigo-600/30 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who trust Zenith for secure, feature-rich communication. Start your free trial today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-2xl shadow-indigo-600/50 text-lg px-10 py-7 group">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent border-zinc-700 hover:bg-zinc-900 text-lg px-10 py-7">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-zinc-800/50 bg-zinc-950/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/icon.svg" alt="Zenith" className="w-8 h-8" />
                <span className="text-xl font-bold">Zenith</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Secure messaging platform built for privacy and performance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm">© 2025 Zenith. Built with ❤️ by Suryanshu Nabheet</p>
            <div className="flex gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
