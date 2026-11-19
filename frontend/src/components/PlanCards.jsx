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
  Users,
  ChevronDown
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

const VOICE_OPTIONS = [
  {
    id: 'full',
    label: 'Complete Card Overview',
    desc: 'Reads full title, description, commercial rates & features.',
    icon: Sparkles
  },
  {
    id: 'pricing',
    label: 'Pricing & Commercial Terms',
    desc: 'Reads per-minute rates, billing pulse & zero-cost unanswered calls.',
    icon: Zap
  },
  {
    id: 'features',
    label: 'Verified Call Capabilities',
    desc: 'Reads telephony SLAs, routing, dialects & platform features.',
    icon: ShieldCheck
  }
];

export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');
  const [openDropdownCard, setOpenDropdownCard] = useState(null); // 'silver' | 'gold' | 'platinum' | null
  const [cardModes, setCardModes] = useState({
    silver: 'full',
    gold: 'full',
    platinum: 'full'
  });
  const [audioState, setAudioState] = useState({
    activeCard: null, // 'silver' | 'gold' | 'platinum'
    mode: 'full',
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

  // Handle click outside to close dropdown and stop audio cleanly
  useEffect(() => {
    if (!openDropdownCard) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('.card-voice-dropdown-wrapper')) {
        // Stop audio if playing on closed dropdown
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
        setOpenDropdownCard(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
        setOpenDropdownCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdownCard]);

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

  // Card-wise speech text generator strictly matching the card's details and active mode
  const getCardSpeechText = (plan, mode, currentModel) => {
    const rate = rateLabel(plan[currentModel]);
    const modelName = MODELS[currentModel].label;
    const planTitle = CARD_TITLES[plan.id] || `AVYUKTA AI ${plan.name.toUpperCase()}`;

    if (mode === 'pricing') {
      if (plan.id === 'silver') {
        return `${planTitle} pricing details. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Calls are billed on connected conversation time only, with a thirty-second minimum pulse and six-second increments. Unanswered, busy, and failed calls cost zero rupees.`;
      }
      if (plan.id === 'gold') {
        return `${planTitle} pricing details. Recommended and most popular for Indian businesses. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Calls are billed on connected conversation time only, with a thirty-second minimum pulse and six-second increments. Unanswered and failed calls cost zero rupees.`;
      }
      return `${planTitle} pricing details. Premium expressive studio tier. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Includes carrier-grade volume dialing, dedicated trunk options, thirty-second minimum pulse with six-second increments, and zero charges on unanswered calls.`;
    }

    if (mode === 'features') {
      if (plan.id === 'silver') {
        return `${planTitle} features include: Automated inbound routine enquiry answering available twenty-four seven; outbound automated reminder and follow-up calls; sub-500ms voice turn cadence; and basic lead capture.`;
      }
      if (plan.id === 'gold') {
        return `${planTitle} features include: Multilingual calling in Hindi, English, and regional Indian dialects; automated lead qualification calls and booking; natural human turn-taking with live interruption handling; one-click live transfer to human supervisors; and Meta WhatsApp post-call summary drops.`;
      }
      return `${planTitle} features include: Studio-grade expressive brand voices with emotional inflection; high-concurrency outbound dialing for up to one hundred concurrent channels; custom Pan-India STD CLI for trusted caller ID; enterprise CRM synchronization with speech sentiment intelligence; and carrier-grade 99.99% uptime SLA.`;
    }

    // Default: 'full' mode (Reads title, description, pricing and features)
    if (plan.id === 'silver') {
      return `${planTitle}. Everyday customer conversations. A starting point for routine enquiries and reminders. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Automated inbound routine enquiry answering, outbound reminder and follow-up calling, sub-500ms voice turn cadence, and basic lead capture. Billed on connected calls only; unanswered and failed calls cost zero rupees.`;
    }
    if (plan.id === 'gold') {
      return `${planTitle}. Recommended and most popular for Indian businesses. Fast multilingual conversations closer to your customers. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Multilingual calling in Hindi, English, and regional Indian dialects, automated lead qualification calls and booking, natural human turn-taking with live interruption handling, one-click live transfer to human supervisors, and Meta WhatsApp post-call summary drops. Thirty-second minimum pulse with six-second increments.`;
    }
    return `${planTitle}. Expressive studio brand voices where tone matters. Starting at ₹${rate} per connected minute on ${modelName}, excluding GST. Key call capabilities include: Studio-grade expressive brand voices with emotional inflection, high-concurrency outbound dialing for up to one hundred concurrent channels, custom Pan-India STD CLI for trusted caller ID, enterprise CRM synchronization with speech sentiment intelligence, and carrier-grade 99.99% uptime SLA.`;
  };

  // Toggle Dropdown for a specific card
  const handleToggleDropdown = (planId) => {
    if (openDropdownCard === planId) {
      // Closing this dropdown: stop speech if playing on this card
      if (audioState.activeCard === planId) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
      }
      setOpenDropdownCard(null);
    } else {
      // Opening another card's dropdown: stop any existing speech immediately
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
      setOpenDropdownCard(planId);
    }
  };

  // Start Playing Voice for a specific card and mode
  const handlePlayVoice = (plan, modeToPlay) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Voice speech synthesis is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    const synth = window.speechSynthesis;

    // Immediately stop any previously playing speech
    synth.cancel();

    const activeMode = modeToPlay || cardModes[plan.id] || 'full';
    const textToRead = getCardSpeechText(plan, activeMode, model);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    utterance.rate = 0.96;
    utterance.pitch = 1.0;

    // Pick a natural English/Indian voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en-US') || v.lang.includes('en-GB')) && !v.name.includes('Google') === false) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
    };

    utterance.onerror = () => {
      setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
    };

    setAudioState({ activeCard: plan.id, mode: activeMode, status: 'playing' });
    synth.speak(utterance);
  };

  // Pause Voice
  const handlePauseVoice = (planId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (audioState.activeCard === planId && audioState.status === 'playing') {
      window.speechSynthesis.pause();
      setAudioState(prev => ({ ...prev, status: 'paused' }));
    }
  };

  // Resume Voice
  const handleResumeVoice = (planId) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (audioState.activeCard === planId && audioState.status === 'paused') {
      window.speechSynthesis.resume();
      setAudioState(prev => ({ ...prev, status: 'playing' }));
    }
  };

  // Stop Voice for a specific card
  const handleStopVoice = (planId) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioState({ activeCard: null, mode: 'full', status: 'idle' });
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
            const isDropdownOpen = openDropdownCard === plan.id;
            const isCardActive = audioState.activeCard === plan.id;
            const isPlaying = isCardActive && audioState.status === 'playing';
            const isPaused = isCardActive && audioState.status === 'paused';
            const activeMode = cardModes[plan.id] || 'full';
            const currentOption = VOICE_OPTIONS.find(o => o.id === activeMode) || VOICE_OPTIONS[0];
            const currentModeLabel = currentOption.label;

            return (
              <article 
                id={`plan-${plan.id}`} 
                key={plan.id} 
                className={`studio-plan-card ${isGold ? 'featured' : ''} ${isDropdownOpen ? 'dropdown-active' : ''} ${isCardActive ? 'has-audio-playing' : ''}`}
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

                <div className="studio-plan-price">
                  <strong><small>₹</small>{rateLabel(plan[model])}</strong>
                  <span>per connected minute · indicative · GST extra</span>
                </div>

                <div className="studio-plan-divider" />

                {/* Verified Call-Related Features Checklist (Plan Content) */}
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

                {/* Independent Card-Wise Voice Dropdown Component (Below Content) */}
                <div className="card-voice-dropdown-wrapper">
                  <button
                    type="button"
                    className={`card-voice-dropdown-btn ${isDropdownOpen ? 'active' : ''} ${isCardActive ? 'has-audio' : ''}`}
                    onClick={() => handleToggleDropdown(plan.id)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    aria-controls={`voice-menu-${plan.id}`}
                    title={`Open ${DISPLAY_NAMES[plan.id]} Voice Assistant Options`}
                  >
                    <div className="dropdown-btn-main">
                      <Volume2 size={16} className={`voice-icon ${isPlaying ? 'voice-icon-pulsing' : ''}`} />
                      <span className="dropdown-btn-label">
                        {isPlaying 
                          ? `Playing ${DISPLAY_NAMES[plan.id]} (${currentModeLabel})...`
                          : isPaused 
                            ? `Paused · ${DISPLAY_NAMES[plan.id]}`
                            : `Voice Assistant · ${DISPLAY_NAMES[plan.id]}`
                        }
                      </span>
                    </div>

                    <div className="dropdown-btn-end">
                      {isPlaying && (
                        <span className="voice-equalizer-dots" aria-hidden="true">
                          <span /><span /><span />
                        </span>
                      )}
                      <ChevronDown size={15} className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      id={`voice-menu-${plan.id}`}
                      className="card-voice-dropdown-menu animate-dropdown-fade"
                      role="region"
                      aria-label={`${CARD_TITLES[plan.id]} Voice Controls`}
                    >
                      <div className="dropdown-menu-header">
                        <span className="dropdown-header-badge">
                          <Sparkles size={12} /> {DISPLAY_NAMES[plan.id]} VOICE ENGINE
                        </span>
                        <span className="dropdown-header-rate">
                          ₹{rateLabel(plan[model])}/min ({MODELS[model].label})
                        </span>
                      </div>

                      <div className="dropdown-options-list" role="radiogroup" aria-label="Listening Options">
                        {VOICE_OPTIONS.map(opt => {
                          const isSelected = activeMode === opt.id;
                          const OptionIcon = opt.icon;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              className={`dropdown-option-row ${isSelected ? 'selected' : ''}`}
                              onClick={() => {
                                setCardModes(prev => ({ ...prev, [plan.id]: opt.id }));
                                handlePlayVoice(plan, opt.id);
                              }}
                            >
                              <div className="option-radio-dot">
                                <span className={`dot-inner ${isSelected ? 'active' : ''}`} />
                              </div>
                              <div className="option-text-group">
                                <div className="option-title-row">
                                  <OptionIcon size={13} className="option-inline-icon" />
                                  <strong>{opt.label}</strong>
                                </div>
                                <p className="option-desc">{opt.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dropdown Playback Toolbar: Play, Pause, Resume, Stop */}
                      <div className="dropdown-audio-toolbar">
                        <div className="audio-status-readout">
                          <span className={`status-indicator-dot ${isPlaying ? 'playing' : isPaused ? 'paused' : 'idle'}`} />
                          <span className="status-readout-text">
                            {isPlaying 
                              ? `Speaking ${DISPLAY_NAMES[plan.id]}...`
                              : isPaused 
                                ? 'Paused'
                                : 'Select option to listen'
                            }
                          </span>
                        </div>

                        <div className="audio-control-buttons-group">
                          {!isPlaying && !isPaused && (
                            <button
                              type="button"
                              className="ctrl-btn play primary"
                              onClick={() => handlePlayVoice(plan, activeMode)}
                              aria-label={`Play ${DISPLAY_NAMES[plan.id]} Voice`}
                              title="Play"
                            >
                              <Play size={14} /> <span>Play</span>
                            </button>
                          )}

                          {isPlaying && (
                            <button
                              type="button"
                              className="ctrl-btn pause"
                              onClick={() => handlePauseVoice(plan.id)}
                              aria-label={`Pause ${DISPLAY_NAMES[plan.id]} Voice`}
                              title="Pause"
                            >
                              <Pause size={14} /> <span>Pause</span>
                            </button>
                          )}

                          {isPaused && (
                            <button
                              type="button"
                              className="ctrl-btn resume primary"
                              onClick={() => handleResumeVoice(plan.id)}
                              aria-label={`Resume ${DISPLAY_NAMES[plan.id]} Voice`}
                              title="Resume"
                            >
                              <Play size={14} /> <span>Resume</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className="ctrl-btn stop"
                            disabled={!isPlaying && !isPaused}
                            onClick={() => handleStopVoice(plan.id)}
                            aria-label={`Stop ${DISPLAY_NAMES[plan.id]} Voice`}
                            title="Stop"
                          >
                            <Square size={12} /> <span>Stop</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
