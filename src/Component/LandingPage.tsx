// LandingPage.jsx
import { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {/* ===================== HEADER / NAVBAR ===================== */}
      <header className="navbar">
        <div className="container navbar-container">
          <div className="logo">
            <span className="logo-text">Afr<span className="highlight">SH</span></span>
          </div>

          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>

          <div 
            className={`hamburger ${menuOpen ? 'active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* ===================== HERO SECTION ===================== */}
      <section id="home" className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Transforming Ideas into <span className="highlight">Digital Success</span>
            </h1>
            <p className="hero-subtitle">
              We create powerful brands, stunning visuals, and result-driven digital marketing strategies for businesses across Africa.
            </p>
            <div className="hero-cta">
              <button className="btn primary">Get Started</button>
              <button className="btn outline">Learn More</button>
            </div>
          </div>

          <div className="hero-visual">
            {/* You can replace with real hero image / illustration */}
            <div className="hero-placeholder">
              <div className="glow-circle"></div>
              <span className="emoji">🚀</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT US ===================== */}
      <section id="about" className="section about">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                AfrSH is a passionate digital media and marketing agency based in Nigeria. 
                We help brands grow through creative storytelling, strategic digital marketing, 
                video production, UI/UX design, and high-impact social media campaigns.
              </p>
              <p>
                Our mission is simple — <strong>make African businesses impossible to ignore online</strong>.
              </p>
            </div>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2.4M</span>
                <span className="stat-label">Reach Generated</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">42</span>
                <span className="stat-label">Awards Won</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="section services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {[
              { title: "Social Media Management", icon: "📱", desc: "Strategy, content & growth" },
              { title: "Video Production", icon: "🎥", desc: "Commercials, reels, storytelling" },
              { title: "Branding & Design", icon: "🎨", desc: "Logos, UI/UX, brand identity" },
              { title: "Digital Marketing", icon: "📈", desc: "Ads, SEO, performance marketing" },
              { title: "Motion Graphics", icon: "✨", desc: "Animation & visual effects" },
              { title: "Web Development", icon: "💻", desc: "Fast, modern, responsive websites" },
            ].map((service, i) => (
              <div className="service-card" key={i}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA / CONTACT ===================== */}
      <section id="contact" className="cta-section">
        <div className="container">
          <h2>Ready to elevate your brand?</h2>
          <p className="cta-text">
            Let's create something extraordinary together.
          </p>
          <button className="btn primary large">Start Your Project →</button>
          <p className="contact-info">
            hello@afrshmedia.com • +234 803 123 4567 • Kano / Lagos, Nigeria
          </p>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="logo">
              <span className="logo-text">Afr<span className="highlight">SH</span></span>
            </div>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Twitter / X</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} AfrSH Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;