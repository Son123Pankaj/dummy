import React, { useState, useRef, useEffect } from 'react';
import { 
  PhoneCall, 
  Headphones, 
  Bot, 
  MessageSquare, 
  Mail, 
  Database, 
  Target, 
  Users, 
  LifeBuoy, 
  CreditCard, 
  PhoneForwarded, 
  Workflow, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { getAssetUrl } from '../utils/assetUrl';
import './AutomationShowcase.css';

export const AUTOMATION_CATEGORIES = [
  {
    id: 'sales-calling',
    title: 'AI Sales Calling',
    subtitle: 'Outbound sales & instant lead qualification',
    icon: PhoneCall,
    badge: 'Voice AI & Outbound',
    description: 'Call new leads within 60 seconds with human-like AI agents that pitch offerings, qualify budgets, and book meetings directly into your calendar.',
    image: '/sales-management-dashboard.jpg',
    imageAlt: 'AI Sales Calling CRM and lead conversion dashboard',
    audioSample: '/samples/gold-1.mp3',
    audioTitle: 'Sales Qualification Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Lead Enquiry Received',
        desc: 'A customer submits an enquiry via your website, Google ad, or lead form.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Autonomous AI Call',
        desc: 'AI Sales Caller dials prospect in under 60 seconds, speaks natural Indian dialects, and qualifies budget and timeline.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Automatic CRM Sync',
        desc: 'Call recording, transcript, sentiment analysis, lead score, and meeting time are logged to Avyukta CRM.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        step: '04',
        title: 'Qualified Meeting Booked',
        desc: 'Verified sales meeting confirmed on executive calendar with instant WhatsApp & email confirmation.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Speed-to-Lead', value: '< 60 sec' },
      { label: 'Pickup Rate', value: '45%+' },
      { label: 'Booking Rate', value: '3.4x higher' }
    ]
  },
  {
    id: 'customer-support',
    title: 'AI Customer Support',
    subtitle: '24/7 inbound assistance with zero wait time',
    icon: Headphones,
    badge: 'Inbound Support',
    description: 'Eliminate customer queue wait times with conversational voice assistants that resolve common inquiries, track orders, and escalate complex issues.',
    image: '/avyukta-communications-dashboard.png',
    imageAlt: 'AI Customer Support and omnichannel communications desk',
    audioSample: '/samples/gold-3.mp3',
    audioTitle: '24/7 Support Desk Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Inbound Call or Ticket',
        desc: 'Customer dials your customer care number or opens a support query.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Sub-500ms Voice Resolution',
        desc: 'AI Support Agent answers immediately with 0-sec queue wait, diagnoses the issue, and provides instant resolution.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Ticket Logged & Categorized',
        desc: 'Support ticket auto-tagged with root cause, resolution notes, and customer CSAT sentiment in CRM.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        step: '04',
        title: '70%+ First Call Resolution',
        desc: 'Customer inquiry resolved instantly without human delay; edge cases routed with complete conversational context.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Queue Time', value: '0 seconds' },
      { label: 'First Call Resolution', value: '72%' },
      { label: 'Cost Reduction', value: '60%' }
    ]
  },
  {
    id: 'voice-receptionist',
    title: 'AI Voice Receptionist',
    subtitle: 'Front-desk call answering & department routing',
    icon: Bot,
    badge: 'Front-Desk Telephony',
    description: 'Professional enterprise greeting on your company phone lines, intelligently understanding caller requests and routing to the right department.',
    image: '/about-ai-receptionist.jpg',
    imageAlt: 'AI Voice Receptionist front-desk routing architecture',
    audioSample: '/samples/silver-2.mp3',
    audioTitle: 'Receptionist Inbound Greeting',
    workflow: {
      trigger: {
        step: '01',
        title: 'Incoming Office Call',
        desc: 'Caller dials company main board line or local STD DID number (011, 022, 080).',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Smart Intent Identification',
        desc: 'Neural AI Receptionist greets caller, identifies the department or executive requested, and checks live presence.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Call Audit & Caller Log',
        desc: 'Caller contact details, company name, call reason, and audio transcript logged to directory.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        step: '04',
        title: 'Seamless Warm Transfer',
        desc: 'Call routed to staff extension with whisper context, or voice memo dispatched to email.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Missed Calls', value: '0%' },
      { label: 'Transfer Accuracy', value: '98.5%' },
      { label: 'Availability', value: '24/7/365' }
    ]
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    subtitle: 'Meta WABA official API bots & drip marketing',
    icon: MessageSquare,
    badge: 'Omnichannel Chat',
    description: 'Trigger interactive WhatsApp catalogs, brochures, payment links, and dynamic notification journeys directly connected to your telephony campaigns.',
    image: '/whatsapp-bot-badge.png',
    imageAlt: 'WhatsApp Business API automation and marketing bots',
    audioSample: null,
    workflow: {
      trigger: {
        step: '01',
        title: 'Inbound Message or Call Wrap',
        desc: 'Customer messages on WhatsApp or a voice call ends with "send brochure" intent.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Official Meta API Dispatch',
        desc: 'AI Bot instantly sends personalized PDF brochure, pricing quotation, or product video via verified WhatsApp badge.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Chat Synchronized to Lead',
        desc: 'Full WhatsApp conversation history and message delivery/read timestamps attached to CRM contact.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '90%+ Read Rates & Conversions',
        desc: 'Customers engage and confirm orders on their favorite messaging app with 3x higher conversion rate.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Open Rate', value: '92%' },
      { label: 'Response Time', value: '< 5 sec' },
      { label: 'Conversion Lift', value: '3x' }
    ]
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    subtitle: 'Proposal dispatch & automated email follow-ups',
    icon: Mail,
    badge: 'Email Workflows',
    description: 'Dispatch branded quotes, commercial contracts, onboarding guides, and smart follow-up emails triggered by phone call dispositions.',
    image: '/sales-management-dashboard.jpg',
    imageAlt: 'Email automation and quotation dispatch system',
    audioSample: null,
    workflow: {
      trigger: {
        step: '01',
        title: 'Quote or Info Requested',
        desc: 'Prospect asks for detailed pricing or proposal during a phone conversation or web signup.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Dynamic Proposal Generation',
        desc: 'AI engine formats commercial proposal with customer volumes, discounts, and terms, sending within 2 minutes.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Engagement Tracking Logged',
        desc: 'Email opens, clicks on proposal link, and view duration tracked in CRM pipeline.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: 'Shortened Sales Cycle',
        desc: 'Sales rep notified when prospect views quote, enabling perfectly timed follow-up calls.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Dispatch Lag', value: '2 mins' },
      { label: 'Tracking Accuracy', value: 'Real-time' },
      { label: 'Cycle Reduction', value: '40%' }
    ]
  },
  {
    id: 'crm-automation',
    title: 'CRM Automation',
    subtitle: 'Auto-lead entry, pipeline stages & task triggers',
    icon: Database,
    badge: 'CRM Engine',
    description: 'Keep your sales and support pipeline 100% updated automatically. No manual data entry, no forgotten tasks, and full conversation audit trails.',
    image: '/crm-platform-pricing-promo.png',
    imageAlt: 'Avyukta CRM automated lead pipeline and tracking system',
    audioSample: null,
    workflow: {
      trigger: {
        step: '01',
        title: 'Multi-Channel Customer Event',
        desc: 'Any touchpoint occurs across voice call, WhatsApp chat, email, or website visitor interaction.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Instant Data Extraction',
        desc: 'AI parses intent, extracts contact names, requirements, and budget, and updates deal stage in real time.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: '360° Profile Enrichment',
        desc: 'Contact profile enriched with call recordings, transcripts, WhatsApp history, and automated tasks.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: 'Zero Manual CRM Data Entry',
        desc: 'Reps spend 100% of their time closing deals instead of logging notes; pipeline accuracy hits 99.9%.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Manual Entry', value: '0 hours' },
      { label: 'Pipeline Accuracy', value: '99.9%' },
      { label: 'Lead Leakage', value: '0%' }
    ]
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation & Follow-ups',
    subtitle: 'High-speed automated lead outreach & nurturing',
    icon: Target,
    badge: 'Outreach & Nurture',
    description: 'Reach thousands of prospective customers daily with automated voice, WhatsApp, and SMS drips. Re-engage cold leads with multi-touch cadences.',
    image: '/crm-employee-dashboard.jpg',
    imageAlt: 'Lead generation and automated follow-up cadences',
    audioSample: '/samples/gold-2.mp3',
    audioTitle: 'Lead Re-engagement Call Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Campaign List Uploaded',
        desc: 'Marketing uploads trade show leads or integration receives Facebook/Google ad leads.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Multi-Touch Calling Cadence',
        desc: 'AI dialer engages leads at preferred time slots using local STD CLI (011, 022, 080) for highest answer rates.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Disposition & Nurture Tier',
        desc: 'Unanswered calls scheduled for retry; interested leads moved to "Hot Pipeline" with immediate alert.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '4x More Conversations',
        desc: 'Over 80% of campaign leads engaged within 24 hours, turning cold databases into active revenue.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Contact Velocity', value: '4x faster' },
      { label: 'Connect Rate', value: '48%' },
      { label: 'Lead ROI', value: '+240%' }
    ]
  },
  {
    id: 'hr-recruitment',
    title: 'HR & Recruitment Automation',
    subtitle: 'Candidate telephonic screening & interview scheduling',
    icon: Users,
    badge: 'HR & Talent',
    description: 'Screen hundreds of job applicants over automated phone calls in minutes. Check qualifications, notice periods, and book interviews automatically.',
    image: '/crm-employee-dashboard.jpg',
    imageAlt: 'HR recruitment candidate screening and interview scheduling dashboard',
    audioSample: '/samples/gold-4.mp3',
    audioTitle: 'Candidate Pre-Screening Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Application Received',
        desc: 'Candidate applies on LinkedIn, job portals, or company careers page.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Automated Phone Screening',
        desc: 'AI Interviewer calls candidate to verify years of experience, current CTC, expected CTC, and notice period.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'HRMS Scorecard Created',
        desc: 'Candidate responses transcribed, structured into a resume scorecard, and categorized in HRMS.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: 'Pre-Vetted Interview Lineup',
        desc: 'HR recruiters interview only pre-screened qualified candidates, cutting time-to-hire by 70%.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Screening Time', value: '< 3 mins' },
      { label: 'Time-to-Hire', value: '-70%' },
      { label: 'HR Productivity', value: '5x boost' }
    ]
  },
  {
    id: 'helpdesk-ticketing',
    title: 'Helpdesk & Ticketing Automation',
    subtitle: 'SLA escalation, supervisor alerts & ticket routing',
    icon: LifeBuoy,
    badge: 'Helpdesk & SLA',
    description: 'Auto-route support tickets, monitor SLA resolution countdowns, trigger multi-level supervisor escalation, and update customers via SMS/WhatsApp.',
    image: '/avyukta-communications-dashboard.png',
    imageAlt: 'Helpdesk ticketing and live SLA escalation management',
    audioSample: '/samples/platinum-3.mp3',
    audioTitle: 'Priority Helpdesk Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Ticket Raised / Escalation Alert',
        desc: 'Customer reports an outage or unresolved ticket approaches 80% of SLA deadline.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Smart Severity Routing',
        desc: 'System notifies available level-2 engineers, triggers phone call alerts, and reallocates resources.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'SLA Clock & Activity Log',
        desc: 'Ticket status updated to "High Priority Escalation"; supervisor notified on WhatsApp and email.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '99.5% SLA Compliance',
        desc: 'Zero ticket breaches, full regulatory audit trails, and proactive customer resolution notifications.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'SLA Adherence', value: '99.5%' },
      { label: 'MTTR', value: '-65%' },
      { label: 'Escalation Speed', value: 'Instant' }
    ]
  },
  {
    id: 'payment-followups',
    title: 'Payment & Invoice Follow-ups',
    subtitle: 'Polite reminder calls & instant payment links',
    icon: CreditCard,
    badge: 'Collections & Billing',
    description: 'Automate overdue invoice reminders and payment collections with polite AI voice calls that send instant WhatsApp/SMS UPI payment links.',
    image: '/pricingai.png',
    imageAlt: 'Payment collections and invoice reminder automation',
    audioSample: '/samples/gold-2.mp3',
    audioTitle: 'Invoice Reminder Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Invoice Due or Overdue',
        desc: 'Accounting ERP or billing software identifies invoice due in 2 days or overdue by 7 days.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Courteous AI Payment Call',
        desc: 'AI Assistant calls accounting contact, confirms invoice receipt, offers online payment, and sends WhatsApp link.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Promise-to-Pay Date Logged',
        desc: 'Customer confirmation ("Paying tomorrow via UPI") logged to billing ledger with audio proof.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '40% Faster Collections',
        desc: 'Recover revenue faster, eliminate awkward collection calls for staff, and preserve customer goodwill.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'DSO Reduction', value: '40%' },
      { label: 'Collection Rate', value: '78%' },
      { label: 'Manual Effort', value: 'Zero' }
    ]
  },
  {
    id: 'dialer-telephony',
    title: 'Dialer & Telephony Automation',
    subtitle: 'Predictive cloud dialer & call-drop filtering',
    icon: PhoneForwarded,
    badge: 'Telecom Cloud',
    description: 'High-speed cloud predictive dialing with sub-second call connect, answering machine detection (AMD), and carrier-grade 99.99% uptime.',
    image: '/dialer-india-hero.jpg',
    imageAlt: 'Enterprise cloud dialer and call center telephony setup',
    audioSample: '/samples/silver-1.mp3',
    audioTitle: 'Predictive Dialer Channel Demo',
    workflow: {
      trigger: {
        step: '01',
        title: 'Agent Login / Campaign Start',
        desc: 'Telecalling agents log in to web phone; campaign dialing parameters initiate.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Sub-Second Predictive Dialing',
        desc: 'Dialer algorithm places concurrent calls, filters out busy/disconnected numbers, and connects answered calls to free agents.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Call Telemetry & Recording',
        desc: 'Agent talk time, wait time, call disposition, and audio recording saved with sub-second accuracy.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '300% Higher Agent Talk Time',
        desc: 'Agents spend 45+ minutes per hour talking to real prospects instead of hearing ringtones and busy signals.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Agent Talk Time', value: '45+ min/hr' },
      { label: 'AMD Accuracy', value: '97%' },
      { label: 'Telephony Uptime', value: '99.99%' }
    ]
  },
  {
    id: 'business-workflow',
    title: 'Business Workflow Automation',
    subtitle: 'Cross-department BPA, webhooks & ERP bridges',
    icon: Workflow,
    badge: 'Process Automation',
    description: 'Connect enterprise telephony, ERP, inventory, WhatsApp, SMS, and accounting into automated multi-step business journeys.',
    image: '/avyukta-platform-workflow.png',
    imageAlt: 'Multi-stage business workflow automation architecture',
    audioSample: null,
    workflow: {
      trigger: {
        step: '01',
        title: 'Cross-System Event Trigger',
        desc: 'New deal won in CRM, purchase order generated, or customer onboarding started.',
        badge: 'Trigger',
        accent: '#f59e0b'
      },
      aiAction: {
        step: '02',
        title: 'Multi-Department Orchestration',
        desc: 'Avyukta BPA engine triggers automated actions across billing, inventory, WhatsApp welcome drips, and account manager tasks.',
        badge: 'AI Action',
        accent: '#0b99a7'
      },
      crmUpdate: {
        step: '03',
        title: 'Unified Journey Milestone',
        desc: 'Milestones logged across departments with supervisor notifications and automated audit trails.',
        badge: 'CRM Update',
        accent: '#3b82f6'
      },
      finalResult: {
        title: '100% Error-Free Operations',
        desc: 'Eliminate human bottlenecks, miscommunications, and delays across departments with autonomous execution.',
        badge: 'Final Result',
        accent: '#10b981'
      }
    },
    metrics: [
      { label: 'Execution Lag', value: '0 mins' },
      { label: 'Error Rate', value: '0%' },
      { label: 'Process Speed', value: '10x' }
    ]
  }
];

