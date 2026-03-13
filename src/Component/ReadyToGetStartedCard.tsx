import { useState, useEffect, useRef } from 'react'
import { createBooking } from '../api/bookings'
import { useNavigate } from 'react-router-dom'

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
  serviceName?: string
  description?: string
  phone?: string
  email?: string
}

const DEFAULT_DESCRIPTION = 'Book a consultation with our experts to discuss your project requirements and get a customized solution.'
const DEFAULT_PHONE = '+234 908 842 4461'
const DEFAULT_EMAIL = 'info@afresh.com'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectDetails: '',
}

export function ReadyToGetStartedCard({
  serviceName,
  description = DEFAULT_DESCRIPTION,
  phone = DEFAULT_PHONE,
  email = DEFAULT_EMAIL,
}: ReadyToGetStartedCardProps) {
  const navigate = useNavigate()
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const formRef = useRef<HTMLDivElement>(null)

  // Scroll form into view when it opens
  useEffect(() => {
    if (formOpen && formRef.current) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50)
    }
  }, [formOpen])

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const t = window.setTimeout(() => {
        setStatus('idle')
        setStatusMessage('')
      }, 5000)
      return () => window.clearTimeout(t)
    }
  }, [status])

  const handleChange = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMessage('')
    const details = [
      serviceName ? `Service: ${serviceName}` : '',
      form.projectDetails.trim(),
    ].filter(Boolean).join('\n')
    const res = await createBooking({
      full_name: form.fullName.trim(),
      email: form.email.trim(),
      phone_number: form.phone.trim(),
      company: form.company.trim() || undefined,
      project_details: details || undefined,
    })
    if (res.success) {
      setStatus('success')
      setStatusMessage("Booking submitted! We'll be in touch shortly.")
      setForm(initialForm)
    } else {
      setStatus('error')
      setStatusMessage(res.message ?? 'Something went wrong. Please try again.')
    }
  }

  const handlePayNow = () => {
    const params = new URLSearchParams({
      ...(serviceName ? { service: serviceName } : {}),
      ...(form.fullName ? { name: form.fullName } : {}),
      ...(form.email ? { email: form.email } : {}),
    })
    navigate(`/checkout?${params.toString()}`)
  }

  return (
    <aside className="ready-to-get-started-card" aria-label="Book this service">
      <h3 className="ready-to-get-started-card__heading">Ready to Get Started?</h3>
      <p className="ready-to-get-started-card__description">{description}</p>

      {/* ── Book This Service button (visible when form is closed) ── */}
      {!formOpen && (
        <button
          type="button"
          className="ready-to-get-started-card__btn"
          onClick={() => setFormOpen(true)}
        >
          <span className="ready-to-get-started-card__btn-icon" aria-hidden>
            <CalendarIcon />
          </span>
          Book This Service
        </button>
      )}

      {/* ── Booking form (slides in when button clicked) ── */}
      {formOpen && (
        <div
          ref={formRef}
          className="rtgs-form-wrap"
          aria-label="Booking form"
        >
          <form className="rtgs-form" onSubmit={handleSubmitBooking} noValidate>
            <div className="rtgs-form__field">
              <label className="rtgs-form__label" htmlFor="rtgs-fullname">
                Full Name <span aria-hidden>*</span>
              </label>
              <input
                id="rtgs-fullname"
                type="text"
                className="rtgs-form__input"
                value={form.fullName}
                onChange={handleChange('fullName')}
                placeholder="John Doe"
                required
                autoFocus
              />
            </div>

            <div className="rtgs-form__field">
              <label className="rtgs-form__label" htmlFor="rtgs-email">
                Email <span aria-hidden>*</span>
              </label>
              <input
                id="rtgs-email"
                type="email"
                className="rtgs-form__input"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="rtgs-form__field">
              <label className="rtgs-form__label" htmlFor="rtgs-phone">
                Phone Number <span aria-hidden>*</span>
              </label>
              <input
                id="rtgs-phone"
                type="tel"
                className="rtgs-form__input"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+234 808 000 0000"
                required
              />
            </div>

            <div className="rtgs-form__field">
              <label className="rtgs-form__label" htmlFor="rtgs-company">
                Company <span className="rtgs-form__optional">(Optional)</span>
              </label>
              <input
                id="rtgs-company"
                type="text"
                className="rtgs-form__input"
                value={form.company}
                onChange={handleChange('company')}
                placeholder="Your company name"
              />
            </div>

            <div className="rtgs-form__field">
              <label className="rtgs-form__label" htmlFor="rtgs-details">
                Project Details <span aria-hidden>*</span>
              </label>
              <textarea
                id="rtgs-details"
                className="rtgs-form__input rtgs-form__textarea"
                rows={4}
                value={form.projectDetails}
                onChange={handleChange('projectDetails')}
                placeholder="Tell us about your project or requirements..."
                required
              />
            </div>

            {status !== 'idle' && (
              <p
                className={`rtgs-form__status rtgs-form__status--${status}`}
                role="status"
                aria-live="polite"
              >
                {status === 'sending' ? 'Submitting…' : statusMessage}
              </p>
            )}

            <div className="rtgs-form__actions">
              <button
                type="submit"
                className="rtgs-form__btn rtgs-form__btn--primary"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Submitting…' : 'Submit Booking'}
              </button>
              <button
                type="button"
                className="rtgs-form__btn rtgs-form__btn--pay"
                onClick={handlePayNow}
              >
                Pay Now
              </button>
              <button
                type="button"
                className="rtgs-form__btn rtgs-form__btn--cancel"
                onClick={() => { setFormOpen(false); setForm(initialForm); setStatus('idle') }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Need Help ── */}
      <div className="ready-to-get-started-card__help">
        <h4 className="ready-to-get-started-card__help-heading">Need Help?</h4>
        <p className="ready-to-get-started-card__help-sub">Contact our team for more information</p>
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
