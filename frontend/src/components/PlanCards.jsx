import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Volume2, 
  Pause, 
  Play, 
  Square, 
  ChevronDown,
  PhoneCall, 
  Zap, 
  ShieldCheck, 
  Users
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { PLANS, MODELS, SAMPLES, demoUrl, rateLabel } from '../data/offer';
import { getAssetUrl } from '../utils/assetUrl';
import { claimPlayback, onOtherPlayback } from '../utils/playback';
import AiSummarizer from './AiSummarizer';

const CARD_TITLES = {
  bronze: 'AVYUKTA AI BRONZE',
  silver: 'AVYUKTA AI SILVER',
  gold: 'AVYUKTA AI GOLD',
  platinum: 'AVYUKTA AI PLATINUM'
};

const DISPLAY_NAMES = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum'
};

const PLAN_FEATURES = {
  bronze: [
    'Standard clear AI voice assistant',
    '24/7 basic inbound FAQ answering',
    'Automated reminders & confirmation calls',
    'Billed on connected calls only (unanswered ₹0)'
  ],
  silver: [
    'Inbound routine enquiry answering (24/7)',
    'Outbound automated reminder & follow-up calls',
    'Sub-500ms voice turn cadence',
    'Billed on connected calls only (unanswered ₹0)'
  ],
  gold: [
    'Multilingual Hindi, English & regional Indian dialects',
    'Automated lead qualification & booking calls',
    'Natural human turn-taking & live interruption handling',
    '1-click live transfer to human supervisors',
    'Meta WhatsApp post-call summary & link drops'
  ],
  platinum: [
    'Studio-grade expressive brand voices with inflection',
    'High-concurrency outbound (100+ concurrent channels)',
    'Custom Pan-India STD CLI (011, 022, 080) caller ID',
    'Enterprise CRM sync with sentiment intelligence',
    'Dedicated telecom SLA & 99.99% carrier uptime'
  ]
};

// Real metadata mapping for genuine prerecorded audio files in /samples/
const SAMPLE_DETAILS = {
  // Bronze (bronze-1.mp3 through bronze-4.mp3)
  'bronze-1': { label: 'Aarav', desc: 'Standard Clear Everyday Assistant' },
  'bronze-2': { label: 'Diya', desc: 'Crisp Appointment & Reminder Caller' },
  'bronze-3': { label: 'Kavya', desc: 'Warm Routine Enquiry Answering' },
  'bronze-4': { label: 'Ananya', desc: 'Gentle Business Greeting Assistant' },

  // Silver (silver-1.mp3 through silver-8.mp3)
  'silver-1': { label: 'Achird', desc: 'Everyday Inbound & Customer Enquiries' },
  'silver-2': { label: 'Aoede', desc: 'Automated Reminders & Follow-up Calls' },
  'silver-3': { label: 'Charon', desc: 'Appointment Scheduling & Confirmations' },
  'silver-4': { label: 'Kore', desc: 'Routine Information & FAQs' },
  'silver-5': { label: 'Leda', desc: 'Front-Desk Call Answering' },
  'silver-6': { label: 'Orus', desc: 'Standard Dispatch Assistance' },
  'silver-7': { label: 'Achernar', desc: 'Direct Customer Outreach' },
  'silver-8': { label: 'Algenib', desc: 'General Communication Assistant' },

  // Gold (gold-1.mp3 through gold-8.mp3)
  'gold-1': { label: 'Aditya', desc: 'Bilingual Hindi & English Sales Voice' },
  'gold-2': { label: 'Ritu', desc: 'Indian Regional Dialect & Lead Qualification' },
  'gold-3': { label: 'Ashutosh', desc: 'Natural Interruption & Support Handling' },
  'gold-4': { label: 'Priya', desc: 'Warm Human Supervisor Transfer' },
  'gold-5': { label: 'Neha', desc: 'High-Touch Customer Engagement' },
  'gold-6': { label: 'Rahul', desc: 'Conversational Sales Booking' },
  'gold-7': { label: 'Pooja', desc: 'Meta WhatsApp Link & Call Summary' },
  'gold-8': { label: 'Rohan', desc: 'Indian Dialect High-Conversion Pitch' },

  // Platinum (platinum-1.mp3 through platinum-8.mp3)
  'platinum-1': { label: 'Indian Origin 3', desc: 'Expressive Studio Brand Voice' },
  'platinum-2': { label: 'Indian Origin 2', desc: 'High-Concurrency Outbound Channel' },
  'platinum-3': { label: 'Indian Origin', desc: 'Speech Sentiment Intelligence' },
  'platinum-4': { label: 'Roger', desc: 'Executive Authority & Brand Trust' },
  'platinum-5': { label: 'Sarah', desc: 'Polished Studio Ambassador' },
  'platinum-6': { label: 'Laura', desc: 'Expressive Customer Care Voice' },
  'platinum-7': { label: 'Charlie', desc: 'Dynamic Corporate Conversationalist' },
  'platinum-8': { label: 'George', desc: 'Enterprise Global SLA Audio' }
};

