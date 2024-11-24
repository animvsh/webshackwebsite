'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Zap, Users, Calendar, Brain, Lightbulb, Rocket, Heart, Mail, Phone, MapPin, Star, Cloud, Palette, Shield, Wifi, Smartphone, ShoppingCart, Menu, ChevronDown, ChevronLeft, ChevronRight, X, Leaf } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { blogPosts } from '@/lib/blogPosts'

import { Service, Project, Testimonial } from '@/lib/types'

const GradientElephantLogo = () => (
  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
    🐘 WebShack
  </span>
)

const DynamicHeader = ({ logo }: { logo: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          {logo}
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link className="text-white hover:text-blue-400 transition-colors" href="/projects">Projects</Link>
          <Link className="text-white hover:text-blue-400 transition-colors" href="/blog">Blog</Link>
          <Link className="text-white hover:text-blue-400 transition-colors" href="/about">About</Link>
          <Link className="text-white hover:text-blue-400 transition-colors" href="/contact">Contact</Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-0 text-white md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] bg-black/90 text-white">
            <nav className="flex flex-col space-y-4 mt-6">
              <Link className="text-white hover:text-blue-400 transition-colors" href="/projects">Projects</Link>
              <Link className="text-white hover:text-blue-400 transition-colors" href="/blog">Blog</Link>
              <Link className="text-white hover:text-blue-400 transition-colors" href="/about">About</Link>
              <Link className="text-white hover:text-blue-400 transition-colors" href="/contact">Contact</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}

export default function Home() {
  const [currentProject, setCurrentProject] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = getProjects()
  const testimonials = getTestimonials()

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    const projectTimer = setInterval(nextProject, 5000)
    const testimonialTimer = setInterval(nextTestimonial, 8000)
    return () => {
      clearInterval(projectTimer)
      clearInterval(testimonialTimer)
    }
  }, [nextProject, nextTestimonial])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-8000"></div>
        </div>
      </div>

      <DynamicHeader logo={<GradientElephantLogo />} />

      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection 
          projects={projects} 
          currentProject={currentProject} 
          setCurrentProject={setCurrentProject}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <BlogSection blogPosts={blogPosts} />
        <TestimonialsSection testimonials={testimonials} currentTestimonial={currentTestimonial} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="py-20 md:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Crafting Digital Experiences
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We build innovative web solutions that drive business growth and user engagement.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Link href="/contact" className="text-white">Get Started</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
      </div>
    </section>
  )
}

