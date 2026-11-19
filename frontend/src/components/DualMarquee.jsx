import React, { useState } from 'react';
import { 
  Pause, 
  Play, 
  Users, 
  Globe2, 
  PhoneCall, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Building2, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Briefcase 
} from 'lucide-react';
import { Eyebrow } from './StudioParts';

// =========================================================================
// SECTION B: OUR AFFILIATES (TECHNOLOGY, HARDWARE & TELECOM ECOSYSTEM)
// =========================================================================
const AFFILIATES = [
  {
    name: 'Zoho',
    category: 'CRM & Cloud Partner',
    accent: '#E42528',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Zoho">
        <rect x="2" y="6" width="11" height="11" rx="2" fill="#E42528" />
        <rect x="15" y="6" width="11" height="11" rx="2" fill="#226CB4" />
        <rect x="2" y="19" width="11" height="11" rx="2" fill="#3AA543" />
        <rect x="15" y="19" width="11" height="11" rx="2" fill="#F4B022" />
        <text x="34" y="25" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="18" letterSpacing="1">ZOHO</text>
      </svg>
    )
  },
  {
    name: 'Salesforce',
    category: 'Enterprise CRM Partner',
    accent: '#00A1E0',
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Salesforce">
        <path d="M16 8C13 8 10.5 10 9.8 12.8C8.5 12.3 7 12.5 5.8 13.5C4.5 14.7 4 16.5 4.5 18.2C2.5 19 1.2 21 1.2 23.2C1.2 26.2 3.6 28.6 6.6 28.6H23.4C26.5 28.6 29 26.1 29 23C29 20.3 27 18.1 24.4 17.6C24.8 16.6 24.8 15.4 24.3 14.4C23.2 12.3 21 10.8 18.5 10.8C17.7 10.8 16.8 11 16 8Z" fill="#00A1E0"/>
        <text x="34" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="16" letterSpacing="-0.3">salesforce</text>
      </svg>
    )
  },
  {
    name: 'Genesys',
    category: 'Contact Center Platform',
    accent: '#FF4F1F',
    svg: (
      <svg viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Genesys">
        <circle cx="16" cy="18" r="10" stroke="#FF4F1F" strokeWidth="4" fill="none" strokeDasharray="16 6" />
        <circle cx="16" cy="18" r="4" fill="#FF4F1F" />
        <text x="34" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="17" letterSpacing="-0.5">genesys</text>
      </svg>
    )
  },
  {
    name: 'Bitrix24',
    category: 'CRM & Collaboration',
    accent: '#2FC6F6',
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Bitrix24">
        <rect x="4" y="8" width="22" height="20" rx="5" fill="#2FC6F6" />
        <text x="7" y="23" fill="#FFFFFF" fontFamily="'Jost', system-ui, sans-serif" fontWeight="900" fontSize="12">24</text>
        <text x="32" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="17">Bitrix<tspan fill="#2FC6F6">24</tspan></text>
      </svg>
    )
  },
  {
    name: 'Sangoma',
    category: 'Telephony & PBX Systems',
    accent: '#E31837',
    svg: (
      <svg viewBox="0 0 145 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Sangoma">
        <path d="M4 18L15 7L26 18L15 29Z" fill="#E31837" />
        <circle cx="15" cy="18" r="4" fill="#FFFFFF" />
        <text x="34" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.5">SANGOMA</text>
      </svg>
    )
  },
  {
    name: 'AudioCodes',
    category: 'Enterprise Gateways & SBC',
    accent: '#00529B',
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="AudioCodes">
        <path d="M6 18C6 11.37 11.37 6 18 6V30C11.37 30 6 24.63 6 18Z" fill="#00529B" />
        <path d="M22 10C24 12 25 15 25 18C25 21 24 24 22 26" stroke="#00A3E0" strokeWidth="2.5" strokeLinecap="round" />
        <text x="34" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">audiocodes</text>
      </svg>
    )
  },
  {
    name: 'Dinstar',
    category: 'VoIP & GSM Gateways',
    accent: '#E60012',
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Dinstar">
        <polygon points="4,9 18,9 24,18 18,27 4,27 10,18" fill="#E60012" />
        <text x="32" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="16" letterSpacing="0.8">DINSTAR</text>
      </svg>
    )
  },
  {
    name: 'Poly / Plantronics',
    category: 'Audio Hardware',
    accent: '#EB1C24',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Poly">
        <path d="M6 8L16 18L6 28V8Z" fill="#EB1C24" />
        <path d="M16 18L26 8V28L16 18Z" fill="#EB1C24" opacity="0.6" />
        <text x="34" y="25" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="19" letterSpacing="-0.5">poly</text>
      </svg>
    )
  },
  {
    name: 'Tata Tele Business',
    category: 'Telecom Infrastructure',
    accent: '#005B94',
    svg: (
      <svg viewBox="0 0 170 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Tata Tele Business Services">
        <circle cx="16" cy="18" r="11" fill="#005B94" />
        <path d="M11 15H21M16 15V23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
        <text x="34" y="20" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="13" letterSpacing="0.5">TATA TELE</text>
        <text x="34" y="29" fill="var(--studio-muted)" fontFamily="'Jost', system-ui, sans-serif" fontWeight="600" fontSize="8.5" letterSpacing="0.5">BUSINESS SERVICES</text>
      </svg>
    )
  },
  {
    name: 'Airtel',
    category: 'Carrier Network',
    accent: '#E40000',
    svg: (
      <svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Airtel">
        <path d="M8 25C6 21 6 14 12 9C17 5 23 8 21 15C19 21 14 26 8 25Z" fill="#E40000" />
        <text x="29" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="18" letterSpacing="-0.5">airtel</text>
      </svg>
    )
  },
  {
    name: 'Spectranet',
    category: 'Internet & Fiber',
    accent: '#009639',
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Spectranet">
        <circle cx="10" cy="18" r="5" fill="#ED1C24" />
        <circle cx="18" cy="12" r="3.5" fill="#009639" />
        <circle cx="21" cy="22" r="3.5" fill="#0054A6" />
        <text x="32" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.5">SPECTRANET</text>
      </svg>
    )
  },
  {
    name: 'Grandstream',
    category: 'IP Voice & Video',
    accent: '#004B87',
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Grandstream">
        <circle cx="15" cy="18" r="10" stroke="#004B87" strokeWidth="3" fill="none" />
        <path d="M11 18L14 21L19 15" stroke="#004B87" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="13.5" letterSpacing="0.5">GRANDSTREAM</text>
      </svg>
    )
  }
];

