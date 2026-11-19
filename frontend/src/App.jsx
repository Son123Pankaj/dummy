import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageLightbox from './components/ImageLightbox';
import KommunicateWidget from './components/KommunicateWidget';
import FloatingActions from './components/FloatingActions';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';
import { useScrollReveal } from './utils/useScrollReveal';

const ROUTES = {
  '/': ['home', 'AI Calling Assistants for Your Business'],
  '/services': ['services', 'Calling and Telecom Services'],
  '/cloud-dialer': ['services', 'Cloud Calling for Your Team', 'cloud-dialer'],
  '/voip-minutes': ['services', 'Phone Connectivity', 'voip-minutes'],
  '/std-did': ['services', 'Business Phone Numbers', 'std-did'],
  '/ippbx': ['services', 'Business Phone Systems', 'ippbx'],
  '/features': ['features', 'How AI Calling Can Help'],
  '/ai-caller': ['features', 'AI Calling Assistants', 'ai-caller'],
  '/whatsapp-crm': ['features', 'Customer Tools and WhatsApp', 'meta-crm'],
  '/business-automation': ['home', 'Customer Follow-up Workflows', 'business-ecosystem'],
  '/pricing': ['pricing', 'Silver, Gold and Platinum Voice Plans'],
  '/rate-calculator': ['pricing', 'Illustrative Volume Estimate', 'volume'],
  '/about': ['about', 'About Our Team'],
  '/faq': ['pricing', 'Questions About AI Calling', 'faq'],
  '/contact': ['contact', 'Request an AI Calling Demo'],
  '/privacy': ['privacy', 'Privacy Policy'], '/terms': ['terms', 'Terms of Service'], '/refund': ['refund', 'Refund and Cancellation'],
};
const descriptions = {
  home: 'Hear prerecorded AI voice samples, compare Silver, Gold and Platinum plans, and request a demo for your business enquiries and follow-ups.',
  pricing: 'Compare indicative AI voice rates, hear matching samples and understand calling charges, volume conditions and next steps.',
  contact: 'Request a tailored AI calling demo. Choose a voice and share your business use case and preferred language.',
  features: 'Explore AI calling for enquiries, follow-ups and appointments, with supported customer-tool integrations.',
  services: 'Explore business calling, phone connectivity and supported customer communication tools with Avyukta IntelliCall.',
  about: 'Meet Avyukta IntelliCall and learn about its approach to customer conversations and communications.',
};
const readLocation = () => window.location.pathname + window.location.search + window.location.hash;
export default function App() {
  const [location, setLocation] = useState(readLocation);
  const [theme, setTheme] = useState(() => {try {return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';} catch {return 'light';}});
  const [image, setImage] = useState(null);
  const url = new URL(location, window.location.origin);
  const path = url.pathname.replace(/\/$/, '') || '/';
  const hash = url.hash;
  const [page, title, aliasHash] = ROUTES[path] || ['404', 'Page Not Found'];
  useScrollReveal(location);
  const navigateTo = useCallback(destination => {
    window.history.pushState({}, '', destination); setLocation(readLocation());
  }, []);
  const closeImage = useCallback(() => setImage(null), []);
  useEffect(() => {const update = () => setLocation(readLocation()); window.addEventListener('popstate', update); window.addEventListener('hashchange', update); return () => {window.removeEventListener('popstate', update); window.removeEventListener('hashchange', update);};}, []);
  useEffect(() => {document.documentElement.dataset.theme = theme; document.documentElement.classList.toggle('dark', theme === 'dark'); try {localStorage.setItem('theme', theme);} catch { /* theme remains usable without storage */ }}, [theme]);
  useEffect(() => {
    document.title = `${title} | Avyukta IntelliCall`;
    const description = descriptions[page] || `${title} for Avyukta IntelliCall customers.`;
    for (const [attribute, name, content] of [['name','description',description],['property','og:title',document.title],['property','og:description',description],['property','og:url',window.location.origin + path]]) {
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`); if (!meta) {meta = document.createElement('meta'); meta.setAttribute(attribute,name); document.head.appendChild(meta);} meta.content = content;
    }
    let canonical = document.head.querySelector('link[rel="canonical"]'); if (!canonical) {canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical);} canonical.href = window.location.origin + path;
    const timer = window.setTimeout(() => {
      const targetId = hash.slice(1) || aliasHash;
      const target = targetId ? document.getElementById(targetId === 'plan-diamond' ? 'plan-platinum' : targetId) : document.getElementById('main-content');
      if (target) {let ancestor = target.parentElement; while (ancestor) {if (ancestor.tagName === 'DETAILS') ancestor.open = true; ancestor = ancestor.parentElement;} if (targetId) target.scrollIntoView({block:'start'}); else window.scrollTo({top:0}); target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});}
    }, 30);
    return () => window.clearTimeout(timer);
  }, [location, page, title, path, aliasHash, hash]);
  const props = {navigateTo, locationKey: location};
  const content = page === 'home' ? <HomePage {...props}/> : page === 'pricing' ? <PricingPage {...props}/> : page === 'contact' ? <ContactPage {...props}/> : page === 'features' ? <FeaturesPage {...props}/> : page === 'services' ? <ServicesPage {...props}/> : page === 'about' ? <AboutPage {...props}/> : ['privacy','terms','refund'].includes(page) ? <PolicyPage type={page} {...props}/> : <section className="pricing-intro studio-container"><h1>We couldn't find that page.</h1><p>Explore our voice samples or request help from our team.</p><a className="studio-btn studio-btn-primary" href="/" onClick={event => {event.preventDefault(); navigateTo('/');}}>Return home</a></section>;
  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><Navbar currentPath={path} navigateTo={navigateTo} theme={theme} toggleTheme={() => setTheme(value => value === 'light' ? 'dark' : 'light')}/><main id="main-content" tabIndex={-1} key={path + url.search} onClickCapture={event => {const target = event.target.closest('img[data-zoom="true"]'); if (target) {event.preventDefault(); setImage({src:target.currentSrc || target.src, alt:target.alt});}}}>{content}</main><Footer navigateTo={navigateTo}/><FloatingActions /><KommunicateWidget/>{image && <ImageLightbox image={image} onClose={closeImage}/>}</div>;
}
