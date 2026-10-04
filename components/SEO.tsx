import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://blockchainsmiths.com/og-image.png', // Fallback to a brand image
  type = 'website',
  keywords,
  schema
}) => {
  const location = useLocation();
  const siteUrl = 'https://blockchainsmiths.com';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const siteName = 'Blockchain Smiths';
  const twitterHandle = '@blockchainsmiths';

  useEffect(() => {
    // 1. Update Document Title
    document.title = title.includes(siteName) ? title : `${title} | ${siteName}`;

    // Helper to update or create meta tags
    const setMetaTag = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('description', description);
    if (keywords) setMetaTag('keywords', keywords);
    setMetaTag('author', siteName);
    setMetaTag('robots', 'index, follow');

    // 3. Open Graph (Facebook, LinkedIn, Discord)
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:image', image, 'property');
    setMetaTag('og:url', currentUrl, 'property');
    setMetaTag('og:type', type, 'property');
    setMetaTag('og:site_name', siteName, 'property');
    setMetaTag('og:locale', 'en_US', 'property');

    // 4. Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
    setMetaTag('twitter:site', twitterHandle);
    setMetaTag('twitter:creator', twitterHandle);

    // 5. Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 6. JSON-LD Structured Data
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": "Leading full-stack blockchain development agency specializing in Smart Contracts, DApps, DeFi, and NFT solutions.",
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/favicon.svg`
        }
      }
    };

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema || defaultSchema);
    document.head.appendChild(script);

  }, [title, description, image, type, keywords, currentUrl, schema]);

  return null;
};

export default SEO;
