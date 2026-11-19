import React from 'react';
import { ArrowUpRight, PhoneIncoming, CalendarCheck, MessagesSquare, Check, ArrowRight } from 'lucide-react';
import VoiceLibrary from '../components/VoiceLibrary';
import PlanCards from '../components/PlanCards';
import FaqSection from '../components/FaqSection';
import ProductShowcase from '../components/ProductShowcase';
import { CUSTOMER_FAQS } from '../data/offer';
import { Eyebrow, SectionHeading, StudioButton, BottomCta } from '../components/StudioParts';

const jobs = [
  { icon: PhoneIncoming, title: 'Answer everyday enquiries', text: 'Help callers find answers about your services, timings and process using information you approve.' },
  { icon: MessagesSquare, title: 'Follow up interested customers', text: 'Ask a few useful questions, understand what the customer needs and help your team plan the next step.' },
  { icon: CalendarCheck, title: 'Help arrange the next step', text: 'Discuss appointment requests, reminders and human handoffs that fit your business setup.' },
];
export default function HomePage({ navigateTo }) {
  const nav = (event, path) => { event.preventDefault(); navigateTo(path); };
  return <div className="studio-page studio-home conversion-home">
    <section className="studio-hero"><div className="studio-hero-noise" aria-hidden="true"/><div className="studio-container studio-hero-grid">
      <div className="studio-hero-copy"><Eyebrow>AI CALLING FOR YOUR BUSINESS</Eyebrow>
        <h1>Every conversation.<br/><span>A clearer next step.</span></h1>
        <p className="hero-product-line">AI calling assistants for enquiries, follow-ups and bookings.</p>
        <p>Let an AI assistant handle routine customer conversations using your business information. Hear the voices and explore how it could work for your team.</p>
        <div className="studio-actions"><StudioButton href="#voice-samples" onClick={event => nav(event, '/#voice-samples')}>Listen to the voices</StudioButton><StudioButton href="/contact" secondary onClick={event => nav(event, '/contact')}>Request a demo</StudioButton></div>
        <div className="hero-reassurance"><span><Check size={16}/> Listen without signing up</span><span><Check size={16}/> Silver, Gold & Platinum</span></div>
      </div>
      <div className="conversion-hero-player"><div className="hero-player-caption"><span>YOUR FIRST LISTEN</span><span>01 / VOICE</span></div><VoiceLibrary compact navigateTo={navigateTo}/><p>Find a sound you like. Then test it with your own business scenario.</p></div>
    </div></section>
    <ProductShowcase navigateTo={navigateTo}/>
    <section className="studio-section customer-jobs" id="how-it-works"><div className="studio-container"><SectionHeading centered eyebrow="LESS ROUTINE WORK. MORE USEFUL CONVERSATIONS." title="What could your assistant" accent="help with?" text="Start with one job your team handles every day. We'll help you confirm the call flow, language and setup."/><div className="customer-job-grid">{jobs.map(({icon: Icon, title, text}, index) => <article key={title}><span className="job-number">0{index + 1}</span><Icon size={25}/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="studio-section sample-section" id="voice-samples"><div className="studio-container sample-section-grid"><div><Eyebrow>HEAR THE DIFFERENCE</Eyebrow><h2>Your customers hear a voice.<br/><span className="studio-accent">Make it the right one.</span></h2><p>Explore prerecorded examples from all three plans. Choose the sound first, then ask us to demonstrate your language and business script.</p><div className="sample-steps"><span>01 · Choose a plan</span><span>02 · Compare the voices</span><span>03 · Request your own demo</span></div><a className="studio-text-link" href="/pricing" onClick={event => nav(event, '/pricing')}>See rates and what's included <ArrowUpRight size={17}/></a></div><VoiceLibrary navigateTo={navigateTo}/></div></section>
    <section className="studio-section customer-workflow" id="business-ecosystem"><div className="studio-container"><SectionHeading eyebrow="A PRACTICAL EXAMPLE" title="From a new enquiry" accent="to a useful follow-up." text="Illustrative property-enquiry workflow. Exact actions and integrations depend on the setup you agree with our team."/><div className="workflow-story">{[['A customer asks about a property', 'An enquiry arrives from your website or your calling list.'], ['The assistant asks a few questions', 'It follows your approved script to understand interest, requirements and a preferred next step.'], ['Your team knows what to do next', 'Discuss how the conversation summary and visit request can reach your team through supported tools.']].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>{index < 2 && <ArrowRight className="workflow-arrow" size={22}/>}</article>)}</div></div></section>
    <PlanCards navigateTo={navigateTo}/>
    <section className="studio-section setup-section"><div className="studio-container"><SectionHeading centered eyebrow="START WITH YOUR BUSINESS" title="A simple path" accent="to your first demo."/><div className="customer-job-grid">{[['Tell us the job', 'Share the questions, language and outcome you have in mind.'], ['Review the conversation', 'Choose a voice and agree what the assistant should say and do.'], ['Test before you launch', 'Check real conversations, handoffs and the complete quote with our team.']].map(([title, text], index) => <article key={title}><span className="job-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <FaqSection items={CUSTOMER_FAQS.slice(0, 8)}/>
    <div id="conversion" className="product-conversion-anchor"><BottomCta navigateTo={navigateTo} heading="Let's hear it for your business." text="Bring a use case and a preferred language. We'll help you explore the right voice and calling setup."/></div>
  </div>;
}
