import React, { useState, useRef } from 'react';
import { 
  Workflow, 
  Users, 
  LayoutDashboard, 
  TrendingUp, 
  Play, 
  Pause,
  PhoneCall,
  ShieldCheck,
  Cpu,
  Award,
  Building2,
  GraduationCap,
  Briefcase,
  Globe2
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { getAssetUrl } from '../utils/assetUrl';

// The 4 Required Categories in exact order: 1. BPA | 2. CRM | 3. Command Center | 4. Sales
const CATEGORIES = [
  { 
    id: 'bpa', 
    label: 'BPA', 
    subtitle: 'Process Automation', 
    icon: Workflow,
    fullForm: 'Business Process Automation (BPA)',
    image: '/avyukta-platform-workflow.png'
  },
  { 
    id: 'crm', 
    label: 'CRM', 
    subtitle: 'Customer Platform', 
    icon: Users,
    fullForm: 'Customer Relationship Management (CRM)',
    image: '/crm-platform-pricing-promo.png'
  },
  { 
    id: 'command-center', 
    label: 'Command Center', 
    subtitle: 'Operations & Monitoring', 
    icon: LayoutDashboard,
    fullForm: 'Command Center',
    image: '/command-center-operations.jpg'
  },
  { 
    id: 'sales', 
    label: 'Sales', 
    subtitle: 'Pipeline & Deals', 
    icon: TrendingUp,
    fullForm: 'Sales Management & Customer Journey (Sales)',
    image: '/sales-management-dashboard.jpg'
  },
];

// CRM Multi-Image Views (Only 1 displayed at a time)
const CRM_VIEWS = [
  {
    id: 0,
    label: '1. CRM Platform',
    src: '/crm-platform-pricing-promo.png',
    alt: 'Avyukta CRM Platform pricing and omnichannel calling dashboard'
  },
  {
    id: 1,
    label: '2. Communications',
    src: '/avyukta-communications-dashboard.png',
    alt: 'Avyukta CRM omnichannel communications and activity dashboard'
  },
  {
    id: 2,
    label: '3. Employee Workspace',
    src: '/crm-employee-dashboard.jpg',
    alt: 'Avyukta CRM employee workspace, activity insights and telephony extension directory'
  }
];

// Verified Technology & Channel Partners (Reference: Dialer Philippines & Avyukta)
const PARTNERS = [
  { name: 'Zoho', category: 'CRM & Cloud Ecosystem', accent: '#f0483e' },
  { name: 'Genesys', category: 'Enterprise Contact Center', accent: '#ff4f1f' },
  { name: 'Bitrix24', category: 'CRM & Collaboration', accent: '#2fc7f7' },
  { name: 'Tata Tele Business', category: 'Carrier Telecom Network', accent: '#0084ff' },
  { name: 'Airtel', category: 'Carrier Telecom Network', accent: '#ed1c24' },
  { name: 'Spectranet', category: 'Enterprise High-Speed Fiber', accent: '#00a88f' },
  { name: 'AudioCodes', category: 'Voice Gateways & SBC', accent: '#00539b' },
  { name: 'Sangoma', category: 'Telephony & PBX Systems', accent: '#f37023' },
  { name: 'Dinstar', category: 'VoIP & GSM Gateways', accent: '#0a4c95' },
  { name: 'Poly / Plantronics', category: 'Audio & Headset Hardware', accent: '#e31837' },
  { name: 'Asterisk / Digium', category: 'Open Source PBX Engine', accent: '#f47920' },
  { name: 'Freemate', category: 'BPO Headset Systems', accent: '#1a73e8' }
];

// Verified Enterprise Clients (Reference: Dialer Philippines & Avyukta)
const CLIENTS = [
  { name: 'Sony', subtitle: 'Global Consumer Enterprise', icon: Globe2, accent: '#0284c7' },
  { name: 'FirstMeridian®', subtitle: 'Workforce & Staffing Solutions', icon: Users, accent: '#0284c7' },
  { name: 'StarTek Global', subtitle: 'Omnichannel BPO Services', icon: PhoneCall, accent: '#8b5cf6' },
  { name: 'BookMyBai', subtitle: 'On-Demand Household Services', icon: Users, accent: '#f97316' },
  { name: 'Analytics Group', subtitle: 'Data & Enterprise Intelligence', icon: TrendingUp, accent: '#6366f1' },
  { name: 'Armor Security', subtitle: 'Enterprise Safety & Operations', icon: ShieldCheck, accent: '#06b6d4' },
  { name: 'PM Industries', subtitle: 'Enterprise Telecom Infra', icon: Cpu, accent: '#a855f7' },
  { name: 'Humanary Health', subtitle: 'Healthcare Telephony', icon: Award, accent: '#ef4444' },
  { name: 'Ebhaiya Services', subtitle: 'Digital Commerce Logistics', icon: Building2, accent: '#10b981' },
  { name: 'Edvice', subtitle: 'Smart Counseling & EduTech', icon: GraduationCap, accent: '#14b8a6' },
  { name: 'KCPC Group', subtitle: 'Regional Commercial Enterprise', icon: Briefcase, accent: '#3b82f6' },
  { name: 'TIPS-G Global', subtitle: 'International SIP Solutions', icon: Globe2, accent: '#84cc16' }
];

export default function DynamicPricingSection({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState('bpa');
  const [crmView, setCrmView] = useState(0); // 0: CRM Platform, 1: Communications, 2: Employee Workspace
  const [clientsPaused, setClientsPaused] = useState(false);
  const [partnersPaused, setPartnersPaused] = useState(false);
  const tabRefs = useRef([]);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const displayImage = activeCategory === 'crm' 
    ? (CRM_VIEWS[crmView]?.src || currentCategory.image)
    : currentCategory.image;

  // Keyboard navigation for vertical categories
  const handleKeyDown = (e, index) => {
    let nextIndex;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveCategory(CATEGORIES[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="platform-showcase" className="dynamic-pricing-section" aria-label="Dynamic AI Pricing and Solutions">
      <div className="studio-container">
        
        {/* Section Heading */}
        <div className="dynamic-section-heading">
          <Eyebrow>DYNAMIC PLATFORM &amp; PRICING WORKSPACE</Eyebrow>
          <h2 className="dynamic-section-title">
            One Connected Workspace. <span className="studio-accent">Four Core Solutions.</span>
          </h2>
          <p className="dynamic-section-desc">
            Explore Avyukta&apos;s process automation, customer CRM, live operations command center, and sales pipeline management. Select any category to view its dedicated architecture.
          </p>
        </div>

        {/* 2-Column Dynamic Interactive Workspace */}
        <div className="dynamic-workspace-shell">
          
          {/* ========================================================= */}
          {/* 1. LEFT-SIDE CATEGORY NAVIGATION (BPA, CRM, Command Center, Sales) */}
          {/* ========================================================= */}
          <aside className="dynamic-category-sidebar">
            <div className="dynamic-sidebar-header">
              <span>EXPLORE PLATFORM</span>
              <h3>Categories</h3>
            </div>

            {/* Mobile Dropdown Selector */}
            <div className="dynamic-mobile-category-select">
              <label htmlFor="dynamic-cat-select" className="sr-only">Choose a category</label>
              <select 
                id="dynamic-cat-select"
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} – {cat.fullForm}
                  </option>
                ))}
              </select>
            </div>

            {/* Vertical Desktop/Tablet Navigation */}
            <nav 
              className="dynamic-category-nav-list" 
              role="tablist" 
              aria-label="Platform category tabs" 
              aria-orientation="vertical"
            >
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    ref={el => { tabRefs.current[idx] = el; }}
                    type="button"
                    role="tab"
                    id={`cat-tab-${cat.id}`}
                    aria-selected={isSelected}
                    aria-controls={`cat-panel-${cat.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={`dynamic-category-tab ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                  >
                    <div className="cat-tab-icon-wrap">
                      <Icon size={19} className="cat-icon" />
                    </div>
                    <div className="cat-tab-text">
                      <span className="cat-tab-label">{cat.label}</span>
                      <span className="cat-tab-sub">{cat.subtitle}</span>
                    </div>
                    {isSelected && <span className="cat-active-indicator" aria-hidden="true" />}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Commercial Note */}
            <div className="dynamic-sidebar-badge">
              <div className="sidebar-badge-dot" />
              <span>Sub-500ms Voice Cadence &amp; Pan-India STD CLI</span>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 2. DYNAMIC CONTENT ON SELECTION */}
          {/* STRICT REQUIREMENT: Only H1 heading (full form) + complete image. Nothing else. */}
          {/* ========================================================= */}
          <main 
            id={`cat-panel-${activeCategory}`}
            className="dynamic-content-panel"
            role="tabpanel"
            aria-labelledby={`cat-tab-${activeCategory}`}
          >
            <div 
              className="dynamic-category-view animate-fade-in" 
              key={`${activeCategory}-${activeCategory === 'crm' ? crmView : 0}`}
            >
              <div className="dynamic-view-title-row">
                <h1 className="dynamic-view-title">{currentCategory.fullForm}</h1>

                {/* CRM Image Toggle Controls: Display only one image at a time */}
                {activeCategory === 'crm' && (
                  <div className="crm-image-toggle-bar" role="tablist" aria-label="CRM View Options">
                    {CRM_VIEWS.map((view, idx) => (
                      <button
                        key={view.id}
                        type="button"
                        role="tab"
                        id={`crm-tab-${idx + 1}`}
                        aria-selected={crmView === idx}
                        className={`crm-toggle-btn ${crmView === idx ? 'active' : ''}`}
                        onClick={() => setCrmView(idx)}
                      >
                        {view.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="dynamic-media-frame">
                <img 
                  src={getAssetUrl(displayImage)} 
                  alt={activeCategory === 'crm' 
                    ? (CRM_VIEWS[crmView]?.alt || currentCategory.fullForm)
                    : currentCategory.fullForm}
                  className="dynamic-full-image"
                  onClick={activeCategory === 'crm' ? () => setCrmView(v => (v + 1) % CRM_VIEWS.length) : undefined}
                  style={activeCategory === 'crm' ? { cursor: 'pointer' } : undefined}
                  title={activeCategory === 'crm' ? 'Click to cycle to next CRM view' : undefined}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </main>
        </div>

        {/* ========================================================= */}
        {/* 1. OUR CLIENTS SECTION                                    */}
        {/* ========================================================= */}
        <div className="dynamic-network-marquee-block clients-marquee-block" id="our-clients">
          <div className="marquee-top-bar">
            <div>
              <span className="marquee-eyebrow">ENTERPRISE CLIENTELE</span>
              <h3 className="marquee-main-title">Our Clients</h3>
              <p className="marquee-sub-desc">
                Trusted by leading BPOs, healthcare networks, staffing leaders, and fast-growing enterprises across India and the Philippines.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-toggle-btn"
              onClick={() => setClientsPaused(prev => !prev)}
              aria-label={clientsPaused ? 'Resume clients marquee' : 'Pause clients marquee'}
            >
              {clientsPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{clientsPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`dynamic-marquee-window ${clientsPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Our Clients marquee"
          >
            <div className="dynamic-marquee-track client-track">
              {/* Group 1 */}
              <div className="dynamic-marquee-group">
                {CLIENTS.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={`client-g1-${idx}`} className="network-pill-card client">
                      <div className="network-card-header">
                        <span className="network-tag client">CLIENT</span>
                        <span className="network-status-dot" style={{ background: c.accent }} />
                      </div>
                      <div className="network-icon-title">
                        <Icon size={16} style={{ color: c.accent }} />
                        <strong className="network-name">{c.name}</strong>
                      </div>
                      <span className="network-sub">{c.subtitle}</span>
                    </div>
                  );
                })}
              </div>

              {/* Group 2 (Duplicate for continuous loop) */}
              <div className="dynamic-marquee-group" aria-hidden="true">
                {CLIENTS.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={`client-g2-${idx}`} className="network-pill-card client">
                      <div className="network-card-header">
                        <span className="network-tag client">CLIENT</span>
                        <span className="network-status-dot" style={{ background: c.accent }} />
                      </div>
                      <div className="network-icon-title">
                        <Icon size={16} style={{ color: c.accent }} />
                        <strong className="network-name">{c.name}</strong>
                      </div>
                      <span className="network-sub">{c.subtitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. OUR TECHNOLOGY PARTNERS & AFFILIATES SECTION           */}
        {/* ========================================================= */}
        <div className="dynamic-network-marquee-block partners-marquee-block" id="our-partners">
          <div className="marquee-top-bar">
            <div>
              <span className="marquee-eyebrow">HARDWARE, TELECOM &amp; CRM ECOSYSTEM</span>
              <h3 className="marquee-main-title">Our Technology Partners &amp; Affiliates</h3>
              <p className="marquee-sub-desc">
                Certified integrations with global CRM leaders, Tier-1 telecom carriers, and enterprise telephony gateway manufacturers.
              </p>
            </div>
            <button 
              type="button" 
              className="marquee-pause-toggle-btn"
              onClick={() => setPartnersPaused(prev => !prev)}
              aria-label={partnersPaused ? 'Resume partners marquee' : 'Pause partners marquee'}
            >
              {partnersPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{partnersPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`dynamic-marquee-window ${partnersPaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Our Technology Partners marquee"
          >
            <div className="dynamic-marquee-track partner-track">
              {/* Group 1 */}
              <div className="dynamic-marquee-group">
                {PARTNERS.map((p, idx) => (
                  <div key={`partner-g1-${idx}`} className="network-pill-card partner">
                    <div className="network-card-header">
                      <span className="network-tag partner">PARTNER</span>
                      <span className="network-status-dot" style={{ background: p.accent || '#0b99a7' }} />
                    </div>
                    <strong className="network-name">{p.name}</strong>
                    <span className="network-sub">{p.category}</span>
                  </div>
                ))}
              </div>

              {/* Group 2 (Duplicate for continuous loop) */}
              <div className="dynamic-marquee-group" aria-hidden="true">
                {PARTNERS.map((p, idx) => (
                  <div key={`partner-g2-${idx}`} className="network-pill-card partner">
                    <div className="network-card-header">
                      <span className="network-tag partner">PARTNER</span>
                      <span className="network-status-dot" style={{ background: p.accent || '#0b99a7' }} />
                    </div>
                    <strong className="network-name">{p.name}</strong>
                    <span className="network-sub">{p.category}</span>
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
