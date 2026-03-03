// LandingPage.jsx
import heroBackground from "../assets/images/Background-Image.png";
import afLogo from "../assets/images/af 1.png";
import cbLogo from "../assets/images/cb 1.png";
import gwaveLogo from "../assets/images/gwave 1.png";
import popsLogo from "../assets/images/pops 1.png";
import knowristLogo from "../assets/images/knowrist 1.png";
import aboutImageLeft from "../assets/images/Image-Box-1.png";
import aboutImageRight from "../assets/images/Image-Box-2.png";
import serviceImage1 from "../assets/images/Image 1.png";
import serviceImage2 from "../assets/images/Image 2.png";
import serviceImage3 from "../assets/images/Image 3.png";
import serviceImage4 from "../assets/images/Image 4.png";
import serviceImage5 from "../assets/images/Image 5.png";
import serviceImage6 from "../assets/images/Image 6.png";
import blessingImage from "../assets/images/BlessingWilliams.jpg";
import jethroImage from "../assets/images/JethroMD.jpg";
import williamImage from "../assets/images/WilliamsBosw.jpg";

function LandingPage() {
  const affiliatedCompanies = [
    { name: "CBrilliance", logo: cbLogo },
    { name: "Afresh", logo: afLogo },
    { name: "GeniusWave", logo: gwaveLogo },
    { name: "Popswit", logo: popsLogo },
    { name: "Knowrist", logo: knowristLogo },
  ];

  const serviceItems = [
    {
      title: "FrontEnd Development",
      description:
        "Software development services customization to design, code, test and deploy web applications.",
      image: serviceImage1,
    },
    {
      title: "Hardware",
      description:
        "Software development services customization to design, code, test and deploy hardware systems.",
      image: serviceImage2,
    },
    {
      title: "UI/UX Design",
      description:
        "Software development services customization to design, code, test and deploy user interface applications.",
      image: serviceImage3,
    },
    {
      title: "Cyber security",
      description:
        "Software development services customization to design, code, test and deploy cybersecurity solutions.",
      image: serviceImage4,
    },
    {
      title: "Graphics Design",
      description:
        "Software development services customization to design, code, test and deploy graphic designs.",
      image: serviceImage5,
    },
    {
      title: "Media",
      description:
        "Software development services customization to design, code, test and deploy multimedia applications.",
      image: serviceImage6,
    },
  ];

  const teamMembers = [
    {
      name: "Felix Nwachukwu",
      role: "Hardware Manager",
      bio: "Oversees procurement and maintenance of hardware systems with a focus on stability and reliability.",
      image: jethroImage,
    },
    {
      name: "Blessing Adukuchili",
      role: "Administrative Manager",
      bio: "Leads administrative operations, documentation, scheduling, and internal process coordination.",
      image: blessingImage,
    },
    {
      name: "Jethro Mark Da'ar",
      role: "Chief Executive Officer (CEO)",
      bio: "Drives strategic growth, innovation, and partnerships while leading long-term company direction.",
      image: jethroImage,
      featured: true,
    },
    {
      name: "Dominic Ray Nanjwan",
      role: "General Manager",
      bio: "Coordinates day-to-day execution across teams to deliver results and maintain operational excellence.",
      image: jethroImage,
    },
    {
      name: "William Bosworth",
      role: "Software Manager",
      bio: "Leads software architecture, delivery standards, and continuous engineering improvements.",
      image: williamImage,
    },
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
            {serviceItems.map((service) => (
              <article className="service-card" key={service.title}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card-image"
                />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="service-learn-btn" type="button">
                  Learn More
                </button>
              </article>
            ))}
          </div>
          <div className="view-all">
            <button className="view-all-btn" type="button">
              View all
            </button>
          </div>
        </div>
      </section>
      {/* Meet Our Team  */}
      <section className="team-section container">
        <div className="team-header">
          <div>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="section-sub">
              Dedicated professionals passionate about transforming education
              through technology.
            </div>
          </div>
          <div className="team-nav-actions">
            <button className="team-nav-btn" type="button" aria-label="Previous team member">
              &larr;
            </button>
            <button className="team-nav-btn" type="button" aria-label="Next team member">
              &rarr;
            </button>
          </div>
        </div>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <article
              className={`team-card${member.featured ? " team-card-featured" : ""}`}
              key={member.name}>
              <img src={member.image} alt={member.name} className="team-card-image" />
              <div className="team-card-content">
                <h4>{member.name}</h4>
                <div className="team-role">{member.role}</div>
                <div className="team-desc">{member.bio}</div>
              </div>
            </article>
          ))}
        </div>
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


