import React from 'react';
import { CheckCircle2, ArrowDown, ShieldCheck } from 'lucide-react';
import PlanCards from '../components/PlanCards';
import VolumeCalculator from '../components/VolumeCalculator';
import BomBreakdown from '../components/BomBreakdown';
import VoiceEngines from '../components/VoiceEngines';
import BillingExplainer from '../components/BillingExplainer';
import FaqSection from '../components/FaqSection';
import { Eyebrow, BottomCta } from '../components/StudioParts';
export default function PricingPage({ navigateTo }){return <div className="studio-page studio-pricing">
  <section className="studio-pricing-hero"><div className="studio-container"><Eyebrow>PRICING WITHOUT THE GUESSWORK</Eyebrow><h1>Simple pricing.<br/><span>Powerful possibilities.</span></h1><p>Choose a voice experience that fits your business. Compare modular AI and bundled offerings with clear per-minute rates.</p><div className="studio-pricing-hero-points"><span><CheckCircle2 size={17}/> Modular or all-in-one</span><span><CheckCircle2 size={17}/> Flexible volume options</span><span><ShieldCheck size={17}/> Enterprise-ready support</span></div><a href="#plans-section" className="studio-pricing-scroll" onClick={e=>{e.preventDefault();document.getElementById('plans-section')?.scrollIntoView({behavior:'smooth'})}}>Compare plans <ArrowDown size={17}/></a></div></section>
  <PlanCards />
  <VolumeCalculator />
  <div className="studio-container studio-advanced-details"><details><summary>Advanced pricing details &amp; technical breakdown <span>View breakdown +</span></summary><div className="studio-advanced-detail-inner"><BomBreakdown/><BillingExplainer/></div></details></div>
  <div className="studio-container studio-advanced-details"><details><summary>Hear all voice engine samples <span>Explore audio +</span></summary><div className="studio-advanced-detail-inner"><VoiceEngines/></div></details></div>
  <FaqSection />
  <BottomCta navigateTo={navigateTo} heading="Need a pricing plan built around you?" text="Tell us about your use case and call volumes. We'll help you find the right fit."/>
</div>}
