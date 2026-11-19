import React from 'react';
import { 
  Award, 
  Users, 
  Globe2, 
  ShieldCheck, 
  TrendingDown, 
  Bot, 
  Cpu, 
  Layers, 
  Database, 
  Headphones, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  PhoneCall,
  Sparkles,
  PhoneForwarded,
  Mic
} from 'lucide-react';
import { Eyebrow } from './StudioParts';

const STATS = [
  {
    value: '17+ Years',
    label: 'Telecom & AI Pioneer',
    sub: 'Founded in May 2008 with continuous telecom innovation',
    icon: Award,
    accent: '#0b99a7'
  },
  {
    value: '700+ Active',
    label: 'Enterprise Clients',
    sub: '4,000+ contact center installations globally',
    icon: Users,
    accent: '#0284c7'
  },
  {
    value: '11 Countries',
    label: 'Global & 91 Cities in India',
    sub: 'Pan-India STD CLIs (011, 022, 080) & global routes',
    icon: Globe2,
    accent: '#10b981'
  },
  {
    value: '72-Hr Refund',
    label: 'Money-Back Policy',
    sub: '100% risk-free trial during Paid PoC phase',
    icon: ShieldCheck,
    accent: '#f59e0b'
  }
];

const ADVANTAGES = [
  {
    id: 'lower-cost',
    badge: 'Cost Leadership',
    badgeColor: 'emerald',
    icon: TrendingDown,
    title: 'Lower Cost Than Other Vendors',
    desc: 'Get carrier-grade telecom and autonomous AI calling at commercials designed to beat any competing vendor. Transparent billing on connected calls only with ₹0 unanswered charges and no hidden multi-vendor markups.',
    tags: ['Lowest Bidder Guarantee', '₹0 Unanswered Calls', 'No Markup Fees']
  },
  {
    id: 'advanced-ai',
    badge: 'Proprietary Tech',
    badgeColor: 'teal',
    icon: Bot,
    title: 'Advanced Avyukta AI Voice Stack',
    desc: 'In-house conversational AI engines delivering sub-500ms cadence, natural Hindi & regional Indian dialects, human-grade interruption handling, and studio-quality emotional inflection.',
    tags: ['Sub-500ms Cadence', 'Multilingual Indic LLMs', 'Emotion Inflection']
  },
  {
    id: 'hybrid-telephony',
    badge: 'Complete Infrastructure',
    badgeColor: 'blue',
    icon: Cpu,
    title: 'SIP / GSM / PBX / Analog Support',
    desc: 'True telecom flexibility. Seamlessly integrate SIP trunks, GSM gateways, IP-PBX, PRI lines, and legacy analog devices under one unified architecture without replacing your hardware.',
    tags: ['SIP Trunks', 'GSM Gateways', 'IP-PBX & PRI', 'Analog Ready']
  },
  {
    id: 'flexible-routes',
    badge: 'High Concurrency',
    badgeColor: 'purple',
    icon: Layers,
    title: 'Promotional, Retail & Unlimited Routes',
    desc: 'Deploy the exact routing required for your campaign: high-throughput promotional broadcasting, crystal-clear retail VoIP minutes, or dedicated unlimited hosted dialer routes for high-volume BPOs.',
    tags: ['Promotional Routes', 'Retail VoIP Minutes', 'Unlimited Dialer Trunks']
  },
  {
    id: 'crm-api',
    badge: 'Plug & Play Sync',
    badgeColor: 'amber',
    icon: Database,
    title: 'Avyukta 3rd-Party CRM APIs',
    desc: 'Instant bi-directional REST APIs and webhooks for Salesforce, Zoho, LeadSquared, HubSpot, Freshdesk, and in-house databases with automatic lead stage sync, transcripts, and sentiment logs.',
    tags: ['Salesforce & Zoho API', 'LeadSquared & Webhooks', 'Real-Time Sync']
  },
  {
    id: 'barge-whisper',
    badge: 'Live Quality Control',
    badgeColor: 'rose',
    icon: Headphones,
    title: 'AI Agent Barge & AI Agent Whisper',
    desc: 'Empower supervisors with 360-degree real-time control: listen in to live AI or human calls silently, whisper guidance directly to the agent without the caller hearing, or barge in to take over the call instantly.',
    tags: ['Silent Live Monitoring', 'Agent Whisper Coaching', '1-Click Call Barge-In']
  }
];

export default function WhyAvyuktaSection({ navigateTo }) {
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

  return (
    <section 
      id="why-avyukta" 
      className="studio-section why-avyukta-section" 
      aria-label="Why Choose Avyukta IntelliCall"
    >
      <div className="studio-container">
        
        {/* Section Header */}
        <div className="why-avyukta-header">
          <Eyebrow>THE AVYUKTA ADVANTAGE</Eyebrow>
          <h2 className="why-avyukta-main-heading">
            Enterprise Telephony &amp; AI Excellence.{' '}
            <span className="studio-accent">Lower Cost Than Other Vendors.</span>
          </h2>
          <p className="why-avyukta-subheading">
            Founded in May 2008 with 17+ years of telecom mastery, serving 700+ active enterprise clients across 11 countries and 91 Indian cities. Single-vendor ownership from SIP/GSM/PBX to Advanced AI Agent Whisper.
          </p>
        </div>

        {/* 4 Key Pillars Stats Bar */}
        <div className="why-stats-grid" role="list" aria-label="Company Highlights">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="why-stat-card" role="listitem">
                <div className="why-stat-icon-wrap" style={{ color: stat.accent }}>
                  <Icon size={24} />
                </div>
                <div className="why-stat-body">
                  <span className="why-stat-value">{stat.value}</span>
                  <span className="why-stat-label">{stat.label}</span>
                  <span className="why-stat-sub">{stat.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 6 Core Advantages Grid */}
        <div className="why-advantages-grid" role="list" aria-label="Enterprise Telephony and AI Features">
          {ADVANTAGES.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.id} className="why-advantage-card" role="listitem">
                <div className="why-card-top-row">
                  <div className="why-card-icon-box">
                    <Icon size={22} />
                  </div>
                  <span className={`why-card-badge badge-${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <h3 className="why-card-title">{card.title}</h3>
                <p className="why-card-desc">{card.desc}</p>

                <div className="why-card-tags-list">
                  {card.tags.map((tag, i) => (
                    <span key={i} className="why-card-tag-pill">
                      <CheckCircle2 size={13} className="why-tag-check" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Commercial Confidence Banner (72-Hour Refund Guarantee) */}
        <div className="why-refund-assurance-banner">
          <div className="refund-assurance-content">
            <div className="refund-icon-circle">
              <ShieldCheck size={32} />
            </div>
            <div className="refund-text-group">
              <h4 className="refund-title">⭐ 72-Hour Refund Policy (Paid PoC Phase)</h4>
              <p className="refund-desc">
                Evaluate Avyukta AI Voice Agents, dialers, and SIP routing in your live business environment with zero financial risk. Complete commercial confidence before full-scale deployment.
              </p>
            </div>
          </div>

          <div className="refund-action-buttons">
            <a 
              href="/#pricing" 
              className="studio-btn studio-btn-primary"
              onClick={e => handleNav(e, '/#pricing')}
            >
              <span>Explore Voice Pricing</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="tel:+918560000600" 
              className="studio-btn studio-btn-secondary"
              title="Speak with an enterprise specialist"
            >
              <PhoneCall size={16} />
              <span>+91 85600 00600</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
