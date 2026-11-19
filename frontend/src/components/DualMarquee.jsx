import React, { useState } from 'react';
import { 
  Pause, 
  Play, 
  Cpu, 
  Users, 
  Layers, 
  Building2, 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  Globe2, 
  PhoneCall 
} from 'lucide-react';
import { Eyebrow } from './StudioParts';

// Verified Technology & Channel Partners from dialerphilippines.com & project portfolio
const PARTNERS = [
  {
    name: 'Zoho',
    category: 'CRM & Cloud Partner',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Zoho">
        <rect x="2" y="6" width="11" height="11" rx="2" fill="#E42528" />
        <rect x="15" y="6" width="11" height="11" rx="2" fill="#226CB4" />
        <rect x="2" y="19" width="11" height="11" rx="2" fill="#3AA543" />
        <rect x="15" y="19" width="11" height="11" rx="2" fill="#F4B022" />
        <text x="34" y="25" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="1">ZOHO</text>
      </svg>
    )
  },
  {
    name: 'Genesys',
    category: 'Contact Center Platform',
    svg: (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Genesys">
        <circle cx="16" cy="18" r="10" stroke="#FF4F1F" strokeWidth="4" fill="none" strokeDasharray="16 6" />
        <circle cx="16" cy="18" r="4" fill="#FF4F1F" />
        <text x="34" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.5">genesys</text>
      </svg>
    )
  },
  {
    name: 'Bitrix24',
    category: 'CRM & Collaboration',
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Bitrix24">
        <rect x="4" y="8" width="22" height="20" rx="5" fill="#2FC6F6" />
        <text x="7" y="23" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="12">24</text>
        <text x="32" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="17">Bitrix<tspan fill="#2FC6F6">24</tspan></text>
      </svg>
    )
  },
  {
    name: 'Sangoma',
    category: 'Telephony & PBX',
    svg: (
      <svg viewBox="0 0 145 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Sangoma">
        <path d="M4 18L15 7L26 18L15 29Z" fill="#E31837" />
        <circle cx="15" cy="18" r="4" fill="#FFFFFF" />
        <text x="34" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.5">SANGOMA</text>
      </svg>
    )
  },
  {
    name: 'AudioCodes',
    category: 'Enterprise Gateways',
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="AudioCodes">
        <path d="M6 18C6 11.37 11.37 6 18 6V30C11.37 30 6 24.63 6 18Z" fill="#00529B" />
        <path d="M22 10C24 12 25 15 25 18C25 21 24 24 22 26" stroke="#00A3E0" strokeWidth="2.5" strokeLinecap="round" />
        <text x="34" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">audiocodes</text>
      </svg>
    )
  },
  {
    name: 'Dinstar',
    category: 'VoIP & GSM Gateways',
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Dinstar">
        <polygon points="4,9 18,9 24,18 18,27 4,27 10,18" fill="#E60012" />
        <text x="32" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.8">DINSTAR</text>
      </svg>
    )
  },
  {
    name: 'Poly / Plantronics',
    category: 'Audio Hardware',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Poly">
        <path d="M6 8L16 18L6 28V8Z" fill="#EB1C24" />
        <path d="M16 18L26 8V28L16 18Z" fill="#EB1C24" opacity="0.6" />
        <text x="34" y="25" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="19" letterSpacing="-0.5">poly</text>
      </svg>
    )
  },
  {
    name: 'Tata Tele Services',
    category: 'Telecom Infrastructure',
    svg: (
      <svg viewBox="0 0 165 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Tata Tele Business Services">
        <circle cx="16" cy="18" r="11" fill="#005B94" />
        <path d="M11 15H21M16 15V23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
        <text x="34" y="20" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5">TATA TELE</text>
        <text x="34" y="29" fill="var(--studio-muted)" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="9" letterSpacing="0.5">BUSINESS SERVICES</text>
      </svg>
    )
  },
  {
    name: 'Airtel',
    category: 'Carrier Network',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Airtel">
        <path d="M8 25C6 21 6 14 12 9C17 5 23 8 21 15C19 21 14 26 8 25Z" fill="#E40000" />
        <text x="29" y="24" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.5">airtel</text>
      </svg>
    )
  },
  {
    name: 'Spectranet',
    category: 'Internet & Bandwidth',
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="partner-logo-svg" aria-label="Spectranet">
        <circle cx="10" cy="18" r="5" fill="#ED1C24" />
        <circle cx="18" cy="12" r="3.5" fill="#009639" />
        <circle cx="21" cy="22" r="3.5" fill="#0054A6" />
        <text x="32" y="23" fill="currentColor" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.5">SPECTRANET</text>
      </svg>
    )
  }
];

