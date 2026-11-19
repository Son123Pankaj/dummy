import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Headphones, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
import { Eyebrow } from './StudioParts';

const SLIDES = [
  {
    id: 1,
    eyebrow: 'AI CALLING FOR YOUR BUSINESS',
    headline: 'Smart AI voice assistants that never miss a customer call.',
    description: 'Let an intelligent assistant answer everyday questions, qualify interested buyers, and schedule appointments for your business 24/7.',
    benefits: ['Natural human-like conversations', '24/7 instant answer for every caller', 'Zero setup cost to get started'],
    primaryAction: { label: 'Request a demo', href: '/contact' },
    secondaryAction: { label: 'Listen to voices', href: '/#voice-samples' },
    image: '/carousel-slide1.jpg',
    imageAlt: 'Avyukta Intellicall AI Voice Assistant in action'
  },
  {
    id: 2,
    eyebrow: 'MULTILINGUAL INDIAN VOICES',
    headline: 'Speak to customers in their language with natural accents.',
    description: 'Engage callers warmly in Hindi, English, and regional Indian languages. Build trust from the first sentence with expressive, natural tone.',
    benefits: ['Hindi, English and regional dialects', 'Sub-500ms real-time response', 'Instant confidence & trust for callers'],
    primaryAction: { label: 'View voice pricing', href: '/#pricing' },
    secondaryAction: { label: 'Request a demo', href: '/contact' },
    image: '/carousel-slide2.jpg',
    imageAlt: 'Multilingual AI Voice Calling for diverse customer conversations'
  },
  {
    id: 3,
    eyebrow: 'CONNECTED CRM & WORKFLOWS',
    headline: 'Connect every phone call with your CRM and WhatsApp.',
    description: 'Send instant follow-ups on WhatsApp, log customer notes into your CRM, and hand off hot leads to your human team seamlessly.',
    benefits: ['Automatic WhatsApp message triggers', 'Instant sync with your CRM stages', '1-click transfer to human supervisors'],
    primaryAction: { label: 'Explore CRM & BPA', href: '/#crm' },
    secondaryAction: { label: 'Request a demo', href: '/contact' },
    image: '/carousel-slide3.jpg',
    imageAlt: 'Integrated business phone, CRM, and automation workflow'
  }
];

export default function HeroCarousel({ navigateTo }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const nextSlide = () => setCurrent(prev => (prev + 1) % total);
  const prevSlide = () => setCurrent(prev => (prev - 1 + total) % total);
  const goToSlide = (idx) => setCurrent(idx);

  // Auto-play timer with pause-on-hover
  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const nav = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.slice(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', href);
        return;
      }
    }
    if (navigateTo) navigateTo(href);
  };

  const slide = SLIDES[current];

  return (
    <section 
      id="solutions" 
      className="hero-carousel-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Avyukta Solutions Carousel"
    >
      <div className="studio-container">
        <div className="hero-carousel-card">
          
          {/* 50% Left Side: Content Only */}
          <div className="hero-carousel-content">
            <div className="hero-carousel-eyebrow-wrap">
              <span className="studio-eyebrow">
                <span className="studio-eyebrow-dot" aria-hidden="true" />
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="hero-carousel-headline">
              {slide.headline}
            </h1>

            <p className="hero-carousel-desc">
              {slide.description}
            </p>

            <div className="hero-carousel-benefits">
              {slide.benefits.map((b, idx) => (
                <div key={idx} className="hero-benefit-item">
                  <CheckCircle2 size={16} className="hero-benefit-icon" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="hero-carousel-actions">
              <a 
                href={slide.primaryAction.href}
                className="studio-btn studio-btn-primary"
                onClick={e => nav(e, slide.primaryAction.href)}
              >
                <span>{slide.primaryAction.label}</span>
                <ArrowUpRight size={17} />
              </a>

              <a 
                href={slide.secondaryAction.href}
                className="studio-btn studio-btn-secondary"
                onClick={e => nav(e, slide.secondaryAction.href)}
              >
                <span>{slide.secondaryAction.label}</span>
              </a>
            </div>

            {/* Bottom Controls Bar */}
            <div className="hero-carousel-controls">
              <div className="hero-carousel-arrows">
                <button 
                  type="button" 
                  className="carousel-ctrl-btn"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  type="button" 
                  className="carousel-ctrl-btn"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <span className="carousel-counter" aria-live="polite">
                0{current + 1} <span className="counter-sep">/</span> 0{total}
              </span>

              <div className="carousel-dots-group" role="tablist" aria-label="Slide indicators">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={current === idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`carousel-dot-pill ${current === idx ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 50% Right Side: Image Only (No text overlay, proper sizing, uncropped) */}
          <div className="hero-carousel-image-col">
            <div className="hero-carousel-image-frame">
              <img 
                key={slide.id}
                src={getAssetUrl(slide.image)} 
                alt={slide.imageAlt}
                className="hero-carousel-img"
                loading="eager"
                decoding="async"
                width={1376}
                height={768}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