const formatTime = (secs) => {
  if (isNaN(secs) || !secs) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');
  const [openDropdownCard, setOpenDropdownCard] = useState(null); // 'bronze' | 'silver' | 'gold' | 'platinum' | null
  const [activeSampleByCard, setActiveSampleByCard] = useState({
    bronze: 'bronze-1',
    silver: 'silver-1',
    gold: 'gold-1',
    platinum: 'platinum-1'
  });
  const [playbackState, setPlaybackState] = useState({
    cardId: null,      // 'bronze' | 'silver' | 'gold' | 'platinum' | null
    sampleId: null,
    status: 'idle',    // 'idle' | 'playing' | 'paused'
    currentTime: 0,
    duration: 0
  });

  const audioRef = useRef(null);

  // Audio event listeners
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setPlaybackState(prev => ({
      ...prev,
      currentTime: audioRef.current.currentTime,
      duration: audioRef.current.duration || prev.duration
    }));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setPlaybackState(prev => ({
      ...prev,
      duration: audioRef.current.duration || 0
    }));
  };

  const handleAudioEnded = () => {
    setPlaybackState(prev => ({
      ...prev,
      status: 'idle',
      currentTime: 0
    }));
  };

  // Play genuine MP3 from /samples/ folder
  const playSample = async (cardId, sampleItem) => {
    if (!audioRef.current || !sampleItem) return;

    claimPlayback('plancards');

    const sampleSrc = getAssetUrl(sampleItem.src);
    if (audioRef.current.src !== sampleSrc) {
      audioRef.current.src = sampleSrc;
      audioRef.current.currentTime = 0;
    }

    setActiveSampleByCard(prev => ({ ...prev, [cardId]: sampleItem.id }));
    setPlaybackState({
      cardId,
      sampleId: sampleItem.id,
      status: 'playing',
      currentTime: 0,
      duration: audioRef.current.duration || 0
    });

    try {
      await audioRef.current.play();
    } catch (e) {
      if (e.name !== 'AbortError') {
        setPlaybackState(prev => ({ ...prev, status: 'idle' }));
      }
    }
  };

  // Pause playback
  const pauseSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaybackState(prev => ({ ...prev, status: 'paused' }));
  };

  // Resume playback
  const resumeSample = async () => {
    if (!audioRef.current) return;
    claimPlayback('plancards');
    setPlaybackState(prev => ({ ...prev, status: 'playing' }));
    try {
      await audioRef.current.play();
    } catch (e) {
      setPlaybackState(prev => ({ ...prev, status: 'paused' }));
    }
  };

  // Stop playback completely and reset
  const stopSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaybackState(prev => ({ ...prev, status: 'idle', currentTime: 0 }));
  };

  // Toggle Dropdown for a specific card
  const handleToggleDropdown = (planId) => {
    if (openDropdownCard === planId) {
      // Closing this dropdown: stop audio if this card was playing
      if (playbackState.cardId === planId) {
        stopSample();
      }
      setOpenDropdownCard(null);
    } else {
      // Opening another card's dropdown: stop any existing audio immediately
      stopSample();
      setOpenDropdownCard(planId);
    }
  };

  // Stop audio when another component plays audio globally
  useEffect(() => {
    const unregister = onOtherPlayback('plancards', () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaybackState(prev => ({ ...prev, status: 'paused' }));
    });
    return () => {
      unregister();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle click outside to close dropdown and stop audio cleanly
  useEffect(() => {
    if (!openDropdownCard) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('.card-voice-dropdown-wrapper')) {
        stopSample();
        setOpenDropdownCard(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        stopSample();
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

  return (
    <section id="pricing" className="studio-plan-section" aria-label="Transparent AI Voice & Call Pricing">
      {/* Hidden real audio player streaming genuine prerecorded MP3s from /samples/ */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onError={() => setPlaybackState(prev => ({ ...prev, status: 'idle' }))}
        preload="none"
      />

      <div className="studio-container">
        
        <div className="studio-plan-heading">
          <div>
            <div className="plan-heading-eyebrow-row">
              <Eyebrow>TRANSPARENT AI VOICE &amp; CALL PRICING</Eyebrow>
              <AiSummarizer 
                title="AI Voice & Telephony Pricing Plans"
                content="Avyukta IntelliCall AI Pricing Plans: Bronze (₹3.50/min), Silver (₹5.00/min), Gold (₹9.00/min), and Platinum (₹11.00/min). Bronze offers standard clear voice assistance and routine FAQ answering. Silver offers 24/7 inbound answering and sub-500ms voice turn cadence. Gold provides multilingual Hindi & English support, automated qualification, and live agent transfer. Platinum delivers studio-grade expressive brand voices, 100+ concurrent channels, and Pan-India STD CLI. Connected calls only billing with zero charge on unanswered calls."
                label="AI Plan Summary"
              />
            </div>
            <h2>AI Pricing <span className="studio-accent">Plans.</span></h2>
            <p>Choose the right voice tier for your callers. Listen to genuine recorded samples, compare verified call features, and request a tailored quote.</p>
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

        {/* The 3 Cards: SILVER | GOLD | PLATINUM / DIAMOND */}
        <div className="studio-plan-grid conversion-plan-grid">
          {PLANS.map(plan => {
            const isGold = plan.id === 'gold';
            const isDropdownOpen = openDropdownCard === plan.id;
            
            // Available genuine audio samples from /samples/ manifest for this plan
            const tierSamples = SAMPLES.filter(s => s.plan === plan.id);
            const currentSampleId = activeSampleByCard[plan.id] || tierSamples[0]?.id;
            const currentSample = tierSamples.find(s => s.id === currentSampleId) || tierSamples[0];

            const isCardPlaying = playbackState.cardId === plan.id && playbackState.status === 'playing';
            const isCardPaused = playbackState.cardId === plan.id && playbackState.status === 'paused';
            const isCardActive = isCardPlaying || isCardPaused;

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
                  <div className="studio-plan-symbol" aria-hidden="true">{plan.icon}</div>
                  <h3 className="plan-main-title">{CARD_TITLES[plan.id] || `AVYUKTA AI ${plan.name.toUpperCase()}`}</h3>
                  <p>{plan.description}</p>
                </div>

                <div className="studio-plan-price">
                  <strong><small>₹</small>{rateLabel(plan[model])}</strong>
                  <span>per connected minute · indicative · GST extra</span>
                </div>

                <div className="studio-plan-divider" />

                {/* Verified Call-Related Features Checklist (Core Plan Content) */}
                <ul className="plan-feature-list">
                  {(PLAN_FEATURES[plan.id] || plan.features).map(feature => (
                    <li key={feature}>
                      <Check size={15} className="plan-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
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
                    title={`Open ${DISPLAY_NAMES[plan.id]} Original Voice Samples`}
                  >
                    <div className="dropdown-btn-main">
                      <Volume2 size={16} className={`voice-icon ${isCardPlaying ? 'voice-icon-pulsing' : ''}`} />
                      <span className="dropdown-btn-label">
                        {isCardPlaying 
                          ? `Playing: ${currentSample?.name} (${formatTime(playbackState.currentTime)} / ${formatTime(playbackState.duration)})`
                          : isCardPaused 
                            ? `Paused · ${currentSample?.name}`
                            : `Original Voices · ${DISPLAY_NAMES[plan.id]} (${currentSample?.name})`
                        }
                      </span>
                    </div>

                    <div className="dropdown-btn-end">
                      {isCardPlaying && (
                        <span className="voice-equalizer-dots" aria-hidden="true">
                          <span /><span /><span />
                        </span>
                      )}
                      <ChevronDown size={15} className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu with Original Prerecorded MP3 Voices */}
                  {isDropdownOpen && (
                    <div 
                      id={`voice-menu-${plan.id}`}
                      className="card-voice-dropdown-menu animate-dropdown-fade"
                      role="region"
                      aria-label={`${CARD_TITLES[plan.id]} Original Voice Controls`}
                    >
                      <div className="dropdown-menu-header">
                        <span className="dropdown-header-badge">
                          <Sparkles size={12} /> ORIGINAL SAMPLES · {DISPLAY_NAMES[plan.id].toUpperCase()}
                        </span>
                        <span className="dropdown-header-rate">
                          {tierSamples.length} Genuine Recordings
                        </span>
                      </div>

                      {/* List of Real Voice Audio Samples from /samples/ */}
                      <div className="dropdown-options-list" role="radiogroup" aria-label={`${DISPLAY_NAMES[plan.id]} Voice Options`}>
                        {tierSamples.map(sampleItem => {
                          const isSelected = currentSampleId === sampleItem.id;
                          const isThisPlaying = isSelected && isCardPlaying;
                          const details = SAMPLE_DETAILS[sampleItem.id] || { desc: `${sampleItem.tier} Voice Sample` };

                          return (
                            <button
                              key={sampleItem.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              className={`dropdown-option-row ${isSelected ? 'selected' : ''}`}
                              onClick={() => playSample(plan.id, sampleItem)}
                              title={`Listen to original audio: ${sampleItem.name} (${sampleItem.src.replace('/samples/', '')})`}
                            >
                              <div className="option-radio-dot">
                                <span className={`dot-inner ${isSelected ? 'active' : ''}`} />
                              </div>
                              <div className="option-text-group">
                                <div className="option-title-row">
                                  <strong>{sampleItem.name}</strong>
                                  <span className="sample-file-tag">{sampleItem.src.replace('/samples/', '')}</span>
                                  {isThisPlaying && (
                                    <span className="live-playing-badge">PLAYING</span>
                                  )}
                                </div>
                                <p className="option-desc">{details.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dropdown Audio Progress Track & Toolbar */}
                      <div className="dropdown-audio-toolbar">
                        <div className="audio-status-readout">
                          <span className={`status-indicator-dot ${isCardPlaying ? 'playing' : isCardPaused ? 'paused' : 'idle'}`} />
                          <span className="status-readout-text">
                            {isCardPlaying 
                              ? `Playing: ${currentSample?.name}`
                              : isCardPaused 
                                ? `Paused (${currentSample?.name})`
                                : `Select voice to play`
                            }
                          </span>
                        </div>

                        <div className="audio-control-buttons-group">
                          {!isCardPlaying && !isCardPaused && (
                            <button
                              type="button"
                              className="ctrl-btn play primary"
                              onClick={() => playSample(plan.id, currentSample)}
                              aria-label={`Play ${currentSample?.name} voice`}
                              title="Play"
                            >
                              <Play size={14} /> <span>Play</span>
                            </button>
                          )}

                          {isCardPlaying && (
                            <button
                              type="button"
                              className="ctrl-btn pause"
                              onClick={pauseSample}
                              aria-label={`Pause ${currentSample?.name} voice`}
                              title="Pause"
                            >
                              <Pause size={14} /> <span>Pause</span>
                            </button>
                          )}

                          {isCardPaused && (
                            <button
                              type="button"
                              className="ctrl-btn resume primary"
                              onClick={resumeSample}
                              aria-label={`Resume ${currentSample?.name} voice`}
                              title="Resume"
                            >
                              <Play size={14} /> <span>Resume</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className="ctrl-btn stop"
                            disabled={!isCardPlaying && !isCardPaused}
                            onClick={stopSample}
                            aria-label={`Stop ${currentSample?.name} voice`}
                            title="Stop"
                          >
                            <Square size={12} /> <span>Stop</span>
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar & Timing */}
                      <div className="dropdown-track-wrap">
                        <div className="dropdown-time-strip">
                          <span>{formatTime(isCardActive ? playbackState.currentTime : 0)}</span>
                          <span className="sample-file-pill">{currentSample?.src.replace('/samples/', '')}</span>
                          <span>{formatTime(isCardActive ? playbackState.duration : 0)}</span>
                        </div>
                        <div className="dropdown-track-bar">
                          <div 
                            className="dropdown-track-fill" 
                            style={{ 
                              width: `${isCardActive && playbackState.duration ? (playbackState.currentTime / playbackState.duration) * 100 : 0}%` 
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="plan-conversion-actions">
                  <a 
                    className={`studio-plan-cta ${isGold ? 'primary' : ''}`} 
                    href={demoUrl(plan.id, currentSample?.name)} 
                    onClick={event => local(event, demoUrl(plan.id, currentSample?.name))}
                  >
                    <span>Request {DISPLAY_NAMES[plan.id] || plan.name} demo</span>
                    <ArrowUpRight size={16} />
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
