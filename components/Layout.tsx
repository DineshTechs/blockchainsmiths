import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Github, Twitter, Linkedin, ChevronRight, Mail, ChevronDown, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Blockchains', path: '/blockchains' },
    { 
      label: 'Tools', 
      path: '#',
      children: [
        { label: 'Metamask Scanner', path: 'https://metamaskscan.io/', isExternal: true },
        { label: 'Make Token Online', path: 'https://maketoken.online/', isExternal: true }
      ]
    },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-dark text-slate-300 selection:bg-brand-primary selection:text-brand-darker">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-[#02040a]/80 backdrop-blur-xl border-brand-primary/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Top glowing line for active state */}
        <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-primary/20 blur-md rounded-lg group-hover:bg-brand-primary/40 transition-colors duration-300" />
                <div className="relative p-2 bg-brand-darker/50 rounded-lg border border-brand-primary/30 group-hover:border-brand-primary/80 transition-colors">
                  <Terminal className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-bold text-xl text-white tracking-tighter leading-none group-hover:text-brand-primary transition-colors">
                  BLOCKCHAIN<span className="text-brand-primary group-hover:text-white transition-colors">SMITHS</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-slate-500 font-bold group-hover:text-brand-secondary transition-colors uppercase">
                  Development
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                  <motion.div 
                    key={link.label} 
                    className="relative group px-3 py-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link.children ? (
                    <>
                      <button 
                        className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:text-brand-primary ${
                          location.pathname.includes(link.path) && link.path !== '#' ? 'text-brand-primary' : 'text-slate-300'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        <div className="relative">
                          {/* Triangle pointer */}
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand-darker border-t border-l border-brand-primary/20 transform rotate-45" />
                          
                          <div className="bg-[#050a14]/95 border border-brand-primary/20 rounded-xl p-2 w-60 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden relative z-10">
                            {link.children.map((child) => (
                              <a 
                                key={child.label}
                                href={child.path}
                                target={child.isExternal ? "_blank" : undefined}
                                rel={child.isExternal ? "noopener noreferrer" : undefined}
                                className="flex items-center justify-between px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                              >
                                {child.label}
                                {child.isExternal && <ExternalLink className="w-3 h-3 opacity-50 group-hover/item:opacity-100 group-hover/item:text-brand-primary" />}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="relative text-sm font-medium group"
                    >
                      <span className={`relative z-10 transition-colors duration-300 group-hover:text-white ${
                        location.pathname === link.path ? 'text-brand-primary' : 'text-slate-300'
                      }`}>
                        {link.label}
                      </span>
                      {/* Hover glow effect */}
                      <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_10px_#00f0ff]" />
                    </Link>
                  )}
                  </motion.div>
              ))}
              
              <div className="w-[1px] h-8 bg-white/10 mx-4" />

              <Link
                to="/contact"
                className="relative group"
              >
                <motion.div 
                  className="relative px-6 py-2.5 bg-transparent overflow-hidden rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 border border-brand-primary/50 rounded-lg group-hover:border-brand-primary transition-colors duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]" />
                  <div className="absolute inset-0 bg-brand-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <span className="relative flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:text-white transition-colors">
                      Get a Quote <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative group p-2"
            >
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 rounded-lg transition-colors" />
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-300 group-hover:text-brand-primary transition-colors" />
              ) : (
                <Menu className="w-6 h-6 text-slate-300 group-hover:text-brand-primary transition-colors" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-darker pt-24 px-4 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 pb-10">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <div className="border-b border-white/5 pb-2">
                      <div className="text-xl font-mono font-bold text-slate-300 py-2 flex items-center gap-2">
                        {link.label}
                      </div>
                      <div className="pl-4 flex flex-col gap-2 mt-1">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.path}
                            target={child.isExternal ? "_blank" : undefined}
                            rel={child.isExternal ? "noopener noreferrer" : undefined}
                            className="text-lg text-slate-400 hover:text-brand-primary py-2 block flex items-center gap-2"
                          >
                            {child.label}
                            {child.isExternal && <ExternalLink className="w-4 h-4 opacity-50" />}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-xl font-mono font-bold text-slate-300 hover:text-brand-primary py-2 border-b border-white/5 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-4 w-full py-4 bg-brand-primary text-brand-darker font-bold text-center rounded text-lg shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-20 bg-brand-darker pt-24 pb-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-dark to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6 group w-fit">
                <div className="p-2 bg-brand-primary/10 rounded-lg border border-brand-primary/20 group-hover:border-brand-primary/50 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                   <Terminal className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="font-mono font-bold text-xl text-white tracking-tighter">
                  BLOCKCHAIN<span className="text-brand-primary">SMITHS</span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Building trustless systems for a decentralized world. Your partner in scalable Web3 architecture and smart contract security.
              </p>
              
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: Linkedin, href: "https://linkedin.com" }
                ].map((social, idx) => (
                  <motion.a 
                    key={idx}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group p-3 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  >
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="text-white font-bold mb-8 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span> Services
              </h4>
              <ul className="space-y-4 text-sm">
                {[
                  { label: "Smart Contracts", path: "/services" },
                  { label: "DApp Development", path: "/services" },
                  { label: "Audits & Security", path: "/services" },
                  { label: "DeFi Solutions", path: "/services" },
                  { label: "NFT Marketplaces", path: "/services" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                    >
                      <span className="w-0 h-[1px] bg-brand-primary group-hover:w-3 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-white font-bold mb-8 font-mono flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span> Company
              </h4>
              <ul className="space-y-4 text-sm">
                 {[
                  { label: "About Us", path: "/about" },
                  { label: "Portfolio", path: "/portfolio" },
                  { label: "Supported Chains", path: "/blockchains" },
                  { label: "Tools", path: "/services" },
                  { label: "Contact", path: "/contact" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link 
                      to={item.path} 
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group w-fit"
                    >
                      <span className="w-0 h-[1px] bg-brand-secondary group-hover:w-3 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-bold mb-8 font-mono flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span> Contact
              </h4>
              <ul className="space-y-6 text-sm text-slate-400">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Email Us</span>
                    <a href="mailto:enquiry@blockchainsmiths.com" className="hover:text-white transition-colors">enquiry@blockchainsmiths.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-brand-secondary/10 rounded-lg text-brand-secondary shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Global Hubs</span>
                    <span>Dubai • London • Singapore • SF</span>
                  </div>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-white bg-brand-primary/10 border border-brand-primary/20 px-6 py-3 rounded-lg hover:bg-brand-primary hover:text-brand-darker transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] font-bold text-xs uppercase tracking-wider"
                  >
                    Schedule Consultation <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p className="flex items-center gap-1">
              &copy; {new Date().getFullYear()} Blockchain Smiths. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
              <a href="#" className="hover:text-brand-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;