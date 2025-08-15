import { useEffect } from 'react';

const SEO = ({ 
  title = "Michal Bürgermeister - Frontend Developer | React, JavaScript, TypeScript",
  description = "Profesionální frontend developer z Opavy. Specializuji se na React, JavaScript, TypeScript a moderní webové aplikace. Vytvářím luxusní, responzivní a uživatelsky přívětivé websites a aplikace.",
  keywords = "React developer, JavaScript developer, TypeScript developer, frontend developer, webové aplikace, Opava, Česká republika, responsive design, modern web development",
  url = "https://portfolio-web-two-mu.vercel.app",
  image = "/og-image.jpg"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', url);
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', image);
    }
    
    // Update Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', image);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    }
    
    // Add structured data for current page
    const addStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Michal Bürgermeister Portfolio",
          "url": url,
          "description": description,
          "author": {
            "@type": "Person",
            "name": "Michal Bürgermeister",
            "jobTitle": "Frontend Developer",
            "email": "michalbugy12@gmail.com",
            "telephone": "+420605954429",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Opava",
              "addressCountry": "CZ"
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${url}?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        });
        document.head.appendChild(script);
      }
    };
    
    addStructuredData();
  }, [title, description, keywords, url, image]);

  return null;
};

export default SEO;