import React from 'react';
import { 
  ArrowUpRight, 
  Phone, 
  Bot, 
  Zap, 
  Database, 
  MessageSquare, 
  Headphones, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
import heroCallerImg from '../assets/avyukta-ai-caller-hero.png';

const FEATURE_CHIPS = [
  { id: 'ai-voice', label: 'AI Voice Calling', icon: Bot },
  { id: 'cloud-dialer', label: 'Smart Cloud Dialer', icon: Zap },
  { id: 'crm-sync', label: 'CRM Integration', icon: Database },
  { id: 'whatsapp-comm', label: 'WhatsApp Communication', icon: MessageSquare }
];

export default function HeroSection({ navigateTo }) {
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path.startsWith('/#')) {
      const targetId = path.slice(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', path);
        return;
      }
    }
    if (navigateTo) {
      navigateTo(path);
    } else {
      window.location.href = path;
    }
  };

  const imageSrc = heroCallerImg || getAssetUrl('/avyukta-ai-caller-hero.png');

  return (
    <section 
      id="hero" 
      className="avyukta-hero-section" 
      aria-label="Avyukta Intellicall Enterprise AI Communication Hero"
    >
      {/* Decorative tech background elements (Strictly behind content) */}
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow-orb hero-glow-teal" aria-hidden="true" />
      <div className="hero-glow-orb hero-glow-blue" aria-hidden="true" />

      <div className="studio-container hero-inner-container">
        <div className="hero-two-column-grid">
          
          {/* ========================================================= */}
          {/* 55% LEFT COLUMN: Content, Branding, Highlights, CTAs      */}
          {/* ========================================================= */}
          <div className="hero-content-col">
            
            {/* Top Small Badge */}
            <div className="hero-badge-pill" role="status">
              <span className="hero-badge-pulse" aria-hidden="true">
                <span className="pulse-dot" />
                <span className="pulse-ring" />
              </span>
              <span className="hero-badge-text">AI-POWERED BUSINESS COMMUNICATION</span>
            </div>

            {/* Main Heading with Teal Gradient Highlighting */}
            <h1 className="hero-main-heading">
              Smarter Calls.{' '}
              <span className="hero-heading-highlight">
                Stronger Customer Connections.
              </span>
            </h1>

            {/* Comprehensive Platform Description */}
            <p className="hero-description-text">
              Bring AI Voice Calling, Cloud Dialers, WhatsApp and CRM together in one 
              connected communication platform. Engage leads, manage customer conversations 
              and simplify follow-ups with Avyukta Intellicall.
            </p>

            {/* Feature Highlights: Compact Attractive Icon Chips */}
            <div className="hero-feature-chips-grid" role="list" aria-label="Key Communication Capabilities">
              {FEATURE_CHIPS.map(chip => (
                <div key={chip.id} className="hero-feature-chip" role="listitem">
                  <div className="hero-chip-icon-box" aria-hidden="true">
                    <chip.icon size={16} />
                  </div>
                  <span className="hero-chip-label">{chip.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Group */}
            <div className="hero-cta-actions-row">
              <a 
                href="/#pricing"
                className="hero-btn-primary"
                onClick={e => handleNav(e, '/#pricing')}
                aria-label="Explore AI Solutions"
              >
                <span>Explore AI Solutions</span>
                <ArrowUpRight size={18} className="hero-btn-arrow-icon" />
              </a>

              <a 
                href="tel:+918560000600"
                className="hero-btn-secondary"
                aria-label="Talk to an Expert on +91 85600 00600"
                title="Call +91 85600 00600"
              >
                <Phone size={17} className="hero-btn-phone-icon" />
                <span>Talk to an Expert</span>
              </a>
            </div>

            {/* Sub-strip: Telecom SLA and Trust Assurance */}
            <div className="hero-trust-indicators" aria-label="Service highlights">
              <div className="trust-indicator-item">
                <CheckCircle2 size={15} className="trust-icon" />
                <span>Sub-500ms Turn Cadence</span>
              </div>
              <div className="trust-indicator-item">
                <CheckCircle2 size={15} className="trust-icon" />
                <span>Billed on Connected Calls Only</span>
              </div>
              <div className="trust-indicator-item">
                <ShieldCheck size={15} className="trust-icon" />
                <span>99.99% Carrier Grade Telephony</span>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* 45% RIGHT COLUMN: Exact Avyukta AI Caller Female Visual   */}
          {/* ========================================================= */}
          <div className="hero-visual-col">
            <div className="hero-visual-stage">
              
              {/* Soft teal/blue radial glow & tech decorative elements behind subject */}
              <div className="hero-caller-radial-glow" aria-hidden="true" />
              
              {/* Abstract AI Concentric Waves & Orbitals */}
              <div className="hero-tech-orbitals" aria-hidden="true">
                <div className="tech-orbital-ring ring-1" />
                <div className="tech-orbital-ring ring-2" />
                <div className="tech-orbital-ring ring-3" />
                <svg className="tech-wave-svg" viewBox="0 0 400 400" fill="none">
                  <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" opacity="0.35" />
                  <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
                  <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" opacity="0.4" />
                </svg>
              </div>

              {/* Floating Tech Badge 1 (Top-Left): Active AI Voice Status */}
              <div className="hero-float-card card-top-left" aria-label="AI Voice Agent Active">
                <div className="float-card-avatar">
                  <Headphones size={18} />
                </div>
                <div className="float-card-details">
                  <div className="float-card-status">
                    <span className="live-status-dot" />
                    <span className="status-label">AI VOICE CALLER</span>
                  </div>
                  <strong className="float-card-title">Live Interactive Cadence</strong>
                </div>
              </div>

              {/* Exact Female Avyukta AI Caller with Headset */}
              <div className="hero-caller-figure-frame">
                <img 
                  src={imageSrc}
                  alt="Avyukta AI Caller professional with headset"
                  className="hero-caller-image"
                  loading="eager"
                  decoding="async"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
