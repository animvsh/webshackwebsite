'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Users, Zap, Shield, Smartphone, BotIcon as Robot, Cog, BarChart } from 'lucide-react';
import DynamicHeader from '@/components/DynamicHeader';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <motion.div 
            className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: 'reverse' 
            }}
          />
          <motion.div 
            className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: 'reverse' 
            }}
          />
          <motion.div 
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: 'reverse' 
            }}
          />
        </div>
      </div>

      <DynamicHeader logo={<span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">WebShack</span>} />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About WebShack
        </motion.h1>
        
        <motion.section 
          className="mb-16 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-300">Our Mission</h2>
          <p className="text-xl text-gray-300 mb-8">
            At WebShack, we're driven by innovation and committed to turning ideas into reality. Our mission is to create cutting-edge software and services that empower businesses and individuals to thrive in the digital age.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Get in Touch
            </Button>
          </Link>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getServices().map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <Card className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-purple-500 border-opacity-50 hover:bg-opacity-70 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      {service.icon}
                      <span className="ml-2">{service.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-purple-300">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getReasons().map((reason, index) => (
              <motion.div 
                key={index} 
                className="flex items-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="flex-shrink-0 mr-4">
                  <motion.div
                    animate={hoveredCard === index ? { rotate: [0, 15, -15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {reason.icon}
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
                  <p className="text-gray-300">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function getServices() {
  return [
    {
      icon: <Code className="text-blue-400 w-6 h-6" />,
      title: 'Custom Web Development',
      description: 'Tailored websites and web applications designed to meet your unique business needs.'
    },
    {
      icon: <Smartphone className="text-green-400 w-6 h-6" />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile apps that deliver seamless user experiences.'
    },
    {
      icon: <Robot className="text-yellow-400 w-6 h-6" />,
      title: 'AI Integration',
      description: 'Leverage the power of artificial intelligence to enhance your digital products.'
    },
    {
      icon: <Shield className="text-red-400 w-6 h-6" />,
      title: 'Cybersecurity Solutions',
      description: 'Protect your digital assets with our advanced security measures and best practices.'
    },
    {
      icon: <Cog className="text-purple-400 w-6 h-6" />,
      title: 'DevOps & Cloud Services',
      description: 'Streamline your development and deployment processes with our DevOps expertise.'
    },
    {
      icon: <BarChart className="text-pink-400 w-6 h-6" />,
      title: 'Data Analytics',
      description: 'Turn your data into actionable insights with our analytics solutions.'
    }
  ];
}

function getReasons() {
  return [
    {
      icon: <Users className="text-blue-400 w-8 h-8" />,
      title: 'Expert Team',
      description: 'Our team of seasoned professionals brings years of experience and cutting-edge skills to every project.'
    },
    {
      icon: <Zap className="text-yellow-400 w-8 h-8" />,
      title: 'Innovative Solutions',
      description: 'We stay ahead of the curve, implementing the latest technologies to deliver forward-thinking solutions.'
    },
    {
      icon: <Shield className="text-green-400 w-8 h-8" />,
      title: 'Quality Assurance',
      description: 'Our rigorous testing and quality control processes ensure reliable, high-performance products.'
    },
    {
      icon: <Users className="text-purple-400 w-8 h-8" />,
      title: 'Client-Centric Approach',
      description: 'We prioritize your needs and vision, working closely with you throughout the development process.'
    }
  ];
}

