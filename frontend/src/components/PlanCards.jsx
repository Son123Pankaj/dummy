import React, { useState } from 'react';
import { Check, ArrowUpRight, Sparkles, Volume2 } from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { PLANS, MODELS, COMMERCIAL_NOTE, demoUrl, rateLabel } from '../data/offer';

export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');

  const local = (event, path) => {
    if (!navigateTo) return;
    event.preventDefault();
    if (path.startsWith('/#')) {
      const targetId = path.slice(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', path);
        return;
      }
    }
    navigateTo(path);
  };

  return (
    <section id="pricing" className="studio-plan-section">
      <div className="studio-container">
        
        <div className="studio-plan-heading">
          <div>
            <Eyebrow>TRANSPARENT AI VOICE PRICING</Eyebrow>
            <h2>Voice Pricing <span className="studio-accent">Plans.</span></h2>
            <p>Choose the right voice tier for your callers. Compare indicative rates, then request a tailored quote.</p>
          </div>

          <div className="studio-plan-toggle" role="group" aria-label="Pricing model toggle">
            {Object.entries(MODELS).map(([id, offer]) => (
              <button 
                type="button" 
                key={id} 
                aria-pressed={model === id} 
                className={model === id ? 'active' : ''} 
                onClick={() => setModel(id)}
              >
                {offer.label}
              </button>
            ))}
          </div>
        </div>

        <div className="studio-plan-brief">
          <strong>{MODELS[model].label}:</strong> {MODELS[model].detail}
        </div>

        <p className="commercial-disclosure">{COMMERCIAL_NOTE}</p>

        {/* The 3 Cards: SILVER | GOLD | PLATINUM */}
        <div className="studio-plan-grid conversion-plan-grid">
          {PLANS.map(plan => {
            const isGold = plan.id === 'gold';
            return (
              <article 
                id={`plan-${plan.id}`} 
                key={plan.id} 
                className={`studio-plan-card ${isGold ? 'featured' : ''}`}
              >
                {isGold && (
                  <div className="plan-recommended-badge">
                    <Sparkles size={13} />
                    <span>RECOMMENDED · MOST POPULAR</span>
                  </div>
                )}

                <div className="studio-plan-card-top">
                  <span className="plan-purpose">{plan.label}</span>
                  <div className="studio-plan-symbol" aria-hidden="true">{plan.icon}</div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>

                <div className="studio-plan-price">
                  <strong><small>₹</small>{rateLabel(plan[model])}</strong>
                  <span>per connected minute · indicative · GST extra</span>
                </div>

                <div className="studio-plan-divider" />

                <ul className="plan-feature-list">
                  {plan.features.map(feature => (
                    <li key={feature}>
                      <Check size={16} className="plan-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {/* Verified differentiator bullet points */}
                  {plan.id === 'silver' && (
                    <li>
                      <Check size={16} className="plan-check-icon" />
                      <span>Everyday inbound &amp; outbound routine calls</span>
                    </li>
                  )}
                  {plan.id === 'gold' && (
                    <>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Hindi, English &amp; regional Indian dialects</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Live interruption handling &amp; WhatsApp handoff</span>
                      </li>
                    </>
                  )}
                  {plan.id === 'platinum' && (
                    <>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Studio-grade emotional expressiveness</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Custom brand voice match &amp; priority setup</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="plan-conversion-actions">
                  <a 
                    className="studio-plan-cta" 
                    href="/#voice-samples" 
                    onClick={event => local(event, '/#voice-samples')}
                  >
                    <Volume2 size={16} />
                    <span>Hear {plan.name} voices</span>
                  </a>

                  <a 
                    className={`studio-plan-cta ${isGold ? 'primary' : ''}`} 
                    href={demoUrl(plan.id)} 
                    onClick={event => local(event, demoUrl(plan.id))}
                  >
                    <span>Request {plan.name} demo</span>
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="custom-offer">
          <div>
            <strong>Need high volume or a tailored enterprise setup?</strong>
            <p>Discuss dedicated SIP trunks, carrier DIDs, custom CRM connectors, and SLA commitments.</p>
          </div>
          <a href="/contact" onClick={event => local(event, '/contact')}>
            Talk to our team <ArrowUpRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
}
