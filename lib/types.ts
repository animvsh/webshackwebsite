export interface Service {
    title: string;
    icon: React.ReactNode;
    description: string;
  }
  
  export interface Project {
    name: string;
    icon: React.ReactNode;
    image: string;
    description: string;
    features: string[];
    impact: string;
    futurePlans: string[];
  }
  
  export interface Testimonial {
    name: string;
    position: string;
    avatar: string;
    quote: string;
    rating: number;
  }
  