// 13 Elite Client Brands from Avyukta's Verified Portfolio
const CLIENTS = [
  { id: 1, name: 'FirstMeridian®', subtitle: 'Workforce Solutions', icon: Users, accent: '#0284c7' },
  { id: 2, name: 'StarTek Global', subtitle: 'Omnichannel BPO', icon: PhoneCall, accent: '#8b5cf6' },
  { id: 3, name: 'BookMyBai', subtitle: 'On-Demand Services', icon: Users, accent: '#f97316' },
  { id: 4, name: 'Analytics Group', subtitle: 'Data & Intelligence', icon: TrendingUp, accent: '#6366f1' },
  { id: 5, name: 'Armor Security', subtitle: 'Enterprise Safety', icon: ShieldCheck, accent: '#06b6d4' },
  { id: 6, name: 'PM Industries', subtitle: 'Enterprise Telecom', icon: Cpu, accent: '#a855f7' },
  { id: 7, name: 'Humanary Health', subtitle: 'Healthcare Telephony', icon: Award, accent: '#ef4444' },
  { id: 8, name: 'Ebhaiya Services', subtitle: 'Digital Commerce', icon: Building2, accent: '#10b981' },
  { id: 9, name: 'Media Tech Temple', subtitle: 'Content & Tech', icon: Sparkles, accent: '#f59e0b' },
  { id: 10, name: "D'Verve Media", subtitle: 'AdTech & Growth', icon: Layers, accent: '#ec4899' },
  { id: 11, name: 'Edvice', subtitle: 'Smart Counseling', icon: GraduationCap, accent: '#14b8a6' },
  { id: 12, name: 'KCPC Shahjahanpur', subtitle: 'Regional Powerhouse', icon: Briefcase, accent: '#3b82f6' },
  { id: 13, name: 'TIPS-G Global', subtitle: 'International SIP', icon: Globe2, accent: '#84cc16' }
];

export default function DualMarquee() {
  const [partnersPaused, setPartnersPaused] = useState(false);
  const [clientsPaused, setClientsPaused] = useState(false);

  return (
    <section id="partners" className="dual-marquee-section">
      <div className="studio-container">
        
        {/* ============================================================ */}
        {/* MARQUEE 1: OUR TECHNOLOGY PARTNERS */}
        {/* ============================================================ */}
        <div className="marquee-block partner-marquee-block">
          <div className="marquee-header-row">
            <div>
              <Eyebrow>INTEGRATED TELECOM &amp; CRM ECOSYSTEM</Eyebrow>
              <h2 className="marquee-title">Our Technology Partners</h2>
              <p className="marquee-subtitle">
                Official integrations, telecom carrier interconnects, and hardware partners powering Avyukta solutions.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-btn"
              onClick={() => setPartnersPaused(prev => !prev)}
              aria-label={partnersPaused ? 'Resume Technology Partners animation' : 'Pause Technology Partners animation'}
              title={partnersPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {partnersPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{partnersPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`marquee-scroller-window ${partnersPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Technology Partners carousel"
          >
            <div className="marquee-track partner-track">
              {/* Group 1 */}
              <div className="marquee-group">
                {PARTNERS.map((partner, idx) => (
                  <div key={`p1-${idx}`} className="partner-logo-card" title={`${partner.name} - ${partner.category}`}>
                    <div className="partner-logo-wrap">{partner.svg}</div>
                    <span className="partner-category-label">{partner.category}</span>
                  </div>
                ))}
              </div>
              {/* Group 2 (Duplicate for seamless loop) */}
              <div className="marquee-group" aria-hidden="true">
                {PARTNERS.map((partner, idx) => (
                  <div key={`p2-${idx}`} className="partner-logo-card" title={`${partner.name} - ${partner.category}`}>
                    <div className="partner-logo-wrap">{partner.svg}</div>
                    <span className="partner-category-label">{partner.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MARQUEE 2: OUR TRUSTED CLIENTS */}
        {/* ============================================================ */}
        <div id="clients" className="marquee-block client-marquee-block">
          <div className="marquee-header-row">
            <div>
              <Eyebrow>PROVEN ENTERPRISE IMPACT</Eyebrow>
              <h2 className="marquee-title">Our Trusted Clients</h2>
              <p className="marquee-subtitle">
                Trusted by 500+ enterprises, high-volume contact centers, and fast-growing Indian businesses.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-btn"
              onClick={() => setClientsPaused(prev => !prev)}
              aria-label={clientsPaused ? 'Resume Trusted Clients animation' : 'Pause Trusted Clients animation'}
              title={clientsPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {clientsPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{clientsPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`marquee-scroller-window ${clientsPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Trusted Clients carousel"
          >
            <div className="marquee-track client-track reverse-scroll">
              {/* Group 1 */}
              <div className="marquee-group">
                {CLIENTS.map((client, idx) => {
                  const Icon = client.icon;
                  return (
                    <div key={`c1-${idx}`} className="client-badge-card" title={`${client.name} - ${client.subtitle}`}>
                      <div className="client-icon-box" style={{ color: client.accent, backgroundColor: `${client.accent}16` }}>
                        <Icon size={19} />
                      </div>
                      <div className="client-info">
                        <span className="client-name">{client.name}</span>
                        <span className="client-sub">{client.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Group 2 (Duplicate for seamless loop) */}
              <div className="marquee-group" aria-hidden="true">
                {CLIENTS.map((client, idx) => {
                  const Icon = client.icon;
                  return (
                    <div key={`c2-${idx}`} className="client-badge-card" title={`${client.name} - ${client.subtitle}`}>
                      <div className="client-icon-box" style={{ color: client.accent, backgroundColor: `${client.accent}16` }}>
                        <Icon size={19} />
                      </div>
                      <div className="client-info">
                        <span className="client-name">{client.name}</span>
                        <span className="client-sub">{client.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
