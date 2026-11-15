import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X, Moon, Sun, PhoneCall } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ currentPath, navigateTo, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 12);
    check(); window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  useEffect(() => setMenuOpen(false), [currentPath]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const esc = e => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [menuOpen]);
  const nav = (e, href) => { e.preventDefault(); setMenuOpen(false); navigateTo(href); };
  return (
    <header className={`studio-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="studio-nav-shell">
        <a href="/" className="studio-brand" onClick={e => nav(e, '/')} aria-label="Avyukta IntelliCall – Home">
          <img src={getAssetUrl(theme === 'dark' ? '/avyukta-premium-dark.png' : '/avyukta-premium-light.png')} alt="Avyukta IntelliCall" />
        </a>
        <nav className="studio-desktop-nav" aria-label="Primary navigation">
          {LINKS.map(item => <a key={item.href} href={item.href} onClick={e => nav(e, item.href)} className={currentPath === item.href ? 'active' : ''} aria-current={currentPath === item.href ? 'page' : undefined}>{item.label}</a>)}
        </nav>
        <div className="studio-nav-actions">
          <button type="button" className="studio-theme-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title="Change color theme">{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
          <a className="studio-nav-contact" href="tel:+917240001056"><PhoneCall size={16} /><span>Talk to an expert</span><ArrowUpRight size={17} /></a>
          <button type="button" className="studio-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="studio-mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
      <div className={`studio-mobile-menu ${menuOpen ? 'open' : ''}`} id="studio-mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">{LINKS.map(item => <a key={item.href} href={item.href} className={currentPath === item.href ? 'active' : ''} onClick={e => nav(e, item.href)}>{item.label}<ArrowUpRight size={17}/></a>)}</nav>
        <a className="studio-btn studio-btn-primary" href="https://ai.avyukta.in/" target="_blank" rel="noopener noreferrer">Start free trial <ArrowUpRight size={17} /></a>
      </div>
    </header>
  );
}
