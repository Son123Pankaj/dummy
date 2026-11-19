import React, { useState, useRef } from 'react';
import { 
  Workflow, 
  Users, 
  PhoneCall, 
  Mic, 
  TrendingUp, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Layers,
  Building2,
  Cpu,
  Globe2,
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { getAssetUrl } from '../utils/assetUrl';
import LiveCallSimulator from './LiveCallSimulator';
import PlanCards from './PlanCards';

// The 5 Required Categories
const CATEGORIES = [
  { id: 'bpa', label: 'BPA', subtitle: 'Process Automation', icon: Workflow },
  { id: 'crm', label: 'CRM', subtitle: 'Customer Platform', icon: Users },
  { id: 'dialer', label: 'Dialer', subtitle: 'Cloud Calling', icon: PhoneCall },
  { id: 'voice', label: 'Voice', subtitle: 'AI Voice Agents', icon: Mic },
  { id: 'sales', label: 'Sales', subtitle: 'Pipeline & Deals', icon: TrendingUp },
];

// Verified Technology & Channel Partners
const PARTNERS = [
  { name: 'Zoho', category: 'CRM & Cloud' },
  { name: 'Genesys', category: 'Contact Center' },
  { name: 'Bitrix24', category: 'Collaboration' },
  { name: 'Sangoma', category: 'Telephony & PBX' },
  { name: 'AudioCodes', category: 'Enterprise Gateways' },
  { name: 'Dinstar', category: 'VoIP Gateways' },
  { name: 'Poly / Plantronics', category: 'Audio Hardware' },
  { name: 'Tata Tele Business', category: 'Telecom Infra' },
  { name: 'Airtel', category: 'Carrier Network' },
  { name: 'Spectranet', category: 'Enterprise Internet' }
];

// Verified Enterprise Clients
const CLIENTS = [
  { name: 'FirstMeridian®', subtitle: 'Workforce Solutions', icon: Users, accent: '#0284c7' },
  { name: 'StarTek Global', subtitle: 'Omnichannel BPO', icon: PhoneCall, accent: '#8b5cf6' },
  { name: 'BookMyBai', subtitle: 'On-Demand Services', icon: Users, accent: '#f97316' },
  { name: 'Analytics Group', subtitle: 'Data & Intelligence', icon: TrendingUp, accent: '#6366f1' },
  { name: 'Armor Security', subtitle: 'Enterprise Safety', icon: ShieldCheck, accent: '#06b6d4' },
  { name: 'PM Industries', subtitle: 'Enterprise Telecom', icon: Cpu, accent: '#a855f7' },
  { name: 'Humanary Health', subtitle: 'Healthcare Telephony', icon: Award, accent: '#ef4444' },
  { name: 'Ebhaiya Services', subtitle: 'Digital Commerce', icon: Building2, accent: '#10b981' },
  { name: 'Edvice', subtitle: 'Smart Counseling', icon: GraduationCap, accent: '#14b8a6' },
  { name: 'KCPC Shahjahanpur', subtitle: 'Regional Powerhouse', icon: Briefcase, accent: '#3b82f6' },
  { name: 'TIPS-G Global', subtitle: 'International SIP', icon: Globe2, accent: '#84cc16' }
];

export default function DynamicPricingSection({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState('voice');
  const [crmView, setCrmView] = useState(0); // 0: CRM Platform, 1: CRM Communications
  const [marqueePaused, setMarqueePaused] = useState(false);
  const tabRefs = useRef([]);

  const nav = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', href);
        return;
      }
    }
    if (navigateTo) navigateTo(href);
  };

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
            One Connected Workspace. <span className="studio-accent">Five Core Solutions.</span>
          </h2>
          <p className="dynamic-section-desc">
            Explore Avyukta&apos;s process automation, customer CRM, cloud dialer, conversational AI voice calling, and sales pipeline management. Select any category to view its dedicated architecture and commercials.
          </p>
        </div>

        {/* 2-Column Dynamic Interactive Workspace */}
        <div className="dynamic-workspace-shell">
          
          {/* ========================================================= */}
          {/* 1. LEFT-SIDE CATEGORY NAVIGATION (BPA, CRM, Dialer, Voice, Sales) */}
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
                    {cat.label} – {cat.subtitle}
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
          {/* ========================================================= */}
          <main 
            id={`cat-panel-${activeCategory}`}
            className="dynamic-content-panel"
            role="tabpanel"
            aria-labelledby={`cat-tab-${activeCategory}`}
          >
            
            {/* ----------------------------------------------------- */}
            {/* CATEGORY 1: BPA (Business Process Automation) */}
            {/* ----------------------------------------------------- */}
            {activeCategory === 'bpa' && (
              <div className="dynamic-category-view bpa-view animate-fade-in">
                <div className="dynamic-view-header">
                  <div className="dynamic-pill-tag">BUSINESS PROCESS AUTOMATION</div>
                  <h1 className="dynamic-view-title">Business Process Automation (BPA)</h1>
                  <p className="dynamic-view-description">
                    Automate routine customer journeys, eliminate repetitive manual data entry, and connect phone calls directly with your business software, ERP, and communication channels.
                  </p>
                </div>

                {/* BPA Image (H1 is placed directly above this image frame) */}
                <div className="dynamic-media-frame">
                  <img 
                    src={getAssetUrl('/avyukta-platform-workflow.png')} 
                    alt="Avyukta Business Process Automation (BPA) multi-stage customer workflow architecture"
                    className="dynamic-full-image"
                    width={1409}
                    height={768}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* BPA Features & Pricing Content */}
                <div className="dynamic-features-pricing-grid">
                  <div className="dynamic-features-col">
                    <h3>Key BPA Capabilities</h3>
                    <ul className="dynamic-feature-checklist">
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Automated lead routing and instant follow-up triggers</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>WhatsApp &amp; SMS event drips based on live call outcome</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Custom webhooks and API connectors for third-party CRMs</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Multi-stage SLA escalation and supervisor alert matrix</span></li>
                    </ul>
                  </div>

                  <div className="dynamic-pricing-card-col">
                    <div className="dynamic-commercial-card">
                      <span className="comm-label">BPA Commercials</span>
                      <div className="comm-price-row">
                        <strong>Included</strong>
                        <span>with AI calling packages</span>
                      </div>
                      <p>Custom multi-department workflows configured by our telecom architects with zero per-seat lock-in.</p>
                      <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => nav(e, '/contact')}>
                        Request BPA Consultation <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* CATEGORY 2: CRM (Customer Relationship Management) */}
            {/* ----------------------------------------------------- */}
            {activeCategory === 'crm' && (
              <div className="dynamic-category-view crm-view animate-fade-in">
                <div className="dynamic-view-header">
                  <div className="dynamic-pill-tag">OMNICHANNEL CRM PLATFORM</div>
                  <h1 className="dynamic-view-title">CRM Solutions</h1>
                  <p className="dynamic-view-description">
                    Keep every customer conversation connected across phone calls, WhatsApp, and email with unified 360° lead tracking, agent queues, and deal pipeline management.
                  </p>

                  {/* Dual Image Switcher (One image at a time) */}
                  <div className="dynamic-image-switcher-bar">
                    <span className="switcher-caption">Select View:</span>
                    <div className="switcher-pills-wrap">
                      <button
                        type="button"
                        className={`switcher-pill ${crmView === 0 ? 'active' : ''}`}
                        onClick={() => setCrmView(0)}
                      >
                        1. CRM Platform
                      </button>
                      <button
                        type="button"
                        className={`switcher-pill ${crmView === 1 ? 'active' : ''}`}
                        onClick={() => setCrmView(1)}
                      >
                        2. CRM Communications
                      </button>
                    </div>
                  </div>
                </div>

                {/* CRM Image Frame (H1 is placed directly above) */}
                <div className="dynamic-media-frame">
                  <img 
                    key={crmView}
                    src={getAssetUrl(crmView === 0 ? '/crm-platform-pricing-promo.png' : '/avyukta-communications-dashboard.png')} 
                    alt={crmView === 0 ? 'Avyukta CRM platform dashboard' : 'Avyukta omnichannel communications dashboard'}
                    className="dynamic-full-image"
                    width={1365}
                    height={768}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* CRM Features & Pricing Content */}
                <div className="dynamic-features-pricing-grid">
                  <div className="dynamic-features-col">
                    <h3>Key CRM Capabilities</h3>
                    <ul className="dynamic-feature-checklist">
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Unified 360° customer profile with call recordings and transcripts</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Official Meta WhatsApp Business Cloud API synchronization</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Multi-agent ticketing desk with live disposition tagging</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Automated deal status updates and follow-up scheduling</span></li>
                    </ul>
                  </div>

                  <div className="dynamic-pricing-card-col">
                    <div className="dynamic-commercial-card">
                      <span className="comm-label">CRM Commercials</span>
                      <div className="comm-price-row">
                        <strong>₹6,000</strong>
                        <span>/ month · Included in calling bundle</span>
                      </div>
                      <p>Includes official Meta WABA channel integration, unified contact history, and unlimited pipeline stages.</p>
                      <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => nav(e, '/contact')}>
                        Request CRM Demo <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* CATEGORY 3: DIALER (Cloud Call Center Dialer) */}
            {/* ----------------------------------------------------- */}
            {activeCategory === 'dialer' && (
              <div className="dynamic-category-view dialer-view animate-fade-in">
                <div className="dynamic-view-header">
                  <div className="dynamic-pill-tag">ENTERPRISE TELECOM CLOUD</div>
                  <h1 className="dynamic-view-title">Cloud Calling &amp; Predictive Dialer</h1>
                  <p className="dynamic-view-description">
                    Carrier-grade cloud calling dialer built for high-volume sales teams, BPOs, and support desks with sub-second call setup, Pan-India STD CLI, and 99.99% uptime SLA.
                  </p>
                </div>

                {/* Dialer Image Frame */}
                <div className="dynamic-media-frame">
                  <img 
                    src={getAssetUrl('/dialer-india-hero.jpg')} 
                    alt="Avyukta enterprise cloud dialer and call center setup"
                    className="dynamic-full-image"
                    width={1024}
                    height={576}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Dialer Features & Pricing Content */}
                <div className="dynamic-features-pricing-grid">
                  <div className="dynamic-features-col">
                    <h3>Key Dialer Capabilities</h3>
                    <ul className="dynamic-feature-checklist">
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Predictive, progressive, and manual dialing modes (Asterisk &amp; Vicidial)</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Pan-India local STD CLI (011, 022, 080) for high pickup rates</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Real-time agent monitoring, whisper, barge-in, and call recording</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>100+ concurrent channels per campaign with sub-second setup</span></li>
                    </ul>
                  </div>

                  <div className="dynamic-pricing-card-col">
                    <div className="dynamic-commercial-card">
                      <span className="comm-label">Dialer Commercials</span>
                      <div className="comm-price-row">
                        <strong>₹3.00</strong>
                        <span>/ connected min committed rate</span>
                      </div>
                      <p>Second-by-second pulse billing available. Unanswered and busy calls are free with carrier-grade SLA.</p>
                      <a href="/pricing" className="studio-btn studio-btn-primary" onClick={e => nav(e, '/pricing')}>
                        Calculate Dialer Pricing <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* CATEGORY 4: VOICE (AI Voice Calling & Call Animation) */}
            {/* ----------------------------------------------------- */}
            {activeCategory === 'voice' && (
              <div className="dynamic-category-view voice-view animate-fade-in">
                <div className="dynamic-view-header">
                  <div className="dynamic-pill-tag">CONVERSATIONAL AI VOICE AGENT</div>
                  <h1 className="dynamic-view-title">Conversational AI Voice Calling</h1>
                  <p className="dynamic-view-description">
                    Deploy human-like conversational voice assistants that answer inbound calls, qualify leads, and speak natural Indian dialects with sub-500ms cadence and live interruption handling.
                  </p>
                </div>

                {/* 3. CALL ANIMATION & INTERACTIVE SIMULATOR */}
                <div className="dynamic-call-simulator-wrap">
                  <div className="simulator-header-strip">
                    <Sparkles size={16} className="text-brand" />
                    <span>LIVE CALL SIMULATION &amp; NEURAL VOICE ENGINE</span>
                  </div>
                  <LiveCallSimulator />
                </div>

                {/* VOICE PRICING CARDS (SILVER | GOLD | PLATINUM) */}
                <div className="dynamic-voice-cards-container">
                  <div className="dynamic-cards-header">
                    <Eyebrow>CHOOSE YOUR VOICE PLAN</Eyebrow>
                    <h2>Voice Pricing Cards</h2>
                    <p>Every card has independent voice playback controls. Compare Silver, Gold, and Platinum below.</p>
                  </div>
                  <PlanCards navigateTo={navigateTo} />
                </div>
              </div>
            )}

            {/* ----------------------------------------------------- */}
            {/* CATEGORY 5: SALES (Sales Management & Customer Journey) */}
            {/* STRICT RULE: Completely hide Voice Call Card & Animation */}
            {/* ----------------------------------------------------- */}
            {activeCategory === 'sales' && (
              <div className="dynamic-category-view sales-view animate-fade-in">
                <div className="dynamic-view-header">
                  <div className="dynamic-pill-tag">SALES PIPELINE &amp; CUSTOMER JOURNEY</div>
                  <h1 className="dynamic-view-title">Sales Management &amp; Customer Journey</h1>
                  <p className="dynamic-view-description">
                    Empower your sales team to convert enquiries into won deals with automated lead scoring, deal velocity tracking, instant proposal dispatch, and full customer timeline audits.
                  </p>
                </div>

                {/* Sales Image (Customer Journey Dashboard uploaded by user) */}
                <div className="dynamic-media-frame">
                  <img 
                    src={getAssetUrl('/sales-management-dashboard.jpg')} 
                    alt="Avyukta Sales Management lead tracking and customer journey won deals dashboard"
                    className="dynamic-full-image"
                    width={1024}
                    height={506}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Sales Features & Pricing Content */}
                <div className="dynamic-features-pricing-grid">
                  <div className="dynamic-features-col">
                    <h3>Key Sales Management Capabilities</h3>
                    <ul className="dynamic-feature-checklist">
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Real-time lead qualification scoring and conversion funnels</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>1-click proposal, quotation, and invoice dispatch to prospects</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Full customer journey audit trail (timeline of calls, WhatsApp notes, agent logs)</span></li>
                      <li><CheckCircle2 size={16} className="text-accent" /><span>Team quota monitoring, deal age tracking, and conversion velocity analytics</span></li>
                    </ul>
                  </div>

                  <div className="dynamic-pricing-card-col">
                    <div className="dynamic-commercial-card">
                      <span className="comm-label">Sales Suite Commercials</span>
                      <div className="comm-price-row">
                        <strong>Flexible</strong>
                        <span>volume-based packages</span>
                      </div>
                      <p>Full integration with your calling lists, payment links, and proposal dispatch with zero per-seat lock-in.</p>
                      <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => nav(e, '/contact')}>
                        Request Sales Demo <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* (Note: Voice Call Card and Call Animation are completely omitted from Sales) */}
              </div>
            )}

          </main>
        </div>

        {/* ========================================================= */}
        {/* 4. CLIENTS / VENDORS / PARTNERS HORIZONTAL SCROLLING MARQUEE */}
        {/* ========================================================= */}
        <div className="dynamic-network-marquee-block">
          <div className="marquee-top-bar">
            <div>
              <span className="marquee-eyebrow">OUR GLOBAL NETWORK</span>
              <h3 className="marquee-main-title">Clients, Vendors &amp; Technology Partners</h3>
            </div>
            <button 
              type="button" 
              className="marquee-pause-toggle-btn"
              onClick={() => setMarqueePaused(prev => !prev)}
              aria-label={marqueePaused ? 'Resume marquee' : 'Pause marquee'}
            >
              {marqueePaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{marqueePaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          <div 
            className={`dynamic-marquee-window ${marqueePaused ? 'is-paused' : ''}`}
            tabIndex={0}
            role="region"
            aria-label="Clients and Partners marquee"
          >
            <div className="dynamic-marquee-track">
              {/* Group 1 */}
              <div className="dynamic-marquee-group">
                {PARTNERS.map((p, idx) => (
                  <div key={`p-${idx}`} className="network-pill-card partner">
                    <span className="network-tag">PARTNER</span>
                    <strong className="network-name">{p.name}</strong>
                    <span className="network-sub">{p.category}</span>
                  </div>
                ))}
                {CLIENTS.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={`c-${idx}`} className="network-pill-card client">
                      <span className="network-tag client">CLIENT</span>
                      <div className="network-icon-title">
                        <Icon size={15} style={{ color: c.accent }} />
                        <strong className="network-name">{c.name}</strong>
                      </div>
                      <span className="network-sub">{c.subtitle}</span>
                    </div>
                  );
                })}
              </div>

              {/* Group 2 (Duplicate for seamless loop) */}
              <div className="dynamic-marquee-group" aria-hidden="true">
                {PARTNERS.map((p, idx) => (
                  <div key={`p2-${idx}`} className="network-pill-card partner">
                    <span className="network-tag">PARTNER</span>
                    <strong className="network-name">{p.name}</strong>
                    <span className="network-sub">{p.category}</span>
                  </div>
                ))}
                {CLIENTS.map((c, idx) => {
                  const Icon = c.icon;
                  return (
                    <div key={`c2-${idx}`} className="network-pill-card client">
                      <span className="network-tag client">CLIENT</span>
                      <div className="network-icon-title">
                        <Icon size={15} style={{ color: c.accent }} />
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
        {/* 5. BOTTOM NAVIGATION & IMPORTANT LINKS */}
        {/* ========================================================= */}
        <div className="dynamic-bottom-links-grid">
          <div className="bottom-link-col">
            <h4>Platform Solutions</h4>
            <ul>
              <li><a href="/#solutions" onClick={e => nav(e, '/#solutions')}>Smart Calling Solutions</a></li>
              <li><button type="button" onClick={() => setActiveCategory('bpa')}>Business Process Automation (BPA)</button></li>
              <li><button type="button" onClick={() => setActiveCategory('crm')}>Omnichannel CRM Solutions</button></li>
              <li><button type="button" onClick={() => setActiveCategory('dialer')}>Cloud Predictive Dialer</button></li>
              <li><button type="button" onClick={() => setActiveCategory('voice')}>AI Voice Calling Assistants</button></li>
              <li><button type="button" onClick={() => setActiveCategory('sales')}>Sales Management &amp; Pipeline</button></li>
            </ul>
          </div>

          <div className="bottom-link-col">
            <h4>Voice &amp; Calling Plans</h4>
            <ul>
              <li><a href="/#pricing" onClick={e => nav(e, '/#pricing')}>Silver Plan – Everyday Enquiries</a></li>
              <li><a href="/#pricing" onClick={e => nav(e, '/#pricing')}>Gold Plan – Indian Languages (Recommended)</a></li>
              <li><a href="/#pricing" onClick={e => nav(e, '/#pricing')}>Platinum Plan – Expressive Studio Voices</a></li>
              <li><a href="/pricing" onClick={e => nav(e, '/pricing')}>Indicative Volume Calculator</a></li>
              <li><a href="/faq" onClick={e => nav(e, '/faq')}>Frequently Asked Questions (FAQ)</a></li>
            </ul>
          </div>

          <div className="bottom-link-col">
            <h4>Telecom Infrastructure</h4>
            <ul>
              <li><a href="/std-did" onClick={e => nav(e, '/std-did')}>Pan-India Local STD CLI (011, 022, 080)</a></li>
              <li><a href="/voip-minutes" onClick={e => nav(e, '/voip-minutes')}>Carrier-Grade VoIP Minutes</a></li>
              <li><a href="/cloud-dialer" onClick={e => nav(e, '/cloud-dialer')}>Hosted Asterisk &amp; Vicidial Cloud</a></li>
              <li><a href="/features" onClick={e => nav(e, '/features')}>Sub-500ms Turn Cadence SLA</a></li>
              <li><a href="/services" onClick={e => nav(e, '/services')}>Meta WhatsApp Business WABA API</a></li>
            </ul>
          </div>

          <div className="bottom-link-col direct-contact-col">
            <h4>Direct Assistance</h4>
            <p>Our solutions team helps configure custom call flows, language prompts, and CRM connectors.</p>
            <div className="direct-contact-actions">
              <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => nav(e, '/contact')}>
                Request Tailored Demo <ArrowUpRight size={16} />
              </a>
              <a href="tel:+917240001056" className="direct-phone-link">
                <PhoneCall size={15} /> +91 72400 01056
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
