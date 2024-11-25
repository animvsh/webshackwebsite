import React, { ReactNode, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  link: string;
}

interface CarouselProps {
  projects: Project[];
  className?: string;
}

export function Carousel({ projects, className = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <motion.div
          className="flex"
          animate={{ x: `${-currentIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {projects.map((project) => (
            <CarouselItem key={project.id} className="w-full">
              <div
                className="relative h-64 cursor-pointer overflow-hidden"
                onClick={() => openModal(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-bold">{project.title}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </motion.div>
      </div>
      <CarouselPrevious onClick={handlePrevious} />
      <CarouselNext onClick={handleNext} />
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}

export function CarouselContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex overflow-hidden">
      {children}
    </div>
  );
}

interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

export function CarouselItem({ children, className = '' }: CarouselItemProps) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}

interface CarouselControlProps {
  onClick: () => void;
}

export function CarouselPrevious({ onClick }: CarouselControlProps) {
  return (
    <Button
      onClick={onClick}
      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      variant="ghost"
      size="icon"
    >
      <ChevronLeft className="w-6 h-6" />
    </Button>
  );
}

export function CarouselNext({ onClick }: CarouselControlProps) {
  return (
    <Button
      onClick={onClick}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      variant="ghost"
      size="icon"
    >
      <ChevronRight className="w-6 h-6" />
    </Button>
  );
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0 bg-transparent">
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
            >
              
              <div className="relative z-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <Button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                  variant="ghost"
                  size="icon"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <div className="p-8 text-gray-800 dark:text-white">
                <h2 className="text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                  {project.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.fullDescription}</p>
                <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-300">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="bg-purple-700 text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    View Project
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

