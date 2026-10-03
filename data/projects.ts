export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  tech: string[];
  client: string;
  timeline: string;
  challenge: string;
  solution: string;
  result: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: 'liquidity-swap-dex',
    title: "LiquiditySwap DEX",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop",
    desc: "A high-performance AMM (Automated Market Maker) fork on Arbitrum with concentrated liquidity features, custom farming pools, and real-time analytics dashboard.",
    tech: ["Solidity", "Uniswap V3 SDK", "The Graph", "React", "Hardhat"],
    client: "DeFi Protocol (Singapore)",
    timeline: "4 Months",
    challenge: "The client needed to address the capital inefficiency and high slippage found in traditional AMM models on Ethereum Layer 1. Additionally, user adoption was stalling due to prohibitive gas costs.",
    solution: "We engineered a concentrated liquidity AMM deployed on the Arbitrum Layer 2 network. We implemented 'Smart Router' logic to split trades across multiple pools for best price execution and developed custom 'Real Yield' farming contracts that distribute protocol revenue to stakers.",
    result: "$50M Total Value Locked (TVL) achieved within 3 months. The platform has processed over $150M in volume with 99.9% uptime and was successfully audited by CertiK with a score of 98/100.",
    features: [
      "Concentrated Liquidity Positions",
      "Real-Yield Staking Mechanisms",
      "Limit Orders Module",
      "Interactive Analytics Dashboard"
    ]
  },
  {
    id: 'cosmic-apes-marketplace',
    title: "Cosmic Apes Marketplace",
    category: "NFT",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2874&auto=format&fit=crop",
    desc: "A zero-fee NFT marketplace on Solana. Features include bulk listing, rarity sniping tools, and royalty enforcement standards.",
    tech: ["Rust", "Metaplex", "Next.js", "Solana Web3.js", "Anchor"],
    client: "GameFi Studio",
    timeline: "3 Months",
    challenge: "The client needed a niche marketplace for a gaming NFT collection that supported specific game metadata traits (e.g., 'Stamina', 'Power') which generic marketplaces like MagicEden ignored or displayed poorly.",
    solution: "We developed a custom marketplace using the Metaplex Auction House protocol. We built a bespoke indexing engine to filter NFTs by in-game attributes and added a 'Sweep the Floor' aggregator feature for power users.",
    result: "Reduced trading friction for gamers by 40%. The marketplace generated 200k SOL in trading volume in its first month and significantly improved community engagement.",
    features: [
      "Attribute-based Filtering",
      "Bulk Listing & Sweeping",
      "Escrow-less Trading (Auction House)",
      "Instant Royalty Distribution"
    ]
  },
  {
    id: 'governance-hub-dao',
    title: "GovernanceHub DAO",
    category: "DAO",
    image: "https://images.unsplash.com/photo-1639322537228-ad7117a3a63c?q=80&w=2940&auto=format&fit=crop",
    desc: "A comprehensive on-chain voting portal for a major DeFi protocol. Integrates quadratic voting and delegation mechanisms.",
    tech: ["OpenZeppelin Governor", "Tally API", "Typescript", "Ethers.js", "IPFS"],
    client: "Top 50 DeFi Protocol",
    timeline: "2.5 Months",
    challenge: "Voter participation for the protocol had dropped below 2% due to the high gas costs associated with on-chain voting on Ethereum Mainnet.",
    solution: "We implemented a hybrid voting architecture. We utilized 'Snapshot' for gasless off-chain signaling and connected it to a 'SafeSnap' module (Gnosis Safe + Reality.eth). This allows off-chain votes to trigger on-chain execution of transactions without manual multi-sig intervention.",
    result: "Voter participation increased by 400% in the first governance cycle. The system successfully executed 5 critical protocol upgrades autonomously.",
    features: [
      "Gasless Voting (Off-chain)",
      "On-chain Execution Bridge",
      "Quadratic Voting Logic",
      "Vote Delegation UI"
    ]
  },
  {
    id: 'ignite-pad-launchpad',
    title: "IgnitePad Launchpad",
    category: "DeFi",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2832&auto=format&fit=crop",
    desc: "Multi-chain IDO launchpad with tiered staking systems, KYC integration, and automatic liquidity locking contracts.",
    tech: ["Solidity", "Chainlink VRF", "Node.js", "MongoDB", "Wagmi"],
    client: "Venture Capital Firm",
    timeline: "5 Months",
    challenge: "Existing launchpads were plagued by bots sniping allocations, leaving real community members empty-handed. The client needed a provably fair distribution system.",
    solution: "We developed a 'Proof-of-Participation' tier system. We integrated Chainlink VRF (Verifiable Random Function) to randomize allocation winners provably on-chain. We also implemented anti-bot tax mechanisms and cooldown blocks.",
    result: "Successfully hosted 15 IDOs raising over $12M total. Zero bot incidents reported during launches. The tiered staking system locked up 40% of the platform's native token supply.",
    features: [
      "Chainlink VRF Randomization",
      "Tiered Staking System",
      "Automatic Liquidity Locking",
      "Multi-chain Support (BSC, ETH, Polygon)"
    ]
  },
  {
    id: 'cross-chain-bridge',
    title: "CrossChain Bridge",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2864&auto=format&fit=crop",
    desc: "Secure asset bridge allowing users to transfer ERC20 tokens between Ethereum and Polygon POS chain with proof-of-authority validators.",
    tech: ["Solidity", "Go", "Docker", "AWS", "Redis"],
    client: "Enterprise Blockchain Consortium",
    timeline: "6 Months",
    challenge: "The client launched a custom Polygon Supernet but users struggled to bridge assets from Ethereum due to a lack of infrastructure support.",
    solution: "We built a secure Lock-and-Mint bridge. We developed a network of Relayers (written in Go) that listen to 'Lock' events on Ethereum and trigger 'Mint' functions on the Supernet. We implemented strict daily withdrawal limits and an emergency pause button for security.",
    result: "Enabled seamless asset migration for the ecosystem. $25M worth of assets were bridged securely in the first month with zero downtime.",
    features: [
      "Proof-of-Authority Validator Set",
      "Emergency Pause Functionality",
      "Daily Volume Limits",
      "Real-time Transaction Tracking"
    ]
  },
  {
    id: 'secure-vault-wallet',
    title: "SecureVault Wallet",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?q=80&w=2942&auto=format&fit=crop",
    desc: "A non-custodial web wallet interface supporting Account Abstraction (ERC-4337) for gasless transactions and social recovery.",
    tech: ["React Native", "Ethers.js", "Alchemy SDK", "ERC-4337", "Firebase"],
    client: "Fintech Startup",
    timeline: "4 Months",
    challenge: "The client wanted to target non-crypto native users, for whom managing seed phrases and paying for gas were significant barriers to entry.",
    solution: "We built a smart contract wallet leveraging ERC-4337 (Account Abstraction). We implemented Social Login (Google/Apple), a Paymaster service to sponsor gas fees for users, and Social Recovery to allow trusted guardians to restore access.",
    result: "Onboarded 50,000 users in 6 months. The app maintains a 4.8/5 rating on the App Store due to its Web2-like user experience.",
    features: [
      "Social Login (No Seed Phrase)",
      "Gasless Transactions (Paymaster)",
      "Social Recovery",
      "Biometric Authentication"
    ]
  }
];