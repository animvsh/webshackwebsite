'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import DynamicHeader from '@/components/DynamicHeader'
import AnimatedBackground from '@/components/ui/AnimatedBackground'

const GradientElephantLogo = () => (
  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
    🐘 WebShack
  </span>
)

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <DynamicHeader logo={<GradientElephantLogo />} />
        <main className="container mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Contact Us
          </h1>
          
          <Card className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-md border-2 border-purple-500 shadow-2xl shadow-purple-500/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-white">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <Mail className="text-purple-400 w-8 h-8" />
                <a 
                  href="mailto:studioswebshack@gmail.com" 
                  className="text-2xl text-blue-300 hover:text-purple-400 transition-colors duration-300"
                >
                  studioswebshack@gmail.com
                </a>
              </div>
              <p className="text-center text-gray-300 text-lg">
                We'd love to hear from you! Send us an email and we'll get back to you as soon as possible.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

