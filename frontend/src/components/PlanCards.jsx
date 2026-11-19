import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Volume2, 
  Pause, 
  Play, 
  Square, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  Users 
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { PLANS, MODELS, COMMERCIAL_NOTE, demoUrl, rateLabel } from '../data/offer';

const CARD_TITLES = {
  silver: 'AVYUKTA AI SILVER',
  gold: 'AVYUKTA AI GOLD',
  platinum: 'AVYUKTA AI DIAMOND'
};

const DISPLAY_NAMES = {
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Diamond'
};

export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');
  const [audioState, setAudioState] = useState({
    activeCard: null, // 'silver' | 'gold' | 'platinum'
    status: 'idle',   // 'idle' | 'playing' | 'paused'
  });

  const utteranceRef = useRef(null);

  // Stop speech if user navigates away or component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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

  // Card-wise speech text generator strictly matching the card's details
  const getCardSpeechText = (plan) => {
    const rate = rateLabel(plan[model]);
    const modelName = MODELS[model].label;

    if (plan.id === 'silver') {
      return `Avyukta AI Silver Plan. Everyday customer conversations. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Automated inbound routine enquiry answering, outbound reminder and follow-up calling, sub-500ms voice turn cadence, and basic lead capture. Billed on connected calls only; unanswered and failed calls cost zero rupees.`;
    }
    if (plan.id === 'gold') {
      return `Avyukta AI Gold Plan. Recommended and most popular for Indian businesses. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Multilingual calling in Hindi, English, and regional Indian dialects, automated lead qualification calls and booking, natural human turn-taking with live interruption handling, one-click live transfer to human supervisors, and Meta WhatsApp post-call summary drops. Thirty-second minimum pulse with six-second increments.`;
    }
    return `Avyukta AI Diamond Plan. Expressive brand voices. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Studio-grade expressive brand voices with emotional inflection, high-concurrency outbound dialing for up to one hundred concurrent channels, custom Pan-India STD CLI for trusted caller ID, enterprise CRM synchronization with speech sentiment intelligence, and carrier-grade 99.99% uptime SLA.`;
  };

  // Handle Play / Pause for a specific card
  const handleToggleVoice = (plan) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Voice speech synthesis is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const synth = window.speechSynthesis;

    // If currently playing this card -> Pause
    if (audioState.activeCard === plan.id && audioState.status === 'playing') {
      synth.pause();
      setAudioState({ activeCard: plan.id, status: 'paused' });
      return;
    }

    // If currently paused on this card -> Resume
    if (audioState.activeCard === plan.id && audioState.status === 'paused') {
      synth.resume();
      setAudioState({ activeCard: plan.id, status: 'playing' });
      return;
    }

    // If another card was playing or idle -> Stop previous and start this card
    synth.cancel();

    const textToRead = getCardSpeechText(plan);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')) && !v.name.includes('Google') === false) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      setAudioState({ activeCard: null, status: 'idle' });
    };

    utterance.onerror = () => {
      setAudioState({ activeCard: null, status: 'idle' });
    };

    setAudioState({ activeCard: plan.id, status: 'playing' });
    synth.speak(utterance);
  };

  // Handle Stop for a specific card
  const handleStopVoice = (planId) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState({ activeCard: null, status: 'idle' });
  };

  return (
    <section id="pricing" className="studio-plan-section">
      <div className="studio-container">
        
        <div className="studio-plan-heading">
          <div>
            <Eyebrow>TRANSPARENT AI VOICE &amp; CALL PRICING</Eyebrow>
            <h2>AI Pricing <span className="studio-accent">Plans.</span></h2>
            <p>Choose the right voice tier for your callers. Listen to each plan independently, compare verified call features, and request a tailored quote.</p>
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
            const isCardActive = audioState.activeCard === plan.id;
            const isPlaying = isCardActive && audioState.status === 'playing';
            const isPaused = isCardActive && audioState.status === 'paused';

            return (
              <article 
                id={`plan-${plan.id}`} 
                key={plan.id} 
                className={`studio-plan-card ${isGold ? 'featured' : ''} ${isCardActive ? 'has-audio-playing' : ''}`}
              >
                {isGold && (
                  <div className="plan-recommended-badge">
                    <Sparkles size={13} />
                    <span>RECOMMENDED · MOST POPULAR</span>
                  </div>
                )}

                <div className="studio-plan-card-top">
                  <span className="plan-purpose">{plan.label}</span>
                  <div className="studio-plan-symbol" aria-hidden="true">{plan.id === 'platinum' ? 'D' : plan.icon}</div>
                  <h3 className="plan-main-title">{CARD_TITLES[plan.id] || `AVYUKTA AI ${plan.name.toUpperCase()}`}</h3>
                  <p>{plan.description}</p>
                </div>

                {/* Card-Wise Independent Voice / Audio Control */}
                <div className="card-voice-control-box" aria-label={`${CARD_TITLES[plan.id] || plan.name} audio playback`}>
                  {!isCardActive ? (
                    <button
                      type="button"
                      className="card-audio-play-btn"
                      onClick={() => handleToggleVoice(plan)}
                      aria-label={`Listen to ${CARD_TITLES[plan.id] || plan.name} details`}
                      title={`Listen to ${CARD_TITLES[plan.id] || plan.name} details`}
                    >
                      <Volume2 size={16} className="audio-btn-icon" />
                      <span>Listen to {DISPLAY_NAMES[plan.id] || plan.name} Plan</span>
                    </button>
                  ) : (
                    <div className="card-audio-active-bar">
                      <div className="card-audio-status-wrap">
                        <div className={`audio-visualizer-bars ${isPlaying ? 'is-animating' : ''}`}>
                          <span /><span /><span /><span />
                        </div>
                        <span className="card-audio-status-text">
                          {isPlaying ? `Reading ${DISPLAY_NAMES[plan.id] || plan.name}...` : 'Paused'}
                        </span>
                      </div>

                      <div className="card-audio-btn-group">
                        <button
                          type="button"
                          className="card-audio-action-btn pause"
                          onClick={() => handleToggleVoice(plan)}
                          aria-label={isPlaying ? `Pause ${DISPLAY_NAMES[plan.id] || plan.name} audio` : `Resume ${DISPLAY_NAMES[plan.id] || plan.name} audio`}
                          title={isPlaying ? 'Pause' : 'Resume'}
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          type="button"
                          className="card-audio-action-btn stop"
                          onClick={() => handleStopVoice(plan.id)}
                          aria-label={`Stop ${DISPLAY_NAMES[plan.id] || plan.name} audio`}
                          title="Stop"
                        >
                          <Square size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="studio-plan-price">
                  <strong><small>₹</small>{rateLabel(plan[model])}</strong>
                  <span>per connected minute · indicative · GST extra</span>
                </div>

                <div className="studio-plan-divider" />

                {/* Verified Call-Related Features Checklist */}
                <ul className="plan-feature-list">
                  {plan.features.map(feature => (
                    <li key={feature}>
                      <Check size={16} className="plan-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}

                  {/* Silver Call Capabilities */}
                  {plan.id === 'silver' && (
                    <>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Inbound routine enquiry answering (24/7)</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Outbound automated reminder &amp; follow-up calls</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Sub-500ms voice turn cadence</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Billed on connected calls only (unanswered ₹0)</span>
                      </li>
                    </>
                  )}

                  {/* Gold Call Capabilities (Recommended) */}
                  {plan.id === 'gold' && (
                    <>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Multilingual Hindi, English &amp; regional Indian dialects</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Automated lead qualification &amp; booking calls</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Natural human turn-taking &amp; live interruption handling</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>1-click live transfer to human supervisors</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Meta WhatsApp post-call summary &amp; link drops</span>
                      </li>
                    </>
                  )}

                  {/* Platinum Call Capabilities */}
                  {plan.id === 'platinum' && (
                    <>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Studio-grade expressive brand voices with emotion inflection</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>High-concurrency outbound dialing (100+ concurrent channels)</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Custom Pan-India STD CLI (011, 022, 080) caller ID</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Enterprise CRM sync with speech sentiment intelligence</span>
                      </li>
                      <li>
                        <Check size={16} className="plan-check-icon" />
                        <span>Dedicated telecom SLA &amp; 99.99% carrier uptime</span>
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
                    <span>Hear {DISPLAY_NAMES[plan.id] || plan.name} samples</span>
                  </a>

                  <a 
                    className={`studio-plan-cta ${isGold ? 'primary' : ''}`} 
                    href={demoUrl(plan.id)} 
                    onClick={event => local(event, demoUrl(plan.id))}
                  >
                    <span>Request {DISPLAY_NAMES[plan.id] || plan.name} demo</span>
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call Telephony & Voice Infrastructure Trust Banner */}
        <div className="call-telephony-highlights" aria-label="Core call infrastructure features">
          <div className="call-highlight-item">
            <div className="call-highlight-icon"><PhoneCall size={20} /></div>
            <div>
              <strong>Pan-India Local STD CLI</strong>
              <p>Display trusted 011, 022, 080 caller ID across Indian telecom circles so callers pick up.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><Zap size={20} /></div>
            <div>
              <strong>Sub-500ms Voice Cadence</strong>
              <p>Conversational AI engine with natural pacing that accommodates mid-sentence interruptions.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><ShieldCheck size={20} /></div>
            <div>
              <strong>Connected-Only Billing</strong>
              <p>Only answered calls are billed. Unanswered, busy, and failed calls cost ₹0.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><Users size={20} /></div>
            <div>
              <strong>1-Click Human Handoff</strong>
              <p>Seamlessly route high-intent callers to available live supervisors without disconnection.</p>
            </div>
          </div>
        </div>

        <div className="custom-offer">
          <div>
            <strong>Need high volume or a tailored enterprise telecom setup?</strong>
            <p>Discuss dedicated SIP trunks, carrier DIDs, custom CRM connectors, and SLA commitments with our engineers.</p>
          </div>
          <a href="/contact" onClick={event => local(event, '/contact')}>
            Talk to our team <ArrowUpRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
}
