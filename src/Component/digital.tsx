import "./digital.css";

export default function Digital() {
  return (
    <div>
      {/* Hero Section */}
      <div className="digital-container">
        <div className="digital-content">
          <a href="#" className="back-link">
            &lt; Back to Services
          </a>
          <div className="digital-text">
            <h1>Digital Marketing</h1>
            <p>
              Comprehensive digital marketing strategies to grow your online
              presence and drive conversions.
            </p>
          </div>
        </div>
        <div className="digital-image">
          <img src="/src/assets/images/digital.jpg" alt="Digital Marketing Dashboard" />
        </div>
      </div>

      {/* Main Content */}
      <div className="digital-main">
        <div className="digital-main-content">
          {/* Overview Section */}
          <section className="overview-section">
            <h2>Overview</h2>
            <p>
              Our digital marketing services help businesses establish and grow their online presence through
              various strategies including SEO, content marketing, social media, and paid advertising.
              From increasing brand awareness to generating qualified leads, we develop customized campaigns
              to reach your target audience and drive measurable results. From strategy development to execution and optimization, we ensure your marketing
              budget delivers maximum ROI.
            </p>
          </section>

          {/* Key Features Section */}
          <section className="key-features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>SEO and content marketing</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>Social media management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>PPC advertising (Google Ads, Facebook Ads)</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>Email marketing campaigns</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>Marketing analytics and reporting</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">◉</span>
                <span>Conversion rate optimization</span>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="benefits-section">
            <h2>Benefits</h2>
            <ul className="benefits-list">
              <li>
                <span className="benefit-icon">✓</span>
                <span>Increased online visibility</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Higher quality leads and conversions</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Measurable ROI</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Brand awareness and engagement</span>
              </li>
              <li>
                <span className="benefit-icon">✓</span>
                <span>Data-driven decision making</span>
              </li>
            </ul>
          </section>

          {/* What You'll Get Section */}
          <section className="what-youll-get-section">
            <h2>What You'll Get</h2>
            <ul className="deliverables-list">
              <li>
                <span className="deliverable-icon">◉</span>
                <span>Marketing strategy document</span>
              </li>
              <li>
                <span className="deliverable-icon">◉</span>
                <span>Campaign performance reports</span>
              </li>
              <li>
                <span className="deliverable-icon">◉</span>
                <span>Content calendar and assets</span>
              </li>
              <li>
                <span className="deliverable-icon">◉</span>
                <span>Analytics dashboards</span>
              </li>
              <li>
                <span className="deliverable-icon">◉</span>
                <span>Optimization recommendations</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="digital-sidebar">
          <div className="ready-section">
            <h3>Ready to Get Started?</h3>
            <p>Let's discuss your project requirements and get a customized solution.</p>
            <button className="cta-button">Click Here Service</button>
          </div>

          <div className="need-help-section">
            <h4>Need Help?</h4>
            <p>Contact us here for more information</p>
            <p className="contact-info">
              <strong>+1 (234) 567-8900</strong><br />
              <a href="mailto:info@afresh.com">info@afresh.com</a>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
