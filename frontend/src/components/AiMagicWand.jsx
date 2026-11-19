import React, { useState } from 'react';
import { Wand2, Check, X, Loader2, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

const ACTIONS = [
  { id: 'improve', label: 'Improve text', desc: 'Enhance clarity, elegance and flow', icon: Sparkles },
  { id: 'professional', label: 'Rewrite professionally', desc: 'Tone suitable for corporate telecoms and B2B enquiry', icon: ArrowRight },
  { id: 'grammar', label: 'Correct grammar', desc: 'Fix spelling, punctuation and syntax', icon: Check },
  { id: 'shorten', label: 'Make text shorter', desc: 'Concise, crisp and to the point', icon: Wand2 },
  { id: 'expand', label: 'Expand text', desc: 'Add helpful business details & telecom specs', icon: Sparkles }
];

export default function AiMagicWand({ currentText = '', onApply, inputName = 'message' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState('improve');
  const [previewText, setPreviewText] = useState('');
  const [error, setError] = useState('');
  const [lastOriginal, setLastOriginal] = useState('');

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setError('');
    setPreviewText('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setLoading(false);
    setPreviewText('');
    setError('');
  };

  const handleGenerate = async (actionId) => {
    setSelectedAction(actionId);
    setLoading(true);
    setError('');
    setLastOriginal(currentText);

    const textToProcess = currentText.trim() || 'We need an AI voice caller for our customer service and lead bookings.';

    try {
      const response = await fetch('/api/ai/magic-wand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToProcess, action: actionId })
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.result) {
          setPreviewText(data.result);
          setLoading(false);
          return;
        }
      }
      throw new Error('Fallback to local NLP');
    } catch {
      // Offline/Local deterministic fallback
      setTimeout(() => {
        let result = textToProcess;
        if (actionId === 'professional') {
          result = `Dear Avyukta IntelliCall Team,\n\nWe would like to request comprehensive details and a tailored quote regarding:\n${textToProcess}\n\nWe look forward to arranging an indicative demonstration at your earliest convenience.\n\nBest regards.`;
        } else if (actionId === 'grammar') {
          result = textToProcess
            .replace(/\bi\b/g, 'I')
            .replace(/\s+([.,!?;:])/g, '$1')
            .replace(/([.!?])\s*([a-z])/g, (_, p1, p2) => `${p1} ${p2.toUpperCase()}`)
            .replace(/^[a-z]/, m => m.toUpperCase());
          if (!/[.!?]$/.test(result)) result += '.';
        } else if (actionId === 'shorten') {
          result = textToProcess
            .replace(/\b(actually|basically|essentially|kind of|sort of|just wanted to say that)\b/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
        } else if (actionId === 'expand') {
          result = `${textToProcess}\n\nKey Requirements:\n• 24/7 Inbound and automated outbound calling\n• Bilingual Hindi & English voice cadence with live interruption\n• Instant CRM integration with live supervisor transfer`;
        } else {
          result = textToProcess.replace(/^[a-z]/, m => m.toUpperCase());
          if (!/[.!?]$/.test(result)) result += '.';
        }
        setPreviewText(result);
        setLoading(false);
      }, 350);
    }
  };

  const handleAccept = () => {
    if (previewText && onApply) {
      onApply(previewText);
    }
    handleClose();
  };

  const handleReject = () => {
    setPreviewText('');
    handleClose();
  };

  return (
    <div className="ai-magic-wand-container">
      <button
        type="button"
        className="ai-magic-wand-trigger"
        onClick={handleOpen}
        title="AI Magic Wand: Improve, rewrite, or correct this text"
        aria-label="AI Magic Wand assistant"
      >
        <Wand2 size={13} className="wand-icon" />
        <span>AI Assist</span>
      </button>

      {isOpen && (
        <div className="ai-magic-modal-backdrop" onClick={handleClose}>
          <div 
            className="ai-magic-modal-card" 
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Avyukta AI Writing Assistant"
          >
            <div className="ai-magic-modal-header">
              <div className="ai-magic-title-wrap">
                <div className="ai-magic-badge-icon">
                  <Wand2 size={16} />
                </div>
                <div>
                  <h4>AI Writing Assistant</h4>
                  <p>Refine your {inputName} with intelligent business writing</p>
                </div>
              </div>
              <button 
                type="button" 
                className="ai-magic-close-btn" 
                onClick={handleClose}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="ai-magic-modal-body">
              {/* Action buttons */}
              <div className="ai-magic-actions-grid" role="group" aria-label="AI writing options">
                {ACTIONS.map(action => (
                  <button
                    key={action.id}
                    type="button"
                    className={`ai-action-chip ${selectedAction === action.id ? 'active' : ''}`}
                    onClick={() => handleGenerate(action.id)}
                    disabled={loading}
                  >
                    <action.icon size={13} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Status & Preview Area */}
              {loading && (
                <div className="ai-magic-loading-state">
                  <Loader2 size={24} className="spinning" />
                  <span>Generating AI suggestion...</span>
                </div>
              )}

              {!loading && previewText && (
                <div className="ai-magic-preview-box">
                  <div className="ai-preview-header">
                    <span className="ai-preview-badge">
                      <Sparkles size={11} /> AI GENERATED PREVIEW
                    </span>
                    <span className="ai-preview-note">Review before applying</span>
                  </div>
                  
                  <div className="ai-preview-content">
                    <p>{previewText}</p>
                  </div>

                  <div className="ai-preview-footer">
                    <button
                      type="button"
                      className="ai-preview-btn reject"
                      onClick={handleReject}
                      title="Keep original text unchanged"
                    >
                      <X size={14} /> <span>Reject / Keep Original</span>
                    </button>
                    <button
                      type="button"
                      className="ai-preview-btn accept"
                      onClick={handleAccept}
                      title="Apply AI suggestion to input"
                    >
                      <Check size={14} /> <span>Apply to Message</span>
                    </button>
                  </div>
                </div>
              )}

              {!loading && !previewText && (
                <div className="ai-magic-empty-tip">
                  <p>
                    {currentText.trim() 
                      ? 'Choose an action above to refine your current message.' 
                      : 'You have not typed anything yet. Select an option to generate a professional starter prompt.'}
                  </p>
                  <button 
                    type="button" 
                    className="ai-magic-start-btn" 
                    onClick={() => handleGenerate('improve')}
                  >
                    <Sparkles size={14} /> <span>Refine with AI</span>
                  </button>
                </div>
              )}

              {error && <p className="ai-magic-error" role="alert">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
