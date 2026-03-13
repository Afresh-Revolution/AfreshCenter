import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { SiteNavbar, SiteFooter } from './SharedLayout'
import '../scss/Checkout.scss'

/* ── Icons ── */
const LockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)
const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="20 6 9 17 4 12" />
    </svg>
)
const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
)

const PAYMENT_METHODS = [
    { id: 'card', label: 'Credit / Debit Card' },
    { id: 'bank', label: 'Bank Transfer' },
    { id: 'paystack', label: 'Paystack' },
]

const initialForm = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
}

function formatCardNumber(val: string) {
    return val
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim()
}

function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
}

function Checkout() {
    const [params] = useSearchParams()
    const navigate = useNavigate()

    const serviceName = params.get('service') ?? 'Service Booking'
    const prefillName = params.get('name') ?? ''
    const prefillEmail = params.get('email') ?? ''

    const [paymentMethod, setPaymentMethod] = useState('card')
    const [form, setForm] = useState(initialForm)
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const handleChange = (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let val = e.target.value
            if (field === 'cardNumber') val = formatCardNumber(val)
            if (field === 'expiry') val = formatExpiry(val)
            if (field === 'cvv') val = val.replace(/\D/g, '').slice(0, 4)
            setForm((f) => ({ ...f, [field]: val }))
        }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('processing')
        setStatusMessage('')
        // Simulate payment processing (replace with real payment gateway call)
        await new Promise((res) => setTimeout(res, 2000))
        setStatus('success')
        setStatusMessage("Payment successful! We'll contact you shortly to confirm your booking.")
    }

    if (status === 'success') {
        return (
            <main className="checkout-page">
                <SiteNavbar />
                <div className="checkout-success">
                    <div className="checkout-success__icon">
                        <CheckIcon />
                    </div>
                    <h1>Payment Received!</h1>
                    <p>{statusMessage}</p>
                    <p className="checkout-success__service">Service: <strong>{serviceName}</strong></p>
                    {prefillEmail && (
                        <p className="checkout-success__email">A confirmation will be sent to <strong>{prefillEmail}</strong></p>
                    )}
                    <button
                        type="button"
                        className="checkout-success__btn"
                        onClick={() => navigate('/services')}
                    >
                        Back to Services
                    </button>
                </div>
                <SiteFooter />
            </main>
        )
    }

    return (
        <main className="checkout-page">
            <SiteNavbar />

            <div className="checkout-inner">
                {/* Back */}
                <button
                    type="button"
                    className="checkout-back"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon /> Back
                </button>

                <h1 className="checkout-title">Payment Checkout</h1>

                <div className="checkout-layout">
                    {/* ── Left: Payment form ── */}
                    <section className="checkout-form-col" aria-label="Payment details">

                        {/* Payment method tabs */}
                        <div className="checkout-methods">
                            {PAYMENT_METHODS.map((m) => (
                                <button
                                    key={m.id}
                                    type="button"
                                    className={`checkout-method-btn${paymentMethod === m.id ? ' is-active' : ''}`}
                                    onClick={() => setPaymentMethod(m.id)}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>

                        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
                            {paymentMethod === 'card' && (
                                <>
                                    <div className="checkout-form__field">
                                        <label htmlFor="co-cardname">Name on Card</label>
                                        <input
                                            id="co-cardname"
                                            type="text"
                                            className="checkout-form__input"
                                            value={form.cardName}
                                            onChange={handleChange('cardName')}
                                            placeholder={prefillName || 'John Doe'}
                                            required
                                            autoComplete="cc-name"
                                        />
                                    </div>
                                    <div className="checkout-form__field">
                                        <label htmlFor="co-cardnum">Card Number</label>
                                        <input
                                            id="co-cardnum"
                                            type="text"
                                            inputMode="numeric"
                                            className="checkout-form__input checkout-form__input--mono"
                                            value={form.cardNumber}
                                            onChange={handleChange('cardNumber')}
                                            placeholder="0000 0000 0000 0000"
                                            required
                                            autoComplete="cc-number"
                                        />
                                    </div>
                                    <div className="checkout-form__row">
                                        <div className="checkout-form__field">
                                            <label htmlFor="co-expiry">Expiry Date</label>
                                            <input
                                                id="co-expiry"
                                                type="text"
                                                inputMode="numeric"
                                                className="checkout-form__input"
                                                value={form.expiry}
                                                onChange={handleChange('expiry')}
                                                placeholder="MM/YY"
                                                required
                                                autoComplete="cc-exp"
                                            />
                                        </div>
                                        <div className="checkout-form__field">
                                            <label htmlFor="co-cvv">CVV</label>
                                            <input
                                                id="co-cvv"
                                                type="text"
                                                inputMode="numeric"
                                                className="checkout-form__input"
                                                value={form.cvv}
                                                onChange={handleChange('cvv')}
                                                placeholder="•••"
                                                required
                                                autoComplete="cc-csc"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {paymentMethod === 'bank' && (
                                <div className="checkout-bank-info">
                                    <p>Please transfer to the account below and include your service name as the reference:</p>
                                    <dl className="checkout-bank-details">
                                        <div><dt>Bank</dt><dd>First Bank Nigeria</dd></div>
                                        <div><dt>Account Name</dt><dd>Afresh Centre Ltd</dd></div>
                                        <div><dt>Account Number</dt><dd>0123456789</dd></div>
                                        <div><dt>Reference</dt><dd>{serviceName}</dd></div>
                                    </dl>
                                    <p className="checkout-bank-note">After transfer, click the button below to notify us.</p>
                                </div>
                            )}

                            {paymentMethod === 'paystack' && (
                                <div className="checkout-paystack-info">
                                    <p>You'll be redirected to Paystack's secure payment page to complete your payment.</p>
                                </div>
                            )}

                            {status === 'error' && (
                                <p className="checkout-form__status checkout-form__status--error" role="alert">
                                    {statusMessage}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="checkout-form__submit"
                                disabled={status === 'processing'}
                            >
                                <LockIcon />
                                {status === 'processing'
                                    ? 'Processing…'
                                    : paymentMethod === 'bank'
                                        ? "I've Made the Transfer"
                                        : paymentMethod === 'paystack'
                                            ? 'Continue to Paystack'
                                            : 'Pay Now'}
                            </button>

                            <p className="checkout-form__secure">
                                <LockIcon /> Secured with 256-bit SSL encryption
                            </p>
                        </form>
                    </section>

                    {/* ── Right: Order summary ── */}
                    <aside className="checkout-summary" aria-label="Order summary">
                        <h2 className="checkout-summary__title">Order Summary</h2>

                        <div className="checkout-summary__service">
                            <div className="checkout-summary__service-icon" aria-hidden />
                            <div>
                                <p className="checkout-summary__service-name">{serviceName}</p>
                                <p className="checkout-summary__service-sub">Professional Service</p>
                            </div>
                        </div>

                        {prefillName && (
                            <div className="checkout-summary__row">
                                <span>Client</span>
                                <span>{prefillName}</span>
                            </div>
                        )}
                        {prefillEmail && (
                            <div className="checkout-summary__row">
                                <span>Email</span>
                                <span>{prefillEmail}</span>
                            </div>
                        )}

                        <div className="checkout-summary__divider" />

                        <ul className="checkout-summary__features">
                            <li><CheckIcon /> Expert consultation included</li>
                            <li><CheckIcon /> Dedicated project manager</li>
                            <li><CheckIcon /> Progress updates via email</li>
                            <li><CheckIcon /> Satisfaction guarantee</li>
                        </ul>

                        <div className="checkout-summary__divider" />

                        <p className="checkout-summary__note">
                            A member of our team will reach out within 24 hours to confirm your booking and discuss pricing.
                        </p>
                    </aside>
                </div>
            </div>

            <SiteFooter />
        </main>
    )
}

export default Checkout
