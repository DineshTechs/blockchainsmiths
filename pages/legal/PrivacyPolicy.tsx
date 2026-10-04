import React from 'react';
import Section from '../../components/Section';
import SEO from '../../components/SEO';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-20">
      <SEO 
        title="Privacy Policy"
        description="Our privacy policy details how we handle and protect your data at Blockchain Smiths."
        type="article"
      />
      <Section>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 mb-12">Last Updated: October 24, 2023</p>

          <div className="prose prose-invert prose-lg max-w-none text-slate-300">
            <p className="lead">
              At Blockchain Smiths, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage our blockchain development services.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
            <p>We collect information to provide better services to our clients. This includes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Personal Identification Information:</strong> Name, email address, phone number, and Telegram handle when you fill out our contact forms.
              </li>
              <li>
                <strong>Project Details:</strong> Technical requirements, whitepapers, repository links, and business logic descriptions provided for quoting purposes.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you interact with our website, such as pages visited and time spent (via standard analytics).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Blockchain Data & Wallets</h2>
            <p>
              As a Web3 agency, we may interact with blockchain networks. Please be aware of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                <strong>Public Nature of Blockchain:</strong> Transactions made on public blockchains (Ethereum, Solana, etc.) are public and immutable. If you transact with our smart contracts or wallet addresses, that data is publicly visible and outside our control.
              </li>
              <li>
                <strong>Wallet Addresses:</strong> We may collect your public wallet address to facilitate testing, whitelisting, or payment processing. We do not link this to your personal identity unless necessary for the contract (e.g., KYC compliance for a specific project).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. How We Use Your Information</h2>
            <p>We use your data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>To provide, operate, and maintain our development services.</li>
              <li>To communicate with you regarding your project inquiries and updates.</li>
              <li>To improve our website structure and SEO performance.</li>
              <li>To process payments for services rendered.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>NDA Compliance:</strong> All client project details are treated as confidential. We are happy to sign a Non-Disclosure Agreement (NDA) before discussing sensitive IP.</li>
              <li><strong>Secure Communication:</strong> We recommend using encrypted channels (e.g., Signal, Telegram Secret Chats, PGP) for sharing sensitive credentials.</li>
              <li><strong>Access Control:</strong> Only authorized senior developers have access to production environments and client repositories.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Third-Party Services</h2>
            <p>
              Our website and services may integrate with third-party Web3 providers, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>RPC Node Providers:</strong> (e.g., Infura, Alchemy) which may collect IP addresses when you interact with DApps.</li>
              <li><strong>Wallet Providers:</strong> (e.g., MetaMask, WalletConnect) which are governed by their own privacy policies.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Your Data Rights</h2>
            <p>
              Depending on your location, you may have rights under GDPR, CCPA, or other data protection laws, including the right to access, correct, or delete your personal data held by us.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:enquiry@blockchainsmiths.com" className="text-brand-primary">enquiry@blockchainsmiths.com</a>.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PrivacyPolicy;