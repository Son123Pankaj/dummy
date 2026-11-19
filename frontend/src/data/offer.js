import manifest from '../../public/samples/manifest.json';

// Existing repository commercials; estimates pending business approval.
export const PLANS = [
  { id: 'bronze', name: 'Bronze', label: 'Basic voice assistant', description: 'Essential voice assistant for routine FAQs and notifications.', modular: 3.5, bundle: 5.5, icon: 'B', features: ['Explore standard clear voices', 'Automated reminders & routine answering', 'Sub-500ms voice turn cadence'] },
  { id: 'silver', name: 'Silver', label: 'Everyday conversations', description: 'A starting point for routine enquiries and reminders.', modular: 5, bundle: 7, icon: 'S', features: ['Explore natural voice options', 'Discuss your inbound or outbound call flow', 'Review the setup with our team'] },
  { id: 'gold', name: 'Gold', label: 'Indian-language voices', description: 'Explore voices for conversations closer to your customers.', modular: 9, bundle: 11.5, icon: 'G', features: ['Explore Indian-language voice options', 'Discuss lead follow-ups and bookings', 'Confirm language support for your use case'] },
  { id: 'platinum', name: 'Platinum', label: 'Expressive brand voices', description: 'Explore expressive voices for conversations where tone matters.', modular: 11, bundle: 13.5, icon: 'P', features: ['Compare expressive studio voices', 'Discuss custom voice requirements', 'Confirm the right setup for your brand'] },
];
export const MODELS = {
  modular: { label: 'AI usage only', detail: 'Phone connection, number rental and WhatsApp services are charged separately.' },
  bundle: { label: 'AI + calling package', detail: 'Package scope, phone charges, CRM and WhatsApp allowances must be confirmed in your quote.' },
};
export const COMMERCIAL_NOTE = 'Indicative rates from the existing offer, excluding GST. Referenced offers require a ₹10,000 initial recharge and may require 1,00,000+ minutes per month. Confirm eligibility, fixed fees, deposits and complete cost before activation.';
export const SAMPLES = PLANS.flatMap(plan => manifest[plan.id].map((sample, index) => ({ id: `${plan.id}-${index + 1}`, plan: plan.id, tier: plan.name, name: sample.name.replaceAll('_', ' '), src: `/samples/${sample.file}` })));
export const rateLabel = value => Number(value).toFixed(2);
export const demoUrl = (plan = '', voice = '') => `/contact?${new URLSearchParams({ ...(plan && { plan }), ...(voice && { voice }) })}`;
export const normalizePlan = value => value === 'diamond' ? 'platinum' : PLANS.some(plan => plan.id === value) ? value : '';
export { VOLUME_BANDS, volumeBandFor, billableSeconds } from './pricingRules';
export const CUSTOMER_FAQS = [
  // 1. AI Capabilities & Features
  { 
    id: 'ai-assistant-core', 
    category: 'AI Capabilities & Features',
    q: 'What is an Avyukta AI calling assistant and how does it handle business conversations?', 
    a: 'An Avyukta AI calling assistant is an autonomous conversational agent that speaks naturally with your callers using speech synthesis, natural language understanding, and telecom infrastructure you approve. It handles routine customer inquiries, qualifies leads, schedules appointments, and sends instant post-call follow-ups with human-level comprehension and sub-500ms voice turn cadence.' 
  },
  { 
    id: 'ai-inbound-outbound', 
    category: 'AI Capabilities & Features',
    q: 'Can AI voice agents handle both inbound and outbound calling campaigns?', 
    a: 'Yes. Avyukta AI workflows support high-concurrency outbound campaigns (such as lead qualification, EMI reminders, COD order verifications, and event invitations) as well as 24/7 inbound reception for customer care, technical triage, and general business inquiries.' 
  },
  { 
    id: 'ai-latency-cadence', 
    category: 'AI Capabilities & Features',
    q: 'How fast is the conversational response time, and can callers interrupt the AI naturally?', 
    a: 'Avyukta voice agents operate with ultra-low sub-500ms voice turn cadence, allowing real-time bidirectional conversations. The platform features native full-duplex audio and interruption handling: when a caller speaks or interrupts mid-sentence, the AI immediately pauses, listens, and responds contextually without speaking over them.' 
  },

  // 2. Pricing & Voice Samples
  { 
    id: 'pricing-listen-samples', 
    category: 'Pricing & Voice Samples',
    q: 'Can I listen to genuine voice samples before committing or sharing details?', 
    a: 'Yes. You can listen to genuine prerecorded voice samples across our Bronze, Silver, Gold, and Platinum tiers directly in the Voice Library without signing up, entering card details, or granting microphone permissions. For custom domain testing, you can schedule a tailored live demonstration.' 
  },
  { 
    id: 'pricing-tier-structure', 
    category: 'Pricing & Voice Samples',
    q: 'How are Bronze, Silver, Gold, and Platinum pricing tiers structured?', 
    a: 'Our pricing tiers reflect voice fidelity and intelligence: Bronze (₹3.50/min modular | ₹5.50/min bundle) provides clear voices for routine FAQs; Silver (₹5.00/min modular | ₹7.00/min bundle) delivers natural conversational everyday voices; Gold (₹9.00/min modular | ₹11.50/min bundle) offers multilingual Indian-language voices; Platinum (₹11.00/min modular | ₹13.50/min bundle) features studio-grade expressive voices with sentiment intelligence and dedicated telecom SLAs.' 
  },
  { 
    id: 'pricing-modular-vs-bundle', 
    category: 'Pricing & Voice Samples',
    q: 'What is the difference between Modular (AI only) and Bundle (AI + calling) pricing?', 
    a: 'Modular pricing covers AI conversational compute only, allowing you to connect your own SIP trunks, PRI lines, or existing carrier infrastructure. The all-in-one Bundle combines AI voice minutes with carrier telecom routing, Pan-India STD CLI, CRM integration allowances, and Meta-verified WhatsApp notifications in a consolidated package.' 
  },
  { 
    id: 'pricing-billing-pulse', 
    category: 'Pricing & Voice Samples',
    q: 'How is call duration billed, and do unanswered or busy calls incur charges?', 
    a: 'Connected calls are calculated using standard telecom pulse rules (30-second initial minimum, followed by 6-second increments). Unanswered, failed, or busy calls incur zero AI charges (₹0). Specific carrier connection rules and minimum recharge terms are confirmed in your written quotation.' 
  },

  // 3. Industries & Business Applications
  { 
    id: 'industry-applications', 
    category: 'Industries & Business Applications',
    q: 'Which industries and business workflows benefit most from Avyukta AI?', 
    a: 'Avyukta powers mission-critical calling across BPOs & Contact Centers (high-volume predictive dialing), BFSI & Fintech (EMI collection reminders, loan eligibility), Real Estate (property enquiry qualification, site visit bookings), Healthcare (appointment scheduling, OPD reminders), E-commerce (COD order verification, RTO reduction), and Education (student admissions counseling).' 
  },
  { 
    id: 'industry-languages-dialects', 
    category: 'Industries & Business Applications',
    q: 'Can Avyukta AI assistants communicate in Indian languages and regional dialects?', 
    a: 'Yes. Avyukta offers comprehensive multilingual voice workflows, including English, Hindi, Hinglish, Marathi, Tamil, Telugu, Gujarati, Bengali, and Kannada. The AI adapts to regional pronunciation, accents, and colloquial phrases based on your target audience.' 
  },

  // 4. Why Choose Avyukta?
  { 
    id: 'why-choose-avyukta', 
    category: 'Why Choose Avyukta?',
    q: 'Why choose Avyukta IntelliCall over generic AI bot and chatbot providers?', 
    a: 'Unlike software-only wrappers that rely on consumer WebRTC, Avyukta brings 20+ years of telecom engineering pedigree, licensed Tier-1 carrier interconnects (Airtel, Tata Tele Services), carrier-grade 99.99% uptime SLAs, Pan-India STD CLI caller IDs, on-premise or cloud deployment flexibility, and dedicated senior telecom engineers who configure end-to-end routing.' 
  },
  { 
    id: 'why-human-escalation', 
    category: 'Why Choose Avyukta?',
    q: 'What happens when a caller asks a complex question or requests a human agent?', 
    a: 'Avyukta voice agents support instant intelligent human transfer. When a caller requests a supervisor, or when sentiment/intent thresholds indicate complex support is needed, the call is transferred in 1 click to your human agents or queue, complete with live transcript notes and customer CRM context.' 
  },

  // 5. Business Process Automation
  { 
    id: 'bpa-workflow-connection', 
    category: 'Business Process Automation',
    q: 'What is Business Process Automation (BPA) and how does it connect with voice calls?', 
    a: 'Avyukta BPA triggers automated business workflows before, during, and after a call. For instance, when a customer books a property visit during an AI call, BPA instantly updates your CRM stage, sends a WhatsApp confirmation with Google Maps location, generates an agent calendar invite, and alerts the sales manager via email.' 
  },

  // 6. CRM, Integrations & Reporting
  { 
    id: 'crm-integrations-supported', 
    category: 'CRM, Integrations & Reporting',
    q: 'Does Avyukta integrate with our existing CRM and third-party tools?', 
    a: 'Yes. Avyukta integrates seamlessly with Zoho CRM, Salesforce, Bitrix24, LeadSquared, HubSpot, Freshdesk, and proprietary enterprise ERPs via bi-directional REST APIs and webhooks. Call dispositions, recordings, and custom field updates sync instantly.' 
  },
  { 
    id: 'crm-whatsapp-postcall', 
    category: 'CRM, Integrations & Reporting',
    q: 'Can post-call summaries, audio recordings, and transcripts be sent to WhatsApp?', 
    a: 'Yes. Through our official Meta WhatsApp Business API integration, the system can automatically send the caller an instant post-call summary, document download link, brochure, or booking confirmation immediately after call termination.' 
  },
  { 
    id: 'crm-reporting-command-center', 
    category: 'CRM, Integrations & Reporting',
    q: 'What real-time analytics, call disposition reports, and monitoring are available?', 
    a: 'Avyukta provides a comprehensive Command Center dashboard with live concurrent call metrics, average handling time (AHT), speech sentiment analysis, call disposition breakdowns (converted, follow-up, not interested), agent occupancy, and full audio recordings with searchable transcripts.' 
  },

  // 7. Platform Demonstrations & Support
  { 
    id: 'demo-scheduling-process', 
    category: 'Platform Demonstrations & Support',
    q: 'How do I schedule a live business demonstration with our specific call flows?', 
    a: 'You can request a live demonstration by clicking Talk to an Expert or calling +91 85600 00600. Share your campaign requirements, sample scripts, and preferred languages, and our solutions architects will demonstrate a functioning prototype configured for your business.' 
  },
  { 
    id: 'support-carrier-sla', 
    category: 'Platform Demonstrations & Support',
    q: 'What technical support, onboarding, and carrier SLAs are included?', 
    a: 'All enterprise accounts receive dedicated onboarding assistance, custom call flow configuration, SIP trunk testing, and 24/7 telecom network operations center (NOC) monitoring with guaranteed 99.99% carrier uptime SLAs.' 
  },
  { 
    id: 'commercial-refund-terms', 
    category: 'Platform Demonstrations & Support',
    q: 'What are the commercial terms, recharge policies, and trial options?', 
    a: 'Services are offered on transparent modular or bundle terms with an initial recharge balance. Detailed cancellation terms, volume discounts, and refundable guarantee provisions are outlined transparently in your official quotation.' 
  }
];
