'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DynamicHeader from '@/components/DynamicHeader'
import { blogPosts } from '@/lib/blogPosts'

export default function Blog() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <DynamicHeader logo={
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          🐘 WebShack
        </span>
      } />
      <main className="container mx-auto px-4 py-20 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Insights & Ideas
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border-none hover:bg-opacity-70 transition-all duration-300 h-full overflow-hidden group">
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
                    <CardDescription className="text-gray-300 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <p className="text-sm text-gray-400 mb-4">By {post.author} | {post.date}</p>
                    <Button variant="outline" className="text-purple-300 border-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-300 backdrop-filter backdrop-blur-sm w-full">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}