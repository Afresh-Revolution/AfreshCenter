import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact Us' },
  { label: 'Services' },
  { label: 'Support' },
  { label: 'Account' },
]

type SiteNavbarProps = {
  ctaLabel?: string
}

export function SiteNavbar({ ctaLabel = 'Afresh Academy' }: SiteNavbarProps) {
  return (
    <nav className="site-navbar-wrap">
      <div className="site-navbar">
        <div className="site-logo">
          <span className="site-mark" aria-hidden="true">
            afr
          </span>
          <span className="site-logo-text">afresh</span>
        </div>
        <nav aria-label="Primary navigation">
          <ul className="site-nav">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} end={item.to === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="site-cta" type="button">
          {ctaLabel}
        </button>
      </div>
    </nav>
  )
}

/* Footer icons: white on #ff8901 circle */
const FooterPhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const FooterEmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const FooterLocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const contactItems: { href?: string; icon: React.ReactNode; label: string }[] = [
  { href: 'tel:+03586907042', icon: <FooterPhoneIcon />, label: '+03586907042' },
  { href: 'mailto:joy@gmail.com', icon: <FooterEmailIcon />, label: 'JOY@GMAIL.COM' },
  { icon: <FooterLocationIcon />, label: 'N0-2344 OIL AIRPORT ROUNDABOUT JOS, PLATEAU STATE' },
]

/* Simple white social icons for orange circle */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const socialItems: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: '#', label: 'Facebook', icon: <FacebookIcon /> },
  { href: '#', label: 'Twitter', icon: <TwitterIcon /> },
  { href: '#', label: 'Instagram', icon: <InstagramIcon /> },
  { href: '#', label: 'WhatsApp', icon: <WhatsAppIcon /> },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <section className="site-footer-col site-footer-brand">
          <div className="site-footer-brand-row">
            <span className="site-mark" aria-hidden="true">
              afr
            </span>
            <h3>afresh</h3>
          </div>
          <p>
            Delivering quality support built with dependable workflows and practical
            service standards.
          </p>
        </section>

        <section className="site-footer-col">
          <h4>Quick Links</h4>
          <ul className="site-footer-links">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {'to' in link && link.to ? (
                  <NavLink to={link.to} end={link.to === '/'}>
                    {link.label}
                  </NavLink>
                ) : (
                  <span className="site-footer-link-placeholder">{link.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer-col">
          <h4>CONTACT US</h4>
          <ul className="site-footer-contact">
            {contactItems.map((item) => (
              <li key={item.label} className="site-footer-contact-item">
                <span className="site-footer-icon" aria-hidden="true">{item.icon}</span>
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span className="site-footer-contact-text">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="site-footer-col">
          <h4>FOLLOW US</h4>
          <div className="site-footer-social" aria-label="Social links">
            {socialItems.map((item) => (
              <a key={item.label} href={item.href} className="site-footer-social-link" aria-label={item.label}>
                <span className="site-footer-icon" aria-hidden="true">{item.icon}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  )
}
