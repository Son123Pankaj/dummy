import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AiSummarizer from './AiSummarizer';
import { CUSTOMER_FAQS } from '../data/offer';

export default function FaqSection({ items = CUSTOMER_FAQS }) {
  // BY DEFAULT NOTHING IS OPEN (Requirement: by default open nhi hona chahiye)
  const [openIds, setOpenIds] = useState([]);

  const toggleFaq = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="faq-section-block" id="faq">
      <div className="wrap">
        
        {/* Section Header */}
        <div className="faq-head-center">
          <div className="faq-badge-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="pricing-badge-pro">
              <span className="badge-dot-coral"></span>
              <span>✦ HELP &amp; FAQ</span>
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
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="mailto:sales@avyukta.in" className="faq-link-highlight">
              sales[At]avyukta.in
            </a>.
          </p>
        </div>

        {/* 2-Column Responsive Card Grid (2 questions per row/section, by default closed) */}
        <div className="faq-cards-grid">
          {items.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`faq-card-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-card-header"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen} aria-controls={`faq-answer-${item.id}`}
                >
                  <h3 className="faq-card-q-text">{item.q}</h3>
                  <div className="faq-chevron-pill" aria-hidden="true">
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-card-body" id={`faq-answer-${item.id}`}>
                    <div className="faq-card-divider"></div>
                    <p className="faq-card-a-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
