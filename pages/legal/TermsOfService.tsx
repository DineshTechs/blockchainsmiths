import React from 'react';
import Section from '../../components/Section';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-20">
      <Section>
        <div className="max-w-4xl mx-auto">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
           <p className="text-slate-400 mb-12">Last Updated: October 24, 2023</p>

           <div className="prose prose-invert prose-lg max-w-none text-slate-300">
             <p className="lead">
               These Terms of Service ("Terms") govern your access to and use of the services provided by Blockchain Smiths ("Company", "we", "us", or "our"), a blockchain development agency. By engaging our services, you agree to these Terms.
             </p>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Services</h2>
             <p>
               Blockchain Smiths provides custom software development services, including but not limited to:
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-6">
               <li>Smart Contract development (Solidity, Rust, Move)</li>
               <li>Decentralized Application (DApp) frontend and backend development</li>
               <li>Blockchain architecture consulting</li>
               <li>Smart Contract security reviews and audits</li>
             </ul>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Blockchain & Crypto Risks</h2>
             <p>
               You acknowledge and agree that blockchain technology involves significant risks. By using our services, you accept full responsibility for these risks, including:
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-6">
               <li>
                 <strong>Immutability:</strong> Once deployed to a mainnet, smart contracts are often immutable. We are not responsible for errors in code that has been approved and deployed by the client.
               </li>
               <li>
                 <strong>Gas Fees:</strong> Transaction fees ("Gas") on blockchain networks are variable. We are not responsible for high gas costs or failed transactions due to network congestion.
               </li>
               <li>
                 <strong>Private Keys:</strong> You are solely responsible for the security of your private keys and wallet seed phrases. We will <strong>NEVER</strong> ask for your private keys.
               </li>
               <li>
                 <strong>Regulatory Uncertainty:</strong> The regulatory landscape for cryptocurrencies is evolving. You are responsible for ensuring your project complies with local laws in your jurisdiction.
               </li>
             </ul>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Intellectual Property</h2>
             <p>
               Upon full payment of all agreed-upon fees:
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-6">
               <li>
                 <strong>Custom Code:</strong> All economic rights to custom source code written specifically for your project are transferred to you.
               </li>
               <li>
                 <strong>Open Source Libraries:</strong> Our deliverables may include open-source software (e.g., OpenZeppelin contracts). These remain subject to their original licenses (MIT, Apache 2.0, etc.).
               </li>
               <li>
                 <strong>Company Tools:</strong> Pre-existing internal tools or frameworks used to facilitate development remain the property of Blockchain Smiths.
               </li>
             </ul>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Payment Terms</h2>
             <p>
               We accept payments in Fiat (USD) via Bank Transfer and Cryptocurrency (USDC, USDT, ETH, BTC).
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-6">
               <li>For crypto payments, the exchange rate is determined at the time of the transaction.</li>
               <li>A deposit is generally required to commence work.</li>
               <li>Final code delivery occurs only after the final balance is settled.</li>
             </ul>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Limitation of Liability</h2>
             <p>
               TO THE MAXIMUM EXTENT PERMITTED BY LAW, GEEKY CRYPTO DEVS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-6">
               <li>Vulnerabilities discovered in smart contracts after they have been audited and accepted by the client.</li>
               <li>Hacks, exploits, or theft of funds from your deployed applications.</li>
               <li>Third-party service failures (e.g., RPC nodes, Oracle failures, Bridge hacks).</li>
             </ul>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. No Financial Advice</h2>
             <p>
               Our services are strictly technical. We do not provide financial, investment, or legal advice. Code delivery does not constitute an endorsement of your project's economic viability.
             </p>

             <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact Us</h2>
             <p>
               If you have any questions about these Terms, please contact us at <a href="mailto:enquiry@blockchainsmiths.com" className="text-brand-primary">enquiry@blockchainsmiths.com</a>.
             </p>
           </div>
        </div>
      </Section>
    </div>
  );
};

export default TermsOfService;