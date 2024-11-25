'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, Heart, Calendar, Brain, Lightbulb, Rocket, ArrowRight, Menu, X } from 'lucide-react'

interface DynamicHeaderProps {
  logo: React.ReactNode;
}

function DynamicHeader({ logo }: DynamicHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ]

  return (
    <motion.header 
      className={`sticky top-0 z-50 backdrop-blur-md border-b border-gray-800 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white flex items-center">
          {logo}
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800 overflow-hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const GradientLogo = () => (
  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
    <span className="mr-2">🐘</span>
    WebShack
  </span>
)

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = getProjects()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
        </div>
      </div>
      <DynamicHeader logo={<GradientLogo />} />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Our Innovative Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} setSelectedProject={setSelectedProject} index={index} />
          ))}
        </div>
      </main>
      <AnimatePresence>
        {selectedProject && (
          <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProjectCard({ project, setSelectedProject, index }: { project: Project; setSelectedProject: (project: Project) => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group h-full">
        <div className="relative h-48">
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center text-white group-hover:text-purple-400 transition-colors duration-300">
            {project.icon}
            <span className="ml-2">{project.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="secondary" className="bg-purple-500 bg-opacity-50 text-white">
                {tech}
              </Badge>
            ))}
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            onClick={() => setSelectedProject(project)}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-gray-900 text-white border-none rounded-2xl overflow-hidden p-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-64">
            <Image
              src={project.image}
              alt={project.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <Button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {project.icon}
                <span className="ml-2">{project.name}</span>
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                {project.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-purple-300">Key Features:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
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
                <p className="text-gray-300">{project.impact}</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-purple-300">Future Plans:</h4>
                <ul className="space-y-1 text-gray-300">
                  {project.futurePlans.map((plan, index) => (
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
  )
}

interface Project {
  name: string;
  icon: JSX.Element;
  image: string;
  description: string;
  technologies: string[];
  features: string[];
  impact: string;
  futurePlans: string[];
}

function getProjects(): Project[] {
  return [
    {
      name: 'ClassMate',
      icon: <Users className="text-blue-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: 'A Chrome extension for student collaboration on Canvas.',
      technologies: ['JavaScript', 'React', 'Chrome API'],
      features: [
        'Integration with Canvas',
        'Smart Notifications',
        'Customizable Settings',
        'Analytics Dashboard'
      ],
      impact: 'ClassMate empowers students to take ownership of their learning while enabling instructors to foster a more interactive classroom environment.',
      futurePlans: [
        'Offer premium analytics',
        'Expand to other learning platforms',
        'Implement AI-driven study recommendations'
      ]
    },
    {
      name: 'Rizzy',
      icon: <Heart className="text-pink-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: 'An innovative blind dating app with unique features.',
      technologies: ['React Native', 'Node.js', 'MongoDB'],
      features: [
        'Match History',
        'Event-Based Matching',
        'Icebreaker Questions',
        'Relationship Insights'
      ],
      impact: 'By gamifying dating and removing superficial biases, Rizzy focuses on compatibility and fun, making it a standout choice for users seeking genuine relationships.',
      futurePlans: [
        'Launch partnership programs with local venues',
        'Introduce long-term relationship-building tools',
        'Implement AI-powered compatibility matching'
      ]
    },
    {
      name: 'Soshal',
      icon: <Calendar className="text-green-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: 'A platform for community connections and event planning.',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      features: [
        'Interest-Based Matching',
        'Event Broadcasting',
        'Monetization for Event Organizers',
        'Moderator Tools'
      ],
      impact: 'Soshal bridges the gap between online interactions and real-world relationships, empowering groups to collaborate effectively.',
      futurePlans: [
        'Develop AI-driven suggestions for group activities',
        'Partner with corporations for internal team-building solutions',
        'Expand to global markets with localization features'
      ]
    },
    {
      name: 'Condoit AI',
      icon: <Brain className="text-purple-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: 'AI-powered 4-year planner for academic success.',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      features: [
        'Career Integration',
        'Peer Comparisons',
        'Alert System',
        'Parent/Advisor Access',
      ],
      impact: 'By reducing the stress of academic planning, Condoit AI helps students focus on learning and career preparation.',
      futurePlans: [
        'Add internship and job placement tracker',
        'Introduce scholarships suggestions',
        'Implement machine learning for personalized study plans'
      ]
    },
    {
      name: 'Slug AI',
      icon: <Lightbulb className="text-yellow-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: "UCSC's AI innovation initiative and hackathon platform.",
      technologies: ['Next.js', 'GraphQL', 'AWS'],
      features: [
        'AI Sandbox',
        'Partnership Program',
        'Open-Source Repository',
        'AI Competitions'
      ],
      impact: 'Establish UCSC as a leader in AI innovation and build a network of alumni and industry professionals to drive future collaborations.',
      futurePlans: [
        'Expand to other universities',
        'Create a unified platform for AI education and research',
        'Launch an AI startup incubator program'
      ]
    },
    {
      name: 'SlugSmart',
      icon: <Rocket className="text-red-400" />,
      image: '/placeholder.svg?height=200&width=400',
      description: 'Smart campus app for UCSC students.',
      technologies: ['React', 'Firebase', 'Google Cloud'],
      features: [
        'Customizable Dashboard',
        'AI Advisor',
        'Campus Navigation',
        'Energy-Saving Tips'
      ],
      impact: 'SlugSmart enhances every aspect of campus life, helping students make the most of their college experience.',
      futurePlans: [
        'Partner with campus organizations',
        'Introduce mental health check-ins and resources',
        'Implement IoT integration for smart campus features'
      ]
    }
  ]
}

