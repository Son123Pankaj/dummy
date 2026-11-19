import React, { useRef, useState } from 'react';
import { ArrowUpRight, LayoutDashboard, PhoneCall, TrendingUp, Users, Workflow, Pause, Play } from 'lucide-react';
import './ProductShowcase.css';

const PRODUCTS = [
  {id: 'bpa', label: 'BPA', icon: Workflow, heading: 'Put routine work in motion.'},
  {id: 'crm', label: 'CRM', icon: Users, heading: 'Keep every customer connected.'},
  {id: 'dialer', label: 'Dialer', icon: PhoneCall, heading: 'Bring your calling team together.'},
  {id: 'command-center', label: 'Command Center', icon: LayoutDashboard, heading: 'Your operations. One command center.'},
  {id: 'sales', label: 'Sales', icon: TrendingUp, heading: 'Give every enquiry a next step.'},
];

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState('dialer');
  const [paused, setPaused] = useState(false);
  const refs = useRef([]);
  const product = PRODUCTS.find(item => item.id === activeId);
  const moveFocus = (event, index) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % PRODUCTS.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + PRODUCTS.length) % PRODUCTS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = PRODUCTS.length - 1;
    else return;
    event.preventDefault(); setActiveId(PRODUCTS[next].id); refs.current[next]?.focus();
  };
  return <>
    <section className="enterprise-products tw:py-16 tw:md:py-24" id="products" aria-labelledby="enterprise-products-title">
      <div className="enterprise-wide-container tw:mx-auto tw:w-full tw:max-w-[1400px] tw:px-6 tw:lg:px-12">
        <div className="enterprise-product-shell tw:grid">
          <div className="enterprise-product-sidebar tw:min-w-0 tw:md:pr-6 tw:lg:pr-8">
          <h2 id="enterprise-products-title" className="tw:mb-8 tw:text-2xl tw:font-semibold tw:tracking-tight">Explore the platform.</h2>
          <div className="enterprise-mobile-selector tw:md:hidden">
            <label htmlFor="enterprise-product-select" className="tw:sr-only">Select a product</label>
            <select id="enterprise-product-select" value={activeId} onChange={event => setActiveId(event.target.value)}>{PRODUCTS.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select>
          </div>
          <div className="enterprise-product-nav tw:hidden tw:md:flex tw:flex-col tw:gap-3" role="tablist" aria-label="Products" aria-orientation="vertical">
            {PRODUCTS.map((item,index) => {const Icon = item.icon; const selected = activeId === item.id; return <button key={item.id} ref={element => {refs.current[index] = element;}} type="button" id={`product-tab-${item.id}`} role="tab" aria-selected={selected} aria-controls="product-showcase-panel" tabIndex={selected ? 0 : -1} onClick={() => setActiveId(item.id)} onKeyDown={event => moveFocus(event,index)} className="enterprise-product-tab tw:flex tw:items-center tw:gap-3 tw:rounded-xl tw:px-4 tw:py-4 tw:text-left tw:text-sm tw:font-medium tw:transition-colors"><Icon size={18} aria-hidden="true"/><span>{item.label}</span><ArrowUpRight size={15} className="tw:ml-auto" aria-hidden="true"/></button>;})}
          </div>
          </div>
          <div id="product-showcase-panel" className="enterprise-product-panel tw:flex tw:min-w-0 tw:flex-col tw:rounded-2xl" role="tabpanel" aria-label={product.label} tabIndex={0}>
            <h3>Bring your calling team together.</h3>
            <img key={product.id} className="enterprise-dashboard" src={product.id === 'bpa' ? '/bpa-workflow.jpg' : '/avyukta-communications-dashboard.png'} alt={product.id === 'bpa' ? 'Illustrative Avyukta business process automation workflow' : 'Avyukta communications dashboard showing customer activity and team calling controls'} loading="lazy" decoding="async" width={product.id === 'bpa' ? undefined : 1365} height={product.id === 'bpa' ? undefined : 768}/>
          </div>
        </div>
      </div>
    </section>
    <section className="enterprise-network tw:py-12 tw:md:py-16" aria-labelledby="enterprise-network-title">
      <div className="enterprise-wide-container tw:mx-auto tw:w-full tw:max-w-[1800px] tw:px-6 tw:lg:px-12 tw:relative tw:mb-8 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4">
        <h2 id="enterprise-network-title" className="tw:text-2xl tw:font-semibold tw:tracking-tight">Our Global Network</h2>
        <button className="enterprise-marquee-control tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:px-4 tw:py-2 tw:text-xs" type="button" aria-pressed={paused} aria-controls="enterprise-network-track" onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} aria-hidden="true"/> : <Pause size={13} aria-hidden="true"/>}{paused ? 'Resume logos' : 'Pause logos'}</button>
      </div>
      <div tabIndex={0} role="region" aria-label="Company logo marquee" className={`enterprise-network-window${paused ? ' is-paused' : ''}`}>
        <div id="enterprise-network-track" className="enterprise-network-track">
          {[0,1].map(copy => <div className="enterprise-network-group" key={copy} aria-hidden={copy === 1 ? true : undefined}><img src="/clients-strip.png" alt={copy === 0 ? 'Original client, vendor and partner logo artwork supplied with the Avyukta website' : ''} width="1006" height="76" loading="lazy" decoding="async"/></div>)}
        </div>
      </div>
    </section>
  </>;
}
