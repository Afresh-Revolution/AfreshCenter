import { useState } from 'react'
import './AboutUs.css'

/* ── Top Works data ── */
const topWorks = [
    {
        id: 'cbrilliance',
        title: 'Cbrilliance',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'joscity',
        title: 'JosCity',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'knowrist',
        title: 'Knowrist',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    },
]

/* ── Team members data ── */
const teamMembers = [
    {
        id: 'felix',
        name: 'Felix Nwachukwu',
        role: 'Hardware Manager',
        roleColor: '#f68014',
        bio: 'Oversees the procurement and maintenance of hardware infrastructure, ensuring all systems function efficiently and securely.',
        img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'blessing',
        name: 'Blessing Adukuchilli',
        role: 'Administrative Manager',
        roleColor: '#f68014',
        bio: 'Manages internal documentation, compliance, scheduling, and organizational processes. Ensures smooth administrative operations and supports executive management.',
        img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'jethro',
        name: "Jethro Mark Da'ar",
        role: 'Chief Executive Officer (CEO)',
        roleColor: '#f68014',
        bio: 'Leads the overall vision, strategic direction, and growth of the company. Oversees major partnerships, financial decisions, and long‑term development initiatives.',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        featured: true,
    },
    {
        id: 'dominic',
        name: 'Dominic Ray Nanjwan',
        role: 'General Manager',
        roleColor: '#f68014',
        bio: 'Oversees daily operations, coordinating teams and performance goals to ensure all departments function efficiently and meet company objectives.',
        img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80',
    },
    {
        id: 'william',
        name: 'William Bosworth',
        role: 'Software Manager',
        roleColor: '#f68014',
        bio: 'Leads software architecture, system design, and technical innovation across all company platforms.',
        img: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=400&q=80',
    },
]

/* ── Inline SVG icons ── */
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
)

const LocationIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)

