'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function DynamicHeader() { // Removed logo prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

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
        <Link href="/" className="flex items-center">
          {/* Replaced {logo} with Image component and added gradient text */}
          <Image 
            src="/logo.png" 
            alt="WebShack Logo" 
            width={60} // Increased width
            height={60} // Increased height
            className="mr-3" // Adjusted margin
          />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Webshack
          </span>
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
        <Button 
          className="md:hidden" 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
  );
}
