import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Terminal, Play, Box, Wifi, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import Card from '../components/Card';
import { Service } from '../types';
import SEO from '../components/SEO';

// Custom Brand Icons (Fallbacks)
const Icons = {
  CustomChain: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V12" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 14.5L12 17" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14.5L12 17" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  SmartContract: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 18V12" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 15H15" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="15" r="3" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Token: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="#00f0ff" strokeWidth="1.5"/>
      <path d="M12 7V17" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9.5 10H13.5C14.3284 10 15 10.6716 15 11.5V11.5C15 12.3284 14.3284 13 13.5 13H10.5C9.67157 13 9 13.6716 9 14.5V14.5C9 15.3284 9.67157 16 10.5 16H14.5" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="3" r="1" fill="#7000ff"/>
      <circle cx="21" cy="12" r="1" fill="#7000ff"/>
      <circle cx="12" cy="21" r="1" fill="#7000ff"/>
      <circle cx="3" cy="12" r="1" fill="#7000ff"/>
    </svg>
  ),
  DApp: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="#00f0ff" strokeWidth="1.5"/>
      <path d="M2 9H22" stroke="#00f0ff" strokeWidth="1.5"/>
      <path d="M12 13L14.5 14.5L12 16L9.5 14.5L12 13Z" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 13V16" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="6" r="1" fill="#7000ff"/>
      <circle cx="9" cy="6" r="1" fill="#7000ff"/>
    </svg>
  ),
  Audit: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="#00ff9d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6V8" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  DeFi: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 21H21" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 14L9 14L13 8L21 8" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="6" y="16" width="4" height="5" fill="#7000ff" fillOpacity="0.5"/>
      <rect x="14" y="12" width="4" height="9" fill="#7000ff" fillOpacity="0.5"/>
      <circle cx="20" cy="8" r="2" stroke="#00ff9d" strokeWidth="1.5"/>
    </svg>
  ),
  NFT: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00f0ff" strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill="#00ff9d"/>
      <path d="M21 15L16 10L5 21" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 10L21 15" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Launchpad: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C12 2 17 7 17 12C17 17 15 22 15 22L12 19L9 22C9 22 7 17 7 12C7 7 12 2 12 2Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 11V15" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 13H15" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="7" r="1" fill="#7000ff"/>
    </svg>
  ),
  Wallet: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M19 8H5C3.89543 8 3 8.89543 3 10V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V10C21 8.89543 20.1046 8 19 8Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 12H21" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 16H21" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 8V6C5 4.89543 5.89543 4 7 4H19" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Consulting: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.6698 20 9.4087 19.728 8.27273 19.2393L3 21L4.54545 16.9209C3.58288 15.3906 3 13.5113 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12V8" stroke="#00ff9d" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="1" fill="#7000ff"/>
    </svg>
  ),
  CrossChain: ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="7" cy="12" r="4" stroke="#00f0ff" strokeWidth="1.5"/>
      <circle cx="17" cy="12" r="4" stroke="#00ff9d" strokeWidth="1.5"/>
      <path d="M11 12H13" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9L14 9" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 15L14 15" stroke="#7000ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const services: Service[] = [
  {
    id: 'smart-contracts',
    title: 'Smart Contract Development',
    description: 'Secure, gas-optimized smart contracts for DeFi, NFTs, and DAOs. We write production-grade Solidity and Rust code.',
    icon: Icons.SmartContract,
    lottieUrl: 'https://lottie.host/88607142-3269-450a-9d90-038706346761/K17vLqYyQy.json', // Code Document
    details: ['ERC20, ERC721, ERC1155 Standards', 'Staking & Farming Logic', 'Governance Mechanisms', 'Upgradable Proxies']
  },
  {
    id: 'dapp-development',
    title: 'Full-Stack DApp Development',
    description: 'End-to-end decentralized application development. We build intuitive frontends that interact seamlessly with the blockchain.',
    icon: Icons.DApp,
    lottieUrl: 'https://lottie.host/c8874836-9d3f-42e7-915c-023023067168/2Y3t01k3l1.json', // Web Tech
    details: ['React / Next.js Frontends', 'WalletConnect & RainbowKit', 'The Graph Subgraph Indexing', 'IPFS Integration']
  },
  {
    id: 'security-audits',
    title: 'Smart Contract Audits',
    description: 'Comprehensive security reviews to identify vulnerabilities before deployment. We protect your protocol from exploits.',
    icon: Icons.Audit,
    lottieUrl: 'https://lottie.host/6197368d-5645-4299-905c-e58836592231/9W1j2l03k2.json', // Security Shield
    details: ['Static Analysis', 'Manual Code Review', 'Unit & Integration Testing', 'Gas Optimization Reports']
  },
  {
    id: 'defi-protocols',
    title: 'DeFi Protocol Engineering',
    description: 'Building complex financial primitives including AMMs, Lending/Borrowing platforms, and Yield Aggregators.',
    icon: Icons.DeFi,
    lottieUrl: 'https://lottie.host/24021200-8451-40c2-9596-613670977264/3Z4t12k3l1.json', // Financial Chart
    details: ['Automated Market Makers (AMM)', 'Liquidity Pools', 'Yield Farming Strategies', 'Flash Loan Integration']
  },
  {
    id: 'nft-marketplaces',
    title: 'NFT Platforms & Marketplaces',
    description: 'Custom marketplaces for digital art, gaming assets, and real-world assets (RWA).',
    icon: Icons.NFT,
    lottieUrl: 'https://lottie.host/433f5454-944a-4467-b50a-867c26569654/D4X1b2j2j5.json', // Tech Cube/Art
    details: ['Fixed Price & Auction Mechanics', 'Royalty Standards (EIP-2981)', 'Fractionalized NFTs', 'Lazy Minting']
  },
  {
    id: 'token-launch',
    title: 'Token Launch & ICOs',
    description: 'Complete technical support for token generation events (TGE), IDOs, and presales.',
    icon: Icons.Launchpad,
    lottieUrl: 'https://lottie.host/c5217482-1c6d-4700-b384-5f532f13735e/2j5A1z5C1d.json', // Rocket/Launch
    details: ['Vesting & Locking Contracts', 'Presale Dashboards', 'Airdrop Scripts', 'Anti-Bot Protection']
  },
  {
    id: 'custom-blockchains',
    title: 'Custom L1 & L2 Chains',
    description: 'Launch your own blockchain using Cosmos SDK, Polkadot Substrate, or OP Stack for maximum scalability.',
    icon: Icons.CustomChain,
    lottieUrl: 'https://lottie.host/c8874836-9d3f-42e7-915c-023023067168/2Y3t01k3l1.json', // Nodes/Network
    details: ['AppChains & Parachains', 'Forking EVM Chains', 'Consensus Customization', 'Bridge Implementation']
  },
  {
    id: 'cross-chain-solutions',
    title: 'Cross-Chain Solutions',
    description: 'Bridge assets and data across disparate blockchains. We build secure interoperability layers using LayerZero, Axelar, and custom bridge architectures.',
    icon: Icons.CrossChain,
    lottieUrl: 'https://lottie.host/57ac8021-9844-4168-9a99-4c666506509f/2j5A1z5C1d.json', // Connection
    details: ['LayerZero Integration', 'Custom Bridge Development', 'Cross-Chain Messaging', 'Wrapped Asset Standards']
  },
  {
    id: 'wallet-integration',
    title: 'Wallet & Infrastructure',
    description: 'Building non-custodial wallets, block explorers, and custom indexers for your ecosystem.',
    icon: Icons.Wallet,
    lottieUrl: 'https://lottie.host/8c10928b-6251-4048-b427-44a6f238258e/M7X1b2j2j5.json', // Wallet/Card
    details: ['Account Abstraction (ERC-4337)', 'Multi-Sig Wallets', 'Custom RPC Nodes', 'Transaction Indexers']
  }
];

