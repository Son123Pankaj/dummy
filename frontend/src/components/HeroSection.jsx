import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight,
  MessageSquare, 
  Phone, 
  Zap, 
  Sparkles,
  CheckCircle2, 
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
import heroCallerImg from '../assets/avyukta-connected-agent-hero.png';
import TrialModal from './TrialModal';

const CHANNELS = [
  { 
    id: 'voice', 
    label: 'Voice',
    title: 'AI Voice Calling',
    detail: 'Sub-500ms turn cadence · Natural Hindi & Indian dialects · Live human handoff',
    link: '/#voice-samples'
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp',
    title: 'Meta WhatsApp Automation',
    detail: 'Instant post-call message drops, lead brochures & automated conversational bots',
    link: '/contact'
  },
  { 
    id: 'email', 
    label: 'Email',
    title: 'Omnichannel Email Sync',
    detail: 'Automated AI transcripts, summary dispatches & bidirectional CRM ticket logging',
    link: '/contact'
  },
  { 
    id: 'dialer', 
    label: 'Dialer',
    title: 'Cloud & Hosted Dialer',
    detail: 'Predictive auto-dialing, Pan-India STD CLI (011, 022, 080) & 99.99% telecom SLA',
    link: '/#solutions'
  }
];

export default function HeroSection({ navigateTo }) {
  const [activeChannel, setActiveChannel] = useState('voice');
  const [isTrialOpen, setIsTrialOpen] = useState(false);

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

  const currentChannelInfo = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0];
  const imageSrc = heroCallerImg || getAssetUrl('/avyukta-connected-agent-hero.png');

  return (
    <>
      <section 
        id="hero" 
        className="avyukta-hero-section avyukta-connected-hero" 
        aria-label="Avyukta Intellicall Enterprise AI Communication Hero"
      >
        {/* Dynamic ambient cyan glowing ribbons & orbital bokeh */}
        <div className="hero-ambient-glow hero-ambient-glow-teal" aria-hidden="true" />
        <div className="hero-ambient-glow hero-ambient-glow-cyan" aria-hidden="true" />
        
        {/* Glowing Wave Ribbon SVG spanning across hero stage */}
        <svg 
          className="hero-wave-ribbon-svg" 
          viewBox="0 0 1440 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cyanWaveGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#2dd4bf" stopOpacity="0.65" />
              <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="cyanRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
            </linearGradient>
            <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Smooth S-curve wave line that passes behind agent */}
          <path 
            d="M -100 480 C 250 490, 420 400, 680 370 C 920 345, 1120 420, 1500 340" 
            stroke="url(#cyanWaveGrad)" 
            strokeWidth="2.5" 
            filter="url(#waveGlow)"
            className="hero-wave-path-main"
          />
          <path 
            d="M -50 510 C 300 520, 480 430, 720 395 C 960 365, 1160 440, 1500 370" 
            stroke="url(#cyanWaveGrad)" 
            strokeWidth="1.2" 
            strokeDasharray="4 8"
            opacity="0.45"
          />

          {/* Glowing neon cyan ring in top-right background (matching reference) */}
          <circle 
            cx="1240" 
            cy="180" 
            r="110" 
            stroke="url(#cyanRingGrad)" 
            strokeWidth="3" 
            filter="url(#waveGlow)"
            opacity="0.75"
            className="hero-neon-circle"
          />
        </svg>

        <div className="studio-container hero-inner-container">
          <div className="hero-connected-grid">
            
            {/* ========================================================= */}
            {/* 52% LEFT COLUMN: Content, Branding, Actions, Channel Tabs */}
            {/* ========================================================= */}
            <div className="hero-connected-content">
              
              {/* Top Tag: ● AI VOICE · TELEPHONY · CRM */}
              <div className="hero-connected-tag" role="status">
                <span className="hero-tag-dot" aria-hidden="true" />
                <span className="hero-tag-text">AI VOICE · TELEPHONY · CRM</span>
              </div>

              {/* Main Heading: Every call. Connected. */}
              <h1 className="hero-connected-heading">
                Every call.{' '}
                <span className="hero-heading-highlight">
                  Connected.
                </span>
              </h1>

              {/* Description */}
              <p className="hero-connected-subtitle">
                Qualify inbound leads, run outbound calls and follow up across 
                channels with Avyukta IntelliCall.
              </p>

              {/* CTA Action Buttons */}
              <div className="hero-connected-actions">
                <button 
                  type="button"
                  className="hero-btn-sandbox"
                  onClick={() => setIsTrialOpen(true)}
                  aria-label="Sign up for sandbox"
                >
                  <span>Sign up for sandbox</span>
                  <ArrowUpRight size={18} className="hero-btn-arrow-up" />
                </button>

                <a 
                  href="/#voice-samples"
                  className="hero-btn-voice-ai"
                  onClick={e => handleNav(e, '/#voice-samples')}
                  aria-label="Try Voice AI audio samples"
                >
                  <span className="hero-voice-waveform-icon" aria-hidden="true">
                    <span className="wave-bar bar-1" />
                    <span className="wave-bar bar-2" />
                    <span className="wave-bar bar-3" />
                    <span className="wave-bar bar-4" />
                  </span>
                  <span>Try Voice AI</span>
                  <ArrowRight size={16} className="hero-btn-arrow-right" />
                </a>
              </div>

              {/* Channel Filter Pills: Voice | WhatsApp | Email | Dialer */}
              <div className="hero-channel-strip">
                <div 
                  className="hero-channel-tabs" 
                  role="tablist" 
                  aria-label="Communication channel selectors"
                >
                  {CHANNELS.map(ch => {
                    const isActive = activeChannel === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`hero-channel-tab ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveChannel(ch.id)}
                      >
                        {ch.label}
                      </button>
                    );
                  })}
                </div>

                {/* Micro Channel Highlight Capsule */}
                <div className="hero-channel-capsule" role="status">
                  <span className="capsule-pulse-dot" aria-hidden="true" />
                  <span className="capsule-title">{currentChannelInfo.title}:</span>
                  <span className="capsule-text">{currentChannelInfo.detail}</span>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* 48% RIGHT COLUMN: Exact Female AI Caller Stage            */}
            {/* ========================================================= */}
            <div className="hero-connected-visual">
              <div className="hero-agent-stage">
                
                {/* Ambient radial glow behind the caller */}
                <div className="hero-agent-ambient-glow" aria-hidden="true" />

                {/* Female Call Center Specialist with Headset */}
                <div className="hero-agent-photo-wrapper">
                  <img 
                    src={imageSrc}
                    alt="Avyukta AI Voice and Telephony Specialist with headset"
                    className="hero-agent-photo"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Floating "AI Assist" Pill at Bottom-Right */}
                <button 
                  type="button"
                  className="hero-ai-assist-floating-btn"
                  onClick={() => setIsTrialOpen(true)}
                  aria-label="Open AI Assist Consultation"
                  title="Click to talk with Avyukta AI Assist"
                >
                  <MessageSquare size={16} className="ai-assist-icon" />
                  <span className="ai-assist-label">AI Assist</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Sandbox & Trial Modal Dialog */}
      <TrialModal 
        isOpen={isTrialOpen} 
        onClose={() => setIsTrialOpen(false)} 
      />
    </>
  );
}
