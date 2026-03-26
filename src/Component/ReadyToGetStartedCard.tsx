import { Link } from 'react-router-dom'

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

export type ReadyToGetStartedCardProps = {
  /** Optional service name for booking context (e.g. pre-fill contact form) */
  serviceName?: string
  /** CTA button text */
  buttonText?: string
  /** Description paragraph */
  description?: string
  /** Phone number under "Need Help?" */
  phone?: string
  /** Email under "Need Help?" */
  email?: string
}

const DEFAULT_DESCRIPTION = 'Book a consultation with our experts to discuss your project requirements and get a customized solution.'
const DEFAULT_PHONE = '+234 806 123 4567'
const DEFAULT_EMAIL = 'info@afresh.com'

export function ReadyToGetStartedCard({
  serviceName,
  buttonText = 'Book This Service',
  description = DEFAULT_DESCRIPTION,
  phone = DEFAULT_PHONE,
  email = DEFAULT_EMAIL,
}: ReadyToGetStartedCardProps) {
  const contactTo = serviceName ? { pathname: '/contact', search: `?service=${encodeURIComponent(serviceName)}` } : '/contact'

  return (
    <aside className="ready-to-get-started-card" aria-label="Get started and contact">
      <h3 className="ready-to-get-started-card__heading">Ready to Get Started?</h3>
      <p className="ready-to-get-started-card__description">{description}</p>
      <Link to={contactTo} className="ready-to-get-started-card__btn">
        <span className="ready-to-get-started-card__btn-icon" aria-hidden>
          <CalendarIcon />
        </span>
        {buttonText}
      </Link>
      <div className="ready-to-get-started-card__help">
        <h4 className="ready-to-get-started-card__help-heading">Need Help?</h4>
        <p className="ready-to-get-started-card__help-item">
          <span className="ready-to-get-started-card__help-icon" aria-hidden><PhoneIcon /></span>
          <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
        </p>
        <p className="ready-to-get-started-card__help-item">
          <span className="ready-to-get-started-card__help-icon" aria-hidden><EmailIcon /></span>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </aside>
  )
}
