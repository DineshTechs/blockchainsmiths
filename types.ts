import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  lottieUrl?: string;
  details?: string[];
}

export interface Blockchain {
  name: string;
  type: 'L1' | 'L2' | 'Sidechain';
  description: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}