export default function AutomationShowcase({ navigateTo }) {
  const [selectedId, setSelectedId] = useState('sales-calling');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const selectedCategory = AUTOMATION_CATEGORIES.find(c => c.id === selectedId) || AUTOMATION_CATEGORIES[0];
  const { workflow } = selectedCategory;

  // Handle category change (stops audio immediately)
  const handleSelectCategory = (id) => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioCurrentTime(0);
    setSelectedId(id);
  };

  // Toggle audio playback
  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!audioRef.current || !selectedCategory.audioSample) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.src = getAssetUrl(selectedCategory.audioSample);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Update audio progress bar
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setAudioCurrentTime(current);
    setAudioProgress((current / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setAudioDuration(audioRef.current.duration || 0);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
    setAudioCurrentTime(0);
  };

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const nav = (e, path) => {
    e.preventDefault();
    if (navigateTo) navigateTo(path);
  };

  return (
    <section id="automation-showcase" className="automation-showcase-section" aria-label="What do you want to automate?">
      {/* Hidden audio element for genuine voice playback */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        preload="none"
      />

      <div className="studio-container">
        
        {/* ========================================================= */}
        {/* 1. MAIN SECTION HEADER                                    */}
        {/* ========================================================= */}
        <div className="auto-section-heading">
          <Eyebrow>ENTERPRISE AUTOMATION SUITE</Eyebrow>
          <h2 className="auto-section-title">
            What do you want to <span className="studio-accent">automate?</span>
          </h2>
          <p className="auto-section-subtitle">
            Explore 12 turnkey business automations powered by Avyukta&apos;s conversational AI agents, telephony cloud, and 360° CRM workflows. Select any category to view its step-by-step visual workflow and live demonstration.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. INTERACTIVE 12 CATEGORY CARDS GRID                    */}
        {/* ========================================================= */}
        <div className="auto-categories-grid" role="tablist" aria-label="Automation Categories">
          {AUTOMATION_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                id={`tab-auto-${cat.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-auto-${cat.id}`}
                tabIndex={0}
                className={`auto-category-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectCategory(cat.id)}
              >
                <div className="auto-card-icon-wrap">
                  <Icon size={20} className="auto-card-icon" />
                </div>
                <div className="auto-card-text">
                  <span className="auto-card-title">{cat.title}</span>
                  <span className="auto-card-badge">{cat.badge}</span>
                </div>
                {isSelected && <span className="auto-card-active-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 3. DETAILED WORKFLOW & DEMONSTRATION WORKSPACE            */}
        {/* ========================================================= */}
        <div 
          id={`panel-auto-${selectedCategory.id}`}
          className="auto-detail-workspace animate-fade-in"
          role="tabpanel"
          aria-labelledby={`tab-auto-${selectedCategory.id}`}
          key={selectedCategory.id}
        >
          
          {/* Top Info Banner */}
          <div className="auto-workspace-header">
            <div className="auto-header-left">
              <span className="auto-pill-badge">{selectedCategory.badge}</span>
              <h3 className="auto-workspace-title">{selectedCategory.title}</h3>
              <p className="auto-workspace-desc">{selectedCategory.description}</p>
            </div>

            {/* Performance Metrics */}
            <div className="auto-metrics-strip">
              {selectedCategory.metrics.map((m, idx) => (
                <div key={idx} className="auto-metric-item">
                  <span className="auto-metric-val">{m.value}</span>
                  <span className="auto-metric-lbl">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. VISUAL WORKFLOW: Trigger -> AI Action -> CRM -> Result  */}
          {/* ========================================================= */}
          <div className="auto-workflow-chain-block">
            <div className="auto-workflow-chain-title">
              <Sparkles size={16} className="text-accent" />
              <span>END-TO-END AUTOMATION FLOW</span>
            </div>

            <div className="auto-workflow-steps-row">
              
              {/* Step 1: Trigger */}
              <div className="auto-step-card trigger-step">
                <div className="auto-step-header">
                  <span className="step-num" style={{ color: workflow.trigger.accent }}>
                    {workflow.trigger.step}
                  </span>
                  <span className="step-tag" style={{ background: 'rgba(245, 158, 11, 0.1)', color: workflow.trigger.accent }}>
                    <Zap size={12} /> {workflow.trigger.badge}
                  </span>
                </div>
                <h4 className="auto-step-title">{workflow.trigger.title}</h4>
                <p className="auto-step-desc">{workflow.trigger.desc}</p>
              </div>

              <div className="auto-workflow-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </div>

              {/* Step 2: AI Action */}
              <div className="auto-step-card ai-step">
                <div className="auto-step-header">
                  <span className="step-num" style={{ color: workflow.aiAction.accent }}>
                    {workflow.aiAction.step}
                  </span>
                  <span className="step-tag" style={{ background: 'rgba(11, 153, 167, 0.1)', color: workflow.aiAction.accent }}>
                    <Bot size={12} /> {workflow.aiAction.badge}
                  </span>
                </div>
                <h4 className="auto-step-title">{workflow.aiAction.title}</h4>
                <p className="auto-step-desc">{workflow.aiAction.desc}</p>
              </div>

              <div className="auto-workflow-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </div>

              {/* Step 3: CRM Update */}
              <div className="auto-step-card crm-step">
                <div className="auto-step-header">
                  <span className="step-num" style={{ color: workflow.crmUpdate.accent }}>
                    {workflow.crmUpdate.step}
                  </span>
                  <span className="step-tag" style={{ background: 'rgba(59, 130, 246, 0.1)', color: workflow.crmUpdate.accent }}>
                    <Database size={12} /> {workflow.crmUpdate.badge}
                  </span>
                </div>
                <h4 className="auto-step-title">{workflow.crmUpdate.title}</h4>
                <p className="auto-step-desc">{workflow.crmUpdate.desc}</p>
              </div>

              <div className="auto-workflow-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </div>

              {/* Step 4: Final Result */}
              <div className="auto-step-card result-step">
                <div className="auto-step-header">
                  <span className="step-num" style={{ color: workflow.finalResult.accent }}>
                    {workflow.finalResult.step}
                  </span>
                  <span className="step-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: workflow.finalResult.accent }}>
                    <CheckCircle2 size={12} /> {workflow.finalResult.badge}
                  </span>
                </div>
                <h4 className="auto-step-title">{workflow.finalResult.title}</h4>
                <p className="auto-step-desc">{workflow.finalResult.desc}</p>
              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* 5. VISUAL ARCHITECTURE & VOICE DEMO DUAL PANEL           */}
          {/* ========================================================= */}
          <div className="auto-visual-demo-grid">
            
            {/* Visual Screenshot / Diagram */}
            <div className="auto-media-container">
              <div className="auto-media-header">
                <span>SYSTEM ARCHITECTURE PREVIEW</span>
                <span className="media-zoom-hint">Click image to inspect</span>
              </div>
              <div className="auto-media-frame">
                <img 
                  src={getAssetUrl(selectedCategory.image)} 
                  alt={selectedCategory.imageAlt}
                  className="auto-full-image"
                  data-zoom="true"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Voice Demonstration & Action Controls */}
            <div className="auto-demo-sidebar">
              {selectedCategory.audioSample ? (
                <div className="auto-voice-demo-card">
                  <div className="voice-demo-top">
                    <div className="voice-demo-status">
                      <span className="status-live-beacon" />
                      <span className="status-txt">READY TO DEMO</span>
                    </div>
                    <span className="voice-tier-tag">Neural Indian Audio</span>
                  </div>

                  <h4 className="voice-demo-title">{selectedCategory.audioTitle}</h4>
                  <p className="voice-demo-desc">
                    Listen to a real prerecorded conversational voice interaction for this automation workflow.
                  </p>

                  {/* Audio Controls */}
                  <div className="voice-player-widget">
                    <button 
                      type="button" 
                      className={`voice-play-round-btn ${isPlaying ? 'is-playing' : ''}`}
                      onClick={toggleAudio}
                      aria-label={isPlaying ? 'Pause audio demo' : 'Play audio demo'}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                    </button>

                    <div className="voice-timeline-wrap">
                      <div className="voice-time-row">
                        <span className="time-val">{formatTime(audioCurrentTime)}</span>
                        <span className="time-divider">/</span>
                        <span className="time-val">{formatTime(audioDuration || 14)}</span>
                      </div>
                      
                      {/* Audio Progress Bar */}
                      <div className="voice-track-bar">
                        <div 
                          className="voice-track-fill" 
                          style={{ width: `${audioProgress}%` }} 
                        />
                      </div>
                    </div>

                    <div className={`voice-wave-anim ${isPlaying ? 'active' : ''}`} aria-hidden="true">
                      <span /><span /><span /><span /><span />
                    </div>
                  </div>

                  <div className="voice-demo-features">
                    <span><CheckCircle2 size={14} className="text-accent" /> Sub-500ms Turn Cadence</span>
                    <span><CheckCircle2 size={14} className="text-accent" /> Human-Like Interruption Handling</span>
                    <span><CheckCircle2 size={14} className="text-accent" /> Indian Dialects &amp; English</span>
                  </div>
                </div>
              ) : (
                <div className="auto-nonaudio-card">
                  <div className="nonaudio-top">
                    <Sparkles size={18} className="text-accent" />
                    <span>ZERO-CODE INTEGRATION</span>
                  </div>
                  <h4>Autonomous Workflow Engine</h4>
                  <p>
                    This automation executes silently in the background across your communication channels with zero manual human intervention required.
                  </p>
                  <ul className="nonaudio-points">
                    <li><CheckCircle2 size={14} className="text-accent" /> Real-time webhook listeners</li>
                    <li><CheckCircle2 size={14} className="text-accent" /> Meta WhatsApp Business official API</li>
                    <li><CheckCircle2 size={14} className="text-accent" /> Two-way CRM contact synchronization</li>
                  </ul>
                </div>
              )}

              {/* Consultation / CTA Card */}
              <div className="auto-cta-box">
                <h4>Deploy this automation for your business</h4>
                <p>Our solutions team will configure your custom call flows, language scripts, and CRM integration.</p>
                <a 
                  href="/contact" 
                  className="studio-btn studio-btn-primary auto-deploy-btn"
                  onClick={e => nav(e, '/contact')}
                >
                  Request {selectedCategory.title} Demo <ArrowUpRight size={16} />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
