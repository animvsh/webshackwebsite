'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Code, Search, Sliders, ShoppingCart, Palette, PenToolIcon as Tool, Mail, Phone, MapPin, ChevronDown, Check, Star, Users, Zap, Shield } from 'lucide-react'
import DynamicHeader from '@/components/DynamicHeader'
import { Carousel } from "@/components/ui/carousel"
import { blogPosts } from '@/lib/blogPosts'

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

type Project = {
  id: number;
  title: string;
  image: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  link: string;
}

const services: Service[] = [
  {
    title: "Web Design & Development",
    description: "Create stunning and functional websites that reflect your brand's identity.",
    icon: <Palette className="w-6 h-6 text-blue-400" />,
    features: ["Responsive design", "User-friendly layouts", "SEO-friendly structures", "Hosting setup"],
  },
  {
    title: "E-Commerce Solutions",
    description: "Build powerful online stores to boost your sales and reach.",
    icon: <ShoppingCart className="w-6 h-6 text-green-400" />,
    features: ["Beautiful product pages", "Secure payment integration", "Cart recovery", "Product recommendations"],
  },
  {
    title: "Full-Stack Applications",
    description: "Develop custom applications to solve your unique business challenges.",
    icon: <Code className="w-6 h-6 text-purple-400" />,
    features: ["End-to-end development", "Scalable architecture", "Real-time features", "API integration"],
  },
  {
    title: "SEO & Digital Marketing",
    description: "Boost your online presence and reach your target audience effectively.",
    icon: <Search className="w-6 h-6 text-yellow-400" />,
    features: ["SEO optimization", "Analytics setup", "Content strategy", "Social media campaigns"],
  },
  {
    title: "Maintenance & Support",
    description: "Keep your digital assets secure, updated, and performing optimally.",
    icon: <Tool className="w-6 h-6 text-red-400" />,
    features: ["Regular updates", "Security monitoring", "Performance optimization", "24/7 support"],
  },
]

const GradientLogo = () => (
  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
    <span className="mr-2">🐘</span>
    WebShack
  </span>
)

const projects: Project[] = [
  {
    id: 1,
    title: "ClassMate",
    image: "/placeholder.svg",
    description: "A Chrome extension for enhanced classroom collaboration.",
    fullDescription:
      "ClassMate is a Chrome extension built to enhance classroom collaboration, focusing on group projects and peer learning. It integrates with learning platforms like Canvas, making it easier for students and instructors to stay connected.",
    technologies: ["JavaScript", "Chrome Extension API", "Canvas LMS API", "AI"],
    link: "https://example.com/classmate",
  },
  {
    id: 2,
    title: "EcoTrack",
    image: "/placeholder.svg",
    description: "Mobile app for tracking and reducing carbon footprint.",
    fullDescription:
      "EcoTrack is a mobile application designed to help users track and reduce their carbon footprint. It provides personalized recommendations, challenges, and rewards to encourage sustainable living practices.",
    technologies: ["React Native", "Node.js", "MongoDB", "Machine Learning"],
    link: "https://example.com/ecotrack",
  },
  {
    id: 3,
    title: "HealthHub",
    image: "/placeholder.svg",
    description: "Centralized platform for managing health records and appointments.",
    fullDescription:
      "HealthHub is a comprehensive health management platform that allows users to store and access their medical records, schedule appointments, and receive personalized health insights. It integrates with various healthcare providers to ensure seamless data flow.",
    technologies: ["React", "Express.js", "PostgreSQL", "HL7 FHIR"],
    link: "https://example.com/healthhub",
  },
];

const plans = [
  {
    name: "Static Websites",
    price: "$200 - $400",
    description: "For simple, professional websites tailored to your brand.",
    features: [
      "Custom design",
      "Responsive layout",
      "Basic SEO optimization",
      "Contact form integration",
    ],
  },
  {
    name: "Dynamic Websites",
    price: "Starting at $400",
    description: "Includes interactive features, CMS integration, and more.",
    features: [
      "All Static Website features",
      "Content Management System",
      "Dynamic content",
      "User authentication",
    ],
  },
  {
    name: "E-Commerce Solutions",
    price: "Starting at $500",
    description: "Complete online store setup with advanced features.",
    features: [
      "All Dynamic Website features",
      "Product catalog",
      "Shopping cart",
      "Secure payment integration",
    ],
  },
]

const testimonials = [
  { id: 1, name: "Sarah J.", role: "E-Commerce Entrepreneur", content: "WebShack transformed our online presence. Our website not only looks amazing but has also doubled our traffic!" },
  { id: 2, name: "David K.", role: "Small Business Owner", content: "Fast, professional, and creative! WebShack delivered beyond our expectations. Highly recommend." },
  { id: 3, name: "Emily R.", role: "Marketing Director", content: "The team at WebShack brought our vision to life. They're true partners in our success." },
];

