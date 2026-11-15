import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, AudioLines, Check, MessageCircle, Mic, MicOff, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Eyebrow } from './StudioParts';

const PLAN_DETAILS = [
  { name: 'Silver', modular: '₹3.00', bundle: '₹5.00', features: 'A-grade conversational voice, inbound and outbound workflows, interruption handling, live transcripts and insights' },
  { name: 'Gold', modular: '₹5.80', bundle: '₹7.00', features: 'Fast conversational AI, natural turn-taking, lead qualification and follow-ups, real-time call analytics' },
  { name: 'Diamond', modular: '₹10.00', bundle: '₹11.00', features: 'Studio-grade voice experience, voice customization, knowledge base integration, priority enterprise assistance' },
];

function getPricingAnswer(question) {
  const requestedPlans = PLAN_DETAILS.filter(plan => new RegExp(`\\b${plan.name.toLowerCase()}\\b`).test(question));
  const plans = requestedPlans.length ? requestedPlans : PLAN_DETAILS;
  const planDetails = plans.map(plan =>
    `${plan.name}: ${plan.modular} per minute on Modular or ${plan.bundle} per minute on the all-in-one bundle, excluding GST. Includes ${plan.features}.`
  ).join(' ');
  return `${planDetails} Modular pricing keeps SIP and Meta or WhatsApp services separate; the all-in-one bundle includes SIP, CRM and WhatsApp. Only connected calls are charged, with a 30-second minimum and 6-second increments after that. Unanswered, busy and failed calls are free. A ₹10,000 minimum initial recharge and 100,000-plus monthly minutes apply to some offers; final terms depend on your quote.`;
}

const TOPICS = [
  { id: 'voice', label: 'AI voice agents', answer: 'We help teams automate inbound and outbound conversations with natural AI voice agents.' },
  { id: 'pricing', label: 'Pricing', answer: getPricingAnswer('pricing') },
  { id: 'demo', label: 'Book a demo', answer: 'Our team can walk you through the platform and help find the right setup for your business.' },
];

function getVoiceReply(question, name) {
  const normalized = question.toLowerCase();
  const topic = TOPICS.find(item => {
    if (item.id === 'pricing') return /\b(price|pricing|rate|cost|plan|plans|silver|gold|diamond)\b/.test(normalized);
    if (item.id === 'demo') return /\b(demo|book|schedule|meeting)\b/.test(normalized);
    return /\b(voice|agent|call|automation)\b/.test(normalized);
  });
  return {
    topic,
    answer: topic?.id === 'pricing'
      ? getPricingAnswer(normalized)
      : topic?.answer || `Thanks, ${name}. I can help with AI voice agents, pricing, or booking a demo. What would you like to explore?`,
  };
}

