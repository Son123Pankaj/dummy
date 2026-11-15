import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQS_DATA = [
  {
    id: 'pricing-1',
    q: 'How does pay-as-you-go pricing work?',
    a: 'AI voice usage is charged per connected call minute at the selected rate. Published pricing may require a minimum initial recharge and a monthly volume commitment. The rate, billing model, any platform charges and final commercial terms are confirmed in your quotation.'
  },
  {
    id: 'pricing-2',
    q: 'How do the volume rates work?',
    a: 'Your rate is set by the minutes you commit to for the month. Once a band is agreed you are billed at that rate from your very first minute — you do not have to reach the volume before the discount applies.'
  },
  {
    id: 'pricing-3',
    q: 'How exactly is a call measured?',
    a: 'Only connected calls are charged. Every call has a 30-second minimum, after which it bills in 6-second increments — so a 42-second call costs 42 seconds, not a full minute. Unanswered, busy and failed calls cost nothing.'
  },
  {
    id: 'pricing-4',
    q: 'How is chat billed?',
    a: 'From ₹0.30 per reply your AI agent sends — about ₹1.50 per minute of conversation. The rate depends on the size of your knowledge base, because that is what the agent re-reads on every reply; we confirm your rate before you start. Messages your customer types are free, and so are replies sent by a human agent after a handoff. Knowledge base grounding and custom tools are included. If a chat turns into a voice call, the voice rate applies from that point on.'
  },
  {
    id: 'pricing-5',
    q: 'Is telephony included in the per-minute rate?',
    a: 'It depends on your selected model. Modular AI rates exclude SIP/telephony and other separately priced services; the all-in-one bundle includes the components listed in its offer. International calling charges, number rental and applicable taxes may still vary by destination and agreement.'
  },
  {
    id: 'pricing-6',
    q: 'Can I switch plans?',
    a: 'You can explore modular and bundle options, or discuss moving between voice tiers. Changes to commercial terms and integrations are confirmed with our team before the switch.'
  },
  {
    id: 'pricing-7',
    q: 'What happens if I run out of credit?',
    a: 'Calls stop until you top up. You will have seen a low-balance warning in the dashboard well before that point, and you can set the threshold that triggers it.'
  },
  {
    id: 'pricing-8',
    q: 'Is there a free trial?',
    a: 'Use the Start free trial link to explore the available AI agent onboarding experience. Trial eligibility and any usage limits are shown at signup.'
  },
  {
    id: 'pricing-9',
    q: 'Can I get a refund?',
    a: 'Unused credit is refundable within 7 days of a top-up. Usage already consumed is not refundable. Full terms are in our Refund & Cancellation policy.'
  },
  {
    id: 'platform-1',
    q: 'What AI calling capabilities does Avyukta offer?',
    a: 'Avyukta AI supports inbound and outbound calling, multilingual interactions, lead qualification, customer engagement, appointment scheduling, automated follow-ups, and CRM-connected workflows. Capabilities can be configured around your business requirements.'
  },
  {
    id: 'platform-2',
    q: 'Can an AI agent transfer a call to a human?',
    a: 'Yes. Calls can be handed off when a customer requests human assistance, a workflow requires additional support, or a configured business condition is met.'
  },
  {
    id: 'platform-3',
    q: 'Can I listen to voice samples before choosing a plan?',
    a: 'Yes. You can preview available voice samples to compare voice quality, language options, and conversational styles before selecting a suitable solution.'
  },
  {
    id: 'platform-4',
    q: 'Is Avyukta AI suitable for startups and large enterprises?',
    a: 'Yes. AI communication solutions can be configured for businesses of different sizes, with pricing, infrastructure, and deployment aligned to operational needs.'
  },
  {
    id: 'platform-5',
    q: 'Which industries can use Avyukta AI?',
    a: 'Use cases can support banking and financial services, healthcare, real estate, education, e-commerce and retail, insurance, travel and hospitality, automotive, telecommunications, and customer support or BPO. Specific workflows and integrations depend on business requirements.'
  },
  {
    id: 'platform-6',
    q: 'What makes Avyukta different from other AI communication platforms?',
    a: 'Avyukta brings AI-powered voice, CRM, omnichannel communication, telephony, and business process automation together in a connected ecosystem. Solutions can be configured around supported integrations and business workflows.'
  },
  {
    id: 'platform-7',
    q: 'Can Avyukta automate the lead management process?',
    a: 'Yes. Configurable workflows can help collect, assign, qualify, follow up on, and track leads using business rules and supported integrations.'
  },
  {
    id: 'platform-8',
    q: 'What reports and analytics are available?',
    a: 'Depending on the enabled modules, reporting can include call volumes and status, inbound and outbound activity, lead generation and qualification, agent and campaign performance, follow-ups, and conversion tracking.'
  },
  {
    id: 'platform-9',
    q: 'Can Avyukta integrate with my existing CRM and applications?',
    a: 'Avyukta can connect with compatible CRM, telephony, and third-party applications through supported APIs and infrastructure. Available integrations depend on your systems and requirements.'
  },
  {
    id: 'platform-10',
    q: 'Can I request a platform demo or walkthrough?',
    a: 'Yes. You can request a product demonstration or walkthrough. The Avyukta team can share relevant platform screenshots and working examples based on your use case.'
  },
  {
    id: 'platform-11',
    q: 'Can Avyukta customize workflows for my business?',
    a: 'Avyukta can configure supported CRM workflows, AI agent setups, integrations, and communication processes to align with your business objectives and technical requirements.'
  }
];

export default function FaqSection() {
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
          <div className="pricing-badge-pro">
            <span className="badge-dot-coral"></span>
            <span>✦ HELP &amp; FAQ</span>
          </div>
          
          <h2 className="faq-main-title">
            Frequently Asked <span className="title-coral">Questions</span>
          </h2>

          <p className="faq-lead-desc">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="mailto:sales@avyukta.in" className="faq-link-highlight">
              Contact our team
            </a>.
          </p>
        </div>

        {/* 2-Column Responsive Card Grid (2 questions per row/section, by default closed) */}
        <div className="faq-cards-grid">
          {FAQS_DATA.map((item) => {
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
                  aria-expanded={isOpen}
                >
                  <h3 className="faq-card-q-text">{item.q}</h3>
                  <div className="faq-chevron-pill" aria-hidden="true">
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-card-body">
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
