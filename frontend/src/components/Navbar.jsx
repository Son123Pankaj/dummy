import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Moon, Sun, PhoneCall } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

const LINKS = [
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Voice Pricing', href: '/#pricing' },
  { label: 'Partners', href: '/#partners' },
  { label: 'CRM & Platform', href: '/#crm' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Voice Samples', href: '/#voice-samples' },
  { label: 'FAQs', href: '/#faq' },
];

export default function Navbar({ currentPath, navigateTo, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 12);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const esc = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [menuOpen]);

  const nav = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', href);
        return;
      }
    }
    navigateTo(href);
  };

  return (
    <header className={`studio-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="studio-nav-shell">
        <a 
          href="/" 
          className="studio-brand" 
          onClick={e => nav(e, '/')} 
          aria-label="Avyukta IntelliCall – Home"
        >
          <img 
            src={getAssetUrl(theme === 'dark' ? '/avyukta-intellicall-logo-dark.png' : '/avyukta-intellicall-logo-light.png')} 
            alt="Avyukta IntelliCall" 
            width={215}
            height={44}
          />
        </a>

        <nav className="studio-desktop-nav" aria-label="Primary navigation">
          {LINKS.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              onClick={e => nav(e, item.href)} 
              className={currentPath === item.href ? 'active' : ''} 
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="studio-nav-actions">
          <button 
            type="button" 
            className="studio-theme-btn" 
            onClick={toggleTheme} 
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} 
            title="Change color theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <a 
            className="studio-nav-contact" 
            href="/contact" 
            onClick={e => nav(e, '/contact')}
          >
            <PhoneCall size={16} />
            <span>Request a demo</span>
            <ArrowUpRight size={17} />
          </a>

          <button 
            type="button" 
            className="studio-menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-expanded={menuOpen} 
            aria-controls="studio-mobile-menu" 
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      <div 
        className={`studio-mobile-menu ${menuOpen ? 'open' : ''}`} 
        id="studio-mobile-menu" 
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {LINKS.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              className={currentPath === item.href ? 'active' : ''} 
              onClick={e => nav(e, item.href)}
            >
              {item.label}
              <ArrowUpRight size={17} />
            </a>
          ))}
        </nav>
        <a 
          className="studio-btn studio-btn-primary" 
          href="/contact" 
          onClick={e => nav(e, '/contact')}
        >
          Request a demo <ArrowUpRight size={17} />
        </a>
      </div>
    </header>
  );
}
