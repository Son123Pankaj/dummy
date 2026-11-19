import React, { useState, useRef } from 'react';
import { 
  Workflow, 
  Users, 
  LayoutDashboard, 
  TrendingUp 
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

export default function DynamicPricingSection({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState('bpa');
  const [crmView, setCrmView] = useState(0); // 0: CRM Platform, 1: Communications, 2: Employee Workspace
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

      </div>
    </section>
  );
}
