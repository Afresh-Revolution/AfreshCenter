// LandingPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBackground from "../assets/images/Background-Image.png";
import afLogo from "../assets/images/af 1.png";
import cbLogo from "../assets/images/cb 1.png";
import gwaveLogo from "../assets/images/gwave 1.png";
import popsLogo from "../assets/images/pops 1.png";
import knowristLogo from "../assets/images/knowrist 1.png";
import aboutImageLeft from "../assets/images/Image-Box-1.png";
import aboutImageRight from "../assets/images/Image-Box-2.png";
import serviceImage1 from "../assets/images/Image 1.png";
import {
  fetchPublicServices,
  getServiceImageUrl,
  type ServiceItem,
} from "../api/services";
import { fetchTeams, getTeamImageUrl, type TeamMemberDTO } from "../api/teams";
import ourWork1 from "../assets/images/our-woks-1.png";
import ourWork2 from "../assets/images/our-woks-2.png";
import ourWork3 from "../assets/images/our-woks-3.png";
import olaImage from "../assets/images/Ola.png";
import samLightImage from "../assets/images/Sam-light.png";
import { SiteFooter, SiteNavbar } from "./SharedLayout";
import { sendContact } from "../api/contact";

function LandingPage() {
  const affiliatedCompanies = [
    { name: "CBrilliance", logo: cbLogo },
    { name: "Afresh", logo: afLogo },
    { name: "GeniusWave", logo: gwaveLogo },
    { name: "Popswit", logo: popsLogo },
    { name: "Knowrist", logo: knowristLogo },
  ];

  const [landingServices, setLandingServices] = useState<ServiceItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<
    (TeamMemberDTO & { featured?: boolean })[]
  >([]);
  const SERVICES_PREVIEW_COUNT = 6;

  useEffect(() => {
    let cancelled = false;

    // Fetch services
    fetchPublicServices()
      .then((list) => {
        if (!cancelled) setLandingServices(list);
      })
      .catch(() => {});

    // Fetch teams
    fetchTeams()
      .then((list) => {
        if (!cancelled) {
          // Filter to only visible members and map to include featured property
          const visibleMembers = list.filter(
            (m) => m.visible !== false || m.status !== "Inactive",
          );
          // Try to find CEO as featured member
          const featuredIdx = visibleMembers.findIndex(
            (m) =>
              m.role?.toLowerCase().includes("ceo") ||
              m.role?.toLowerCase().includes("chief executive"),
          );
          const membersWithFeatured = visibleMembers.map((m, idx) => ({
            ...m,
            featured: idx === featuredIdx && featuredIdx >= 0,
          }));
          setTeamMembers(membersWithFeatured);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const topWorkTiles = [
    { type: "image", title: "vann", image: ourWork1 },
    {
      type: "text",
      title: "consectet",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod temp.",
    },
    { type: "image", title: "delivery", image: ourWork2 },
    {
      type: "textHighlight",
      title: "7.9%",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.",
    },
    {
      type: "text",
      title: "voluptat",
      body: "to be welcomed and every pain in certain.",
    },
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

  const getFeaturedIndex = () => {
    const idx = teamMembers.findIndex((member) => member.featured);
    return idx >= 0 ? idx : 0;
  };

  const VISIBLE = 5;
  const FEAT_POS = 2;
  const CLONES = VISIBLE;

  const totalMembers = teamMembers.length;
  const cloneCount = Math.min(CLONES, totalMembers);
  const loopMembers =
    totalMembers > 0
      ? [
          ...teamMembers.slice(-cloneCount),
          ...teamMembers,
          ...teamMembers.slice(0, cloneCount),
        ]
      : [];

  const minFeaturedIdx = cloneCount;
  const maxFeaturedIdx = cloneCount + totalMembers - 1;

  const [disableTrackTransition, setDisableTrackTransition] = useState(false);
  const [loopFeaturedIndex, setLoopFeaturedIndex] = useState(
    () => minFeaturedIdx + getFeaturedIndex(),
  );
  const [isMobileTeam, setIsMobileTeam] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false,
  );
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [contactStatusMessage, setContactStatusMessage] = useState("");

  const handleTeamPrev = () => {
    if (!totalMembers) return;
    setLoopFeaturedIndex((i) => i - 1);
  };

  const handleTeamNext = () => {
    if (!totalMembers) return;
    setLoopFeaturedIndex((i) => i + 1);
  };

  const handleTeamTrackTransitionEnd = () => {
    if (!totalMembers) return;
    let idx = loopFeaturedIndex;
    if (idx < minFeaturedIdx) idx += totalMembers;
    if (idx > maxFeaturedIdx) idx -= totalMembers;
    if (idx !== loopFeaturedIndex) {
      setDisableTrackTransition(true);
      setLoopFeaturedIndex(idx);
    }
  };

  const startIdx = loopFeaturedIndex - FEAT_POS;
  const activeIdx =
    totalMembers > 0
      ? (((loopFeaturedIndex - minFeaturedIdx) % totalMembers) + totalMembers) %
        totalMembers
      : -1;
  const activeMember = activeIdx >= 0 ? teamMembers[activeIdx] : null;

  useEffect(() => {
    if (!disableTrackTransition) return;
    const raf = window.requestAnimationFrame(() =>
      setDisableTrackTransition(false),
    );
    return () => window.cancelAnimationFrame(raf);
  }, [disableTrackTransition]);

  useEffect(() => {
    const handleResize = () => setIsMobileTeam(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contactStatus === "success" || contactStatus === "error") {
      const timeout = window.setTimeout(() => {
        setContactStatus("idle");
        setContactStatusMessage("");
      }, 5000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [contactStatus]);

  const handleContactChange =
    (field: keyof typeof contactForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContactForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setContactStatus("sending");
    setContactStatusMessage("");
    const response = await sendContact({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      subject: contactForm.subject.trim(),
      message: contactForm.message.trim(),
    });
    if (response.success) {
      setContactStatus("success");
      setContactStatusMessage(response.message ?? "Message sent successfully.");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setContactStatus("error");
      setContactStatusMessage(response.message ?? "Failed to send message.");
    }
  };

  return (
    <div className="landingPage">
      {/* Navbar (exact from screenshot)  */}
      <SiteNavbar />

      {/* Hero (exact copy)  */}
      <header
        className="hero"
        style={{
          backgroundImage: `url(${heroBackground})`,
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
            <Link to="/wailin" className="btn btn-outline">
              Wailin
            </Link>
          </div>
        </div>
        <div className="hero-social">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram" aria-hidden="true" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in" aria-hidden="true" />
          </a>
        </div>
      </header>

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

      {/* Our Services — fetched from API, links to /services and detail  */}
      <section className="services-preview">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="service-cards">
            {landingServices.slice(0, SERVICES_PREVIEW_COUNT).map((service) => (
              <article className="service-card" key={service.id}>
                <img
                  src={getServiceImageUrl(service.image) ?? serviceImage1}
                  alt={service.title}
                  className="service-card-image"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (el.src !== serviceImage1) el.src = serviceImage1;
                  }}
                />
                <h3>{service.title}</h3>
                <p>
                  {service.description ||
                    "Contact us for more details about this service."}
                </p>
                <Link
                  to={`/services?id=${service.id}`}
                  className="service-learn-btn">
                  Learn More
                </Link>
              </article>
            ))}
          </div>
          <div className="view-all">
            <Link to="/services" className="view-all-btn">
              View all
            </Link>
          </div>
        </div>
      </section>
      {/* Meet Our Team  */}
      <section className="team-section" aria-label="Meet Our Team">
        <div className="team-header">
          <h2>Meet Our Team</h2>
          <p>
            Dedicated professionals passionate about transforming education
            through technology.
          </p>
          <div className="team-nav-btns">
            <button
              className="team-nav-btn"
              type="button"
              onClick={handleTeamPrev}
              aria-label="Previous team member">
              &#8592;
            </button>
            <button
              className="team-nav-btn"
              type="button"
              onClick={handleTeamNext}
              aria-label="Next team member">
              &#8594;
            </button>
          </div>
        </div>

        <div
          className={`team-carousel${isMobileTeam ? " team-carousel--single" : ""}`}
          aria-live="polite"
          style={{ ["--start-idx"]: startIdx } as React.CSSProperties}>
          <div
            className="team-track"
            onTransitionEnd={handleTeamTrackTransitionEnd}
            style={disableTrackTransition ? { transition: "none" } : undefined}>
            {(isMobileTeam
              ? activeMember
                ? [activeMember]
                : []
              : loopMembers
            ).map((member, idx) => {
              const isFeatured = isMobileTeam || idx === loopFeaturedIndex;
              return (
                <article
                  key={`${member.id}-${idx}`}
                  className={`team-card${isFeatured ? " team-card--featured" : ""}`}>
                  <div className="team-card-img-wrap">
                    <img
                      src={
                        member.image_url
                          ? (getTeamImageUrl(member.image_url) ?? "")
                          : ""
                      }
                      alt={member.name || ""}
                      className="team-card-img"
                    />
                  </div>
                  <div className="team-card-body">
                    <h3>{member.name}</h3>
                    <p className="team-card-role">{member.role}</p>
                    <p className="team-card-bio">{member.bio}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* Our Top Works */}
      <section className="topworks">
        <div className="container topworks-container">
          <div className="works-header">
            <h2>Our Top Works</h2>
            <span>
              Committed experts eager to revolutionize education using
              innovative technology.
            </span>
          </div>
          <div className="works-mosaic">
            {topWorkTiles.map((tile, idx) => (
              <article
                key={`${tile.title}-${idx}`}
                className={`works-tile works-tile-${tile.type}`}>
                {tile.type === "image" ? (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="works-tile-image"
                  />
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
                Conversely, we may reject the allure of fleeting pleasures that
                can mislead and desensitize individuals. We believe in making
                choices that prioritize long-term well-being over momentary
                satisfaction, ensuring that our clients can navigate challenges
                with foresight and resilience.
              </p>
              <ul>
                {whyChoosePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="why-choose-image-wrap">
              <img
                src={olaImage}
                alt="Why choose us"
                className="why-choose-image"
              />
            </div>
          </div>

          <div className="testimonial-panel">
            <div className="testimonial-profile-card">
              <img
                src={samLightImage}
                alt="Samuel Light"
                className="testimonial-profile-image"
              />
              <h4>Samuel Light</h4>
              <p>Full stack Dev</p>
              <div className="testimonial-mini-nav">
                <button type="button" aria-label="Previous testimonial">
                  &larr;
                </button>
                <button type="button" aria-label="Next testimonial">
                  &rarr;
                </button>
              </div>
            </div>
            <div className="testimonial-copy">
              <h3>Testimonials</h3>
              <p>
                At our tech hub, we embrace innovation and creativity, ensuring
                that every challenge is met with a solution. Our team is
                dedicated to providing exceptional service, making it easy for
                you to navigate the complexities of technology. With us, you can
                explore endless possibilities without any compromise in your
                setup.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Get in Touch with Us */}
      <section className="contact-section">
        <div className="container contact-wrap">
          <form className="contact-form-panel" onSubmit={handleContactSubmit}>
            <h3>Get in Touch with Us</h3>
            <div className="form-row">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={contactForm.name}
                  onChange={handleContactChange("name")}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={contactForm.email}
                  onChange={handleContactChange("email")}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter number"
                  value={contactForm.phone}
                  onChange={handleContactChange("phone")}
                  required
                />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  value={contactForm.subject}
                  onChange={handleContactChange("subject")}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea
                placeholder="Write your message"
                value={contactForm.message}
                onChange={handleContactChange("message")}
                required></textarea>
            </div>
            <button
              className="submit-btn"
              type="submit"
              disabled={contactStatus === "sending"}>
              Submit
            </button>
            {contactStatus !== "idle" && (
              <p className="form-status" role="status" aria-live="polite">
                {contactStatusMessage}
              </p>
            )}

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
          </form>

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
          <Link to="/services" className="getstarted-btn">
            Get Started
          </Link>
        </div>
      </section>
      {/* footer with extra details  */}
      <SiteFooter />
    </div>
  );
}

export default LandingPage;
