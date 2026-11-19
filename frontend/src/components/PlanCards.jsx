import React, { useState } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { PLANS, MODELS, COMMERCIAL_NOTE, demoUrl, rateLabel } from '../data/offer';
export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');
  const local = (event, path) => { if (navigateTo) {event.preventDefault(); navigateTo(path);} };
  return <section id="plans-section" className="studio-plan-section"><div className="studio-container">
    <div className="studio-plan-heading"><div><Eyebrow>ONE VOICE. ONE CLEAR STARTING POINT.</Eyebrow><h2>Find your <span className="studio-accent">voice plan.</span></h2><p>Compare indicative rates, then confirm your complete quote.</p></div><div className="studio-plan-toggle" role="group" aria-label="Pricing model">{Object.entries(MODELS).map(([id, offer]) => <button type="button" key={id} aria-pressed={model === id} className={model === id ? 'active' : ''} onClick={() => setModel(id)}>{offer.label}</button>)}</div></div>
    <div className="studio-plan-brief"><strong>{MODELS[model].label}:</strong> {MODELS[model].detail}</div>
    <p className="commercial-disclosure">{COMMERCIAL_NOTE}</p>
    <div className="studio-plan-grid conversion-plan-grid">{PLANS.map(plan => <article id={`plan-${plan.id}`} key={plan.id} className={`studio-plan-card ${plan.id === 'gold' ? 'featured' : ''}`}><div className="studio-plan-card-top"><span className="plan-purpose">{plan.label}</span><div className="studio-plan-symbol">{plan.icon}</div><h3>{plan.name}</h3><p>{plan.description}</p></div><div className="studio-plan-price"><strong><small>₹</small>{rateLabel(plan[model])}</strong><span>per connected minute · indicative · GST extra</span></div><div className="studio-plan-divider"/><ul>{plan.features.map(feature => <li key={feature}><Check size={16}/>{feature}</li>)}</ul><div className="plan-conversion-actions"><a className="studio-plan-cta" href={`/pricing?plan=${plan.id}#voice-samples`} onClick={event => local(event, `/pricing?plan=${plan.id}#voice-samples`)}>Hear {plan.name}<ArrowUpRight size={17}/></a><a className={`studio-plan-cta ${plan.id === 'gold' ? 'primary' : ''}`} href={demoUrl(plan.id)} onClick={event => local(event, demoUrl(plan.id))}>Request a {plan.name} demo<ArrowUpRight size={17}/></a></div></article>)}</div>
    <div className="custom-offer"><div><strong>Need a larger or tailored setup?</strong><p>Discuss volume commitments, integrations, deployment and support.</p></div><a href="/contact" onClick={event => local(event, '/contact')}>Talk to our team <ArrowUpRight size={17}/></a></div>
  </div></section>;
}