function cleanSpokenName(value) {
  return value
    .replace(/^(my name is|i am|i'm|this is)\s+/i, '')
    .replace(/[.,!?]+$/, '')
    .trim()
    .slice(0, 60);
}

export default function VoiceAssistantPreview() {
  const [name, setName] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [voiceQuestion, setVoiceQuestion] = useState('');
  const [voiceReply, setVoiceReply] = useState('');
  const [speakingText, setSpeakingText] = useState('');
  const [speechError, setSpeechError] = useState('');
  const speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
  const recognitionAvailable = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  const welcomeText = 'Hello! I am the Avyukta IntelliCall AI assistant. May I know your name?';
  const personalGreeting = visitorName ? `Nice to meet you, ${visitorName}. What would you like to know?` : '';
  const [voiceMode, setVoiceMode] = useState('idle');
  const recognitionRef = useRef(null);
  const voiceModeRef = useRef('idle');
  const voiceStepRef = useRef(null);
  const visitorNameRef = useRef(visitorName);
  const speakTextRef = useRef(null);
  const startListeningRef = useRef(null);
  const handleTranscriptRef = useRef(null);

  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);
  useEffect(() => {
    visitorNameRef.current = visitorName;
  }, [visitorName]);

  const setVoiceStatus = useCallback(status => {
    voiceModeRef.current = status;
    setVoiceMode(status);
  }, []);

  const startListening = useCallback(step => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setSpeechError('Voice recognition is not available in this browser. Try the latest Chrome or Edge.');
      setVoiceStatus('idle');
      return;
    }
    voiceStepRef.current = step;
    setSpeechError('');
    setVoiceStatus(step === 'name' ? 'listening-name' : 'listening-question');
    try {
      recognition.start();
    } catch (error) {
      if (error.name !== 'InvalidStateError') {
        setSpeechError('Could not start the microphone. Please try again.');
        setVoiceStatus('idle');
      }
    }
  }, [setVoiceStatus]);

  const speakText = useCallback((text, lang = 'en-IN', onEnd) => {
    if (!speechAvailable) {
      setSpeechError('Speech playback is not supported in this browser.');
      return;
    }
    if (!onEnd && speakingText === text && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setSpeakingText('');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.96;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(voice => voice.lang.toLowerCase() === lang.toLowerCase()) || null;
    utterance.onend = () => {
      setSpeakingText(current => current === text ? '' : current);
      if (onEnd) onEnd();
    };
    utterance.onerror = event => {
      setSpeakingText(current => current === text ? '' : current);
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        setSpeechError('Browser could not play the voice. Check your device audio settings.');
        setVoiceStatus('idle');
      }
    };
    setSpeechError('');
    setSpeakingText(text);
    window.speechSynthesis.speak(utterance);
  }, [setVoiceStatus, speakingText, speechAvailable]);
  const handleTranscript = useCallback(event => {
    const transcript = event.results[event.resultIndex]?.[0]?.transcript?.trim();
    if (!transcript) return;
    const step = voiceStepRef.current;
    voiceStepRef.current = null;
    setSpeechError('');

    if (step === 'name') {
      const spokenName = cleanSpokenName(transcript);
      if (!spokenName) {
        setSpeechError('I did not catch your name. Tap the microphone and try again.');
        setVoiceStatus('idle');
        return;
      }
      setName(spokenName);
      setVisitorName(spokenName);
      visitorNameRef.current = spokenName;
      setSelectedTopic(null);
      setVoiceQuestion('');
      setVoiceReply('');
      const greeting = `Nice to meet you, ${spokenName}. What would you like to know?`;
      setVoiceStatus('speaking');
      speakTextRef.current(greeting, 'en-IN', () => startListeningRef.current('question'));
      return;
    }

    if (step === 'question') {
      const { topic, answer } = getVoiceReply(transcript, visitorNameRef.current || 'there');
      setVoiceQuestion(transcript);
      setVoiceReply(answer);
      setSelectedTopic(topic?.id || null);
      setVoiceStatus('speaking');
      speakTextRef.current(answer, 'en-IN', () => startListeningRef.current('question'));
    }
  }, [setVoiceStatus]);
  useEffect(() => {
    speakTextRef.current = speakText;
    startListeningRef.current = startListening;
    handleTranscriptRef.current = handleTranscript;
  }, [handleTranscript, speakText, startListening]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return undefined;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => handleTranscriptRef.current(event);
    recognition.onerror = event => {
      voiceStepRef.current = null;
      if (event.error === 'aborted') return;
      setSpeechError(event.error === 'not-allowed'
        ? 'Microphone access was denied. Allow microphone access in your browser and try again.'
        : event.error === 'no-speech'
          ? 'I did not hear anything. Tap the microphone to try again.'
          : 'Voice recognition could not continue. Please try again.');
      setVoiceStatus('idle');
    };
    recognition.onend = () => {
      if (voiceStepRef.current && voiceModeRef.current.startsWith('listening-')) {
        voiceStepRef.current = null;
        setSpeechError('I did not catch that. Tap the microphone to continue.');
        setVoiceStatus('idle');
      }
    };
    recognitionRef.current = recognition;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [setVoiceStatus]);

  const saveName = event => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setVisitorName(trimmedName);
    speakText(`Nice to meet you, ${trimmedName}. What would you like to know?`, 'en-IN');
  };

  const selectTopic = topic => {
    setSelectedTopic(topic.id);
    setVoiceQuestion('');
    setVoiceReply('');
    speakText(topic.answer, 'en-IN');
  };

  const startVoiceConversation = async () => {
    if (!recognitionAvailable || !speechAvailable) {
      setSpeechError('Voice chat preview requires the latest Chrome or Edge browser.');
      return;
    }
    setSpeechError('');
    setVoiceStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      const nextStep = visitorNameRef.current ? 'question' : 'name';
      const opening = visitorNameRef.current
        ? `Welcome back, ${visitorNameRef.current}. What would you like to know?`
        : welcomeText;
      setVoiceStatus('speaking');
      speakText(opening, 'en-IN', () => startListening(nextStep));
    } catch (error) {
      setSpeechError(error.name === 'NotAllowedError'
        ? 'Microphone access was denied. Allow microphone access in your browser and try again.'
        : 'Could not access your microphone. Check your browser and device settings.');
      setVoiceStatus('idle');
    }
  };

  const stopVoiceConversation = () => {
    if (recognitionRef.current && voiceModeRef.current.startsWith('listening-')) recognitionRef.current.abort();
    if (speechAvailable) window.speechSynthesis.cancel();
    voiceStepRef.current = null;
    setSpeakingText('');
    setSpeechError('');
    setVoiceStatus('idle');
  };

  const restart = () => {
    stopVoiceConversation();
    setName('');
    setVisitorName('');
    setSelectedTopic(null);
    setVoiceQuestion('');
    setVoiceReply('');
  };

  const selectedAnswer = TOPICS.find(topic => topic.id === selectedTopic)?.answer;

  return (
    <section className="studio-section studio-assistant" id="voice-assistant-preview">
      <div className="studio-container studio-assistant-grid">
        <div className="studio-assistant-copy">
          <Eyebrow>YOUR AVYUKTA AI ASSISTANT</Eyebrow>
          <h2>Start with a hello.<br /><span className="studio-accent">Make it personal.</span></h2>
          <p>Meet an AI assistant that introduces itself, learns your name, and helps you explore Avyukta IntelliCall.</p>
          <div className="studio-assistant-steps">
            <div><span>01</span><p><strong>A warm introduction</strong>It tells visitors who it is.</p></div>
            <div><span>02</span><p><strong>Learn their name</strong>Personalize the conversation.</p></div>
            <div><span>03</span><p><strong>Help with next steps</strong>Answer common questions.</p></div>
          </div>
          <div className="studio-assistant-preview-note"><Sparkles size={16} /><span>Browser mic preview · Voice recognition is browser-provided; replies are preset, not live AI</span></div>
        </div>

        <div className="studio-assistant-preview">
          <div className="studio-assistant-preview-top">
            <div className="studio-assistant-brand"><span className="studio-assistant-brand-icon"><Sparkles size={17} /></span><span><strong>Avyukta Assistant</strong><small>VOICE EXPERIENCE</small></span></div>
            <span className="studio-assistant-preview-badge"><i /> PREVIEW</span>
          </div>

          <div className="studio-assistant-conversation" aria-live="polite">
            <div className="studio-assistant-message">
              <span className="studio-assistant-avatar"><Sparkles size={15} /></span>
              <p><span>{welcomeText}</span><button type="button" className={`studio-assistant-speak ${speakingText === welcomeText ? 'speaking' : ''}`} onClick={() => speakText(welcomeText)} disabled={!speechAvailable} aria-label={speakingText === welcomeText ? 'Stop speaking' : 'Listen to introduction'} aria-pressed={speakingText === welcomeText}>{speakingText === welcomeText ? <VolumeX size={15} /> : <Volume2 size={15} />}</button></p>
            </div>

            {visitorName ? (
              <>
                <div className="studio-assistant-user-message">My name is {visitorName}.</div>
                <div className="studio-assistant-message">
                  <span className="studio-assistant-avatar"><Sparkles size={15} /></span>
                  <p><span>{personalGreeting}</span><button type="button" className={`studio-assistant-speak ${speakingText === personalGreeting ? 'speaking' : ''}`} onClick={() => speakText(personalGreeting)} disabled={!speechAvailable} aria-label={speakingText === personalGreeting ? 'Stop speaking' : 'Listen to greeting'} aria-pressed={speakingText === personalGreeting}>{speakingText === personalGreeting ? <VolumeX size={15} /> : <Volume2 size={15} />}</button></p>
                </div>
                <div className="studio-assistant-topic-list" aria-label="Choose a topic">
                  {TOPICS.map(topic => (
                    <button key={topic.id} type="button" className={selectedTopic === topic.id ? 'active' : ''} onClick={() => selectTopic(topic)}>
                      {topic.label}<ArrowRight size={14} />
                    </button>
                  ))}
                </div>
                {voiceQuestion && <div className="studio-assistant-user-message">{voiceQuestion}</div>}
                {(voiceQuestion ? voiceReply : selectedAnswer) && (
                  <div className="studio-assistant-message assistant-answer">
                    <span className="studio-assistant-avatar"><Sparkles size={15} /></span>
                    <p><span>{voiceQuestion ? voiceReply : selectedAnswer}</span><button type="button" className={`studio-assistant-speak ${speakingText === (voiceQuestion ? voiceReply : selectedAnswer) ? 'speaking' : ''}`} onClick={() => speakText(voiceQuestion ? voiceReply : selectedAnswer, 'en-IN')} disabled={!speechAvailable} aria-label={speakingText === (voiceQuestion ? voiceReply : selectedAnswer) ? 'Stop speaking' : 'Listen to answer'} aria-pressed={speakingText === (voiceQuestion ? voiceReply : selectedAnswer)}>{speakingText === (voiceQuestion ? voiceReply : selectedAnswer) ? <VolumeX size={15} /> : <Volume2 size={15} />}</button></p>
                  </div>
                )}
              </>
            ) : (
              <form className="studio-assistant-name-form" onSubmit={saveName}>
                <label htmlFor="assistant-visitor-name">Your name</label>
                <div>
                  <input id="assistant-visitor-name" type="text" autoComplete="given-name" maxLength={60} placeholder="Enter your name" value={name} onChange={event => setName(event.target.value)} required />
                  <button type="submit" aria-label="Continue"><ArrowRight size={18} /></button>
                </div>
              </form>
            )}
            {speechError && <p className="studio-assistant-speech-error" role="alert">{speechError}</p>}
          </div>

          <div className="studio-assistant-voice-panel">
            <div className="studio-assistant-orb" aria-hidden="true"><span><AudioLines size={30} /></span></div>
            <div className={`studio-assistant-wave ${voiceMode.startsWith('listening-') || voiceMode === 'speaking' ? 'is-active' : ''}`} aria-hidden="true">{[24, 42, 30, 65, 38, 84, 48, 70, 32, 90, 43, 62, 28, 76, 40, 58, 34, 82, 45, 68, 30, 55, 37, 73].map((height, index) => <i key={index} style={{ '--wave-height': `${height}%`, '--wave-delay': `${(index % 6) * 0.1}s` }} />)}</div>
            <button type="button" className={`studio-assistant-mic ${voiceMode.startsWith('listening-') ? 'is-listening' : ''}`} onClick={voiceMode === 'idle' ? startVoiceConversation : stopVoiceConversation} disabled={voiceMode === 'requesting' || !recognitionAvailable || !speechAvailable} aria-label={voiceMode === 'idle' ? 'Start voice conversation' : 'Stop voice conversation'} title={voiceMode === 'idle' ? 'Start voice conversation' : 'Stop voice conversation'}>{voiceMode.startsWith('listening-') ? <MicOff size={20} /> : <Mic size={20} />}</button>
            <span className="studio-assistant-voice-status">{voiceMode === 'requesting' ? 'REQUESTING MICROPHONE ACCESS' : voiceMode === 'speaking' ? 'ASSISTANT SPEAKING' : voiceMode === 'listening-name' ? 'LISTENING · SAY YOUR NAME' : voiceMode === 'listening-question' ? 'LISTENING · ASK A QUESTION' : !recognitionAvailable ? 'VOICE CHAT NEEDS CHROME OR EDGE' : 'TAP MIC TO START VOICE CHAT'}</span>
          </div>

          <div className="studio-assistant-delivery">
            <span className="studio-assistant-whatsapp-icon"><MessageCircle size={19} /></span>
            <span><strong>Conversation summary → WhatsApp</strong><small>Delivery will be enabled with the backend integration.</small></span>
            <span className="studio-assistant-delivery-badge"><Check size={12} /> NEXT PHASE</span>
          </div>
          {visitorName && <button className="studio-assistant-restart" type="button" onClick={restart}>Start preview again</button>}
        </div>
      </div>
    </section>
  );
}
