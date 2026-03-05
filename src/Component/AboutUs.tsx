import { useEffect, useState } from 'react'
import { fetchTeams } from '../api/teams'
import cbrillianceImg from '../assets/images/cbrilliance.jpg'
import knowristImg from '../assets/images/knowrist.jpg'
import josCityImg from '../assets/images/joscity.jpg'
import designerImg from '../assets/images/designerrrr.png'
import joinUsImg from '../assets/images/faf5808cbbf8bf77544b1eed718d2e7cbd59dd0f.png'
import afreshLogoImg from '../assets/images/AfreshLogo.png'
import felixImg from '../assets/images/MrFelix.JPG'
import blessingImg from '../assets/images/BlessingWilliams.jpg'
import jethroImg from '../assets/images/JethroMD.jpg'
import dominicImg from '../assets/images/DominicRay.JPG'
import williamImg from '../assets/images/WilliamsBosw.jpg'

import { SiteFooter, SiteNavbar } from './SharedLayout'
type TopWork = {
    id: string
    title: string
    description: string
    link: string
    imgKey: string
}

type TeamMember = {
    id: string
    name: string
    role: string
    roleColor: string
    bio: string
    imgKey: string
    featured?: boolean
}

type AboutContent = {
    heroTitle: string
    topWorks: TopWork[]
    teamMembers: TeamMember[]
}

const imageMap: Record<string, string> = {
    cbrilliance: cbrillianceImg,
    knowrist: knowristImg,
    joscity: josCityImg,
    designer: designerImg,
    joinus: joinUsImg,
    afreshlogo: afreshLogoImg,
    felix: felixImg,
    blessing: blessingImg,
    jethro: jethroImg,
    dominic: dominicImg,
    william: williamImg,
}

const getFeaturedIndex = (members: TeamMember[]) => {
    const idx = members.findIndex((member) => member.featured)
    return idx >= 0 ? idx : 0
}

const defaultHeroTitle = 'About Us'

/* ── Top Works data ── */
const defaultTopWorks: TopWork[] = [
    {
        id: 'cbrilliance',
        title: 'Cbrilliance',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        imgKey: 'cbrilliance',
    },
    {
        id: 'joscity',
        title: 'JosCity',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        imgKey: 'joscity',
    },
    {
        id: 'knowrist',
        title: 'Knowrist',
        description: 'Software development involves collaboration to design, code, test, and maintain user‑friendly applications.',
        link: '#',
        imgKey: 'knowrist',
    },
]

/* ── Team members data ── */
const defaultTeamMembers: TeamMember[] = [
    {
        id: 'felix',
        name: 'Felix Nwachukwu',
        role: 'Hardware Manager',
        roleColor: '#f68014',
        bio: 'Oversees the procurement and maintenance of hardware infrastructure, ensuring all systems function efficiently and securely.',
        imgKey: 'felix',
    },
    {
        id: 'blessing',
        name: 'Blessing Adukuchilli',
        role: 'Administrative Manager',
        roleColor: '#f68014',
        bio: 'Manages internal documentation, compliance, scheduling, and organizational processes. Ensures smooth administrative operations and supports executive management.',
        imgKey: 'blessing',
    },
    {
        id: 'jethro',
        name: "Jethro Mark Da'ar",
        role: 'Chief Executive Officer (CEO)',
        roleColor: '#f68014',
        bio: 'Leads the overall vision, strategic direction, and growth of the company. Oversees major partnerships, financial decisions, and long‑term development initiatives.',
        imgKey: 'jethro',
        featured: true,
    },
    {
        id: 'dominic',
        name: 'Dominic Ray Nanjwan',
        role: 'General Manager',
        roleColor: '#f68014',
        bio: 'Oversees daily operations, coordinating teams and performance goals to ensure all departments function efficiently and meet company objectives.',
        imgKey: 'dominic',
    },
    {
        id: 'william',
        name: 'William Bosworth',
        role: 'Software Manager',
        roleColor: '#f68014',
        bio: 'Leads software architecture, system design, and technical innovation across all company platforms.',
        imgKey: 'william',
    },
]

