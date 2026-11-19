import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, Loader2, FileText, CheckCircle2 } from 'lucide-react';

export default function AiSummarizer({ title = 'Overview', content = '', label = 'Summarize with AI', buttonClassName = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleOpen = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content, title })
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.summary) {
          setSummaryData(data);
          setLoading(false);
          return;
        }
      }
      throw new Error('Fallback to local NLP summary');
    } catch {
      // Offline fallback summarizer
      setTimeout(() => {
        const sentences = content
          .replace(/[#*•✓]/g, '')
          .split(/(?<=[.?!])\s+/)
          .map(s => s.trim())
          .filter(s => s.length > 20);

        const keyHighlights = sentences.slice(0, 4);
        const takeaway = sentences[0] || `Avyukta IntelliCall enterprise solutions for ${title}.`;

        setSummaryData({
          title,
          summary: `Executive Summary of ${title}:\n\n${takeaway}\n\nKey Highlights:\n• ${keyHighlights.join('\n• ')}\n\nBusiness Value:\nProvides verified enterprise telecom infrastructure, transparent commercial billing, and high-concurrency conversational AI workflows.`,
          keyPoints: keyHighlights,
          readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`
        });
        setLoading(false);
      }, 400);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCopied(false);
    setError('');
  };

  const handleCopy = async () => {
    if (!summaryData?.summary) return;
    try {
      await navigator.clipboard.writeText(summaryData.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <>
      <button
        type="button"
        className={`ai-summarize-btn ${buttonClassName}`}
        onClick={handleOpen}
        title={`Summarize ${title} with Avyukta AI`}
        aria-label={`Summarize ${title} with AI`}
      >
        <Sparkles size={14} className="sparkle-icon" />
        <span>{label}</span>
      </button>

      {isOpen && (
        <div className="ai-summary-modal-backdrop" onClick={handleClose}>
          <div
            className="ai-summary-modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`AI Summary: ${title}`}
          >
            <div className="ai-summary-modal-header">
              <div className="ai-summary-title-wrap">
                <div className="ai-summary-badge-icon">
                  <FileText size={17} />
                </div>
                <div>
                  <h4>AI Executive Summary</h4>
                  <p>{title}</p>
                </div>
              </div>
              <button
                type="button"
                className="ai-summary-close-btn"
                onClick={handleClose}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="ai-summary-modal-body">
              {loading && (
                <div className="ai-summary-loading-wrap">
                  <Loader2 size={30} className="spinning" />
                  <h5>Analyzing and synthesizing summary...</h5>
                  <p>Extracting key takeaways, commercial terms, and telephony SLAs.</p>
                </div>
              )}

              {!loading && summaryData && (
                <div className="ai-summary-result-wrap">
                  <div className="ai-summary-meta-strip">
                    <span className="ai-summary-meta-badge">
                      <Sparkles size={11} /> AI GENERATED SYNTHESIS
                    </span>
                    <span className="ai-summary-read-time">{summaryData.readTime || '30 sec read'}</span>
                  </div>

                  <div className="ai-summary-content-box">
                    <pre className="ai-summary-text-block">{summaryData.summary}</pre>
                  </div>

                  <div className="ai-summary-footer-actions">
                    <button
                      type="button"
                      className={`ai-summary-action-btn copy-btn ${copied ? 'copied' : ''}`}
                      onClick={handleCopy}
                      title="Copy summary to clipboard"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
                    </button>
                    <button
                      type="button"
                      className="ai-summary-action-btn close-btn"
                      onClick={handleClose}
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="ai-summary-error-wrap">
                  <p>{error}</p>
                  <button type="button" onClick={handleOpen}>Retry</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
