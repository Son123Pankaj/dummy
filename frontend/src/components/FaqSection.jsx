import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AiSummarizer from './AiSummarizer';
import { CUSTOMER_FAQS } from '../data/offer';

const INITIAL_COUNT = 10;

export default function FaqSection({ items = CUSTOMER_FAQS }) {
  // All FAQ answers collapsed by default (activeId = null)
  // Single-open accordion behavior: opening one closes any previously open answer
  const [activeId, setActiveId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleFaq = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  const handleToggleExpand = () => {
    if (isExpanded) {
      // When collapsing back to the initial 10, close active FAQ if it becomes hidden
      const initialIds = items.slice(0, INITIAL_COUNT).map(i => i.id);
      if (activeId && !initialIds.includes(activeId)) {
        setActiveId(null);
      }
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const visibleItems = isExpanded ? items : items.slice(0, INITIAL_COUNT);

  return (
    <section className="faq-section-block" id="faq">
      <div className="wrap">
        
        {/* Section Header */}
        <div className="faq-head-center">
          <div className="faq-badge-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="pricing-badge-pro">
              <span className="badge-dot-coral"></span>
              <span>✦ FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <AiSummarizer 
              title="Frequently Asked Questions (FAQ)"
              content={items.map(i => `${i.q} ${i.a}`).join('\n\n')}
              label="AI FAQ Summary"
            />
          </div>
          
          <h2 className="faq-main-title">
            Frequently Asked <span className="title-coral">Questions</span>
          </h2>

          <p className="faq-lead-desc">
            Everything you need to know about Avyukta AI Voice Agents, Cloud Dialers, Telecom Interconnects, and CRM Integrations. Have another question?{' '}
            <a href="mailto:sales@avyukta.in" className="faq-link-highlight">
              sales[At]avyukta.in
            </a>
          </p>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <div className="faq-cards-grid">
          {visibleItems.map((item, index) => {
            const isOpen = activeId === item.id;
            return (
              <div 
                key={item.id} 
                className={`faq-card-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-card-header"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen} 
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <div className="faq-q-wrap">
                    {item.category && (
                      <span className="faq-category-chip">{item.category}</span>
                    )}
                    <h3 className="faq-card-q-text">{item.q}</h3>
                  </div>
                  <div className="faq-chevron-pill" aria-hidden="true">
                    <ChevronDown size={18} className={`faq-chevron-icon ${isOpen ? 'is-open' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div 
                    className="faq-card-body" 
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                  >
                    <div className="faq-card-divider"></div>
                    <p className="faq-card-a-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View More / View Less Toggle Button */}
        {items.length > INITIAL_COUNT && (
          <div className="faq-expand-action-row">
            <button
              type="button"
              className="faq-view-toggle-btn"
              onClick={handleToggleExpand}
              aria-expanded={isExpanded}
              aria-controls="faq"
            >
              <span>
                {isExpanded 
                  ? 'View Less FAQs' 
                  : `View More FAQs (${items.length - INITIAL_COUNT} More)`}
              </span>
              <ChevronDown 
                size={16} 
                className={`faq-toggle-chevron ${isExpanded ? 'is-expanded' : ''}`} 
                aria-hidden="true" 
              />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
