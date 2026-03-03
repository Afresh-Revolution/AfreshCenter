// LandingPage.jsx
import { useState } from "react";
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
import ourWork1 from "../assets/images/our-woks-1.png";
import ourWork2 from "../assets/images/our-woks-2.png";
import ourWork3 from "../assets/images/our-woks-3.png";
import olaImage from "../assets/images/Ola.png";
import samLightImage from "../assets/images/Sam-light.png";

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
    {
      title: "Media",
      description:
        "Software development services customization to design, code, test and deploy multimedia applications.",
      image: serviceImage2,
    },
    {
      title: "Media",
      description:
        "Software development services customization to design, code, test and deploy multimedia applications.",
      image: serviceImage1,
    },
    {
      title: "Media",
      description:
        "Software development services customization to design, code, test and deploy multimedia applications.",
      image: serviceImage3,
    },
    {
      title: "Media",
      description:
        "Software development services customization to design, code, test and deploy multimedia applications.",
      image: serviceImage4,
    }
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
    {
      name: "Felix Nwachukwu",
      role: "Hardware Manager",
      bio: "Oversees procurement and maintenance of hardware systems with a focus on stability and reliability.",
      image: jethroImage,
    },
    {
      name: "Felix Nwachukwu",
      role: "Hardware Manager",
      bio: "Oversees procurement and maintenance of hardware systems with a focus on stability and reliability.",
      image: jethroImage,
    },
  ];

  const topWorkTiles = [
    { type: "image", title: "vann", image: ourWork1 },
    { type: "text", title: "consectet", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod temp." },
    { type: "image", title: "delivery", image: ourWork2 },
    { type: "textHighlight", title: "7.9%", body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do." },
    { type: "text", title: "voluptat", body: "to be welcomed and every pain in certain." },
    { type: "image", title: "sos", image: ourWork3 },
  ];

  const whyChoosePoints = [
    "But I must explain to you how all this nonsense",
    "Quo Voluptas Fugi",
    "Lorem ipsum",
    "Lorem ipsum is simply dummy text of the printing and typesetting",
    "Lorem ipsum is simply dummy text of the printing and type",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, and do",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];

  const visibleTeamCards = 5;
  const [teamStartIndex, setTeamStartIndex] = useState(0);
  const maxTeamStartIndex = Math.max(0, teamMembers.length - visibleTeamCards);
  const canSlidePrev = teamStartIndex > 0;
  const canSlideNext = teamStartIndex < maxTeamStartIndex;

  const handleTeamPrev = () => {
    setTeamStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleTeamNext = () => {
    setTeamStartIndex((prev) => Math.min(maxTeamStartIndex, prev + 1));
  };

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
            <button className="btn btn-outline">Wailin</button>
          </div>
        </div>
        <div className="hero-social">
          <a href="#" aria-label="Facebook">
            f
          </a>
          <a href="#" aria-label="X">
            x
          </a>
          <a href="#" aria-label="LinkedIn">
            in
          </a>
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
            <button
              className="team-nav-btn"
              type="button"
              aria-label="Previous team member"
              onClick={handleTeamPrev}
              disabled={!canSlidePrev}>
              &larr;
            </button>
            <button
              className="team-nav-btn"
              type="button"
              aria-label="Next team member"
              onClick={handleTeamNext}
              disabled={!canSlideNext}>
              &rarr;
            </button>
          </div>
        </div>
        <div className="team-slider-viewport">
          <div
            className="team-slider-track"
            style={{
              transform: `translateX(calc(-${teamStartIndex} * var(--team-step)))`,
            }}>
            {teamMembers.map((member, idx) => (
            <article
              className={`team-card${idx === teamStartIndex + 2 ? " team-card-featured" : ""}`}
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
        </div>
      </section>
      {/* Our Top Works */}
      <section className="topworks">
        <div className="container topworks-container">
          <div className="works-header">
            <h2>Our Top Works</h2>
            <span>Committed experts eager to revolutionize education using innovative technology.</span>
          </div>
          <div className="works-mosaic">
            {topWorkTiles.map((tile, idx) => (
              <article
                key={`${tile.title}-${idx}`}
                className={`works-tile works-tile-${tile.type}`}>
                {tile.type === "image" ? (
                  <img src={tile.image} alt={tile.title} className="works-tile-image" />
                ) : (
                  <>
                    <h3>{tile.title}</h3>
                    <p>{tile.body}</p>
                  </>
                )}
              </article>
            ))}
          </div>

          <div className="why-choose-wrap">
            <div className="why-choose-copy">
              <h3>Why Choose us?</h3>
              <p>
                Conversely, we may reject the allure of fleeting pleasures that can mislead and
                desensitize individuals. We believe in making choices that prioritize long-term
                well-being over momentary satisfaction, ensuring that our clients can navigate
                challenges with foresight and resilience.
              </p>
              <ul>
                {whyChoosePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="why-choose-image-wrap">
              <img src={olaImage} alt="Why choose us" className="why-choose-image" />
            </div>
          </div>

          <div className="testimonial-panel">
            <div className="testimonial-profile-card">
              <img src={samLightImage} alt="Samuel Light" className="testimonial-profile-image" />
              <h4>Samuel Light</h4>
              <p>Full stack Dev</p>
              <div className="testimonial-mini-nav">
                <button type="button" aria-label="Previous testimonial">&larr;</button>
                <button type="button" aria-label="Next testimonial">&rarr;</button>
              </div>
            </div>
            <div className="testimonial-copy">
              <h3>Testimonials</h3>
              <p>
                At our tech hub, we embrace innovation and creativity, ensuring that every challenge
                is met with a solution. Our team is dedicated to providing exceptional service,
                making it easy for you to navigate the complexities of technology. With us, you can
                explore endless possibilities without any compromise in your setup.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Get in Touch with Us */}
      <section className="contact-section">
        <div className="container contact-wrap">
          <div className="contact-form-panel">
            <h3>Get in Touch with Us</h3>
            <div className="form-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Enter name" />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter number" />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input type="text" placeholder="Enter Subject" />
              </div>
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea placeholder="Write your message"></textarea>
            </div>
            <button className="submit-btn">Submit</button>

            <div className="contact-meta">
              <div className="contact-chip">
                <i className="fas fa-phone"></i>
                <span>+35866970742</span>
              </div>
              <div className="contact-chip">
                <i className="fas fa-envelope"></i>
                <span>jewishmail.com</span>
              </div>
              <div className="contact-chip">
                <i className="fas fa-map-pin"></i>
                <span>No 2344 oil airport roundabout, Jos Plateau</span>
              </div>
            </div>

            <div className="contact-social">
              <p>Follow our social media</p>
              <div className="social-row">
                <button type="button" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </button>
                <button type="button" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </button>
                <button type="button" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="contact-map-panel">
            <iframe
              title="Afresh location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Jos,+Plateau,+Nigeria&z=12&output=embed&hl=en"></iframe>
          </div>
        </div>
      </section>

      {/* GET STARTED NOW */}
      <section className="getstarted-banner">
        <div className="container getstarted-inner">
          <h2>GET STARTED NOW</h2>
          <button className="getstarted-btn" type="button">
            Get Started
          </button>
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