// Helper Component for Fetching and Rendering Lottie
const LottieIcon = ({ service }: { service: Service }) => {
  const [animationData, setAnimationData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!service.lottieUrl) {
      setError(true);
      return;
    }

    fetch(service.lottieUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Lottie');
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch(() => setError(true));
  }, [service.lottieUrl]);

  if (error || !animationData) {
    return <service.icon className="w-10 h-10" />;
  }

  return (
    <div className="w-16 h-16 -ml-3 -mt-3 filter drop-shadow-[0_0_5px_rgba(0,240,255,0.4)] opacity-90 mix-blend-screen">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

// Interactive Code Playground Component
const CodeDemoSection = () => {
  const [activeTab, setActiveTab] = useState<'contract' | 'dapp'>('contract');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([
    '> Ready to compile...',
    '> Waiting for input...'
  ]);
  const [code, setCode] = useState('');

  // Default Code Snippets
  const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SmithToken is ERC20 {
    constructor() ERC20("SmithToken", "SMIT") {
        // Mint 1,000,000 tokens to the deployer
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Custom function to mint new tokens
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}`;

  const dappCode = `import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  if (isConnected) {
    return (
       <div className="bg-green-500/10 p-2 rounded">
          Connected: {address}
       </div>
    );
  }

  return (
    <button onClick={() => connect()}>
      Connect Wallet
    </button>
  );
}`;

  useEffect(() => {
    setCode(activeTab === 'contract' ? solidityCode : dappCode);
    setOutput(['> Ready...']);
  }, [activeTab]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(prev => [...prev, '> Processing...']);
    
    setTimeout(() => {
      if (activeTab === 'contract') {
        setOutput(prev => [
          ...prev, 
          '> Compiling SmithToken.sol...',
          '> Optimizing bytecode (200 runs)...',
          '> Deployed successfully to 0x71C...3A9',
          '> Gas used: 1,245,032'
        ]);
      } else {
        setOutput(prev => [
          ...prev, 
          '> Initializing wagmi client...',
          '> Connector: Injected (MetaMask)',
          '> Connection Established',
          '> Wallet: 0x5Fb...92d connected'
        ]);
      }
      setIsRunning(false);
    }, 1200);
  };

  return (
    <Section darker className="border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-mono mb-6 border border-brand-primary/20">
             <Terminal className="w-4 h-4" /> Developer Experience
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
             Code That <span className="text-brand-secondary">Works</span>
           </h2>
           <p className="text-slate-400 mb-8 text-lg leading-relaxed">
             We write clean, documented, and production-ready code. Whether it's complex smart contract logic using the latest Solidity features or seamless frontend integrations with modern React hooks.
           </p>
           
           <div className="flex flex-col gap-4 mb-8">
             <div className="flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-brand-primary mt-1" />
               <div>
                 <h4 className="text-white font-bold">Standard Compliant</h4>
                 <p className="text-sm text-slate-400">We adhere to OpenZeppelin standards and EIPs for maximum compatibility.</p>
               </div>
             </div>
             <div className="flex items-start gap-3">
               <CheckCircle2 className="w-5 h-5 text-brand-primary mt-1" />
               <div>
                 <h4 className="text-white font-bold">Type-Safe Integrations</h4>
                 <p className="text-sm text-slate-400">End-to-end type safety with TypeScript, Wagmi, and Viem.</p>
               </div>
             </div>
           </div>

           {/* Tab Buttons */}
           <div className="flex gap-4">
             <button 
               onClick={() => setActiveTab('contract')}
               className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all font-medium ${
                 activeTab === 'contract' 
                   ? 'bg-brand-primary/10 border-brand-primary text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                   : 'bg-white/5 border-transparent text-slate-500 hover:text-white hover:bg-white/10'
               }`}
             >
               <Box className="w-4 h-4" /> Smart Contract
             </button>
             <button 
               onClick={() => setActiveTab('dapp')}
               className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all font-medium ${
                 activeTab === 'dapp' 
                   ? 'bg-brand-secondary/10 border-brand-secondary text-white shadow-[0_0_15px_rgba(0,255,157,0.2)]' 
                   : 'bg-white/5 border-transparent text-slate-500 hover:text-white hover:bg-white/10'
               }`}
             >
               <Wifi className="w-4 h-4" /> DApp Integration
             </button>
           </div>
        </div>

        {/* Code Window */}
        <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl font-mono text-sm relative group">
           {/* Window Header */}
           <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/80" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
               <div className="w-3 h-3 rounded-full bg-green-500/80" />
             </div>
             <div className="text-slate-500 text-xs font-medium">
               {activeTab === 'contract' ? 'SmithToken.sol' : 'ConnectWallet.tsx'}
             </div>
             <div className="w-10" /> 
           </div>

           {/* Editor Area */}
           <div className="relative">
             <textarea 
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className="w-full h-80 bg-[#0d1117] text-slate-300 p-6 resize-none focus:outline-none leading-relaxed selection:bg-brand-primary/30"
               spellCheck="false"
             />
             
             {/* Run Button */}
             <button 
                onClick={handleRun}
                disabled={isRunning}
                className="absolute bottom-6 right-6 bg-brand-primary text-brand-darker px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
             >
               <Play className="w-3 h-3 fill-current" /> {isRunning ? 'Running...' : 'Run Code'}
             </button>
           </div>

           {/* Terminal Area */}
           <div className="bg-black/50 p-4 border-t border-white/5 h-36 overflow-y-auto font-mono text-xs custom-scrollbar">
             <div className="flex items-center gap-2 text-slate-500 mb-2 uppercase tracking-wider font-bold">
               <Terminal className="w-3 h-3" /> Terminal
             </div>
             <div className="space-y-1">
                {output.map((line, i) => (
                  <div key={i} className="text-brand-secondary/90">
                    {line}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </Section>
  );
}

// Service Detail Modal Component
const ServiceModal = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 w-full max-w-2xl bg-[#050a14] border border-brand-primary/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
        
        <div className="absolute top-0 right-0 p-4 z-20">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-5 mb-8">
            <div className="p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.1)]">
               {service.lottieUrl ? (
                <LottieIcon service={service} />
              ) : (
                <service.icon className="w-12 h-12 text-brand-primary" />
              )}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.title}</h2>
              <span className="inline-flex items-center px-3 py-1 text-xs font-mono font-bold tracking-wider text-brand-secondary bg-brand-secondary/10 rounded border border-brand-secondary/20">
                ENTERPRISE GRADE
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-primary rounded-full"></span>
                Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg border-l border-white/10 pl-4">
                {service.description}
              </p>
            </div>

            <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.details?.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 group-hover:text-white transition-colors">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 bg-brand-darker/50 flex justify-end gap-4">
           <button 
             onClick={onClose}
             className="px-6 py-2.5 text-slate-400 hover:text-white transition-colors font-medium"
           >
             Close
           </button>
           <Link 
             to="/contact"
             className="px-8 py-2.5 bg-brand-primary text-brand-darker font-bold rounded-lg hover:bg-brand-secondary transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] flex items-center gap-2"
           >
             Get Started <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <div className="pt-20">
      <SEO 
        title="Blockchain Development Services | Smart Contract Audits & DeFi Solutions"
        description="Premier Blockchain Development Services. We specialize in secure Smart Contract Audits, scalable DeFi Solutions, DApps, and Token Launchpads for Ethereum, Solana & L2s."
        keywords="Smart Contract Audits, DeFi Development Services, Custom Blockchain Development, NFT Marketplace Development, Token Launch Services, DApp Development Company"
      />
      <Section darker className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Our <span className="text-brand-primary">Services</span>
        </motion.h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Comprehensive blockchain engineering solutions. We handle the tech so you can focus on the vision.
        </p>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              delay={index * 0.05} 
              className="h-full flex flex-col hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-brand-primary/10 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.1)] border border-brand-primary/20 overflow-hidden">
                  {service.lottieUrl ? (
                    <LottieIcon service={service} />
                  ) : (
                    <service.icon className="w-10 h-10" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <p className="text-slate-400 mt-2">{service.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-white/5 flex flex-col h-full justify-between">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {service.details?.slice(0, 4).map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full shadow-[0_0_5px_#00ff9d]" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full py-3 mt-auto bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-brand-darker border border-brand-primary/20 hover:border-brand-primary rounded-lg transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2 group shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <CodeDemoSection />

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;