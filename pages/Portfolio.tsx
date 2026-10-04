import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from '../components/Section';
import { Layers, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { projects, Project } from '../data/projects';

const categories = ['All', 'DeFi', 'NFT', 'DAO', 'Infrastructure'];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px 0px',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative h-[500px] rounded-2xl overflow-hidden bg-brand-darker border border-white/5"
    >
      {/* Image Background */}
      <div className="absolute inset-0 bg-brand-dark">
        {/* Placeholder / Skeleton */}
        <div 
          className={`absolute inset-0 bg-white/5 animate-pulse transition-opacity duration-500 z-0 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {inView && (
          <img 
            src={project.image} 
            alt={project.title} 
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 relative z-10 
              ${isLoaded ? 'opacity-60 group-hover:opacity-40' : 'opacity-0'}
            `}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/80 to-transparent z-20" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-left z-30">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-secondary uppercase bg-brand-secondary/10 rounded border border-brand-secondary/20">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-300 mb-6 line-clamp-3 text-sm leading-relaxed">
            {project.desc}
          </p>
          
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map(tech => (
              <span key={tech} className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                {tech}
              </span>
            ))}
          </div>

          <Link 
            to={`/case-study/${project.id}`}
            className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all"
          >
            View Case Study <ArrowRight className="w-4 h-4 text-brand-primary" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-20">
      <SEO 
        title="Portfolio | Web3 Case Studies & Deployed DApps"
        description="Explore our successful deployments in DeFi, NFTs, and cross-chain infrastructure. We help startups launch production-grade blockchain applications."
        keywords="Web3 Portfolio, Blockchain Case Studies, Deployed Smart Contracts, DeFi DApps"
      />
      <Section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-mono mb-6 border border-brand-primary/20">
            <Layers className="w-4 h-4" /> Selected Works
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Engineering the <br/><span className="text-brand-secondary">Decentralized Future</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            Explore our portfolio of deployed DApps, secure smart contracts, and scalable blockchain infrastructure.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-brand-primary text-brand-darker border-brand-primary'
                  : 'bg-transparent text-slate-400 border-white/10 hover:border-brand-primary/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-slate-500 py-20">
            No projects found in this category.
          </div>
        )}
      </Section>

      <Section darker className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Have a similar project in mind?</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          We can fork and customize any of these solutions or build something entirely new from scratch.
        </p>
        <Link 
          to="/contact" 
          className="inline-block px-8 py-4 bg-brand-primary text-brand-darker font-bold rounded-lg hover:bg-brand-secondary transition-colors"
        >
          Discuss Your Project
        </Link>
      </Section>
    </div>
  );
};

export default Portfolio;