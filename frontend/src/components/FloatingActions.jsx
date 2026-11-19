import React, { useState, useEffect } from 'react';
import { Bot, X, Sparkles, PhoneCall } from 'lucide-react';
import VoiceAssistantPreview from './VoiceAssistantPreview';

export default function FloatingActions() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Close assistant on Escape key
  useEffect(() => {
    if (!isAssistantOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsAssistantOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAssistantOpen]);

  // Verified company WhatsApp link configured in repository (+91 85600 00600)
  const whatsappUrl = `https://wa.me/918560000600?text=${encodeURIComponent(
    'Hello Avyukta Intellicall, I would like to know more about your services.'
  )}`;

  return (
    <>
      <div className="floating-actions-dock" aria-label="Quick contact and AI assistant">
        {/* 1. Official Direct Call Floating Button (+91 85600 00600) */}
        <a 
          href="tel:+918560000600"
          className="floating-btn floating-call-btn"
          aria-label="Call Avyukta IntelliCall (+91 85600 00600)"
          title="Call +91 85600 00600"
        >
          <PhoneCall size={20} className="floating-call-icon" />
          <span className="floating-btn-tooltip">Call +91 85600 00600</span>
        </a>

        {/* 2. Official WhatsApp Floating Button (+91 85600 00600) */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn floating-whatsapp-btn"
          aria-label="Chat on WhatsApp with Avyukta IntelliCall (+91 85600 00600)"
          title="Chat on WhatsApp (+91 85600 00600)"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" width="22" height="22" aria-hidden="true">
            <path d="M16 2a13.9 13.9 0 00-12 21L2 30l7.2-1.9A14 14 0 1016 2zm0 25.5a11.5 11.5 0 01-5.9-1.6l-.4-.3-4.4 1.2 1.2-4.2-.3-.4A11.5 11.5 0 1116 27.5zm6.3-8.6c-.3-.2-2-.9-2.3-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9 9 0 01-2.6-1.6 10 10 0 01-1.8-2.3c-.2-.3 0-.5.2-.7l.5-.6.3-.5a.6.6 0 000-.5c-.1-.2-.7-1.7-.9-2.3s-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.2 2.8 6.4 6.4 0 001.3 3.4 14.6 14.6 0 005.6 5 13 13 0 001.9.7 4.5 4.5 0 002.1.1 3.4 3.4 0 002.2-1.6 2.8 2.8 0 00.2-1.5c-.2-.1-.5-.2-.8-.4z" />
          </svg>
          <span className="floating-btn-tooltip">WhatsApp Us</span>
        </a>

        {/* 3. Avyukta AI Voice Assistant Floating Button */}
        <button
          type="button"
          className={`floating-btn floating-ai-btn ${isAssistantOpen ? 'active' : ''}`}
          onClick={() => setIsAssistantOpen(prev => !prev)}
          aria-expanded={isAssistantOpen}
          aria-controls="floating-ai-drawer"
          aria-label={isAssistantOpen ? 'Close AI Assistant' : 'Open Avyukta AI Assistant'}
          title="Talk to Avyukta AI Voice Assistant"
        >
          <span className="floating-ai-pulse" aria-hidden="true" />
          <Bot size={20} className="floating-ai-icon" />
          <span className="floating-ai-badge">AI</span>
          <span className="floating-btn-tooltip">Ask AI Assistant</span>
        </button>
      </div>

      {/* AI Assistant Slide-over / Modal */}
      {isAssistantOpen && (
        <div className="floating-ai-modal-backdrop" onClick={() => setIsAssistantOpen(false)}>
          <div 
            id="floating-ai-drawer" 
            className="floating-ai-modal-content"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Avyukta AI Assistant"
          >
            <div className="floating-ai-modal-header">
              <div className="floating-ai-title-wrap">
                <div className="floating-ai-header-icon">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3>Avyukta AI Voice Assistant</h3>
                  <p>Interactive pricing, voice plans, and demo assistant</p>
                </div>
              </div>
              <button 
                type="button" 
                className="floating-ai-close-btn"
                onClick={() => setIsAssistantOpen(false)}
                aria-label="Close assistant"
              >
                <X size={20} />
              </button>
            </div>

            <div className="floating-ai-modal-body">
              <VoiceAssistantPreview />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