/* ── Inline SVG icons ── */

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
function AboutUs() {
    const [content, setContent] = useState<AboutContent>({
        heroTitle: defaultHeroTitle,
        topWorks: defaultTopWorks,
        teamMembers: defaultTeamMembers,
    })
    /* carousel: centre index (CEO is default centre = index 2) */
    const [centreIdx, setCentreIdx] = useState(() => getFeaturedIndex(defaultTeamMembers))

    useEffect(() => {
        let isActive = true
        const fetchAbout = async () => {
            try {
                const res = await fetch('/data/about.json', { cache: 'no-store' })
                if (!res.ok) return
                const data = (await res.json()) as Partial<AboutContent>
                const heroTitle = typeof data.heroTitle === 'string' && data.heroTitle.trim()
                    ? data.heroTitle
                    : defaultHeroTitle
                const topWorks = Array.isArray(data.topWorks) ? data.topWorks : defaultTopWorks
                if (!isActive) return
                setContent((prev) => ({ ...prev, heroTitle, topWorks }))
            } catch {
                /* fall back to defaults */
            }
        }
        const fetchTeamsData = async () => {
            try {
                const teams = await fetchTeams()
                if (!teams.length) return
                const mapped = teams.map((member, idx) => ({
                    id: member.id ?? `${member.name ?? 'member'}-${idx}`,
                    name: member.name ?? 'Team Member',
                    role: member.role ?? 'Team',
                    roleColor: '#f68014',
                    bio: member.bio ?? '',
                    imgKey: member.image_url ?? member.id ?? '',
                    featured: idx === 0,
                }))
                if (!isActive) return
                setContent((prev) => ({ ...prev, teamMembers: mapped }))
                setCentreIdx(getFeaturedIndex(mapped))
            } catch {
                /* fall back to defaults */
            }
        }
        fetchAbout()
        fetchTeamsData()
        return () => {
            isActive = false
        }
    }, [])

    const maxIdx = Math.max(0, content.teamMembers.length - 1)
    const prev = () => setCentreIdx((i) => Math.max(0, i - 1))
    const next = () => setCentreIdx((i) => Math.min(maxIdx, i + 1))

    return (
        <main className="about-page">
            <SiteNavbar />

            {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
            <header className="about-hero" aria-label="About Us hero">
                <div className="about-hero-overlay" />
                <svg className="about-hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0,62 C200,118 380,122 560,96 C740,70 900,34 1080,38 C1240,42 1340,62 1440,70 L1440,120 L0,120 Z" />
                </svg>
                <div className="about-hero-content">
                    <h1>{content.heroTitle}</h1>
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
            <section className="about-section about-section--light about-section--soft" aria-label="Our Story">
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
                            style={{ backgroundImage: `url(${designerImg})` }}
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
                            style={{ backgroundImage: `url(${designerImg})` }}
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
            <section className="about-section about-section--light about-section--soft" aria-label="Our Vision">
                <div className="about-two-col">
                    <div className="about-text-col">
                        <h2 className="section-label">OUR VISION</h2>
                        <p>Our vision is to become Africa's leading revolutionary entrepreneurial support hub. We aim to empower entrepreneurs, creatives, and athletes through technology, media, sports, and entertainment. We envision a continent where innovation thrives and talent is fully supported. We strive to create opportunities that drive sustainable growth and global competitiveness. Through excellence and impact, we are committed to shaping a brighter future for Africa.</p>
                    </div>
                    <div className="about-img-col">
                        <div
                            className="about-img-placeholder"
                            aria-label="Our vision image"
                            style={{ backgroundImage: `url(${designerImg})` }}
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
                    {content.topWorks.map((work) => {
                        const workImg = imageMap[work.imgKey] ?? work.imgKey
                        return (
                            <article key={work.id} className="work-card">
                                <div
                                    className="work-card-img"
                                    aria-label={`${work.title} project image`}
                                    style={{ backgroundImage: `url('${workImg}')` }}
                                />
                                <div className="work-card-body">
                                    <h3>{work.title}</h3>
                                    <p>{work.description}</p>
                                    <a href={work.link} className="work-card-btn" role="button">Visit</a>
                                </div>
                            </article>
                        )
                    })}
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
                            src={designerImg}
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
                            disabled={centreIdx === content.teamMembers.length - 1}
                            aria-label="Next team member"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>

                <div className="team-carousel" aria-live="polite">
                    {content.teamMembers.map((member, idx) => {
                        const offset = idx - centreIdx
                        const isCentre = offset === 0
                        const isVisible = Math.abs(offset) <= 2
                        const memberImg = imageMap[member.imgKey] ?? member.imgKey
                        return (
                            <article
                                key={member.id}
                                className={`team-card ${isCentre ? 'team-card--featured' : ''} ${!isVisible ? 'team-card--hidden' : ''}`}
                                style={{ '--offset': offset } as React.CSSProperties}
                                aria-hidden={!isVisible}
                            >
                                <div className="team-card-img-wrap">
                                    <img src={memberImg} alt={member.name} className="team-card-img" />
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
                            src={joinUsImg}
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
            <SiteFooter />

        </main>
    )
}

export default AboutUs