function ProjectsSection({ projects, currentProject, setCurrentProject, selectedProject, setSelectedProject }: { 
  projects: Project[]; 
  currentProject: number; 
  setCurrentProject: React.Dispatch<React.SetStateAction<number>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length)
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Our Projects
        </h2>
        <div className="relative h-[400px] md:h-[600px] w-full max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl cursor-pointer" onClick={() => setSelectedProject(projects[currentProject])}>
          <AnimatePresence initial={false} custom={currentProject}>
            <motion.div
              key={currentProject}
              custom={currentProject}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={projects[currentProject].image}
                alt={projects[currentProject].name}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col items-start justify-end p-8">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">{projects[currentProject].name}</h3>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl">{projects[currentProject].description}</p>
                <Button 
                  className="bg-white text-gray-900 hover:bg-gray-200 transition-all duration-300 group relative overflow-hidden transform hover:scale-105"
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
          <Button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); prevProject(); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
            onClick={(e) => { e.stopPropagation(); nextProject(); }}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex justify-center mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index === currentProject ? 'bg-blue-500 scale-125' : 'bg-gray-500 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentProject(index)}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="sm:max-w-[700px] bg-gray-900/40 text-white border border-gray-600/20 rounded-2xl overflow-hidden p-0 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] overflow-y-auto custom-scrollbar"
              >
                <div className="relative h-64">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <Button
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center text-white">
                      {selectedProject.icon}
                      <span className="ml-2">{selectedProject.name}</span>
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 mt-2">
                      {selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-purple-300">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Badge variant="secondary" className="mr-2">
                              <ArrowRight className="w-3 h-3 mr-1" />
                            </Badge>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-purple-300">Impact:</h4>
                      <p className="text-gray-300">{selectedProject.impact}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-purple-300">Future Plans:</h4>
                      <ul className="space-y-1 text-gray-300">
                        {selectedProject.futurePlans.map((plan, index) => (
                          <li key={index} className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              <ArrowRight className="w-3 h-3 mr-1" />
                            </Badge>
                            {plan}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}

function BlogSection({ blogPosts }: { blogPosts: typeof import('@/lib/blogPosts').blogPosts }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Insights & Ideas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none hover:bg-opacity-70 transition-all duration-300 h-full shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden group">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white group-hover:text-purple-300 transition-colors duration-300">
                      <motion.div
                        animate={{
                          rotate: hoveredIndex === index ? 360 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {post.icon && <post.icon className="w-6 h-6 mr-2" />}
                      </motion.div>
                      <span>{post.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 text-lg">
                      {post.excerpt}
                    </CardDescription>
                    <p className="text-sm text-gray-400">By {post.author} | {post.date}</p>
                    <Button variant="outline" className="mt-4 text-purple-300 border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 backdrop-filter backdrop-blur-sm w-full">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <Link href="/blog" className="text-white">Read More Insights</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({ testimonials, currentTestimonial }: { testimonials: Testimonial[]; currentTestimonial: number }) {
  return (
    <section id="testimonials" className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Client Testimonials
        </h2>
        <div className="max-w-4xl mx-auto">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonials[currentTestimonial].avatar}
                      alt={testimonials[currentTestimonial].name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-white">{testimonials[currentTestimonial].name}</h3>
                      <p className="text-gray-400">{testimonials[currentTestimonial].position}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic text-lg mb-4">"{testimonials[currentTestimonial].quote}"</p>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Contact Information</h3>
            <div className="space-y-4">
              <p className="flex items-center"><Mail className="mr-2 text-purple-400" /> studioswebshack@gmail.com</p>
              <p className="flex items-center"><Phone className="mr-2 text-purple-400" /> (650) 450-8379</p>
              <p className="flex items-center"><MapPin className="mr-2 text-purple-400" /> 123 Web Street, Digital City, 12345</p>
            </div>
          </div>
          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-white"
              onClick={() => window.location.href = 'mailto:studioswebshack@gmail.com'}
            >
              Send Email Consultation
            </Button>
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-white"
              onClick={() => window.location.href = 'tel:+16504508379'}
            >
              Call Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <span className="text-4xl mr-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">🐘</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                WebShack
              </span>
            </Link>
            <p className="mt-2 text-gray-400">Crafting digital experiences since 2023</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Projects', 'Blog', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { href: "#", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { href: "#", icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
                { href: "#", icon: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.995 16.979H7.005v-9.98h9.99v9.98zM9.503 7.006H7.005V4.508h2.498v2.498zm7.492 0h-2.498V4.508h2.498v2.498z" }
              ].map((social, index) => (
                <a key={index} href={social.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
          © 2023 WebShack. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function getProjects(): Project[] {
  return [
    {
      name: "E-commerce Platform",
      description: "A scalable online marketplace built with Next.js and GraphQL",
      image: "https://ik.imagekit.io/webshack/ecommerce-platform.jpg?updatedAt=1684788689573",
      icon: <ShoppingCart className="w-6 h-6 mr-2" />,
      features: ["Real-time inventory", "Secure payments", "User reviews"],
      impact: "Increased client's online sales by 200% in the first quarter",
      futurePlans: ["AI-powered product recommendations", "AR product previews"]
    },
    {
      name: "Health & Fitness App",
      description: "A comprehensive mobile app for tracking workouts and nutrition",
      image: "https://ik.imagekit.io/webshack/fitness-app.jpg?updatedAt=1684788689528",
      icon: <Heart className="w-6 h-6 mr-2" />,
      features: ["Personalized workout plans", "Nutrition tracking", "Progress analytics"],
      impact: "Helped over 100,000 users achieve their fitness goals",
      futurePlans: ["Integration with wearable devices", "AI-powered coaching"]
    },
    {
      name: "Smart Home IoT Dashboard",
      description: "A centralized control system for connected home devices",
      image: "https://ik.imagekit.io/webshack/smart-home.jpg?updatedAt=1684788689669",
      icon: <Wifi className="w-6 h-6 mr-2" />,
      features: ["Device management", "Energy monitoring", "Automation rules"],
      impact: "Reduced energy consumption by 30% for users",
      futurePlans: ["Voice control integration", "Predictive maintenance alerts"]
    },
    {
      name: "AI-Powered Content Creator",
      description: "An innovative tool for generating and optimizing digital content",
      image: "https://ik.imagekit.io/webshack/ai-content-creator.jpg?updatedAt=1684788689461",
      icon: <Brain className="w-6 h-6 mr-2" />,
      features: ["Multi-format content generation", "SEO optimization", "Performance analytics"],
      impact: "Increased content production efficiency by 5x for marketing teams",
      futurePlans: ["Integration with major CMS platforms", "Multilingual support"]
    },
    {
      name: "Virtual Event Platform",
      description: "A robust solution for hosting and managing online events and conferences",
      image: "https://ik.imagekit.io/webshack/virtual-event.jpg?updatedAt=1684788689715",
      icon: <Users className="w-6 h-6 mr-2" />,
      features: ["Live streaming", "Interactive workshops", "Networking tools"],
      impact: "Enabled successful hosting of events with over 10,000 attendees",
      futurePlans: ["VR integration for immersive experiences", "AI-powered matchmaking"]
    }
  ]
}

function getTestimonials(): Testimonial[] {
  return [
    {
      name: "Sarah Johnson",
      position: "CEO, TechInnovate",
      quote: "WebShack transformed our online presence. Their innovative solutions and attention to detail are unmatched.",
      avatar: "https://ik.imagekit.io/webshack/avatar-1.jpg?updatedAt=1684788689410",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Founder, GreenEco",
      quote: "The team at WebShack brought our vision to life. Their expertise in sustainable tech solutions is impressive.",
      avatar: "https://ik.imagekit.io/webshack/avatar-2.jpg?updatedAt=1684788689422",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Director, FitLife",
      quote: "Working with WebShack was a game-changer for our fitness app. They delivered beyond our expectations.",
      avatar: "https://ik.imagekit.io/webshack/avatar-3.jpg?updatedAt=1684788689435",
      rating: 5
    }
  ]
}
