import React from 'react';
import { 
  Landmark, 
  Headphones, 
  HeartPulse, 
  GraduationCap, 
  ShoppingCart, 
  Building2, 
  LifeBuoy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SectionHeading } from './StudioParts';
import VoiceSamplePlayer from './VoiceSamplePlayer';

const INDUSTRIES = [
  {
    id: 'banking',
    title: 'Banking & Financial Services',
    icon: Landmark,
    accent: '#0284c7', // Sky Blue
    badge: 'BFSI & Fintech',
    description: 'Automate loan eligibility checks, payment reminder calls, EMI updates, and secure transaction confirmations.',
    highlight: 'Instant Payment Follow-ups'
  },
  {
    id: 'bpo',
    title: 'BPO & Call Centers',
    icon: Headphones,
    accent: '#8b5cf6', // Violet
    badge: 'High Concurrency',
    description: 'High-volume outbound predictive dialing, live agent handoff, sub-500ms voice cadence, and real-time call disposition.',
    highlight: '100+ Concurrent Channels',
    voiceDemo: {
      title: 'AI Outbound Calling',
      scenario: 'AI assistant introduces business service, qualifies enquiry, and schedules follow-up.',
      src: '/samples/silver-1.mp3'
    }
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    icon: HeartPulse,
    accent: '#e11d48', // Rose
    badge: 'Clinical Telephony',
    description: 'Patient appointment reminders, doctor OPD schedule management, diagnostic test alerts, and post-consultation care calls.',
    highlight: 'Reduce Patient No-Shows'
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    icon: GraduationCap,
    accent: '#2563eb', // Royal Blue
    badge: 'Admissions & Counseling',
    description: 'Student admission enquiry qualification, entrance exam updates, webinar invitations, and fee schedule reminders.',
    highlight: 'Faster Lead Qualification'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail',
    icon: ShoppingCart,
    accent: '#d97706', // Amber
    badge: 'Order Operations',
    description: 'Automated cash-on-delivery (COD) order verification calls, shipment tracking notifications, and abandoned cart recovery.',
    highlight: 'Lower Return-to-Origin (RTO)'
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Builders',
    icon: Building2,
    accent: '#ea580c', // Coral Brand
    badge: 'Property Enquiries',
    description: 'Pre-qualify buyer budgets, schedule on-site flat visits, automate builder CRM updates, and manage NRI investor calls.',
    highlight: 'Schedule Site Visits Faster',
    voiceDemo: {
      title: 'AI Real Estate Assistant',
      scenario: 'AI assistant pre-qualifies budget, preferred location, and schedules a site visit.',
      src: '/samples/gold-3.mp3'
    }
  },
  {
    id: 'support',
    title: 'Customer Support',
    icon: LifeBuoy,
    accent: '#10b981', // Emerald
    badge: '24/7 Operations',
    description: '24/7 routine inquiry handling, ticket status lookups, multi-channel customer triage, and seamless human agent escalation.',
    highlight: '24/7 Voice & WhatsApp Support',
    voiceDemo: {
      title: 'AI Customer Support',
      scenario: 'AI assistant greets caller, answers service FAQs, and verifies account status.',
      src: '/samples/silver-2.mp3'
    }
  }
];

export default function IndustriesSection({ navigateTo }) {
  const local = (e, path) => {
    if (navigateTo) {
      e.preventDefault();
      navigateTo(path);
    }
  };

  return (
    <section id="industries" className="studio-section industries-section">
      <div className="studio-container">
        <SectionHeading 
          centered 
          eyebrow="TAILORED INDUSTRY SOLUTIONS" 
          title="Industries We" 
          accent="Serve." 
          text="Avyukta Intellicall conversational voice agents, cloud dialers, and business automation workflows are configured for each industry's customer journey."
        />

        <div className="industries-grid">
          {INDUSTRIES.map(item => {
            const Icon = item.icon;
            const hasVoice = Boolean(item.voiceDemo);

            return (
              <article 
                key={item.id} 
                className={`industry-card ${hasVoice ? 'has-voice-demo' : ''}`}
                style={{ '--industry-accent': item.accent }}
              >
                <div className="industry-card-top">
                  <div 
                    className="industry-icon-wrapper" 
                    style={{ color: item.accent, backgroundColor: `${item.accent}14` }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="industry-badge" style={{ color: item.accent, borderColor: `${item.accent}30` }}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="industry-card-title">{item.title}</h3>
                <p className="industry-card-desc">{item.description}</p>

                {/* Embedded compact Voice Demo Player for the 3 requested industries */}
                {hasVoice && (
                  <div className="industry-voice-player-wrap">
                    <VoiceSamplePlayer
                      id={`ind-voice-${item.id}`}
                      src={item.voiceDemo.src}
                      title={item.voiceDemo.title}
                      scenario={item.voiceDemo.scenario}
                      accentColor={item.accent}
                    />
                  </div>
                )}

                <div className="industry-card-footer">
                  <span className="industry-highlight">
                    <CheckCircle2 size={15} style={{ color: item.accent }} />
                    {item.highlight}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="industry-cta-strip">
          <div>
            <strong>Need a specialized workflow for your industry?</strong>
            <p>Our telecom engineers and solution architects configure scripts, CRM stages, and numbers for your domain.</p>
          </div>
          <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => local(e, '/contact')}>
            Request tailored demo <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