const steps = [
  { title: "Initial Consultation", description: "We start by understanding your business, goals, and vision.", icon: <Users className="w-6 h-6 text-blue-400" /> },
  { title: "Strategy & Planning", description: "We craft a clear plan for your website or application.", icon: <Sliders className="w-6 h-6 text-green-400" /> },
  { title: "Design", description: "Our team designs a visually stunning and user-friendly interface.", icon: <Palette className="w-6 h-6 text-purple-400" /> },
  { title: "Development", description: "We bring your vision to life with clean, efficient code.", icon: <Code className="w-6 h-6 text-yellow-400" /> },
  { title: "Testing & Launch", description: "We thoroughly test every aspect before going live.", icon: <Zap className="w-6 h-6 text-red-400" /> },
  { title: "Post-Launch Support", description: "We provide ongoing maintenance and support.", icon: <Shield className="w-6 h-6 text-indigo-400" /> },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
        </div>
      </div>

      <DynamicHeader logo={<GradientLogo />} />

      <main className="relative z-10 pt-16">
        <HeroSection />
        <ServicesSection services={services} />
        <ProjectSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <ProcessSection steps={steps} />
        <PricingSection plans={plans} />
        <BlogSection />
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
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          WebShack: Crafting Digital Excellence
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
          We build modern, functional, and visually stunning digital experiences that elevate businesses to new heights.
        </p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          Get Started
        </Button>
        <div className="mt-16">
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <CardTitle className="flex items-center text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.icon}
                  <span className="ml-2">{service.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectSection({ projects }: { projects: Project[] }) {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Our Projects
        </h2>
        <Carousel projects={projects} className="w-full max-w-4xl mx-auto" />
      </div>
    </section>
  )
}

function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 mr-1 group-hover:text-yellow-300 transition-colors duration-300" />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">{testimonial.content}</blockquote>
                <footer>
                  <strong className="text-white group-hover:text-blue-300 transition-colors duration-300">{testimonial.name}</strong>
                  <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors duration-300">{testimonial.role}</p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection({ steps }: { steps: any[] }) {
  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Our Process
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <Card className={`bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none w-1/2 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{step.title}</h3>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{step.description}</p>
                </CardContent>
              </Card>
              <div className="w-4 h-4 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 group-hover:bg-blue-400 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection({ plans }: { plans: any[] }) {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Pricing Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="bg-gray-900 border-none h-full flex flex-col transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold text-blue-400 mb-6 group-hover:text-blue-300 transition-colors duration-300">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature: string, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 group-hover:text-white transition-colors duration-300">
                      <Check className="w-5 h-5 mr-2 text-green-500 group-hover:text-green-400 transition-colors duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 mt-auto">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Get Started</Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Need something custom? We've got you covered!</p>
          <Button variant="outline" className="hover:bg-blue-500 hover:text-white transition-colors duration-300">Request a Quote</Button>
        </div>
      </div>
    </section>
  )
}

function BlogSection() {
  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Latest from Our Blog
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index}>
              <Card className="bg-gray-800 border-none overflow-hidden h-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl group">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{post.title}</h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-300">{post.excerpt}</p>
                  <Button asChild variant="link" className="text-blue-400 hover:text-blue-300 p-0 transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="hover:bg-blue-500 hover:text-white transition-colors duration-300">
            <Link href="/contact">Request Consultation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="py-20 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">About WebShack</h2>
            <p className="text-gray-300 mb-6 hover:text-white transition-colors duration-300">
              WebShack is a team of passionate developers, designers, and digital strategists dedicated to crafting exceptional web experiences. With years of experience and a commitment to innovation, we help businesses of all sizes establish a powerful online presence.
            </p>
            <p className="text-gray-300 mb-6 hover:text-white transition-colors duration-300">
              Our mission is to empower businesses with cutting-edge web solutions that drive growth, enhance user engagement, and deliver measurable results. We believe in the power of the web to transform businesses and create meaningful connections with audiences worldwide.
            </p>
            <Button asChild className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div>
            <Image
              src="/placeholder.svg"
              alt="About us image"
              className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="py-20 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-white">
          Get in Touch
        </h2>
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
            <div className="text-gray-300">
              <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center justify-center hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6 mr-3" /> email@example.com
                </p>
                <p className="flex items-center justify-center hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6 mr-3" /> +1 (123) 456-7890
                </p>
                <p className="flex items-center justify-center hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6 mr-3" /> 123 WebShack St., Web City
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button asChild className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                <Link href="/contact">Request Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="hover:text-white transition-colors duration-300">© {new Date().getFullYear()} WebShack. All rights reserved.</p>
      </div>
    </footer>
  )
}

