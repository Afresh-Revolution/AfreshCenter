import { NavLink } from 'react-router-dom'
import { SiteFooter, SiteNavbar } from './SharedLayout'

const supportChannels = [
  {
    title: 'General Inquiries',
    description: 'Use this when you need information about AfrESH, partnerships, or the right service to start with.',
    actionLabel: 'Email Support',
    actionHref: 'mailto:afreshcenter@gmail.com?subject=General%20Inquiry',
  },
  {
    title: 'Service Guidance',
    description: 'Reach out if you need help choosing a service, clarifying deliverables, or understanding next steps.',
    actionLabel: 'View Services',
    actionHref: '/services',
  },
  {
    title: 'Direct Contact',
    description: 'For urgent follow-up, call the team directly during working hours.',
    actionLabel: 'Call Now',
    actionHref: 'tel:+03586907042',
  },
]

const supportFaqs = [
  {
    question: 'How do I know which AfrESH service is right for me?',
    answer: 'Start with the services page, then contact the team with your goals. They can recommend the most suitable support based on your needs.',
  },
  {
    question: 'How quickly will I get a response?',
    answer: 'Support requests submitted by email or the contact form should receive a follow-up from the team as soon as possible during business hours.',
  },
  {
    question: 'Can I request custom support or partnership discussions?',
    answer: 'Yes. Use the contact channel for custom requirements, collaborations, or partnership conversations and include enough context for routing.',
  },
]

function Support() {
  return (
    <main className="support-page">
      <header className="support-hero" aria-label="Support page hero">
        <div className="support-hero-overlay" />
        <SiteNavbar />
        <div className="support-hero-content">
          <p className="support-hero-kicker">Support</p>
          <h1>Get practical help from the AfrESH team.</h1>
          <p>
            Use this page to find the right support channel, get quick answers,
            and move to the next step without guessing.
          </p>
          <div className="support-hero-actions">
            <NavLink to="/contact" className="support-primary-link">
              Contact Us
            </NavLink>
            <NavLink to="/services" className="support-secondary-link">
              Explore Services
            </NavLink>
          </div>
        </div>
      </header>

      <section className="support-overview" aria-label="Support overview">
        <div className="support-section-heading">
          <p className="support-section-kicker">How We Help</p>
          <h2>Choose the support path that matches what you need.</h2>
        </div>
        <div className="support-channel-grid">
          {supportChannels.map((channel) => {
            const isInternal = channel.actionHref.startsWith('/')
            return (
              <article key={channel.title} className="support-channel-card">
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                {isInternal ? (
                  <NavLink to={channel.actionHref} className="support-channel-link">
                    {channel.actionLabel}
                  </NavLink>
                ) : (
                  <a href={channel.actionHref} className="support-channel-link">
                    {channel.actionLabel}
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section className="support-details" aria-label="Support details">
        <div className="support-steps-card">
          <p className="support-section-kicker">Before You Reach Out</p>
          <h2>Share enough context to get a useful response faster.</h2>
          <ol className="support-steps-list">
            <li>State what you need help with.</li>
            <li>Include your preferred contact details.</li>
            <li>Mention the service, booking, or request involved.</li>
            <li>Add any deadline or urgency if it matters.</li>
          </ol>
        </div>

        <div className="support-faq-card">
          <p className="support-section-kicker">Common Questions</p>
          <h2>Quick answers before you contact the team.</h2>
          <div className="support-faq-list">
            {supportFaqs.map((item) => (
              <article key={item.question} className="support-faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-cta" aria-label="Support call to action">
        <div className="support-cta-card">
          <h2>Still need help?</h2>
          <p>
            If you are not sure where your request belongs, use the contact page
            and the team can route it properly.
          </p>
          <NavLink to="/contact" className="support-primary-link">
            Open Contact Page
          </NavLink>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

export default Support
