import React from 'react';

const PRICING_DETAIL_LINKS = [
  { id: 'sip-infrastructure', label: 'SIP Infrastructure' },
  { id: 'meta-waba-platform', label: 'Meta / WABA WhatsApp Platform' },
  { id: 'a-la-carte-architecture', label: 'A-La-Carte Architecture' },
  { id: 'all-in-one-solution', label: 'All-in-One Solution' },
  { id: 'voice-calls-per-minute', label: 'Voice calls — per minute' },
  { id: 'chat-per-ai-reply', label: 'Chat — per AI reply' },
];

export default function PricingTopicMarquee({ navigateTo }) {
  const openPricingDetail = (event, id) => {
    event.preventDefault();
    navigateTo(`/pricing#${id}`);
  };

  return (
    <nav className="pricing-topic-marquee home-pricing-topic-marquee" aria-label="Explore pricing details">
      <div className="pricing-topic-marquee-track">
        {[false, true].map((duplicate, copyIndex) => (
          <div className="pricing-topic-marquee-group" key={copyIndex} aria-hidden={duplicate || undefined}>
            {PRICING_DETAIL_LINKS.map(item => (
              <a
                key={item.id}
                href={`/pricing#${item.id}`}
                tabIndex={duplicate ? -1 : undefined}
                onClick={event => openPricingDetail(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