// =========================================================================
// SECTION A: OUR CLIENTS (ENTERPRISE CLIENTELE FROM AVYUKTA PORTFOLIO & DIALER PH)
// =========================================================================
const CLIENTS = [
  {
    name: 'Sony',
    category: 'Global Enterprise',
    accent: '#000000',
    svg: (
      <svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Sony">
        <text x="8" y="25" fill="currentColor" fontFamily="'Times New Roman', serif" fontWeight="700" fontSize="22" letterSpacing="4">SONY</text>
      </svg>
    )
  },
  {
    name: 'FirstMeridian®',
    category: 'Workforce Solutions',
    accent: '#0284c7',
    icon: Users,
    svg: (
      <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="FirstMeridian">
        <rect x="4" y="9" width="18" height="18" rx="4" fill="#0284c7" />
        <path d="M8 18H18M13 13V23" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <text x="28" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="14">FirstMeridian<tspan fontSize="10">®</tspan></text>
      </svg>
    )
  },
  {
    name: 'StarTek Global',
    category: 'Omnichannel BPO',
    accent: '#8b5cf6',
    icon: PhoneCall,
    svg: (
      <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="StarTek Global">
        <polygon points="12,7 15,14 22,14 17,19 19,26 12,22 5,26 7,19 2,14 9,14" fill="#8b5cf6" />
        <text x="28" y="24" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="15" letterSpacing="0.5">STARTEK</text>
      </svg>
    )
  },
  {
    name: 'BookMyBai',
    category: 'On-Demand Services',
    accent: '#f97316',
    icon: Users,
    svg: (
      <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="BookMyBai">
        <circle cx="14" cy="18" r="9" fill="#f97316" />
        <path d="M10 18L13 21L18 15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <text x="28" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="14">BookMy<tspan fill="#f97316">Bai</tspan></text>
      </svg>
    )
  },
  {
    name: 'Analytics Group',
    category: 'Data & Intelligence',
    accent: '#6366f1',
    icon: TrendingUp,
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Analytics Group">
        <rect x="5" y="19" width="4" height="9" rx="1" fill="#6366f1" />
        <rect x="11" y="14" width="4" height="14" rx="1" fill="#6366f1" />
        <rect x="17" y="9" width="4" height="19" rx="1" fill="#6366f1" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="13.5">Analytics Group</text>
      </svg>
    )
  },
  {
    name: 'Armor Security',
    category: 'Enterprise Safety',
    accent: '#06b6d4',
    icon: ShieldCheck,
    svg: (
      <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Armor Security">
        <path d="M13 8L6 11V18C6 23 13 27 13 27C13 27 20 23 20 18V11L13 8Z" fill="#06b6d4" />
        <text x="26" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="13.5">Armor Security</text>
      </svg>
    )
  },
  {
    name: 'PM Industries',
    category: 'Enterprise Telecom',
    accent: '#a855f7',
    icon: Cpu,
    svg: (
      <svg viewBox="0 0 145 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="PM Industries">
        <rect x="5" y="10" width="16" height="16" rx="3" fill="#a855f7" />
        <circle cx="13" cy="18" r="4" fill="#FFFFFF" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="14">PM Industries</text>
      </svg>
    )
  },
  {
    name: 'Humanary Health',
    category: 'Healthcare Telephony',
    accent: '#ef4444',
    icon: Award,
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Humanary Health">
        <circle cx="13" cy="18" r="9" fill="#ef4444" />
        <path d="M10 18H16M13 15V21" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="square" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="13.5">Humanary</text>
      </svg>
    )
  },
  {
    name: 'Ebhaiya Services',
    category: 'Digital Commerce',
    accent: '#10b981',
    icon: Building2,
    svg: (
      <svg viewBox="0 0 155 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Ebhaiya Services">
        <circle cx="13" cy="18" r="9" fill="#10b981" />
        <path d="M9 18L12 21L17 14" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="14">Ebhaiya<tspan fill="#10b981">.in</tspan></text>
      </svg>
    )
  },
  {
    name: 'Media Tech Temple',
    category: 'Content & Tech',
    accent: '#f59e0b',
    icon: Sparkles,
    svg: (
      <svg viewBox="0 0 165 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Media Tech Temple">
        <polygon points="13,8 16,15 23,15 17,20 19,27 13,22 7,27 9,20 3,15 10,15" fill="#f59e0b" />
        <text x="28" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="13">Media Tech Temple</text>
      </svg>
    )
  },
  {
    name: "D'Verve Media",
    category: 'AdTech & Growth',
    accent: '#ec4899',
    icon: Layers,
    svg: (
      <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="D'Verve Media">
        <rect x="5" y="10" width="16" height="16" rx="4" fill="#ec4899" />
        <text x="9" y="22" fill="#FFFFFF" fontFamily="'Jost', system-ui, sans-serif" fontWeight="900" fontSize="12">D</text>
        <text x="26" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="14">D&apos;Verve Media</text>
      </svg>
    )
  },
  {
    name: 'Edvice',
    category: 'Smart Counseling',
    accent: '#14b8a6',
    icon: GraduationCap,
    svg: (
      <svg viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="Edvice">
        <circle cx="13" cy="18" r="9" fill="#14b8a6" />
        <path d="M8 17L13 13L18 17L13 21L8 17Z" fill="#FFFFFF" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="15">Edvice</text>
      </svg>
    )
  },
  {
    name: 'KCPC Shahjahanpur',
    category: 'Regional Powerhouse',
    accent: '#3b82f6',
    icon: Briefcase,
    svg: (
      <svg viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="KCPC Infra">
        <rect x="5" y="10" width="16" height="16" rx="3" fill="#3b82f6" />
        <text x="7" y="22" fill="#FFFFFF" fontFamily="'Jost', system-ui, sans-serif" fontWeight="900" fontSize="9">KCPC</text>
        <text x="26" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="700" fontSize="13.5">KCPC Infra</text>
      </svg>
    )
  },
  {
    name: 'TIPS-G Global',
    category: 'International SIP',
    accent: '#84cc16',
    icon: Globe2,
    svg: (
      <svg viewBox="0 0 150 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-logo-svg" aria-label="TIPS-G Global">
        <circle cx="13" cy="18" r="9" stroke="#84cc16" strokeWidth="2.5" fill="none" />
        <ellipse cx="13" cy="18" rx="4" ry="9" stroke="#84cc16" strokeWidth="1.5" fill="none" />
        <text x="27" y="23" fill="currentColor" fontFamily="'Jost', system-ui, sans-serif" fontWeight="800" fontSize="13.5">TIPS-G</text>
      </svg>
    )
  }
];

