import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  org: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Blockchain Smiths transformed our vision into a robust DeFi protocol. Their attention to security during the audit gave our investors the confidence they needed.",
    author: "Alex Rivera",
    role: "CEO",
    org: "Nexus Finance",
    avatarColor: "bg-brand-primary"
  },
  {
    id: 2,
    quote: "The speed and efficiency of the team are unmatched. We launched our NFT marketplace ahead of schedule with zero gas optimization issues.",
    author: "Sarah Chen",
    role: "Founder",
    org: "ArtLink",
    avatarColor: "bg-brand-secondary"
  },
  {
    id: 3,
    quote: "Deep technical expertise combined with a professional approach. They are our go-to partner for all things Web3.",
    author: "Marcus Thorne",
    role: "CTO",
    org: "Global Ledger",
    avatarColor: "bg-brand-accent"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-20 overflow-hidden">
      <div className="absolute top-10 left-10 opacity-[0.03] pointer-events-none">
        <Quote className="w-40 h-40 text-brand-primary" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="h-[320px] md:h-[240px] w-full flex items-center justify-center relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
              className="absolute w-full text-center flex flex-col items-center px-4"
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${testimonials[currentIndex].avatarColor} flex items-center justify-center text-brand-darker font-bold text-lg border-2 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="text-white font-bold tracking-tight">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-slate-400">
                    {testimonials[currentIndex].role} <span className="text-brand-primary mx-1">/</span> {testimonials[currentIndex].org}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 mt-12">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-brand-primary/50 transition-all group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-8 bg-brand-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 bg-white/5 border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-brand-primary/50 transition-all group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
