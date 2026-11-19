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
  { id: 'what', q: 'What is an AI calling assistant?', a: 'An assistant that speaks with customers using a call flow and business information you approve. Common uses include answering routine questions, understanding an enquiry and helping arrange the next step with your team.' },
  { id: 'listen', q: 'Can I listen before sharing my details?', a: 'Yes. Play the prerecorded samples without signing up or enabling your microphone. They demonstrate voice sound; request a tailored demo to test a two-way business conversation.' },
  { id: 'tiers', q: 'How are Silver, Gold and Platinum different?', a: 'They offer different voice choices and indicative rates. Silver is a starting point for everyday conversations, Gold offers Indian-language voice options, and Platinum focuses on expressive voices. Confirm languages, features and setup in your quotation.' },
  { id: 'languages', q: 'Which languages can I use?', a: 'Availability depends on the voice and configuration. Tell us the language and accent your customers use so we can demonstrate a suitable voice before you commit.' },
  { id: 'cost', q: 'What is included in the price?', a: 'AI-only rates exclude the phone connection and WhatsApp services. Calling packages depend on the quoted scope. GST, fixed charges, number rental, deposits, minimum recharge and volume commitments may apply. Ask for a complete first-month and ongoing monthly estimate.' },
  { id: 'billing', q: 'How is call time billed?', a: 'The referenced offer uses a 30-second minimum for connected calls, then six-second increments. A 10-second call bills as 30 seconds and a 31-second call as 36 seconds. Confirm the applicable AI and carrier rules in your quote.' },
  { id: 'unanswered', q: 'Do unanswered calls cost anything?', a: 'The referenced AI offer does not charge AI minutes for busy, failed or unanswered calls. Your phone provider may have separate charges; confirm those for your setup.' },
  { id: 'information', q: 'Can it use my business information?', a: 'Share the information and questions you want covered. Our team will review supported sources, help configure the call flow and explain how updates are handled.' },
  { id: 'handoff', q: 'What if a caller needs a person?', a: 'Discuss human transfer and follow-up options during your demo. Handoff depends on your calling setup and team availability. Agree on what happens when the assistant cannot answer before launch.' },
  { id: 'integration', q: 'Can it work with my CRM or WhatsApp?', a: 'Supported integrations can connect call activity and customer follow-ups. Tell us which tools you use so we can confirm compatibility, configuration work and any additional charges.' },
  { id: 'demo', q: 'How do I try it for my business?', a: 'Choose a voice and request a demo. Tell us your use case and preferred language. Our team can help you explore a call flow and confirm any trial eligibility and limits.' },
  { id: 'refund', q: 'Can I pause or request a refund?', a: 'Confirm the cancellation, unused-credit and refund conditions for your specific offer before adding credit. Review our policies alongside your final quotation.' },
];
