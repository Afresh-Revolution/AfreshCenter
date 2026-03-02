import { useState } from 'react'
import { sendContact } from '../api/contact'
import '../scss/Contact.scss'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

type ContactItem = {
  icon: React.ReactNode
  title: string
  lines: string[]
}

const contactItems: ContactItem[] = [
  {
    icon: <PhoneIcon />,
    title: 'Phone',
    lines: ['+234 908 842 4461', 'Mon-Fri, 9:00 AM – 6:00 PM'],
  },
  {
    icon: <EmailIcon />,
    title: 'Email',
    lines: ['info@afresh.com', 'support@afresh.com'],
  },
  {
    icon: <LocationIcon />,
    title: 'Address',
    lines: ['423 Park Ave, Suite 200', 'New York, NY 10022'],
  },
  {
    icon: <ClockIcon />,
    title: 'Business Hours',
    lines: ['Monday – Friday: 9:00 AM – 6:00 PM', 'Saturday: 10:00 AM – 2:00 PM'],
  },
]

const quickLinks = ['Home', 'About', 'Services', 'Support', 'Account']

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    setStatusMessage('')
    const response = await sendContact({
      name: form.firstName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    })
    if (response.success) {
      setStatus('success')
      setStatusMessage(response.message ?? 'Message sent successfully.')
      setForm({ firstName: '', email: '', phone: '', subject: '', message: '' })
    } else {
      setStatus('error')
      setStatusMessage(response.message ?? 'Failed to send message.')
    }
  }

  return (
    <main className="contact-page">
      <header className="contact-hero" aria-label="Contact page hero">
        <div className="hero-overlay" />
        <div className="hero-topbar">
          <div className="hero-logo">
            <span className="hero-mark" aria-hidden="true">afr</span>
            <span className="hero-logo-text">afresh</span>
          </div>
          <nav aria-label="Primary navigation">
            <ul className="hero-nav">
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Contact Us</li>
            </ul>
          </nav>
          <button className="hero-cta" type="button">Book A Meeting</button>
        </div>
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>
            Get in touch with us.
            <br />
            We’d love to hear from you and discuss how we can help your business grow.
          </p>
        </div>
      </header>

      <section className="contact-main" aria-label="Contact details and form">
        {/* ── Left Column: Form Card ── */}
        <section className="contact-form-card">
          <div className="form-card-header">
            <h2>Send Us a Message</h2>
            <p className="card-subtitle">Fill out the form below and our team will get back to you within 24 hours.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange('firstName')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 908 842 4461"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  required
                />
              </div>
            </div>
            <div className="field field-message">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us about your project or inquiry..."
                value={form.message}
                onChange={handleChange('message')}
                required
              />
            </div>
            <button className="submit-btn" type="submit" disabled={status === 'sending'}>
              <span>Send Message</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="btn-arrow">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            {status !== 'idle' && (
              <p className="form-status" role="status" aria-live="polite">
                {statusMessage}
              </p>
            )}
          </form>
        </section>

        {/* ── Right Column: Three Stacked Cards ── */}
        <aside className="contact-side">

          {/* Card 1 – Contact Info */}
          <section className="info-card">
            <h3>Contact Information</h3>
            <p className="info-card-sub">Reach us through any of these channels.</p>
            <ul className="info-list">
              {contactItems.map((item, idx) => (
                <li key={item.title}>
                  <span className="info-icon" aria-hidden="true">{item.icon}</span>
                  <div className="info-text">
                    <h4>{item.title}</h4>
                    {item.lines.map((line) => {
                      if (item.title === 'Phone' && line.includes('+234')) {
                        return (
                          <p key={line}>
                            <a href="tel:+2349088424461">{line}</a>
                          </p>
                        )
                      }
                      if (item.title === 'Email' && line.includes('@')) {
                        return (
                          <p key={line}>
                            <a href={`mailto:${line}`}>{line}</a>
                          </p>
                        )
                      }
                      return <p key={line}>{line}</p>
                    })}
                  </div>
                  {idx < contactItems.length - 1 && <span className="info-divider" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </section>

          {/* Card 2 – Office Image */}
          <section className="office-photo" aria-label="Our office">
            <div className="office-photo-inner" />
            <div className="office-photo-overlay">
              <span className="office-photo-label">
                <LocationIcon />
                View Our Office
              </span>
            </div>
          </section>

          {/* Card 3 – CTA Card */}
          <section className="help-card">
            <div className="help-card-inner">
              <h3>Need Quick Help?</h3>
              <p>Check out our FAQ section or browse our services to learn more about what we offer.</p>
              <div className="help-btns">
                <button type="button" className="help-btn-primary">Chat With Us</button>
                <button type="button" className="help-btn-outline">Call Now</button>
              </div>
            </div>
          </section>

        </aside>
      </section>

      <footer className="contact-footer">
        <div className="footer-content">
          {/* Brand column */}
          <section className="footer-brand-col">
            <div className="footer-brand-row">
              <span className="footer-mark" aria-hidden="true">afr</span>
              <h3 className="footer-brand">afresh</h3>
            </div>
            <p>Delivering quality support built with dependable workflows and practical service standards.</p>
          </section>

          <section className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </section>

          <section className="footer-col footer-contact">
            <h4>Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-icon" aria-hidden="true"><PhoneIcon /></span>
                <a href="tel:+2349088424461">+234 908 842 4461</a>
              </li>
              <li>
                <span className="footer-icon" aria-hidden="true"><EmailIcon /></span>
                <a href="mailto:info@afresh.com">info@afresh.com</a>
              </li>
              <li>
                <span className="footer-icon" aria-hidden="true"><LocationIcon /></span>
                <span>423 Park Ave, Suite 200</span>
              </li>
            </ul>
          </section>

          <section className="footer-col footer-follow">
            <h4>Follow Us</h4>
            <div className="social-row" aria-label="Social links">
              <span aria-label="Facebook">f</span>
              <span aria-label="LinkedIn">in</span>
              <span aria-label="X">x</span>
              <span aria-label="Instagram">ig</span>
            </div>
          </section>
        </div>
      </footer>
    </main>
  )
}

export default Contact

