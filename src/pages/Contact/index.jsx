import React, { useState } from 'react';
import { STORES, FAQS } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import { MapPin, Phone, Mail, Clock, ChevronDown, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Private Client Appointment',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all required contact fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Your inquiry has been received by our KAYOO Studio team.', 'success');
  };

  return (
    <div className="section-sm">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
            Client Relations & Studios
          </span>
          <h1 style={{ marginTop: 8, marginBottom: 16 }}>KAYOO Studio & Concierge</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Our dedicated team in Phnom Penh and Siem Reap are at your disposal for showroom visits, sizing consultations, and priority courier support.
          </p>
        </div>

        {/* Global Showrooms Grid */}
        <div style={{ marginBottom: 80 }}>
          <h3 style={{ textAlign: 'center', marginBottom: 32, fontSize: '1.4rem' }}>Flagship Residences</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {STORES.map((store) => (
              <div
                key={store.city}
                style={{
                  padding: '28px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span className="badge badge-gold">{store.city}</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: 12 }}>{store.name}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <MapPin size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{store.address}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Clock size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span>{store.hours}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Phone size={16} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                      <span>{store.phone}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, topic: `Private Appointment - ${store.city}` }));
                      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    Request Appointment →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Support Details Dual Column */}
        <div
          id="contact-form"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 56,
            alignItems: 'flex-start',
            marginBottom: 80
          }}
          className="contact-grid"
        >
          {/* Form */}
          <div
            style={{
              padding: 'clamp(20px, 4vw, 36px)',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ marginBottom: 8, fontSize: '1.4rem' }}>Direct Concierge Dispatch</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
              Expect a dedicated reply within 4 business hours from our Phnom Penh studio team.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '32px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="var(--accent-gold)" style={{ margin: '0 auto 16px' }} />
                <h4>Inquiry Received</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. A KAYOO client advisor has been assigned to your request and will contact you via <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 20 }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marcella Sforza"
                    className="form-input"
                    required
                  />
                </div>

                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Order Number (Optional)</label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. KY-8921"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Inquiry Subject</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="form-select"
                  >
                    <option value="Private Client Appointment">Private Client Showroom Appointment</option>
                    <option value="Sizing & Fit Advice">Sizing & Silhouette Consultation</option>
                    <option value="Order Status & Delivery">Order Status & Courier Inquiry</option>
                    <option value="Complimentary Returns">Complimentary Return Assistance</option>
                    <option value="Press & Editorial">Press & Editorial Loan</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may our KAYOO team assist you today?"
                    className="form-textarea"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '14px', marginTop: 8 }}>
                  <Send size={15} /> Transmit to Concierge
                </button>
              </form>
            )}
          </div>

          {/* Direct channels & FAQ Anchor */}
          <div>
            <div style={{ padding: '32px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', marginBottom: 24 }}>
              <h4 style={{ marginBottom: 12 }}>Direct Communication</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Mail size={18} color="var(--accent-gold)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>VIP Client Services</div>
                    <div style={{ color: 'var(--text-secondary)' }}>concierge@kayoo-cambodia.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <Phone size={18} color="var(--accent-gold)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Cambodia & Regional Support</div>
                    <div style={{ color: 'var(--text-secondary)' }}>+855 (23) 888-919 (Daily 10:00–21:00 GMT+7)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <MessageSquare size={18} color="var(--accent-gold)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Private Telegram / WhatsApp Concierge</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Available 24/7 for KAYOO Syndicate Members</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ marginBottom: 8 }}>Need to Track an Existing Shipment?</h5>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                You can look up live FedEx Courier telemetry directly using your order number.
              </p>
              <a href="/track-order" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                Track Order Status →
              </a>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <section id="faq" style={{ paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              Frequent Inquiries
            </span>
            <h2 style={{ marginTop: 6 }}>KAYOO FAQ</h2>
          </div>

          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0,
                        marginLeft: 12
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
