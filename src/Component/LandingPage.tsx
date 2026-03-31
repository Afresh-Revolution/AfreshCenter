// LandingPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBackground from "../assets/images/Background-Image.png";
import cbLogo from "../assets/images/cb 1.png";
import gwaveLogo from "../assets/images/gwave 1.png";
import popsLogo from "../assets/images/pops 1.png";
import knowristLogo from "../assets/images/knowrist 1.png";
import nabLogo from "../assets/images/NAB.jpg";
import aboutImageLeft from "../assets/images/Image-Box-1.png";
import aboutImageRight from "../assets/images/Image-Box-2.png";
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
import samLightImage from "../assets/images/Sam-light.jpg";
import { SiteFooter, SiteNavbar } from "./SharedLayout";
import { sendContact } from "../api/contact";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";
import { useCountUp } from "../hooks/useCountUp";
import { useTypewriter } from "../hooks/useTypewriter";
import { TiltCard } from "./TiltCard";

function LandingPage() {
  const affiliatedCompanies = [
    { name: "CBrilliance", logo: cbLogo },
    { name: "NAB", logo: nabLogo, href: "https://aibuilders.ng", className: "brand-item--nab" },
    { name: "GeniusWave", logo: gwaveLogo },
    { name: "Popswit", logo: popsLogo },
    { name: "Knowrist", logo: knowristLogo },
  ];

  const [landingServices, setLandingServices] = useState<ServiceItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<
    (TeamMemberDTO & { featured?: boolean })[]
  >([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const SERVICES_PREVIEW_COUNT = 6;

  useEffect(() => {
    let cancelled = false;

    fetchPublicServices()
      .then((list) => { if (!cancelled) setLandingServices(list); })
      .catch(() => {});

    fetchTeams()
      .then((list) => {
        if (!cancelled) {
          const visibleMembers = list.filter(
            (m) => m.visible !== false && m.status !== "Inactive",
          );
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
      .catch(() => {})
      .finally(() => { if (!cancelled) setTeamLoading(false); });

    return () => { cancelled = true; };
  }, []);

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
  const [isTeamHovered, setIsTeamHovered] = useState(false);
  const [teamTickSeed, setTeamTickSeed] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [contactStatusMessage, setContactStatusMessage] = useState("");

  const handleTeamPrev = () => {
    if (!totalMembers) return;
    setLoopFeaturedIndex((i) => i - 1);
    setTeamTickSeed((s) => s + 1);
  };

  const handleTeamNext = () => {
    if (!totalMembers) return;
    setLoopFeaturedIndex((i) => i + 1);
    setTeamTickSeed((s) => s + 1);
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
    const raf = window.requestAnimationFrame(() => setDisableTrackTransition(false));
    return () => window.cancelAnimationFrame(raf);
  }, [disableTrackTransition]);

  useEffect(() => {
    const handleResize = () => setIsMobileTeam(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileTeam || isTeamHovered || totalMembers < 2) return;
    const id = window.setInterval(() => {
      setLoopFeaturedIndex((i) => i + 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [isMobileTeam, isTeamHovered, totalMembers, teamTickSeed]);

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

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setContactStatus("error");
      setContactStatusMessage(response.message ?? "Failed to send message.");
    }
  };

  const testimonials = [
    {
      name: "Samuel Light",
      role: "Full stack Dev",
      image: samLightImage,
      quote: "At our tech hub, we embrace innovation and creativity, ensuring that every challenge is met with a solution. Our team is dedicated to providing exceptional service, making it easy for you to navigate the complexities of technology.",
    },
    {
      name: "Ola Adeyemi",
      role: "Creative Director",
      image: olaImage,
      quote: "Afresh Centre helped our team move faster with clearer priorities and better collaboration. The experience felt structured, supportive, and focused on real outcomes.",
    },
    {
      name: "Afresh Team",
      role: "Product & Strategy",
      image: aboutImageRight,
      quote: "We value long-term partnerships built on trust and measurable progress. The process is transparent and the results speak for themselves.",
    },
  ];

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const totalTestimonials = testimonials.length;
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [testimonialTickSeed, setTestimonialTickSeed] = useState(0);

  const handleTestimonialPrev = () => {
    if (totalTestimonials < 2) return;
    setActiveTestimonialIndex((i) => (i - 1 + totalTestimonials) % totalTestimonials);
    setTestimonialTickSeed((s) => s + 1);
  };

  const handleTestimonialNext = () => {
    if (totalTestimonials < 2) return;
    setActiveTestimonialIndex((i) => (i + 1) % totalTestimonials);
    setTestimonialTickSeed((s) => s + 1);
  };

  const activeTestimonial = testimonials[activeTestimonialIndex];

  useEffect(() => {
    if (isTestimonialHovered || totalTestimonials < 2) return;
    const id = window.setInterval(() => {
      setActiveTestimonialIndex((i) => (i + 1) % totalTestimonials);
    }, 7000);
    return () => window.clearInterval(id);
  }, [isTestimonialHovered, totalTestimonials, testimonialTickSeed]);

  // ── Scroll-reveal refs ──
  const aboutSection = useScrollReveal<HTMLElement>();
  const servicesSection = useStaggerReveal<HTMLElement>(6);
  const teamSection = useScrollReveal<HTMLElement>();
  const worksSection = useScrollReveal<HTMLElement>();
  const contactSection = useScrollReveal<HTMLElement>();
  const getstartedSection = useScrollReveal<HTMLElement>();
  const { ref: countRef, count: projectCount } = useCountUp(100);

  // ── Typewriter ──
  const HERO_TEXT = "EMPOWERING AFRICA THROUGH INNOVATION AND CREATIVITY";
  const { displayed: typedHero, done: typingDone } = useTypewriter(HERO_TEXT, 38, 400);

  // ── Parallax on hero ──
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landingPage">
      <SiteNavbar ctaComingSoonMessage="Coming soon on the 7th of April" />

      {/* Hero with entrance animations + parallax */}
      <header
        className="hero parallax-hero"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundPositionY: `calc(50% + ${scrollY * 0.3}px)`,
        }}>
        <div className="hero-content">
          <h1 className="hero-anim-title">
            {typedHero}
            {!typingDone && <span className="typewriter-cursor" aria-hidden="true" />}
          </h1>
          <p className="hero-anim-sub">
            AfRESH Center Is A Revolutionary Entrepreneurial Support Hub
            Delivering Technology, Media, Sports, and Entertainment Solutions
            That Drive Real Impact.
          </p>
          <div className="btn-group hero-anim-btns">
            <Link to="/about" className="btn btn-primary btn-glow">
              Learn more
            </Link>
            <Link to="/wailin" className="btn btn-outline btn-glow">
              Wailin
            </Link>
          </div>
        </div>
        <div className="hero-social hero-anim-social">
          <a href="https://www.instagram.com/afreshcenter?igsh=MXdweGsxOGU4Z2hidQ==" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram" aria-hidden="true" />
          </a>
          <a href="https://x.com/afresh_center?s=21" aria-label="X" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x-twitter" aria-hidden="true" />
          </a>
          <a href="https://wa.me/2348109151921" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Our Affiliated Companies */}
      <section className="affiliated">
        <h4 className="reveal is-visible">Our Affiliated Companies</h4>
        <div className="brand-strip">
          {affiliatedCompanies.map((company) => (
            <div className={`brand-item${company.className ? ` ${company.className}` : ""}`} key={company.name}>
              {company.href ? (
                <a href={company.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${company.name}`}>
                  <img src={company.logo} alt={company.name} />
                </a>
              ) : (
                <img src={company.logo} alt={company.name} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About us */}
      <section ref={aboutSection.ref} className={`about container reveal${aboutSection.isVisible ? " is-visible" : ""}`}>
        <div className="about-grid">
          <div className="about-text">
            <h2>About us</h2>
            <p>
              Afresh centre is a dynamic innovation hub committed to empowering
              Africa's next generation of entrepreneurs, creators, athletes, and
              tech leaders. We exist to bridge opportunity gaps by combining
              technology, media, sports, and entertainment into one powerful
              ecosystem designed to support growth, creativity, and sustainable
              impact. At AfRESH, we don't just offer services — we build
              platforms, create opportunities, and drive transformation.
            </p>
            <Link to="/about" className="read-more-link">
              Read More...
            </Link>
          </div>
          <div className="about-visual">
            <div className="about-photo about-photo-left">
              <img src={aboutImageLeft} alt="Afresh team collaboration" />
            </div>
            <div className="about-count-badge float-anim">
              <span ref={countRef as React.RefObject<HTMLSpanElement>} className="about-count-number">{projectCount}+</span>
              <span className="about-count-text">Completed Projects</span>
            </div>
            <div className="about-photo about-photo-right">
              <img src={aboutImageRight} alt="Afresh team member" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section ref={servicesSection.ref} className="services-preview">
        <div className="container">
          <h2 className="section-title reveal is-visible">Our Services</h2>
          <div className="service-cards tilt-parent">
            {landingServices.slice(0, SERVICES_PREVIEW_COUNT).map((service, idx) => (
              <TiltCard
                className={`service-card reveal${idx < servicesSection.visibleCount ? ` is-visible reveal--d${Math.min(idx + 1, 6)}` : ""}`}
                key={service.id}>
                {getServiceImageUrl(service.image) ? (
                  <img
                    src={getServiceImageUrl(service.image) ?? ""}
                    alt={service.title}
                    className="service-card-image"
                  />
                ) : (
                  <div className="service-card-image service-card-image--placeholder" aria-label={`${service.title} image not uploaded`}>
                    No image uploaded yet
                  </div>
                )}
                <h3>{service.title}</h3>
                <p>
                  {service.description || "Contact us for more details about this service."}
                </p>
                <Link to={`/services?id=${service.id}`} className="service-learn-btn">
                  Learn More
                </Link>
              </TiltCard>
            ))}
          </div>
          <div className="view-all">
            <Link to="/services" className="view-all-btn">
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section ref={teamSection.ref} className={`team-section reveal${teamSection.isVisible ? " is-visible" : ""}`} aria-label="Meet Our Team">
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

        {teamLoading || totalMembers === 0 ? (
          <div className="team-loading" role="status" aria-live="polite">
            Loading team members...
          </div>
        ) : (
          <div
            className={`team-carousel${isMobileTeam ? " team-carousel--single" : ""}`}
            aria-live="polite"
            onMouseEnter={() => setIsTeamHovered(true)}
            onMouseLeave={() => setIsTeamHovered(false)}
            style={{ ["--start-idx"]: startIdx } as React.CSSProperties}>
            <div
              className="team-track"
              onTransitionEnd={handleTeamTrackTransitionEnd}
              style={disableTrackTransition ? { transition: "none" } : undefined}>
              {(isMobileTeam
                ? activeMember ? [activeMember] : []
                : loopMembers
              ).map((member, idx) => {
                const isFeatured = isMobileTeam || idx === loopFeaturedIndex;
                return (
                  <article
                    key={`${member.id}-${idx}`}
                    className={`team-card${isFeatured ? " team-card--featured" : ""}`}>
                    <div className="team-card-img-wrap">
                      <img
                        src={member.image_url ? (getTeamImageUrl(member.image_url) ?? "") : ""}
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
        )}
      </section>

      {/* Our Top Works */}
      <section ref={worksSection.ref} className={`topworks reveal${worksSection.isVisible ? " is-visible" : ""}`}>
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
                  <>
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="works-tile-image"
                    />
                    <div className="works-tile-overlay"><span>{tile.title}</span></div>
                  </>
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
              <img src={olaImage} alt="Why choose us" className="why-choose-image" />
            </div>
          </div>

          <div
            className="testimonial-panel"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}>
            <div className="testimonial-profile-card">
              <img
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                className="testimonial-profile-image"
              />
              <h4>{activeTestimonial.name}</h4>
              <p>{activeTestimonial.role}</p>
              <div className="testimonial-mini-nav">
                <button type="button" aria-label="Previous testimonial" onClick={handleTestimonialPrev} disabled={totalTestimonials < 2}>
                  &larr;
                </button>
                <button type="button" aria-label="Next testimonial" onClick={handleTestimonialNext} disabled={totalTestimonials < 2}>
                  &rarr;
                </button>
              </div>
            </div>
            <div className="testimonial-copy">
              <h3>Testimonials</h3>
              <p>{activeTestimonial.quote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch with Us */}
      <section ref={contactSection.ref} className={`contact-section reveal${contactSection.isVisible ? " is-visible" : ""}`}>
        <div className="container contact-wrap">
          <form className="contact-form-panel" onSubmit={handleContactSubmit}>
            <h3>Get in Touch with Us</h3>
            <div className="form-row">
              <div className="input-group input-anim">
                <label>Name</label>
                <input type="text" placeholder="Enter name" value={contactForm.name} onChange={handleContactChange("name")} required />
              </div>
              <div className="input-group input-anim">
                <label>Email</label>
                <input type="email" placeholder="Enter Email" value={contactForm.email} onChange={handleContactChange("email")} required />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group input-anim">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter number" value={contactForm.phone} onChange={handleContactChange("phone")} required />
              </div>
              <div className="input-group input-anim">
                <label>Subject</label>
                <input type="text" placeholder="Enter Subject" value={contactForm.subject} onChange={handleContactChange("subject")} required />
              </div>
            </div>
            <div className="input-group input-anim">
              <label>Message</label>
              <textarea placeholder="Write your message" value={contactForm.message} onChange={handleContactChange("message")} required></textarea>
            </div>
            <button className="submit-btn" type="submit" disabled={contactStatus === "sending"}>
              Submit
            </button>
            {contactStatus === "success" ? (
              <div className="success-check-wrap" role="status" aria-live="polite">
                <div className="success-check-circle">
                  <svg className="success-check-svg" viewBox="0 0 36 36">
                    <path className="success-check-path" d="M6 18 L14 26 L30 10" />
                  </svg>
                </div>
                <p className="success-check-msg">{contactStatusMessage}</p>
              </div>
            ) : contactStatus === "error" ? (
              <p className="form-status" role="status" aria-live="polite">
                {contactStatusMessage}
              </p>
            ) : null}

            <div className="contact-meta">
              <div className="contact-chip">
                <i className="fas fa-phone"></i>
                <span>+234 810 915 1921</span>
              </div>
              <div className="contact-chip">
                <i className="fas fa-envelope"></i>
                <span>afreshcenter@gmail.com</span>
              </div>
              <div className="contact-chip">
                <i className="fas fa-map-pin"></i>
                <span>No.50, Chanel 7, opposite Nasco foods, Jos Plateau State.</span>
              </div>
            </div>

            <div className="contact-social">
              <p>Follow our social media</p>
              <div className="social-row">
                <a href="https://www.instagram.com/afreshcenter?igsh=MXdweGsxOGU4Z2hidQ==" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://x.com/afresh_center?s=21" aria-label="X" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="https://wa.me/2348109151921" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
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
      <section ref={getstartedSection.ref} className={`getstarted-banner reveal--scale reveal${getstartedSection.isVisible ? " is-visible" : ""}`}>
        <div className="container getstarted-inner">
          <h2>GET STARTED NOW</h2>
          <Link to="/services" className="getstarted-btn btn-glow">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

export default LandingPage;
