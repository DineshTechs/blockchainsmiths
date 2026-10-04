import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Shield, Layers, Zap, Globe, Cpu, MapPin, Terminal, Database, Hexagon, Box, Rocket, Calendar, Clock, Activity, Lock, BarChart, Repeat } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import SEO from '../components/SEO';
import Testimonials from '../components/Testimonials';

// --- ANIMATION COMPONENTS ---

// 3D Blockchain Network Animation for Hero
const BlockchainGridCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    // 3D Block Class
    class Block {
      x: number;
      y: number;
      z: number;
      size: number;
      rx: number;
      ry: number;
      rz: number;
      dx: number;
      dy: number;
      dz: number;
      drx: number;
      dry: number;
      drz: number;
      color: string;
      vertices: {x: number, y: number, z: number}[];

      constructor() {
        this.x = (Math.random() - 0.5) * w;
        this.y = (Math.random() - 0.5) * h;
        this.z = Math.random() * 400 + 100; // Depth
        this.size = Math.random() * 20 + 15;
        
        this.rx = Math.random() * Math.PI * 2;
        this.ry = Math.random() * Math.PI * 2;
        this.rz = Math.random() * Math.PI * 2;

        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.dz = (Math.random() - 0.5) * 0.5;
        
        this.drx = (Math.random() - 0.5) * 0.02;
        this.dry = (Math.random() - 0.5) * 0.02;
        this.drz = (Math.random() - 0.5) * 0.02;

        this.color = Math.random() > 0.6 ? '#00f0ff' : '#00ff9d'; // Brand colors
        
        // Cube vertices relative to center
        this.vertices = [
            {x:-1, y:-1, z:-1}, {x:1, y:-1, z:-1}, {x:1, y:1, z:-1}, {x:-1, y:1, z:-1},
            {x:-1, y:-1, z:1}, {x:1, y:-1, z:1}, {x:1, y:1, z:1}, {x:-1, y:1, z:1}
        ];
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.z += this.dz;
        
        this.rx += this.drx;
        this.ry += this.dry;
        this.rz += this.drz;

        // Boundaries
        const boundX = w/2 + 100;
        const boundY = h/2 + 100;
        if (this.x > boundX) this.x = -boundX;
        if (this.x < -boundX) this.x = boundX;
        if (this.y > boundY) this.y = -boundY;
        if (this.y < -boundY) this.y = boundY;
        if (this.z < 100) this.dz = Math.abs(this.dz);
        if (this.z > 600) this.dz = -Math.abs(this.dz);
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        // Rotation Matrices
        const cx = Math.cos(this.rx), sx = Math.sin(this.rx);
        const cy = Math.cos(this.ry), sy = Math.sin(this.ry);
        const cz = Math.cos(this.rz), sz = Math.sin(this.rz);

        const projected = this.vertices.map(v => {
            // Rotate
            let x = v.x * this.size;
            let y = v.y * this.size;
            let z = v.z * this.size;

            // Rotate X
            let y1 = y * cx - z * sx;
            let z1 = z * cx + y * sx;
            y = y1; z = z1;

            // Rotate Y
            let x1 = x * cy - z * sy;
            let z2 = z * cy + x * sy;
            x = x1; z = z2;

            // Rotate Z
            let x2 = x * cz - y * sz;
            let y2 = y * cz + x * sz;
            x = x2; y = y2;

            // Translate
            x += this.x;
            y += this.y;
            z += this.z;

            // Project
            const scale = 600 / (600 + z);
            return {
                x: x * scale + centerX,
                y: y * scale + centerY,
                z: z
            };
        });

        // Edges definition for a cube
        const edges = [
            [0,1], [1,2], [2,3], [3,0], // Front face
            [4,5], [5,6], [6,7], [7,4], // Back face
            [0,4], [1,5], [2,6], [3,7]  // Connecting lines
        ];

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        
        // Opacity based on depth
        const alpha = Math.max(0.1, 1 - (this.z / 600));
        ctx.globalAlpha = alpha * 0.6;

        ctx.beginPath();
        edges.forEach(edge => {
            const p1 = projected[edge[0]];
            const p2 = projected[edge[1]];
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
        });
        ctx.stroke();

        // Draw Nodes
        ctx.fillStyle = this.color;
        projected.forEach(p => {
             ctx.beginPath();
             ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
             ctx.fill();
        });
        
        ctx.globalAlpha = 1;

        return { x: projected[0].x, y: projected[0].y, z: this.z }; // Return approximate center 2D
      }
    }

    // Initialize Blocks
    const blocks: Block[] = [];
    for(let i=0; i<15; i++) {
        blocks.push(new Block());
    }

    // Initialize Pulse Particles (Data traveling between blocks)
    type Pulse = {
        from: number; // index of block
        to: number;   // index of block
        progress: number;
        speed: number;
    };
    const pulses: Pulse[] = [];

    let animationId: number;
    
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      const centerX = w / 2;
      const centerY = h / 2;

      // Update and Draw Blocks
      const blockPositions: {x:number, y:number, z:number}[] = [];
      blocks.forEach(b => {
          b.update();
          blockPositions.push(b.draw(ctx, centerX, centerY));
      });

      // Draw Connections (Blockchain Links)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
      for(let i=0; i<blocks.length; i++) {
          for(let j=i+1; j<blocks.length; j++) {
             const dx = blocks[i].x - blocks[j].x;
             const dy = blocks[i].y - blocks[j].y;
             const dz = blocks[i].z - blocks[j].z;
             const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

             if(dist < 250) {
                 const p1 = blockPositions[i];
                 const p2 = blockPositions[j];
                 
                 ctx.beginPath();
                 ctx.moveTo(p1.x, p1.y);
                 ctx.lineTo(p2.x, p2.y);
                 ctx.stroke();

                 // Randomly spawn pulse
                 if(Math.random() < 0.005) {
                     pulses.push({
                         from: i,
                         to: j,
                         progress: 0,
                         speed: 0.02 + Math.random() * 0.03
                     });
                 }
             }
          }
      }

      // Draw Pulses
      for(let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.progress += p.speed;
          if(p.progress >= 1) {
              pulses.splice(i, 1);
              continue;
          }

          const b1 = blockPositions[p.from];
          const b2 = blockPositions[p.to];
          
          const curX = b1.x + (b2.x - b1.x) * p.progress;
          const curY = b1.y + (b2.y - b1.y) * p.progress;

          ctx.fillStyle = '#fff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00f0ff';
          ctx.beginPath();
          ctx.arc(curX, curY, 2, 0, Math.PI*2);
          ctx.fill();
          ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
        if (!canvas) return;
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full opacity-80" />
        {/* Gradient Mask to fade out bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/20 via-transparent to-brand-darker" />
    </div>
  );
};

// Fixed Background Network Animation
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const handleResize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle Configuration
    const particles: {x: number, y: number, vx: number, vy: number, size: number, color: string}[] = [];
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 60); 
    const colors = ['#00f0ff', '#00ff9d', '#7000ff'];

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2, 
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationId: number;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-30 pointer-events-none mix-blend-screen z-0" />;
};

// Warp Speed Animation
const WarpCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const updateSize = () => {
      if(canvas) {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    updateSize();

    const stars: {x: number, y: number, z: number, pz: number}[] = [];
    const numStars = 500;
    const speed = 5;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
        pz: Math.random() * width 
      });
    }

    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(2, 4, 10, 0.4)'; 
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width;
          star.y = (Math.random() - 0.5) * height;
          star.pz = star.z;
        }

        const x = cx + (star.x / star.z) * width;
        const y = cy + (star.y / star.z) * height;
        const px = cx + (star.x / star.pz) * width;
        const py = cy + (star.y / star.pz) * height;

        star.pz = star.z;

        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          const depth = 1 - (star.z / width);
          const colorVal = Math.floor(depth * 255);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${100}, ${200 + colorVal/5}, 255, ${depth})`; 
          ctx.lineWidth = depth * 2;
          ctx.lineCap = 'round';
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', updateSize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const FloatingSymbol = ({ delay, x, y, rotate, children }: { delay: number, x: string, y: string, rotate?: number, children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      y: [0, -15, 0],
      rotate: rotate ? [rotate, rotate + 10, rotate] : [0, 5, 0],
      opacity: [0.1, 0.3, 0.1]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut"
    }}
    className={`absolute ${x} ${y} pointer-events-none z-0 hidden lg:block`}
  >
    {children}
  </motion.div>
);

const HolographicGlobe = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center perspective-[1000px]">
       <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-3xl" />
       <motion.div 
          animate={{ rotateX: 60, rotateZ: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-brand-primary/20 rounded-full border-dashed"
       />
       <motion.div 
          animate={{ rotateX: 60, rotateY: 45, rotateZ: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70%] h-[70%] border border-brand-secondary/20 rounded-full"
       />
       <motion.div 
         animate={{ rotateY: 360 }}
         transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
         className="relative w-[50%] h-[50%] preserve-3d"
       >
         {[0, 45, 90, 135].map((deg, i) => (
            <div key={i} className="absolute inset-0 border border-brand-primary/10 rounded-full" style={{ transform: `rotateY(${deg}deg)` }} />
         ))}
         {[0, 45, 90].map((deg, i) => (
            <div key={i} className="absolute inset-0 border border-brand-primary/10 rounded-full" style={{ transform: `rotateX(${deg}deg)` }} />
         ))}
         <div className="absolute inset-0 m-auto w-16 h-16 bg-brand-primary/20 rounded-full blur-md shadow-[0_0_30px_rgba(0,240,255,0.4)]" />
       </motion.div>
       <motion.div 
         className="absolute w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent z-10"
         animate={{ top: ['0%', '100%', '0%'] }}
         transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
       />
       <motion.div className="absolute top-[20%] left-[20%] flex items-center gap-2" animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>
         <div className="w-2 h-2 bg-brand-secondary rounded-full shadow-[0_0_10px_#00ff9d]" />
         <span className="text-[10px] text-brand-secondary font-mono bg-black/50 px-1 rounded">SF, USA</span>
       </motion.div>
       <motion.div className="absolute top-[30%] right-[15%] flex items-center gap-2" animate={{ y: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
         <span className="text-[10px] text-brand-primary font-mono bg-black/50 px-1 rounded">London, UK</span>
         <div className="w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_#00f0ff]" />
       </motion.div>
    </div>
  );
};

const TechFeature = ({ icon: Icon, title, description, badge, delay }: { icon: any, title: string, description: string, badge: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ 
      delay, 
      duration: 0.6,
      type: "spring",
      stiffness: 400,
      damping: 15
    }}
    viewport={{ once: true }}
    className="relative group h-full cursor-default"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl blur opacity-10 group-hover:opacity-40 transition duration-500" />
    <div className="relative h-full bg-brand-darker/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-300 flex flex-col">
      <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12">
        <Icon className="w-32 h-32" />
      </div>
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-brand-surface rounded-xl border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-brand-primary" />
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
          {badge}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm flex-grow">
        {description}
      </p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-700" />
    </div>
  </motion.div>
);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yContent = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="relative bg-brand-darker min-h-screen">
      <SEO 
        title="Leading Blockchain Development Agency | Smart Contracts & DeFi"
        description="Expert full-stack blockchain development agency. We deliver secure Smart Contracts, DApps, DeFi protocols, and NFT solutions for global crypto startups."
        keywords="Blockchain Development Agency, Smart Contract Developer, DeFi Development, NFT Marketplace, Web3 Agency, Ethereum, Solana"
      />

      {/* --- GLOBAL UNIFIED BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
         {/* Deep Space Base */}
         <div className="absolute inset-0 bg-brand-darker" />
         
         {/* Animated Network (Now covers entire scroll) */}
         <NetworkCanvas />
         
         {/* Ambient Gradients - Fixed position to create depth */}
         <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-primary rounded-full mix-blend-screen filter blur-[120px] opacity-[0.07] animate-blob" />
         <div className="absolute bottom-[10%] right-[-5%] w-[40vw] h-[40vw] bg-brand-accent rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05] animate-blob animation-delay-2000" />
         <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] bg-brand-secondary rounded-full mix-blend-screen filter blur-[100px] opacity-[0.04] animate-blob animation-delay-4000" />
         
         {/* Global Grid Overlay */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" 
              style={{ backgroundSize: '60px 60px', maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />
      </div>

      {/* --- SCROLLABLE CONTENT LAYER --- */}
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <div ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
          {/* New 3D Blockchain Grid Animation */}
          <BlockchainGridCanvas />

          <motion.div 
            style={{ y: yContent }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full"
          >
             {/* Floating 3D Symbols (Hero Only) */}
            <FloatingSymbol x="top-[10%]" y="left-[10%]" delay={0} rotate={-15}>
                <Hexagon className="w-16 h-16 text-brand-primary stroke-[1] opacity-50" />
            </FloatingSymbol>
            <FloatingSymbol x="top-[20%]" y="right-[10%]" delay={2} rotate={15}>
                <Box className="w-12 h-12 text-brand-secondary stroke-[1] opacity-50" />
            </FloatingSymbol>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-mono text-xs sm:text-sm backdrop-blur-sm shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Web3 Development Agency
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary neon-text">Trustless</span><br className="hidden md:block" />
              Systems
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed px-2 font-light"
            >
              From smart contracts to scalable DApps. We are the engineering partner for crypto startups, DAOs, and Web3 visionaries.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-brand-darker font-bold rounded-lg hover:bg-brand-secondary transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] text-lg flex items-center justify-center gap-2 group hover:-translate-y-1"
              >
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 hover:border-brand-primary/50 transition-all text-lg backdrop-blur-sm flex items-center justify-center"
              >
                View Portfolio
              </Link>
            </motion.div>
          </motion.div>

          {/* Fade transition to next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-darker/50 to-transparent pointer-events-none" />
        </div>

        {/* WHY CHOOSE US */}
        <Section id="why-us">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-brand-primary font-mono text-xs md:text-sm mb-4 tracking-widest uppercase"
            >
              <span className="w-6 h-[1px] bg-brand-primary/50"></span>
              The Smith Advantage
              <span className="w-6 h-[1px] bg-brand-primary/50"></span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Scale</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We move beyond basic Solidity. We implement advanced cryptographic primitives, gas-golfing techniques, and modular architectures to future-proof your protocol.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TechFeature 
              icon={Shield}
              title="Fortress-Grade Security"
              badge="0 Exploits"
              description="We employ formal verification methods, rigorous unit testing (Foundry/Hardhat), and internal audits before any code hits mainnet. Security is not an afterthought."
              delay={0.1}
            />
            <TechFeature 
              icon={Zap}
              title="Extreme Gas Optimization"
              badge="Assembly / Yul"
              description="Our contracts are optimized down to the opcode level. We utilize Yul and inline Assembly to ensure your users pay the absolute minimum in gas fees."
              delay={0.2}
            />
            <TechFeature 
              icon={Layers}
              title="Chain Agnostic"
              badge="EVM + SVM + Cosmos"
              description="Seamlessly deploy on Ethereum, Solana, or build custom L3 app-chains. We master the nuances of each ecosystem to deliver native performance."
              delay={0.3}
            />
          </div>
        </Section>

        {/* SERVICES PREVIEW */}
        <Section id="services">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Competencies</h2>
              <p className="text-slate-400 text-lg">
                End-to-end development capabilities for the entire Web3 stack.
              </p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-brand-primary hover:text-white transition-colors group px-4 py-2 bg-brand-primary/5 rounded-lg border border-brand-primary/20 hover:border-brand-primary/50">
              View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Smart Contracts", desc: "ERC20, ERC721, Governance, & Staking Logic.", tag: "Solidity" },
              { icon: Globe, title: "DApp Interfaces", desc: "Responsive, wallet-aware frontends with real-time data.", tag: "React/Next.js" },
              { icon: BarChart, title: "DeFi Protocols", desc: "AMMs, Lending Markets, and Yield Aggregators.", tag: "Finance" },
              { icon: Rocket, title: "Token Launch", desc: "Vesting schedules, Airdrops, and Presale dashboards.", tag: "Growth" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
                viewport={{ once: true }}
              >
                <Link to="/services" className="group block h-full bg-brand-darker/50 backdrop-blur-md border border-white/5 rounded-xl p-6 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-brand-primary -rotate-45" />
                  </div>
                  
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{item.desc}</p>
                  
                  <div className="mt-auto">
                     <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-black/30 px-2 py-1 rounded border border-white/5 group-hover:border-brand-primary/20 group-hover:text-brand-primary transition-colors">
                       {item.tag}
                     </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/services" className="inline-flex items-center gap-2 text-brand-primary font-medium p-4 bg-white/5 rounded-lg w-full justify-center">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>

         {/* GLOBAL REACH SEO SECTION */}
        <Section className="relative overflow-hidden">
          {/* Abstract World Map BG */}
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-5 bg-no-repeat bg-center bg-cover filter invert pointer-events-none mix-blend-overlay" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-sm font-mono mb-6 border border-brand-secondary/20">
                <Activity className="w-4 h-4 animate-pulse" /> Network Active
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Borderless <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Engineering</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We operate as a decentralized node network. Whether you are a DeFi protocol in <strong>London</strong>, a DAO in <strong>Singapore</strong>, or a startup in <strong>Silicon Valley</strong>, our distributed team ensures code is being shipped around the clock.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex items-start gap-4 p-4 bg-brand-darker/60 backdrop-blur-md rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                   <div className="p-2 bg-brand-primary/20 rounded-lg text-brand-primary">
                     <Clock className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="text-white font-bold mb-1">24/7 Dev Cycles</h4>
                     <p className="text-xs text-slate-400">Async workflows across 4 timezones ensure faster delivery.</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4 p-4 bg-brand-darker/60 backdrop-blur-md rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                   <div className="p-2 bg-brand-secondary/20 rounded-lg text-brand-secondary">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="text-white font-bold mb-1">On-Site Support</h4>
                     <p className="text-xs text-slate-400">Available for major hubs: Dubai, Bangalore, London, NYC.</p>
                   </div>
                 </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                 {['USA', 'UK', 'UAE', 'Singapore', 'India', 'Europe'].map(region => (
                   <div key={region} className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs text-slate-400 font-mono">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]" />
                     {region}
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
               <HolographicGlobe />
            </div>
          </div>
        </Section>
        
        {/* TESTIMONIALS SECTION */}
        <Section id="testimonials" className="border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Client Echoes</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Trusted by leading protocols and startups across the globe.
            </p>
          </div>
          <Testimonials />
        </Section>

        {/* WARP SPEED CTA SECTION */}
        <Section className="!py-0 !px-0 relative overflow-hidden h-[600px] border-t border-white/10">
          <WarpCanvas />
          {/* Top fade to blend smoothly into the previous section */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-darker to-transparent pointer-events-none z-10" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/60 to-transparent pointer-events-none" />
          
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl"
            >
              {/* Glass Command Center Panel */}
              <div className="bg-brand-darker/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                {/* Scanline decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-50" />
                
                <div className="inline-flex items-center gap-2 mb-6 text-brand-secondary font-mono text-sm tracking-wider">
                   <span className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse" />
                   SYSTEM READY
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  Ready to Build the <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-secondary animate-pulse-slow">
                    Decentralized Future?
                  </span>
                </h2>
                
                <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Stop watching the revolution from the sidelines. Let's turn your whitepaper into a deployed reality. 
                  <span className="block mt-2 text-brand-primary/80 font-mono text-sm">
                    {`> Initializing launch sequence...`}
                  </span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="group relative px-8 py-4 bg-brand-primary text-brand-darker font-bold rounded-lg overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  >
                    <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2 text-lg">
                      <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      Launch Project
                    </span>
                  </Link>
                  
                  <a
                    href="mailto:enquiry@blockchainsmiths.com"
                    className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 hover:border-brand-primary/50 transition-all flex items-center gap-2 justify-center backdrop-blur-sm hover:shadow-[0_0_20px_rgba(112,0,255,0.3)] text-lg"
                  >
                    <Calendar className="w-5 h-5 text-brand-accent group-hover:text-white transition-colors" />
                    Schedule Audit
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Home;