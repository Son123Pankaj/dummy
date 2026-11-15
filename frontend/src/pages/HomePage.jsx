import React, { useState } from 'react';
import { ArrowUpRight, AudioLines, Bot, PhoneForwarded, MessagesSquare, Check, Layers3, Globe2, Sparkles, ShieldCheck, Headphones } from 'lucide-react';
import StudioVoiceDemo from '../components/StudioVoiceDemo';
import VoiceAssistantPreview from '../components/VoiceAssistantPreview';
import FaqSection from '../components/FaqSection';
import PricingTopicMarquee from '../components/PricingTopicMarquee';
import { HOME_FAQS } from '../components/pageFaqData';
import { Eyebrow, SectionHeading, FeatureCard, StudioButton, BottomCta } from '../components/StudioParts';
import { getAssetUrl } from '../utils/assetUrl';

const core = [
  { icon: Bot, category:'01 / CONVERSATIONAL AI', title:'AI voice agents', text:'Human-like conversations for lead qualification, appointments, follow-ups and customer care.', items:['Inbound + outbound calls','Multilingual voice workflows'], path:'/ai-caller' },
  { icon: PhoneForwarded, category:'02 / CLOUD TELEPHONY', title:'Cloud dialer', text:'Everything your agents need to connect faster, with call routing, monitoring and reporting in one place.', items:['Predictive + progressive dialing','SIP, DID and IVR'], path:'/cloud-dialer' },
  { icon: MessagesSquare, category:'03 / CONNECTED CUSTOMER DATA', title:'CRM & WhatsApp', text:'Keep leads, call histories, WhatsApp conversations and follow-ups connected across your team.', items:['Lead lifecycle visibility','Automated handoffs'], path:'/whatsapp-crm' }
];
const HOW = [
  { n:'01', title:'Connect your channels', text:'Bring your numbers, calling workflows and customer information into one place.' },
  { n:'02', title:'Shape the conversation', text:'Configure an AI agent, call flow or campaign around what your customers actually need.' },
  { n:'03', title:'Improve every interaction', text:'Review conversations, track outcomes and route complex cases to the right people.' }
];
export default function HomePage({ navigateTo }) {
  const [pricingCase, setPricingCase] = useState('A');
  const nav = (e, to) => { e.preventDefault(); navigateTo(to); };
  const voicePlans = [
    { id: 'silver', name: 'Silver', rate: pricingCase === 'A' ? '3.00' : '5.00', description: 'Natural conversational voices' },
    { id: 'gold', name: 'Gold · Popular', rate: pricingCase === 'A' ? '5.80' : '7.00', description: 'Fast, multilingual conversations' },
    { id: 'diamond', name: 'Diamond', rate: pricingCase === 'A' ? '10.00' : '11.00', description: 'Studio-grade expressive voices' }
  ];
  return <div className="studio-page studio-home">
    <section className="studio-hero"><div className="studio-hero-noise" aria-hidden="true"/><div className="studio-container studio-hero-grid">
      <div className="studio-hero-copy"><Eyebrow>AI VOICE & CONNECTED COMMUNICATIONS</Eyebrow>
        <h1>Better conversations.<br/><span>Built for scale.</span></h1>
        <p>Meet the smarter way to talk to customers. AI voice agents, cloud calling and connected CRM—beautifully brought together in one business-ready platform.</p>
        <div className="studio-actions"><StudioButton href="/contact" onClick={e=>nav(e,'/contact')}>Talk to our team</StudioButton><StudioButton href="/pricing" secondary onClick={e=>nav(e,'/pricing')}>Explore pricing</StudioButton></div>
        <div className="studio-hero-proof"><div className="studio-hero-proof-icon"><ShieldCheck size={22}/></div><p><strong>Built on real telecom experience</strong><span>Reliable infrastructure. Thoughtful automation. Human support when it matters.</span></p></div>
      </div>
      <div className="studio-hero-visual"><div className="studio-hero-glow" aria-hidden="true"/><div className="studio-photo-card"><img src={getAssetUrl('/carousel-slide2.jpg')} alt="Customer communication professional using a headset in a modern office"/><div className="studio-photo-overlay"><span className="studio-photo-live"><i/> AI + HUMAN INTELLIGENCE</span><div className="studio-photo-insight"><AudioLines size={21}/><span>Conversations that feel natural.<br/>Outcomes that make sense.</span></div></div></div><div className="studio-hero-demo"><StudioVoiceDemo compact /></div><div className="studio-hero-orbit" aria-hidden="true"><Sparkles size={20}/></div></div>
    </div></section>
    <section className="studio-benefit-strip"><div className="studio-container"><p>ONE CONNECTED COMMUNICATION ECOSYSTEM</p><div className="studio-benefit-items"><span><Bot size={19}/> AI voice</span><span><Headphones size={19}/> Cloud calling</span><span><Layers3 size={19}/> CRM integration</span><span><Globe2 size={19}/> Global connectivity</span></div></div></section>
    <VoiceAssistantPreview />
    <section className="studio-section studio-price-teaser studio-home-pricing"><div className="studio-container"><div className="studio-home-pricing-heading"><Eyebrow>STRAIGHTFORWARD PRICING</Eyebrow><h2>Find the right <span className="studio-accent">AI voice plan.</span></h2><p>Compare AI voice rates. GST extra.</p></div><div className="studio-home-pricing-toggle" role="group" aria-label="Choose pricing model"><button type="button" className={pricingCase==='A'?'active':''} aria-pressed={pricingCase==='A'} onClick={()=>setPricingCase('A')}><span>Case A</span> Modular</button><button type="button" className={pricingCase==='B'?'active':''} aria-pressed={pricingCase==='B'} onClick={()=>setPricingCase('B')}><span>Case B</span> Bundle</button></div><div className="studio-home-plan-grid">{voicePlans.map((plan,index)=><article key={plan.id} className={index===1?'featured':''} onClick={event=>{if(!event.target.closest('a'))nav(event,`/pricing#plan-${plan.id}`)}}><span className={`tier-${plan.id}`}>{plan.name}</span><strong>₹{plan.rate}<small>/ min</small></strong><p>{plan.description}</p><div className="studio-home-plan-actions"><a className="studio-home-plan-action" href="/pricing#voice-samples" onClick={e=>nav(e,'/pricing#voice-samples')}>Explore voice <AudioLines size={16}/></a><a className="studio-home-plan-action" href="/pricing#plans-section" onClick={e=>nav(e,'/pricing#plans-section')}>Explore rates <ArrowUpRight size={16}/></a></div></article>)}</div><p className="studio-home-pricing-note">{pricingCase==='A'?'AI voice priced separately; SIP and WhatsApp are billed separately.':'AI voice bundle rate; included services depend on the selected offer.'} Rates exclude GST.</p><div className="studio-home-pricing-actions"><StudioButton href="/pricing#plans-section" onClick={e=>nav(e,'/pricing#plans-section')}>Compare all plans</StudioButton><StudioButton href="/pricing#voice-samples" onClick={e=>nav(e,'/pricing#voice-samples')}>Listen to voice samples</StudioButton></div></div></section>
    <PricingTopicMarquee navigateTo={navigateTo} />
    <section className="studio-section studio-solutions" id="solutions"><div className="studio-container"><SectionHeading centered eyebrow="WHAT WE DO" title="Power every" accent="customer conversation." text="Focus on the moments that matter. The technology underneath should simply work."/><div className="studio-feature-grid three">{core.map((a,i)=><FeatureCard key={a.title} icon={a.icon} category={a.category} title={a.title} text={a.text} items={a.items} number={`0${i+1}`} onClick={()=>navigateTo(a.path)}/>)}</div><div className="studio-section-link"><a href="/services" onClick={e=>nav(e,'/services')}>See all solutions <ArrowUpRight size={18}/></a></div></div></section>
    <section className="studio-section studio-spotlight"><div className="studio-container studio-spotlight-grid studio-workflow-layout"><div className="studio-spotlight-art avyukta-workflow-art"><img src={getAssetUrl('/avyukta-platform-workflow.png')} alt="Avyukta AI, CRM, dialer and omnichannel workflow" loading="lazy"/></div><div className="studio-spotlight-heading"><Eyebrow>AVYUKTA AI-POWERED ECOSYSTEM</Eyebrow><h2>One connected platform for every customer conversation.</h2><ul className="studio-workflow-points"><li><Check size={18}/> Capture and validate leads across channels</li><li><Check size={18}/> Connect AI voice, chat, CRM and telephony</li><li><Check size={18}/> Automate follow-ups, scheduling and reporting</li></ul></div></div></section>
    <section className="studio-section studio-how" id="business-ecosystem"><div className="studio-container"><SectionHeading centered eyebrow="FROM FIRST HELLO TO LASTING RELATIONSHIPS" title="Simple to start." accent="Made to grow." text="A clear path from your first workflow to a connected customer experience."/><div className="studio-steps-grid">{HOW.map(step=><article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
    <FaqSection items={HOME_FAQS} />
    <BottomCta navigateTo={navigateTo}/>
  </div>;
}
