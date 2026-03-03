// LandingPage.jsx
import heroBackground from "../assets/images/Background-Image.png";
import afLogo from "../assets/images/af 1.png";
import cbLogo from "../assets/images/cb 1.png";
import gwaveLogo from "../assets/images/gwave 1.png";
import popsLogo from "../assets/images/pops 1.png";
import knowristLogo from "../assets/images/knowrist 1.png";
import aboutImageLeft from "../assets/images/Image-Box-1.png";
import aboutImageRight from "../assets/images/Image-Box-2.png";

function LandingPage() {
  const affiliatedCompanies = [
    { name: "CBrilliance", logo: cbLogo },
    { name: "Afresh", logo: afLogo },
    { name: "GeniusWave", logo: gwaveLogo },
    { name: "Popswit", logo: popsLogo },
    { name: "Knowrist", logo: knowristLogo },
  ];

  return (
    <div className="app">
      {/* Navbar (exact from screenshot)  */}
      <nav className="navbar">
        <div className="logo">AfRESH</div>
        <div className="nav-links">
          <span>HOME</span>
          <span>ABOUT</span>
          <span>SERVICES</span>
          <span>CONTACT US</span>
        </div>
        <div style={{ fontSize: "20px", color: "#1f4d3a" }}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      {/* Hero (exact copy)  */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="hero-content">
          <h1>EMPOWERING AFRICA THROUGH INNOVATION AND CREATIVITY</h1>
          <p>
            AfRESH Center Is A Revolutionary Entrepreneurial Support Hub
            Delivering Technology, Media, Sports, and Entertainment Solutions
            That Drive Real Impact.
          </p>
          <div className="btn-group">
            <button className="btn btn-primary">Learn more</button>
            <button className="btn btn-outline">Join us</button>
          </div>
        </div>
      </section>

      {/* Our Affiliated Companies  */}
      <section className="affiliated">
        <h4>Our Affiliated Companies</h4>
        <div className="brand-strip">
          {affiliatedCompanies.map((company) => (
            <div className="brand-item" key={company.name}>
              <img src={company.logo} alt={company.name} />
            </div>
          ))}
        </div>
      </section>

      {/* About us  */}
      <section className="about container">
        <div className="about-grid">
          <div className="about-text">
            <h2>About us</h2>
            <p>
              Afresh centre is a dynamic innovation hub committed to empowering
              Africa’s next generation of entrepreneurs, creators, athletes, and
              tech leaders. We exist to bridge opportunity gaps by combining
              technology, media, sports, and entertainment into one powerful
              ecosystem designed to support growth, creativity, and sustainable
              impact. At AfRESH, we don’t just offer services — we build
              platforms, create opportunities, and drive transformation.
            </p>
            <span className="read-more-link">Read More →</span>
          </div>
          <div className="about-visual">
            <div className="about-photo about-photo-left">
              <img src={aboutImageLeft} alt="Afresh team collaboration" />
            </div>
            <div className="about-count-badge">
              <span className="about-count-number">100+</span>
              <span className="about-count-text">Completed Projects</span>
            </div>
            <div className="about-photo about-photo-right">
              <img src={aboutImageRight} alt="Afresh team member" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services (exact 6 cards)  */}
      <section className="services-preview">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="service-cards">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>FrontEnd Development</h3>
              <p>
                Software development services customization to design, code,
                test and deploy web applications.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-microchip"></i>
              </div>
              <h3>Hardware</h3>
              <p>
                Software development services customization to design, code,
                test and deploy hardware systems.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <h3>UI/UX Design</h3>
              <p>
                Software development services customization to design, code,
                test and deploy user interface applications.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Cyber security</h3>
              <p>
                Software development services customization to design, code,
                test and deploy cybersecurity solutions.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-pencil-ruler"></i>
              </div>
              <h3>Graphics Design</h3>
              <p>
                Software development services customization to design, code,
                test and deploy graphic designs.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3>Media</h3>
              <p>
                Software development services customization to design, code,
                test and deploy multimedia applications.
              </p>
              <span className="learn-more">Learn More →</span>
            </div>
          </div>
          <div className="view-all">
            View all <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </section>

      {/* Meet Our Team  */}
      <section className="team-section container">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="section-sub">
          Dedicated professionals passionate about transforming education
          through technology.
        </div>
        <div className="team-grid">
          <div className="team-card">
            <h4>John ...</h4>
            <div className="team-role">education expert</div>
            <div className="team-desc">
              10+ years in education, edtech strategist.
            </div>
          </div>
          <div className="team-card">
            <h4>Blessing Adokuchi</h4>
            <div className="team-role">software engineer</div>
            <div className="team-desc">
              5+ years Java, Python, e‑learning platforms.
            </div>
          </div>
          <div className="team-card">
            <h4>Jethro Mark Da'ar</h4>
            <div className="team-role">mobile developer</div>
            <div className="team-desc">React Native, Firebase, 3+ years.</div>
          </div>
          <div className="team-card">
            <h4>Dominic Ray Narayan</h4>
            <div className="team-role">enterprise dev</div>
            <div className="team-desc">Spring Boot, MongoDB, 2+ years.</div>
          </div>
          <div className="team-card">
            <h4>William Bosworth</h4>
            <div className="team-role">web developer</div>
            <div className="team-desc">
              Node.js, MySQL, e‑commerce specialist.
            </div>
          </div>
        </div>
        <div className="view-all-team">View all →</div>
      </section>

      {/* Our Top Works (exact replica with all items from screenshot)  */}
      <section className="topworks">
        <div className="container">
          <div className="works-header">
            <h2>Our Top Works</h2>
            <span style={{ color: "#1b5e4a" }}>
              Committed experts eager to revolutionize education using
              innovative technology.
            </span>
          </div>
          <div className="works-grid">
            <div className="work-item">
              <span className="badge">1</span>
              <h3>vann</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit …</p>
            </div>
            <div className="work-item">
              <span className="badge">2</span>
              <h3>consectetur</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit …</p>
            </div>
            <div className="work-item">
              <span className="badge">3</span>
              <h3>voluptat</h3>
              <p>to be welcomed and every pain in certain.</p>
            </div>
            <div className="work-item">
              <span className="badge">4</span>
              <h3>sos</h3>
              <p>mattis te the principle of selection hi majest.</p>
            </div>
          </div>
          {/* Why Choose us? block exactly from screenshot  */}
          <div className="why-choose">
            <h3 style={{ fontSize: "32px", marginBottom: "16px" }}>
              Why Choose us?
            </h3>
            <p>
              Conversely, we firmly reject the allure of fleeting pleasures that
              can mislead and commoditize individuals. We believe in making
              choices that prioritize long-term well-being over momentary
              satisfaction, ensuring that our clients can navigate challenges
              with foresight and resilience.
            </p>
            <ul>
              <li>But I must explain to you how all this nonsense</li>
              <li>Quo Voulustas Null</li>
              <li>Lorem ipsum</li>
              <li>
                Lorem ipsum is simply dummy text of the printing and typesetting
              </li>
              <li>Lorem ipsum is simply dummy text of the printing and type</li>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
            </ul>
          </div>
          {/* Testimonials card with Samuel Light  */}
          <div className="testimonial-card">
            <p>
              "At our tech hub, we embrace innovation and creativity, ensuring
              that every challenge is met with a solution. Our team is dedicated
              to providing exceptional service, making it easy for you to
              navigate the complexities of technology. With us, you can explore
              endless possibilities without any obstacles."
            </p>
            <div className="testimonial-author">
              <div className="author-img">SL</div>
              <div>
                <strong>Samuel Light</strong>
                <br />
                Full stack Dev
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GET STARTED NOW banner (exact from first screenshot)  */}
      <section className="getstarted-banner container">
        <h2>GET STARTED NOW</h2>
        <div style={{ fontSize: "24px", fontWeight: 300 }}>Get Started</div>
        <div className="btn-ghost">→</div>
      </section>

      {/* Get in Touch with Us (contact form + details from screenshot)  */}
      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h3>Get in Touch with Us</h3>
            <div className="info-line">
              <i className="fas fa-phone"></i> +35866970742
            </div>
            <div className="info-line">
              <i className="fas fa-envelope"></i> jewishmail.com
            </div>
            <div className="info-line">
              <i className="fas fa-map-pin"></i> No. 23344 at Jerusalem,
              nunubanot.gov.il · Palestinian Israel
            </div>
            <div className="social-icons">
              <i className="fab fa-facebook"></i>{" "}
              <i className="fab fa-twitter"></i>{" "}
              <i className="fab fa-instagram"></i>{" "}
              <i className="fab fa-linkedin"></i>
            </div>
            <div
              style={{
                marginTop: "30px",
                fontSize: "14px",
                background: "#ffffff20",
                padding: "20px",
                borderRadius: "24px",
              }}>
              <strong>JEWISH EXILES IN BABYLONIA</strong>
              <br />2 KIS, 24-10-30; 25-8-12 AR: 5:20-34 6:00K - 9:15 EDR: 2:59;
              8:17
              <br />
              City Mousaiah peak · Jewish exiles' route
            </div>
          </div>
          <div className="form-box">
            <div className="form-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter Number" />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input type="text" placeholder="Subject" />
              </div>
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea placeholder="Message"></textarea>
            </div>
            <button className="submit-btn">Submit</button>
            <div className="tiny-note">
              +35866970742 · jewishmail.com · No. 23344 Jerusalem
            </div>
          </div>
        </div>
      </section>

      {/* footer with extra details  */}
      <footer className="footer">
        <div>© AfRESH – innovation hub</div>
        <div className="jewish-ref">⚲ Mousaiah peak · 2 KIS 24-10-30</div>
        <div>
          Follow our social media <i className="fab fa-facebook"></i>{" "}
          <i className="fab fa-instagram"></i>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
