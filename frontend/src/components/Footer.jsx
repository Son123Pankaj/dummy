import React from 'react';
import { ArrowUpRight, Mail, PhoneCall, MapPin, Camera, BriefcaseBusiness } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';
const NAV = [['Home', '/'], ['Services', '/services'], ['Features', '/features'], ['Pricing', '/pricing'], ['About us', '/about'], ['Contact', '/contact']];
const SOL = [['Cloud dialer', '/cloud-dialer'], ['VoIP minutes', '/voip-minutes'], ['AI voice agent', '/ai-caller'], ['Rate calculator', '/rate-calculator'], ['FAQ', '/faq']];
export default function Footer({ navigateTo }) {
  const local = (e, href) => { e.preventDefault(); navigateTo(href); };
  return <footer className="studio-footer">
    <div className="studio-container">
      <div className="studio-footer-top">
        <div className="studio-footer-intro"><img src={getAssetUrl('/avyukta-premium-dark.png')} alt="Avyukta IntelliCall" /><p>AI-led conversations. Human-centered experiences. Telecom infrastructure built for what's next.</p><div className="studio-socials"><a href="https://www.instagram.com/avyukta_intellicall/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={18}/></a><a href="https://www.linkedin.com/company/avyukta-intellicall/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={18}/></a></div></div>
        <div className="studio-footer-col"><h3>Explore</h3>{NAV.map(([name, href]) => <a key={href} href={href} onClick={e=>local(e,href)}>{name}</a>)}</div>
        <div className="studio-footer-col"><h3>Solutions</h3>{SOL.map(([name, href]) => <a key={href} href={href} onClick={e=>local(e,href)}>{name}</a>)}</div>
        <div className="studio-footer-col studio-footer-reach"><h3>Let's talk</h3><a href="mailto:sales@avyukta.in"><Mail size={16}/> sales@avyukta.in</a><a href="tel:+917240001056"><PhoneCall size={16}/> +91 72400 01056</a><a href="tel:+918560000600"><PhoneCall size={16}/> +91 85600 00600</a><div className="footer-address"><MapPin size={17}/><span>Jaipur, Rajasthan, India</span></div><a href="/contact" className="studio-footer-cta" onClick={e=>local(e,'/contact')}>Get in touch <ArrowUpRight size={17}/></a></div>
      </div>
      <div className="studio-footer-bottom"><span>© {new Date().getFullYear()} Avyukta IntelliCall. All rights reserved.</span><div>{[['Privacy', '/privacy'], ['Terms', '/terms'], ['Refund policy', '/refund']].map(([name,href])=><a key={href} href={href} onClick={e=>local(e,href)}>{name}</a>)}</div></div>
    </div>
    <a className="floating-whatsapp-widget" href="https://wa.me/918560000600" target="_blank" rel="noreferrer" aria-label="Chat with Avyukta on WhatsApp">
      <img className="floating-whatsapp-badge-img" src={getAssetUrl('/whatsapp-bot-badge.png')} alt="Avyukta WhatsApp AI + Human Bot" />
    </a>
  </footer>;
}