const quickLinks = ['Home', 'About', 'Services', 'Support', 'Account']

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
function AboutUs() {
    /* carousel: centre index (CEO is default centre = index 2) */
    const [centreIdx, setCentreIdx] = useState(2)

    const prev = () => setCentreIdx((i) => Math.max(0, i - 1))
    const next = () => setCentreIdx((i) => Math.min(teamMembers.length - 1, i + 1))

    return (
        <main className="about-page">

            {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
            <header className="about-hero" aria-label="About Us hero">
                <div className="about-hero-overlay" />
                <div className="about-topbar">
                    <div className="about-logo">
                        <span className="about-mark" aria-hidden="true">afr</span>
                        <span className="about-logo-text">AfrESH</span>
                    </div>
                    <nav aria-label="Primary navigation">
                        <ul className="about-nav">
                            <li>Home</li>
                            <li className="is-active">About</li>
                            <li>Services</li>
                            <li>Contact Us</li>
                        </ul>
                    </nav>
                    <button className="about-cta" type="button">Afresh Academy</button>
                </div>
                <div className="about-hero-content">
                    <h1>About Us</h1>
                </div>
            </header>

            {/* ══════════════════════════════
          INTRO
      ══════════════════════════════ */}
            <section className="about-intro" aria-label="Introduction">
                <p>
                    Afresh centre is a dynamic innovation hub committed to empowering Africa's next generation of entrepreneurs,
                    creators, athletes, and tech leaders.
                </p>
                <p>
                    We exist to bridge opportunity gaps by combining technology, media, sports, and entertainment into one powerful
                    ecosystem designed to support growth, creativity, and sustainable impact.
                </p>
                <p>
                    At AfrESH, we don't just offer services&nbsp; we build platforms, create opportunities, and drive
                    transformation.
                </p>
            </section>

            {/* ══════════════════════════════
          OUR STORY
      ══════════════════════════════ */}
            <section className="about-section about-section--light" aria-label="Our Story">
                <div className="about-two-col">
                    <div className="about-text-col">
                        <h2 className="section-label">OUR STORY</h2>
                        <p>What started as a passion for innovation and creativity grew into a multi‑sector platform combining technology, media, sports, and entertainment.</p>
                        <p>We believe Africa is filled with untapped potential, and with the right tools, guidance, and exposure, that potential can transform communities and industries.</p>
                        <p>AfrESH — Africa Focused Revolutionary Entrepreneurial Support Hub — represents our commitment to revolutionizing how entrepreneurs and talents are supported. Every service we offer is designed to empower, elevate, and create lasting impact.</p>
                        <p>Our journey is just beginning, and we are driven by one mission: to build a future where African innovation leads globally.</p>
                    </div>
                    <div className="about-img-col">
                        <div
                            className="about-img-placeholder"
                            aria-label="Our story image"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80')" }}
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          OUR MISSION
      ══════════════════════════════ */}
            <section className="about-section about-section--light" aria-label="Our Mission">
                <div className="about-two-col about-two-col--reversed">
                    <div className="about-img-col">
                        <div
                            className="about-img-placeholder"
                            aria-label="Our mission image"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')" }}
                        />
                    </div>
                    <div className="about-text-col">
                        <h2 className="section-label">OUR MISSION</h2>
                        <p>To support and empower African entrepreneurs by delivering innovative tech solutions, impactful media services, sports development initiatives, and engaging entertainment platforms that create sustainable growth and opportunity.</p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          OUR VISION
      ══════════════════════════════ */}
            <section className="about-section about-section--light" aria-label="Our Vision">
                <div className="about-two-col">
                    <div className="about-text-col">
                        <h2 className="section-label">OUR VISION</h2>
                        <p>Our vision is to become Africa's leading revolutionary entrepreneurial support hub. We aim to empower entrepreneurs, creatives, and athletes through technology, media, sports, and entertainment. We envision a continent where innovation thrives and talent is fully supported. We strive to create opportunities that drive sustainable growth and global competitiveness. Through excellence and impact, we are committed to shaping a brighter future for Africa.</p>
                    </div>
                    <div className="about-img-col">
                        <div
                            className="about-img-placeholder"
                            aria-label="Our vision image"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80')" }}
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          OUR TOP WORKS
      ══════════════════════════════ */}
            <section className="about-works" aria-label="Our Top Works">
                <div className="works-header">
                    <h2>Our Top Works</h2>
                    <p>Committed experts eager to revolutionize education using innovative technology.</p>
                </div>
                <div className="works-grid">
                    {topWorks.map((work) => (
                        <article key={work.id} className="work-card">
                            <div
                                className="work-card-img"
                                aria-label={`${work.title} project image`}
                                style={{ backgroundImage: `url('${work.img}')` }}
                            />
                            <div className="work-card-body">
                                <h3>{work.title}</h3>
                                <p>{work.description}</p>
                                <a href={work.link} className="work-card-btn" role="button">Visit</a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════
          INTRODUCING OUR CEO
      ══════════════════════════════ */}
            <section className="ceo-section" aria-label="Introducing Our CEO">
                <div className="ceo-inner">
                    <div className="ceo-text">
                        <h2 className="ceo-heading">Introducing Our Chief Executive Officer</h2>
                        <p className="ceo-name">JETHRO MARK DA'AR</p>
                        <p>
                            As the CEO of Afresh Centre, I have consistently resisted the allure of fleeting pleasures that can divert
                            attention and dampen spirits. My commitment lies in nurturing choices that prioritize long‑term wellness
                            not only empowers our clients but also equips them with the insight and resilience needed to tackle life's
                            challenges head‑on.
                        </p>
                        <p>
                            At Afresh Centre, we believe that true fulfillment comes from making informed decisions that contribute to
                            lasting health and happiness. By encouraging our clients to look beyond immediate desires, we help them
                            cultivate a mindset focused on growth and sustainability. This shift in perspective allows individuals to
                            embrace their journeys with confidence and clarity.
                        </p>
                        <p>
                            Our mission is to create a supportive environment where clients can explore their potential and develop
                            strategies for enduring success. We provide resources and guidance that inspire personal development,
                            ensuring that our clients are well‑prepared to navigate obstacles. Together, we strive to build a
                            community that values long‑term wellness and empowers each individual to thrive.
                        </p>
                    </div>
                    <div className="ceo-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
                            alt="Jethro Mark Da'ar – CEO of Afresh Centre"
                            className="ceo-img"
                        />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          MEET OUR TEAM
      ══════════════════════════════ */}
            <section className="team-section" aria-label="Meet Our Team">
                <div className="team-header">
                    <h2>Meet Our Team</h2>
                    <p>Dedicated professionals passionate about transforming education through technology.</p>
                    <div className="team-nav-btns">
                        <button
                            className="team-nav-btn"
                            onClick={prev}
                            disabled={centreIdx === 0}
                            aria-label="Previous team member"
                        >
                            &#8592;
                        </button>
                        <button
                            className="team-nav-btn"
                            onClick={next}
                            disabled={centreIdx === teamMembers.length - 1}
                            aria-label="Next team member"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>

                <div className="team-carousel" aria-live="polite">
                    {teamMembers.map((member, idx) => {
                        const offset = idx - centreIdx
                        const isCentre = offset === 0
                        const isVisible = Math.abs(offset) <= 2
                        return (
                            <article
                                key={member.id}
                                className={`team-card ${isCentre ? 'team-card--featured' : ''} ${!isVisible ? 'team-card--hidden' : ''}`}
                                style={{ '--offset': offset } as React.CSSProperties}
                                aria-hidden={!isVisible}
                            >
                                <div className="team-card-img-wrap">
                                    <img src={member.img} alt={member.name} className="team-card-img" />
                                </div>
                                <div className="team-card-body">
                                    <h3>{member.name}</h3>
                                    <p className="team-card-role">{member.role}</p>
                                    <p className="team-card-bio">{member.bio}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </section>

            {/* ══════════════════════════════
          JOIN US
      ══════════════════════════════ */}
            <section className="join-section" aria-label="Join Us">
                <div className="join-inner">
                    <div className="join-img-wrap">
                        <img
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80"
                            alt="Join the AfrESH team"
                            className="join-img"
                        />
                    </div>
                    <div className="join-text">
                        <h2>Join Us</h2>
                        <p>
                            Don't just consume technology—create it! At Afresh Centre, we empower the next generation of African
                            tech leaders through comprehensive training, mentorship, and hands‑on experience.
                        </p>
                        <p>
                            Are you ready to elevate your skills and shape the future of technology? Join us, and let's grow
                            together, transforming ideas into impactful innovations!
                        </p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
            <footer className="about-footer">
                <div className="footer-content">
                    <section className="footer-brand-col">
                        <div className="footer-brand-row">
                            <span className="footer-mark" aria-hidden="true">afr</span>
                            <h3 className="footer-brand">afresh</h3>
                        </div>
                        <p>Delivering quality support built with dependable workflows and practical service standards.</p>
                    </section>

                    <section className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link) => (
                                <li key={link}>{link}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="footer-col footer-contact">
                        <h4>Contact Us</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <span className="footer-icon" aria-hidden="true"><PhoneIcon /></span>
                                <a href="tel:+2349088424461">+234 908 842 4461</a>
                            </li>
                            <li>
                                <span className="footer-icon" aria-hidden="true"><EmailIcon /></span>
                                <a href="mailto:info@afresh.com">info@afresh.com</a>
                            </li>
                            <li>
                                <span className="footer-icon" aria-hidden="true"><LocationIcon /></span>
                                <span>423 Park Ave, Suite 200</span>
                            </li>
                        </ul>
                    </section>

                    <section className="footer-col footer-follow">
                        <h4>Follow Us</h4>
                        <div className="social-row" aria-label="Social links">
                            <span aria-label="Facebook">f</span>
                            <span aria-label="LinkedIn">in</span>
                            <span aria-label="X">x</span>
                            <span aria-label="Instagram">ig</span>
                        </div>
                    </section>
                </div>
            </footer>

        </main>
    )
}

export default AboutUs
