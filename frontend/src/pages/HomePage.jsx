import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import PlanCards from '../components/PlanCards';
import DualMarquee from '../components/DualMarquee';
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
      
      {/* 2. HERO CAROUSEL */}
      <HeroCarousel navigateTo={navigateTo} />

      {/* 3. VOICE PRICING CARDS */}
      <PlanCards navigateTo={navigateTo} />

      {/* 4. PARTNERS & CLIENTS MARQUEE */}
      <DualMarquee />

      {/* 5. CRM SECTION (With 2 View Switcher: CRM Platform & CRM Communications) */}
      <FullWidthShowcase 
        id="crm"
        heading="CRM Solutions"
        images={[
          {
            label: 'CRM Platform',
            src: '/crm-platform-pricing-promo.png',
            alt: 'Avyukta CRM Solutions platform and contact management dashboard',
            width: 1365,
            height: 768
          },
          {
            label: 'CRM Communications',
            src: '/avyukta-communications-dashboard.png',
            alt: 'Avyukta CRM omni-channel calling and communications dashboard',
            width: 1365,
            height: 768
          }
        ]}
      />

      {/* 6. SALES SECTION */}
      <FullWidthShowcase 
        id="sales"
        heading="Sales Management"
        imageSrc="/sales-management-dashboard.jpg"
        imageAlt="Avyukta Sales Management lead tracking and customer journey dashboard"
        width={1024}
        height={506}
      />

      {/* 7. BPA SECTION */}
      <FullWidthShowcase 
        id="bpa"
        heading="Business Process Automation (BPA)"
        imageSrc="/avyukta-platform-workflow.png"
        imageAlt="Avyukta Business Process Automation (BPA) workflow"
        width={1409}
        height={768}
      />

      {/* 8. COMMAND CENTER SECTION */}
      <FullWidthShowcase 
        id="command-center"
        heading="Command Center"
        imageSrc="/command-center-operations.jpg"
        imageAlt="Avyukta Command Center live operations monitoring staff, active calls, devices, and lead handling"
        width={1024}
        height={600}
      />

      {/* 9. INDUSTRIES SECTION */}
      <IndustriesSection navigateTo={navigateTo} />

      {/* 10. FLOATING AI ASSISTANT & WHATSAPP */}
      <FloatingActions />

      {/* 11. REMAINING CONTENT & ESSENTIAL CLOSING (Voice Library Listen, FAQ, Bottom CTA) */}
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
