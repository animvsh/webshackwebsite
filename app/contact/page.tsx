import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from 'lucide-react'
import DynamicHeader from '@/components/DynamicHeader'
import { GradientElephantLogo } from '@/components/GradientElephantLogo'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DynamicHeader logo={<GradientElephantLogo />} />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Contact Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white">Get in Touch</CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                  <Input id="name" placeholder="Your Name" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                  <Textarea id="message" placeholder="Your message" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
              <CardDescription className="text-gray-300">
                You can also reach us through the following channels:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="text-purple-400 mr-2" />
                <p className="text-gray-300">info@webshack.com</p>
              </div>
              <div className="flex items-center">
                <Phone className="text-purple-400 mr-2" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <MapPin className="text-purple-400 mr-2" />
                <p className="text-gray-300">123 Tech Street, Silicon Valley, CA 94000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}