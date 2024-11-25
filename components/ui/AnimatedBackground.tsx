'use client'

import React from 'react'

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`
            absolute rounded-full mix-blend-screen filter blur-xl opacity-50 animate-blob
            ${[
              'bg-blue-400/30 left-0 top-0',
              'bg-purple-400/30 right-0 top-1/3',
              'bg-indigo-400/30 bottom-0 left-1/4',
              'bg-blue-300/30 bottom-1/2 right-1/4',
              'bg-purple-300/30 top-1/2 left-1/3'
            ][i]}
          `}
          style={{
            width: `${Math.random() * 30 + 20}%`,
            height: `${Math.random() * 30 + 20}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 20}s`
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground

