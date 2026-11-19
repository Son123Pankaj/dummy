import React from 'react';
import PlanCards from '../components/PlanCards';
import VolumeCalculator from '../components/VolumeCalculator';
import VoiceLibrary from '../components/VoiceLibrary';
import FaqSection from '../components/FaqSection';
import { CUSTOMER_FAQS, normalizePlan } from '../data/offer';
import { Eyebrow, BottomCta } from '../components/StudioParts';
export default function PricingPage({ navigateTo }) {
  const plan = normalizePlan(new URLSearchParams(window.location.search).get('plan'));
  return <div className="studio-page studio-pricing">
    <section className="pricing-intro studio-container"><Eyebrow>A VOICE YOU LIKE. A COST YOU UNDERSTAND.</Eyebrow><h1>Hear the voices.<br/><span className="studio-accent">Explore the right plan.</span></h1><p>Compare Silver, Gold and Platinum, then confirm the calling setup and complete cost for your business.</p><a className="studio-text-link" href="#voice-samples" onClick={event => {event.preventDefault(); navigateTo(`/pricing${plan ? `?plan=${plan}` : ''}#voice-samples`);}}>Listen before you choose ↓</a></section>
    <PlanCards navigateTo={navigateTo}/>
    <section id="voice-samples" className="studio-section sample-section"><div className="studio-container pricing-voice-grid"><div><Eyebrow>THE VOICE STUDIO</Eyebrow><h2>Listen first.<br/><span className="studio-accent">Choose with confidence.</span></h2><p>No form or microphone needed. These are prerecorded examples. Request a tailored demo to check your business conversation and preferred language.</p></div><VoiceLibrary key={plan} initialPlan={plan} navigateTo={navigateTo}/></div></section>
    <VolumeCalculator/>
    <section className="studio-section billing-summary" id="billing"><div className="studio-container"><Eyebrow>UNDERSTAND YOUR COMPLETE COST</Eyebrow><h2>What should your quote explain?</h2><div className="customer-job-grid"><article><h3>Usage and phone charges</h3><p>Confirm the AI rate, phone connection, number rental, WhatsApp charges and any fixed platform fees.</p></article><article><h3>Minimums and commitments</h3><p>Ask about initial recharge, deposits, monthly volume, unused credit and cancellation before activation.</p></article><article><h3>How a call is measured</h3><p>The referenced offer uses a 30-second minimum, then six-second increments. A 31-second connected call bills as 36 seconds. Confirm both AI and phone-provider rules.</p></article></div></div></section>
    <FaqSection items={CUSTOMER_FAQS}/><BottomCta navigateTo={navigateTo} heading="Want a complete estimate?" text="Share your preferred voice, language and monthly calling needs. Our team can help clarify the scope and commercials."/>
  </div>;
}
