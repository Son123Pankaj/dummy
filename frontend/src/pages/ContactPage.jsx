import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink, 
  MessageCircle, 
  AlertCircle,
  Building2,
  Globe2,
  Headphones,
  Award
} from 'lucide-react';

export default function ContactPage({ onOpenTrial }) {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    if (name === 'name') {
      if (!trimmed) {
        error = 'Full name is required';
      } else if (trimmed.length < 2) {
        error = 'Name must be at least 2 characters';
      } else if (/\d/.test(trimmed)) {
        error = 'Name cannot contain numbers';
      } else if (!/^[a-zA-Z\s'.]+$/.test(trimmed)) {
        error = 'Name can only contain letters and spaces';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
      if (!trimmed) {
        error = 'Corporate email is required';
      } else if (!emailRegex.test(trimmed)) {
        error = 'Please enter a valid corporate email (e.g. name@company.com)';
      }
    }

    if (name === 'phone') {
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (!trimmed) {
        error = 'Phone / WhatsApp number is required';
      } else if (/[a-zA-Z]/.test(trimmed)) {
        error = 'Phone number cannot contain letters';
      } else if (digitsOnly.length < 10) {
        error = 'Phone number must have at least 10 digits';
      } else if (digitsOnly.length > 15) {
        error = 'Phone number cannot exceed 15 digits';
      }
    }

    if (name === 'company') {
      if (!trimmed) {
        error = 'Company or BPO name is required';
      } else if (trimmed.length < 2) {
        error = 'Company name must be at least 2 characters';
      }
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    const fields = ['name', 'email', 'phone', 'company'];
    fields.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    if (name === 'name') {
      sanitizedValue = value.replace(/[^a-zA-Z\s'.]/g, '');
    } else if (name === 'phone') {
      sanitizedValue = value.replace(/[^0-9+\- ]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (errors[name]) {
      const err = validateField(name, sanitizedValue);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      Swal.fire({
        icon: 'error',
        title: 'Please check form errors',
        text: 'Kindly fill in all required fields accurately.',
        confirmButtonColor: '#ea580c'
      });
      return;
    }

    const waMsg = `Hello Avyukta Team,\n\nNew Inquiry:\n👤 Name: ${formData.name}\n🏢 Company: ${formData.company}\n📞 Phone: ${formData.phone}\n✉️ Email: ${formData.email}\n📝 Details: ${formData.message || 'I would like to discuss AI voice bots and SIP telephony.'}`;
    const waUrl = `https://wa.me/917240001056?text=${encodeURIComponent(waMsg)}`;

    try {
      window.open(waUrl, '_blank');
    } catch {
      // ignore
    }

    Swal.fire({
      icon: 'info',
      title: 'Your WhatsApp message is ready',
      text: 'Review the prepared inquiry and press Send in WhatsApp to share it with our team.',
      confirmButtonText: 'Understood',
      confirmButtonColor: '#087f7d'
    });

    setFormSent(true);
  };

  return (
    <div className="studio-page studio-contact">
      <section className="studio-inner-hero studio-contact-hero"><div className="studio-container studio-inner-hero-grid"><div><span className="studio-eyebrow"><span className="studio-eyebrow-dot"/>LET'S TALK ABOUT YOUR BUSINESS</span><h1>Great things start<br/><span>with a conversation.</span></h1><p>Have a question or a project in mind? Tell us what you're building, and we'll help find the right communication solution.</p></div><div className="studio-contact-hero-visual"><div className="studio-contact-hero-icon"><Mail size={38}/></div><span>WE'D LOVE TO HEAR FROM YOU</span><h2>Let's make it happen.</h2><p>AI Voice · Cloud Telephony · CRM</p></div></div></section>
      <section className="studio-section studio-contact-section"><div className="studio-container studio-contact-grid">
        <div className="studio-contact-aside"><span className="studio-eyebrow"><span className="studio-eyebrow-dot"/>REACH OUT</span><h2>We're here to help.</h2><p>Explore how we can support your next step—from initial discovery to deployment.</p>
          <a href="tel:+917240001056" className="studio-contact-info"><div><Phone size={21}/></div><span><small>CALL OUR TEAM</small><strong>+91 72400 01056</strong></span><ArrowRight size={18}/></a>
          <a href="mailto:sales@avyukta.in" className="studio-contact-info"><div><Mail size={21}/></div><span><small>EMAIL US</small><strong>sales@avyukta.in</strong></span><ArrowRight size={18}/></a>
          <div className="studio-contact-info static"><div><MapPin size={21}/></div><span><small>FIND US</small><strong>Jaipur, Rajasthan, India</strong></span></div>
          <div className="studio-contact-time"><Clock size={18}/> Technical support operations: 24 × 6</div>
        </div>
        <div className="studio-contact-form-card">
          {!formSent ? <><div className="studio-form-head"><span>BUSINESS INQUIRY</span><h2>Tell us a little about your project.</h2><p>We'll open a WhatsApp message with your details so you can send your inquiry directly.</p></div>
          <form className="studio-contact-form" onSubmit={handleSubmit} noValidate><div className="studio-form-grid">
            {[{name:'name',label:'Full name',placeholder:'Your name',type:'text'},{name:'email',label:'Work email',placeholder:'you@company.com',type:'email'},{name:'phone',label:'Phone / WhatsApp',placeholder:'+91 98765 43210',type:'tel'},{name:'company',label:'Company',placeholder:'Your company',type:'text'}].map(field=><label key={field.name}>{field.label}<input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} onBlur={handleBlur} placeholder={field.placeholder} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name]?`${field.name}-error`:undefined}/>{errors[field.name]&&<small id={`${field.name}-error`} className="studio-form-error">{errors[field.name]}</small>}</label>)}
          </div><label>How can we help?<textarea name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell us about your requirement, expected volume or use case..."/></label><button type="submit" className="studio-btn studio-btn-primary studio-form-submit">Continue on WhatsApp <Send size={18}/></button><p className="studio-form-footnote"><ShieldCheck size={15}/> Your inquiry is only shared when you send the WhatsApp message.</p></form></> : <div className="studio-form-success"><CheckCircle2 size={48}/><h2>Almost there!</h2><p>A pre-filled WhatsApp inquiry was opened. Please press Send in WhatsApp to share it with our team.</p><button type="button" className="studio-btn studio-btn-primary" onClick={()=>setFormSent(false)}>Send another inquiry <ArrowRight size={16}/></button></div>}
        </div>
      </div></section>
    </div>
  );
}
