import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Phone } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-20">
      <SEO 
        title="Hire Blockchain Developers | Get a Free Web3 Project Quote"
        description="Looking to hire blockchain developers? Get a free quote for your Web3 project. We specialize in Smart Contracts, DApps, DeFi, and Audits. Book a consultation now."
      />
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Start Your Project</h1>
            <p className="text-xl text-slate-400">
              Ready to launch? Fill out the form below or reach us directly via WhatsApp, Telegram, or Email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-6 bg-brand-darker rounded-xl border border-white/5">
                <Mail className="w-8 h-8 text-brand-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-slate-400 text-sm mb-4">For detailed inquiries and RFPs.</p>
                <a href="mailto:enquiry@blockchainsmiths.com" className="text-brand-primary hover:text-white transition-colors font-mono break-all">
                  enquiry@blockchainsmiths.com
                </a>
              </div>

              <div className="p-6 bg-brand-darker rounded-xl border border-white/5">
                <MessageCircle className="w-8 h-8 text-brand-secondary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Telegram</h3>
                <p className="text-slate-400 text-sm mb-4">For quick chats and questions.</p>
                <a href="https://t.me/blockchainsmiths" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:text-white transition-colors font-mono">
                  @blockchainsmiths
                </a>
              </div>

              <div className="p-6 bg-brand-darker rounded-xl border border-white/5">
                <Phone className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-slate-400 text-sm mb-4">Direct line to our devs.</p>
                <a href="https://wa.me/919599163343" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white transition-colors font-mono">
                  +91 9599163343
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <div className="p-8 bg-brand-darker rounded-xl border border-white/5">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-brand-primary hover:text-white underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={e => setFormState({...formState, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <input 
                          required
                          type="email" 
                          className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={e => setFormState({...formState, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Project Type</label>
                      <select className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all">
                        <option>Smart Contract Development</option>
                        <option>DApp Development</option>
                        <option>Token Launch</option>
                        <option>Audit Request</option>
                        <option>Consultation</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Message</label>
                      <textarea 
                        required
                        rows={5}
                        className="w-full bg-brand-dark border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        placeholder="Tell us about your project requirements..."
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-primary text-brand-darker font-bold rounded-lg hover:bg-brand-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;