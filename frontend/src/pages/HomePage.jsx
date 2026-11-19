import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import DynamicPricingSection from '../components/DynamicPricingSection';
import FullWidthShowcase from '../components/FullWidthShowcase';
import IndustriesSection from '../components/IndustriesSection';
import FloatingActions from '../components/FloatingActions';
import VoiceLibrary from '../components/VoiceLibrary';
import FaqSection from '../components/FaqSection';
import { Eyebrow, BottomCta } from '../components/StudioParts';
import { CUSTOMER_FAQS } from '../data/offer';

export default function HomePage({ navigateTo }) {
  const nav = (event, path) => {
    event.preventDefault();
    if (navigateTo) navigateTo(path);
  };

  return (
    <div className="studio-page studio-home conversion-home">
      
      {/* 1. HERO CAROUSEL */}
      <HeroCarousel navigateTo={navigateTo} />

      {/* 2. DYNAMIC AI PRICING & PLATFORM WORKSPACE (BPA | CRM | Dialer | Voice | Sales) */}
      <DynamicPricingSection navigateTo={navigateTo} />

      {/* 3. COMMAND CENTER LIVE OPERATIONS MONITORING */}
      <FullWidthShowcase 
        id="command-center"
        heading="Command Center"
        imageSrc="/command-center-operations.jpg"
        imageAlt="Avyukta Command Center live operations monitoring staff, active calls, devices, and lead handling"
        width={1024}
        height={600}
      />

      {/* 4. INDUSTRIES WE SERVE */}
      <IndustriesSection navigateTo={navigateTo} />

      {/* 5. FLOATING AI ASSISTANT & WHATSAPP */}
      <FloatingActions />

      {/* 6. REMAINING CONTENT & ESSENTIAL CLOSING (Voice Library Listen, FAQ, Bottom CTA) */}
      <section className="studio-section sample-section" id="voice-samples">
        <div className="studio-container sample-section-grid">
          <div>
            <Eyebrow>LISTEN BEFORE YOU COMMIT</Eyebrow>
            <h2>Hear the difference.<br /><span className="studio-accent">Choose your voice.</span></h2>
            <p>Explore genuine prerecorded samples across Silver, Gold, and Platinum plans. Pick a sound your callers will love, then request a tailored business demo.</p>
            <div className="sample-steps">
              <span>01 · Select a tier</span>
              <span>02 · Listen to voices</span>
              <span>03 · Request a demo</span>
            </div>
            <a className="studio-text-link" href="/#pricing" onClick={event => nav(event, '/#pricing')}>
              View pricing details <ArrowUpRight size={17} />
            </a>
          </div>
          <VoiceLibrary navigateTo={navigateTo} />
        </div>
      </section>

      <section id="faq" className="homepage-faq-wrap">
        <FaqSection items={CUSTOMER_FAQS.slice(0, 8)} />
      </section>

      <div id="conversion" className="product-conversion-anchor">
        <BottomCta 
          navigateTo={navigateTo} 
          heading="Ready to elevate your business calling?" 
          text="Bring your use case and preferred language. Our team will configure your voice assistant, dialer, and CRM integration." 
        />
      </div>

    </div>
  );
}
