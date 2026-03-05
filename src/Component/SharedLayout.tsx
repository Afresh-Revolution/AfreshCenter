import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
]

const quickLinks = ['Home', 'About', 'Services', 'Support', 'Account']

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
              <li key={link}>{link}</li>
            ))}
          </ul>
        </section>

        <section className="site-footer-col">
          <h4>Contact Us</h4>
          <ul className="site-footer-contact">
            <li>
              <a href="tel:+2349088424461">+234 908 842 4461</a>
            </li>
            <li>
              <a href="mailto:info@afresh.com">info@afresh.com</a>
            </li>
            <li>423 Park Ave, Suite 200</li>
          </ul>
        </section>

        <section className="site-footer-col">
          <h4>Follow Us</h4>
          <div className="site-footer-social" aria-label="Social links">
            <span aria-label="Facebook">f</span>
            <span aria-label="LinkedIn">in</span>
            <span aria-label="X">x</span>
            <span aria-label="Instagram">ig</span>
          </div>
        </section>
      </div>
    </footer>
  )
}
