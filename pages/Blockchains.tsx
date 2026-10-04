import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, X } from 'lucide-react';

const chains = [
  // Major L1s & L2s (EVM)
  { name: 'Ethereum', type: 'Layer 1', desc: 'The foundation of Web3. Solidity, ERC standards.', color: 'from-blue-600 to-indigo-600' },
  { name: 'BNB Chain', type: 'Layer 1', desc: 'High performance, low fees. Great for DeFi.', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Polygon', type: 'Sidechain / L2', desc: 'Scalable Ethereum infrastructure.', color: 'from-purple-600 to-purple-700' },
  { name: 'Arbitrum', type: 'Layer 2', desc: 'Optimistic rollup scaling for Ethereum.', color: 'from-blue-400 to-cyan-600' },
  { name: 'Optimism', type: 'Layer 2', desc: 'Fast, stable, and scalable L2.', color: 'from-red-500 to-red-600' },
  { name: 'Base', type: 'Layer 2', desc: 'Secure, low-cost L2 incubated by Coinbase.', color: 'from-blue-600 to-blue-800' },
  { name: 'Avalanche', type: 'Layer 1', desc: 'Highly scalable ecosystem with Subnets.', color: 'from-red-600 to-red-700' },
  { name: 'Fantom', type: 'Layer 1', desc: 'High-speed consensus mechanism (Lachesis).', color: 'from-blue-700 to-indigo-800' },
  { name: 'Cronos', type: 'Layer 1', desc: 'EVM chain running in parallel to Crypto.org.', color: 'from-blue-900 to-slate-900' },
  { name: 'Gnosis', type: 'Layer 1', desc: 'Community-run chain optimized for stability.', color: 'from-emerald-600 to-emerald-800' },
  
  // ZK Rollups
  { name: 'zkSync Era', type: 'Layer 2 (ZK)', desc: 'Trustless scaling with Zero-Knowledge proofs.', color: 'from-slate-600 to-slate-800' },
  { name: 'Starknet', type: 'Layer 2 (ZK)', desc: 'Massive scaling using STARK technology.', color: 'from-indigo-800 to-purple-900' },
  { name: 'Linea', type: 'Layer 2 (ZK)', desc: 'ConsenSys-backed zkEVM rollup.', color: 'from-slate-800 to-black' },
  { name: 'Scroll', type: 'Layer 2 (ZK)', desc: 'Native zkEVM scaling for Ethereum.', color: 'from-amber-700/50 to-amber-900/50' },
  { name: 'Polygon zkEVM', type: 'Layer 2 (ZK)', desc: 'EVM equivalent ZK rollup.', color: 'from-purple-800 to-fuchsia-900' },

  // Non-EVM High Performance
  { name: 'Solana', type: 'Layer 1', desc: 'High speed, low latency Rust-based chain.', color: 'from-green-400 to-teal-500' },
  { name: 'Aptos', type: 'Layer 1', desc: 'Move-based blockchain for safety and scalability.', color: 'from-teal-700 to-teal-900' },
  { name: 'Sui', type: 'Layer 1', desc: 'Permissionless L1 with object-centric model.', color: 'from-blue-400 to-cyan-500' },
  { name: 'Near', type: 'Layer 1', desc: 'Simple, scalable, and secure sharded blockchain.', color: 'from-gray-700 to-gray-900' },
  { name: 'Sei', type: 'Layer 1', desc: 'Sector-specific L1 specialized for trading.', color: 'from-red-800 to-orange-900' },
  
  // Interoperability & Others
  { name: 'Cosmos Hub', type: 'Layer 0', desc: 'The internet of blockchains (IBC).', color: 'from-gray-600 to-indigo-900' },
  { name: 'Polkadot', type: 'Layer 0', desc: 'Sharded protocol connecting multiple chains.', color: 'from-pink-600 to-rose-700' },
  { name: 'Tron', type: 'Layer 1', desc: 'High-throughput content distribution.', color: 'from-red-700 to-red-900' },
  { name: 'Hedera', type: 'Layer 1', desc: 'Fast, fair, and secure hashgraph consensus.', color: 'from-slate-700 to-slate-800' },
  { name: 'Tezos', type: 'Layer 1', desc: 'Self-amending blockchain protocol.', color: 'from-blue-500 to-blue-700' },
  { name: 'Cardano', type: 'Layer 1', desc: 'Research-driven proof-of-stake blockchain.', color: 'from-blue-800 to-indigo-900' },
  { name: 'TON', type: 'Layer 1', desc: 'The Open Network, originally by Telegram.', color: 'from-sky-500 to-blue-600' },
  { name: 'Algorand', type: 'Layer 1', desc: 'Pure Proof-of-Stake protocol.', color: 'from-gray-800 to-black' },
  
  // Emerging L2s
  { name: 'Blast', type: 'Layer 2', desc: 'L2 with native yield for ETH and stablecoins.', color: 'from-yellow-600/40 to-yellow-800/40' },
  { name: 'Mantle', type: 'Layer 2', desc: 'Modular Ethereum L2 with high performance.', color: 'from-teal-800 to-teal-950' },
  { name: 'Mode', type: 'Layer 2', desc: 'The Modular DeFi L2.', color: 'from-lime-700/50 to-lime-900/50' },
  { name: 'Manta Pacific', type: 'Layer 2', desc: 'Modular L2 for ZK applications.', color: 'from-blue-500/50 to-cyan-500/50' },
];

const hubs = [
  { name: 'Silicon Valley', coords: [37.7749, -122.4194] as [number, number], chains: ['Ethereum', 'Solana', 'Aptos', 'Sui', 'Near', 'Base', 'Coinbase'], color: '#00f0ff' },
  { name: 'New York', coords: [40.7128, -74.0060] as [number, number], chains: ['Ethereum', 'Avalanche', 'Linea'], color: '#7000ff' },
  { name: 'Zug, Switzerland', coords: [47.1662, 8.5155] as [number, number], chains: ['Ethereum', 'Polkadot', 'Tezos', 'Cardano', 'Gnosis'], color: '#00ff9d' },
  { name: 'Berlin', coords: [52.5200, 13.4050] as [number, number], chains: ['Polkadot', 'Cosmos Hub', 'Gnosis'], color: '#ff00ff' },
  { name: 'Dubai', coords: [25.2048, 55.2708] as [number, number], chains: ['BNB Chain', 'TON', 'Polygon'], color: '#ffd700' },
  { name: 'Bangalore', coords: [12.9716, 77.5946] as [number, number], chains: ['Polygon', 'Mantle'], color: '#7000ff' },
  { name: 'Singapore', coords: [1.3521, 103.8198] as [number, number], chains: ['BNB Chain', 'Zilliqa', 'Tron', 'Cronos'], color: '#00f0ff' },
  { name: 'London', coords: [51.5074, -0.1278] as [number, number], chains: ['Ethereum', 'zkSync Era', 'Aztec'], color: '#00ff9d' },
];

// Helper to fix map rendering issues using ResizeObserver
const MapEffect = () => {
  const map = useMap();
  useEffect(() => {
    // Initial invalidate
    map.invalidateSize();
    
    // Use ResizeObserver for robust responsiveness
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    
    resizeObserver.observe(container);
    
    // Fallback for initial load
    const timeout = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [map]);
  return null;
};

// Generate glowing neon icons
const createNeonIcon = (color: string, isActive: boolean) => {
  const size = isActive ? 24 : 16;
  const pulseClass = isActive ? 'animate-pulse' : '';

  return L.divIcon({
    className: 'custom-neon-marker',
    html: `
      <div class="${pulseClass}" style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
        border: 2px solid white;
        transition: all 0.3s ease;
      "></div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size]
  });
};

const Blockchains: React.FC = () => {
  const [activeHub, setActiveHub] = useState<string | null>(null);

  const filteredChains = activeHub 
    ? chains.filter(c => hubs.find(h => h.name === activeHub)?.chains.includes(c.name))
    : chains;

  return (
    <div className="pt-20">
      <SEO 
        title="Multi-Chain Development | Supporting Ethereum, Solana & L2s"
        description="We build on all major networks including Ethereum, Polygon, Solana, Arbitrum, and zkSync. Our expertise covers both EVM and non-EVM ecosystems."
        keywords="Multi-chain development, Ethereum developers, Solana development, Layer 2 solutions, EVM, Rust blockchain"
      />
      <Section className="text-center !pb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Supported <span className="text-brand-secondary">Blockchains</span></h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
          We are chain-agnostic. Explore our global development reach.
        </p>
        <p className="text-sm text-brand-primary font-mono mb-12">
          Click on a tech hub to see popular chains in that region.
        </p>

        {/* MAP CONTAINER */}
        <div className="w-full h-[400px] md:h-[500px] rounded-xl border border-white/10 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#050a14] mb-16 satellite-mode" style={{ background: '#050a14' }}>
          <MapContainer 
            center={[25, 10]} 
            zoom={2} 
            minZoom={2}
            scrollWheelZoom={false} 
            worldCopyJump={true}
            className="w-full h-full bg-[#050a14] z-0"
            style={{ width: '100%', height: '100%', background: '#050a14' }}
          >
            <MapEffect />
            
            {/* Esri World Imagery (Satellite) - CSS filter in index.html turns this into cyberpunk style */}
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            
            {hubs.map((hub) => (
              <Marker
                key={hub.name}
                position={hub.coords}
                icon={createNeonIcon(hub.color, activeHub === hub.name)}
                eventHandlers={{
                  click: () => setActiveHub(activeHub === hub.name ? null : hub.name),
                  mouseover: (e) => e.target.openPopup(),
                  mouseout: (e) => e.target.closePopup(),
                }}
              >
                <Popup closeButton={false} offset={[0, -10]} className="custom-popup">
                  <div className="text-center">
                    <strong className="text-brand-primary font-mono text-sm block mb-1">{hub.name}</strong>
                    <div className="flex flex-wrap gap-1 justify-center max-w-[150px]">
                      {hub.chains.slice(0, 4).map(c => (
                        <span key={c} className="text-[10px] bg-white/10 px-1 rounded text-white">{c}</span>
                      ))}
                      {hub.chains.length > 4 && <span className="text-[10px] text-slate-400">+{hub.chains.length - 4} more</span>}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Overlay for active filter */}
          {activeHub && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-brand-darker/90 backdrop-blur-md border border-brand-primary/30 px-6 py-3 rounded-full flex items-center gap-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-primary" />
                <span className="text-white font-bold">Filtered by: <span className="text-brand-primary">{activeHub}</span></span>
              </div>
              <button 
                onClick={() => setActiveHub(null)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-2xl font-bold text-white text-left">
            {activeHub ? `Blockchains in ${activeHub}` : 'All Chains'}
            <span className="ml-3 text-sm font-normal text-slate-500 font-mono">
              ({filteredChains.length} networks)
            </span>
          </h2>
          {activeHub && (
             <button 
              onClick={() => setActiveHub(null)}
              className="text-sm text-brand-primary hover:text-white transition-colors"
            >
              Show All
            </button>
          )}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredChains.map((chain, idx) => (
              <motion.div
                layout
                key={chain.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group h-52 rounded-xl bg-brand-darker border border-white/5 overflow-hidden flex flex-col items-center justify-center p-6 text-center hover:border-white/20 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${chain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <h3 className="text-2xl font-bold text-white relative z-10">{chain.name}</h3>
                <span className="text-xs font-mono text-brand-primary mt-2 mb-3 relative z-10 px-2 py-1 bg-white/5 rounded border border-white/5">
                  {chain.type}
                </span>
                <p className="text-sm text-slate-400 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {chain.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section darker>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Custom L1s & Layer 2 Solutions</h2>
          <p className="text-slate-400 mb-8">
            Beyond smart contracts, we engineer entire blockchain ecosystems. Whether you need a high-performance AppChain, a private enterprise ledger, or a scalable Layer 2 rollup.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono text-brand-secondary mb-10">
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Cosmos SDK</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Polkadot Substrate</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">OP Stack</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Arbitrum Orbit</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Polygon CDK</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">ZK Stack</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Avalanche Subnets</div>
            <div className="bg-white/5 p-3 rounded border border-white/10 hover:border-brand-primary/30 transition-colors">Hyperledger Besu</div>
          </div>
          <button className="px-6 py-3 border border-brand-primary text-brand-primary rounded hover:bg-brand-primary hover:text-brand-darker transition-colors font-bold">
            Discuss Your Custom Chain
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Blockchains;