export default function DualMarquee() {
  const [clientsPaused, setClientsPaused] = useState(false);
  const [affiliatesPaused, setAffiliatesPaused] = useState(false);

  return (
    <section id="clients-and-affiliates" className="dual-marquee-section">
      <div className="studio-container">
        
        {/* ============================================================ */}
        {/* SECTION A: OUR CLIENTS                                       */}
        {/* ============================================================ */}
        <div id="our-clients" className="marquee-block client-marquee-block">
          <div className="marquee-header-row">
            <div>
              <Eyebrow>ENTERPRISE CLIENTELE</Eyebrow>
              <h2 className="marquee-title">Trusted by Businesses</h2>
              <span className="marquee-subheading-tag">Our Clients</span>
              <p className="marquee-subtitle">
                Trusted by leading BPOs, healthcare networks, staffing leaders, and fast-growing enterprises across India and the Philippines.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-btn"
              onClick={() => setClientsPaused(prev => !prev)}
              aria-label={clientsPaused ? 'Resume Clients animation' : 'Pause Clients animation'}
              title={clientsPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-pressed={clientsPaused}
            >
              {clientsPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{clientsPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`marquee-scroller-window ${clientsPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Our Clients marquee"
          >
            <div className="marquee-track client-track">
              {/* Group 1 */}
              <div className="marquee-group">
                {CLIENTS.map((client, idx) => (
                  <div 
                    key={`c1-${idx}`} 
                    className="brand-logo-tile" 
                    title={`${client.name} - ${client.category}`}
                    tabIndex={0}
                  >
                    <div className="brand-logo-wrap">{client.svg}</div>
                    <span className="brand-category-label">{client.category}</span>
                  </div>
                ))}
              </div>
              {/* Group 2 (Duplicate for continuous loop) */}
              <div className="marquee-group" aria-hidden="true">
                {CLIENTS.map((client, idx) => (
                  <div 
                    key={`c2-${idx}`} 
                    className="brand-logo-tile" 
                    title={`${client.name} - ${client.category}`}
                  >
                    <div className="brand-logo-wrap">{client.svg}</div>
                    <span className="brand-category-label">{client.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION B: OUR AFFILIATES                                    */}
        {/* ============================================================ */}
        <div id="our-affiliates" className="marquee-block partner-marquee-block">
          <div className="marquee-header-row">
            <div>
              <Eyebrow>HARDWARE, TELECOM &amp; CRM ECOSYSTEM</Eyebrow>
              <h2 className="marquee-title">Our Technology Ecosystem</h2>
              <span className="marquee-subheading-tag">Our Affiliates</span>
              <p className="marquee-subtitle">
                A connected ecosystem spanning CRM platforms, telecom carriers, and enterprise telephony hardware used across modern communication workflows.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-btn"
              onClick={() => setAffiliatesPaused(prev => !prev)}
              aria-label={affiliatesPaused ? 'Resume Affiliates animation' : 'Pause Affiliates animation'}
              title={affiliatesPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              aria-pressed={affiliatesPaused}
            >
              {affiliatesPaused ? <Play size={14} /> : <Pause size={14} />}
              <span>{affiliatesPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`marquee-scroller-window ${affiliatesPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Our Affiliates marquee"
          >
            <div className="marquee-track affiliate-track reverse-scroll">
              {/* Group 1 */}
              <div className="marquee-group">
                {AFFILIATES.map((affiliate, idx) => (
                  <div 
                    key={`a1-${idx}`} 
                    className="brand-logo-tile" 
                    title={`${affiliate.name} - ${affiliate.category}`}
                    tabIndex={0}
                  >
                    <div className="brand-logo-wrap">{affiliate.svg}</div>
                    <span className="brand-category-label">{affiliate.category}</span>
                  </div>
                ))}
              </div>
              {/* Group 2 (Duplicate for continuous loop) */}
              <div className="marquee-group" aria-hidden="true">
                {AFFILIATES.map((affiliate, idx) => (
                  <div 
                    key={`a2-${idx}`} 
                    className="brand-logo-tile" 
                    title={`${affiliate.name} - ${affiliate.category}`}
                  >
                    <div className="brand-logo-wrap">{affiliate.svg}</div>
                    <span className="brand-category-label">{affiliate.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
