import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Blockchains from './pages/Blockchains';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

// Extend window interface for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component to track page views on route change
const GoogleAnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-REZF9XX21G', {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <GoogleAnalyticsTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blockchains" element={<Blockchains />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;