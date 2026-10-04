import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, Code, User, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { projects, Project } from '../data/projects';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animated Card Component for "More Case Studies"
const ScanlineCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <Link 
        to={`/case-study/${project.id}`} 
        className="group block h-full bg-brand-dark border border-white/5 rounded-2xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] relative flex flex-col"
      >
        {/* Image Container with Scanline Effect */}
        <div className="aspect-[16/9] overflow-hidden relative">
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover" 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Dark Tech Overlay */}
            <div className="absolute inset-0 bg-brand-darker/60 group-hover:bg-brand-darker/40 transition-colors duration-300" />
            
            {/* Continuous Scanline Animation */}
            <motion.div
              className="absolute inset-0 w-full h-[20%] bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent z-10 pointer-events-none"
              initial={{ top: "-20%" }}
              animate={{ top: "120%" }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
            
            {/* Grid Overlay Pattern (only visible on hover) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute bottom-4 left-4 z-20">
                <span className="text-xs font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded backdrop-blur-md border border-brand-secondary/20 shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                  {project.category}
                </span>
            </div>
        </div>

        {/* Card Content */}
        <div className="p-6 relative z-10 flex-grow flex flex-col">
            <h4 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors mb-3 flex items-center justify-between">
              {project.title}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand-primary" />
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0,3).map((t, i) => (
                  <span key={i} className="text-xs text-slate-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-white/10 transition-colors">
                    {t}
                  </span>
                ))}
            </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Safe navigation if projects are somehow missing
  if (!projects) {
    return <Navigate to="/portfolio" replace />;
  }
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      <SEO 
        title={`${project.title} | Case Study`}
        description={`Read how we built ${project.title}. ${project.desc} Technologies used: ${project.tech.join(', ')}.`}
        image={project.image}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": project.title,
          "description": project.desc,
          "image": project.image,
          "author": {
            "@type": "Organization",
            "name": "Blockchain Smiths"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Blockchain Smiths",
            "logo": {
              "@type": "ImageObject",
              "url": "https://blockchainsmiths.com/favicon.svg"
            }
          }
        }}
      />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-brand-darker border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-brand-secondary uppercase bg-brand-secondary/10 rounded border border-brand-secondary/20">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <User className="w-4 h-4 text-brand-primary" />
                  {project.client}
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  {project.timeline}
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="relative rounded-2xl border border-white/10 shadow-2xl w-full object-cover aspect-video"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Column */}
          <motion.div 
            className="lg:col-span-2 space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-brand-primary rounded-full shadow-[0_0_10px_#00f0ff]"></span>
                The Challenge
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {project.challenge}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-brand-secondary rounded-full shadow-[0_0_10px_#00ff9d]"></span>
                Our Solution
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg mb-8">
                {project.solution}
              </p>
              
              <div className="bg-brand-darker border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors shadow-lg">
                <h3 className="text-white font-bold mb-6 font-mono">Key Features Delivered</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                      <span className="text-slate-400">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-brand-accent rounded-full shadow-[0_0_10px_#7000ff]"></span>
                The Results
              </h2>
              <div className="relative group overflow-hidden rounded-lg p-[1px]">
                 <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/50 to-brand-primary/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                 <div className="relative bg-brand-darker rounded-lg p-8 border border-transparent">
                    <p className="text-slate-300 leading-relaxed text-lg italic border-l-4 border-brand-accent pl-6">
                      "{project.result}"
                    </p>
                 </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-24 space-y-8">
              <div className="p-6 bg-brand-darker rounded-xl border border-white/5 shadow-xl hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-shadow duration-300">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code className="w-5 h-5 text-brand-primary" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-brand-primary/5 border border-brand-primary/20 rounded text-sm text-brand-primary font-mono hover:bg-brand-primary/10 transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl border border-brand-primary/20 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Build Your Own</h3>
                <p className="text-slate-400 text-sm mb-6 relative z-10">
                  Like what you see? We can build a similar solution for your project.
                </p>
                <Link 
                  to="/contact" 
                  className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-darker font-bold rounded hover:bg-brand-secondary transition-colors w-full justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)]"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
      
      {/* More Case Studies Section */}
      <Section darker className="border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
             <div>
               <h2 className="text-3xl font-bold text-white mb-2">More Case Studies</h2>
               <p className="text-slate-400">Explore other successful deployments.</p>
             </div>
             <Link to="/portfolio" className="flex items-center gap-2 text-brand-primary hover:text-white transition-colors group">
               View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
            {projects.filter(p => p.id !== project.id).slice(0, 2).map((p) => (
                <ScanlineCard key={p.id} project={p} />
            ))}
        </motion.div>
      </Section>
    </>
  );
};

export default CaseStudy;