import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Coffee, Server, ChevronDown, HelpCircle } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const faqs = [
  {
    question: "How long does it take to develop a typical blockchain project?",
    answer: "Timelines vary significantly based on complexity. A simple NFT collection might take 2-3 weeks, while a full-featured DeFi protocol or custom L2 chain could take 3-6 months. We provide detailed milestones during our initial consultation."
  },
  {
    question: "Do you offer smart contract audits?",
    answer: "Yes. Security is our priority. We perform rigorous internal audits and unit testing on all our code. For high-value protocols, we also partner with third-party firms like CertiK or Hacken to facilitate external audits."
  },
  {
    question: "What makes you different from other dev shops?",
    answer: "We are not just 'coders'; we are Web3 architects. We understand tokenomics, game theory, and the specific security nuances of EVM and non-EVM chains. We don't just build what you ask for; we advise on what will actually work in the market."
  },
  {
    question: "Do you handle UI/UX and frontend integration?",
    answer: "Absolutely. We are a full-stack agency. We build intuitive, high-converting interfaces using React/Next.js and integrate them seamlessly with smart contracts using Wagmi, Viem, and Ethers.js."
  },
  {
    question: "What is your pricing model?",
    answer: "We typically work on a fixed-cost project basis for well-defined scopes. For ongoing development or evolving projects, we offer a dedicated team model with monthly retainers. We accept payment in Fiat (USD) and Crypto (USDC/USDT)."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes. We offer various maintenance packages that include monitoring, minor updates, and infrastructure management to ensure your DApp runs smoothly after deployment."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-white group-hover:text-brand-primary'}`}>
          {question}
        </span>
        <div className={`ml-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-brand-primary' : 'text-slate-500'}`} />
        </div>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="text-slate-400 leading-relaxed pr-8">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const About: React.FC = () => {
  return (
    <div className="pt-20">
      <SEO 
        title="About Us | Expert Web3 Architects & Blockchain Engineers"
        description="Learn about the senior team behind Blockchain Smiths. We are dedicated to building secure, scalable, and trustless infrastructure for the decentralized future."
        keywords="Blockchain Engineers, Web3 Architects, Smart Contract Experts, About Blockchain Smiths"
      />
      <Section>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We Speak <span className="text-brand-primary">Code</span> & <span className="text-brand-secondary">Crypto</span>
            </h1>
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Blockchain Smiths was founded with a singular mission: to bridge the gap between complex blockchain technology and real-world business applications.
            </p>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              In an industry plagued by hype and insecurity, we stand for reliability. We are a team of senior engineers who understand that "Move Fast and Break Things" doesn't apply when managing millions of dollars in user assets.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "100% Transparent Development",
                "Security-First Approach",
                "Senior-Level Engineers Only",
                "Ethical Coding Standards"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-secondary" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-darker to-brand-surface border border-white/10 p-8 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-white mb-2">The Founder</h3>
                 <p className="text-brand-primary font-mono mb-6">Full-Stack Web3 Architect</p>
                 <p className="text-slate-400 italic mb-6">
                   "We don't just build DApps; we build infrastructure that can survive the dark forest of the blockchain. Every line of code is a commitment to security."
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {['Solidity', 'Rust', 'React', 'Node.js', 'Wagmi', 'Hardhat'].map(tech => (
                     <span key={tech} className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-slate-300 border border-white/5">
                       {tech}
                     </span>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
      
      <Section darker>
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div>
            <Server className="w-10 h-10 text-brand-primary mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-sm text-slate-400">Projects Delivered</div>
          </div>
          <div>
            <Users className="w-10 h-10 text-brand-secondary mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-1">20+</div>
            <div className="text-sm text-slate-400">Happy Clients</div>
          </div>
          <div>
            <Coffee className="w-10 h-10 text-brand-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-sm text-slate-400">Commitment</div>
          </div>
           <div>
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-white mb-1">0</div>
            <div className="text-sm text-slate-400">Critical Exploits</div>
          </div>
        </motion.div>
      </Section>

      <Section>
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-mono mb-6 border border-brand-primary/20">
              <HelpCircle className="w-4 h-4" /> FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400">
              Everything you need to know about working with Blockchain Smiths.
            </p>
          </div>
          
          <div className="bg-brand-darker border border-white/5 rounded-2xl px-6 md:px-8 shadow-xl">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default About;