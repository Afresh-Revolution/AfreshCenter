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
import olaImg from '../assets/images/Ola.png'
import samImg from '../assets/images/Sam-light.png'

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
    ola: olaImg,
    sam: samImg,
}

const getFeaturedIndex = (members: TeamMember[]) => {
    const idx = members.findIndex((member) => member.featured)
    return idx >= 0 ? idx : 0
}

const defaultHeroTitle = 'About Us'

/* â”€â”€ Top Works data â”€â”€ */
const defaultTopWorks: TopWork[] = [
    {
        id: 'cbrilliance',
        title: 'Cbrilliance',
        description: 'Software development involves collaboration to design, code, test, and maintain userâ€‘friendly applications.',
        link: '#',
        imgKey: 'cbrilliance',
    },
    {
        id: 'joscity',
        title: 'JosCity',
        description: 'Software development involves collaboration to design, code, test, and maintain userâ€‘friendly applications.',
        link: '#',
        imgKey: 'joscity',
    },
    {
        id: 'knowrist',
        title: 'Knowrist',
        description: 'Software development involves collaboration to design, code, test, and maintain userâ€‘friendly applications.',
        link: '#',
        imgKey: 'knowrist',
    },
]

/* â”€â”€ Team members data â”€â”€ */
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
        bio: 'Leads the overall vision, strategic direction, and growth of the company. Oversees major partnerships, financial decisions, and longâ€‘term development initiatives.',
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
    {
        id: 'ola',
        name: 'Ola Adeyemi',
        role: 'Creative Director',
        roleColor: '#f68014',
        bio: 'Drives brand identity and visual storytelling across all Afresh Centre platforms.',
        imgKey: 'ola',
    },
    {
        id: 'sam',
        name: 'Samuel Bright',
        role: 'Business Development',
        roleColor: '#f68014',
        bio: 'Identifies growth opportunities and manages strategic partnerships to expand Afresh Centre’s reach.',
        imgKey: 'sam',
    },
]

/* â”€â”€ Inline SVG icons â”€â”€ */

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   COMPONENT
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function AboutUs() {
    const [content, setContent] = useState<AboutContent>({
        heroTitle: defaultHeroTitle,
        topWorks: defaultTopWorks,
        teamMembers: defaultTeamMembers,
    })

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
                // Carousel shows 5 at a time and needs at least 7 to slide; keep defaults if API returns fewer
                const MIN_FOR_CAROUSEL = 7
                if (!teams.length || teams.length < MIN_FOR_CAROUSEL) return
                const midIdx = Math.floor((teams.length - 1) / 2)
                const mapped = teams.map((member, idx) => ({
                    id: member.id ?? `${member.name ?? 'member'}-${idx}`,
                    name: member.name ?? 'Team Member',
                    role: member.role ?? 'Team',
                    roleColor: '#f68014',
                    bio: member.bio ?? '',
                    imgKey: member.image_url ?? member.id ?? '',
                    featured: idx === midIdx,
                }))
                if (!isActive) return
                setContent((prev) => ({ ...prev, teamMembers: mapped }))
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

    // Carousel: show 5 cards with the featured card centered (index 2),
    // and allow every member (first..last) to become the featured card via wrap-around navigation.
    const VISIBLE = 5
    const FEAT_POS = 2
    const CLONES = VISIBLE

    const members = content.teamMembers
    const totalMembers = members.length
    const cloneCount = Math.min(CLONES, totalMembers)

    const loopMembers =
        totalMembers > 0
            ? [
                ...members.slice(-cloneCount),
                ...members,
                ...members.slice(0, cloneCount),
            ]
            : []

    const minFeaturedIdx = cloneCount
    const maxFeaturedIdx = cloneCount + totalMembers - 1

    const [disableTrackTransition, setDisableTrackTransition] = useState(false)
    const [loopFeaturedIndex, setLoopFeaturedIndex] = useState(() => minFeaturedIdx + getFeaturedIndex(members))
    const [isMobileTeam, setIsMobileTeam] = useState(
        typeof window !== 'undefined' ? window.innerWidth <= 900 : false
    )
    const [isTeamHovered, setIsTeamHovered] = useState(false)
    const [teamTickSeed, setTeamTickSeed] = useState(0)

    useEffect(() => {
        if (!totalMembers) return
        const idx = getFeaturedIndex(members)
        setDisableTrackTransition(true)
        setLoopFeaturedIndex(minFeaturedIdx + idx)
    }, [members, minFeaturedIdx, totalMembers])

    useEffect(() => {
        if (!disableTrackTransition) return
        const raf = window.requestAnimationFrame(() => setDisableTrackTransition(false))
        return () => window.cancelAnimationFrame(raf)
    }, [disableTrackTransition])

    useEffect(() => {
        const handleResize = () => setIsMobileTeam(window.innerWidth <= 900)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (isMobileTeam || isTeamHovered || totalMembers < 2) return
        const id = window.setInterval(() => {
            setLoopFeaturedIndex((i) => i + 1)
        }, 6000)
        return () => window.clearInterval(id)
    }, [isMobileTeam, isTeamHovered, totalMembers, teamTickSeed])

    const prev = () => {
        if (!totalMembers) return
        setLoopFeaturedIndex((i) => i - 1)
        setTeamTickSeed((s) => s + 1)
    }
    const next = () => {
        if (!totalMembers) return
        setLoopFeaturedIndex((i) => i + 1)
        setTeamTickSeed((s) => s + 1)
    }

    const handleTrackTransitionEnd = () => {
        if (!totalMembers) return
        let idx = loopFeaturedIndex
        if (idx < minFeaturedIdx) idx += totalMembers
        if (idx > maxFeaturedIdx) idx -= totalMembers
        if (idx !== loopFeaturedIndex) {
            setDisableTrackTransition(true)
            setLoopFeaturedIndex(idx)
        }
    }

    const startIdx = loopFeaturedIndex - FEAT_POS
    const activeIdx =
        totalMembers > 0
            ? ((loopFeaturedIndex - minFeaturedIdx) % totalMembers + totalMembers) % totalMembers
            : -1
    const activeMember = activeIdx >= 0 ? members[activeIdx] : null

    return (
        <main className="about-page">
            <SiteNavbar />

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          HERO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
            <header className="about-hero" aria-label="About Us hero">
                <div className="about-hero-overlay" />
                <div className="about-hero-content">
                    <h1>{content.heroTitle}</h1>
                </div>
                <svg
                    className="about-hero-wave"
                    viewBox="0 0 1440 60"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        d="M0,35 C240,58 480,5 720,35 C960,58 1200,5 1440,35 L1440,60 L0,60 Z"
                        fill="#ffffff"
                    />
                </svg>
            </header>

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          INTRO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OUR STORY
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
            <section className="about-section about-section--light about-section--soft" aria-label="Our Story">
                <div className="about-two-col">
                    <div className="about-text-col">
                        <h2 className="section-label">OUR STORY</h2>
                        <p>What started as a passion for innovation and creativity grew into a multiâ€‘sector platform combining technology, media, sports, and entertainment.</p>
                        <p>We believe Africa is filled with untapped potential, and with the right tools, guidance, and exposure, that potential can transform communities and industries.</p>
                        <p>AfrESH â€” Africa Focused Revolutionary Entrepreneurial Support Hub â€” represents our commitment to revolutionizing how entrepreneurs and talents are supported. Every service we offer is designed to empower, elevate, and create lasting impact.</p>
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

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OUR MISSION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OUR VISION
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OUR TOP WORKS
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          INTRODUCING OUR CEO
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
            <section className="ceo-section" aria-label="Introducing Our CEO">
                <div className="ceo-inner">
                    <div className="ceo-text">
                        <h2 className="ceo-heading">Introducing Our Chief Executive Officer</h2>
                        <p className="ceo-name">JETHRO MARK DA'AR</p>
                        <p>
                            As the CEO of Afresh Centre, I have consistently resisted the allure of fleeting pleasures that can divert
                            attention and dampen spirits. My commitment lies in nurturing choices that prioritize longâ€‘term wellness
                            not only empowers our clients but also equips them with the insight and resilience needed to tackle life's
                            challenges headâ€‘on.
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
                            ensuring that our clients are wellâ€‘prepared to navigate obstacles. Together, we strive to build a
                            community that values longâ€‘term wellness and empowers each individual to thrive.
                        </p>
                    </div>
                    <div className="ceo-img-wrap">
                        <img
                            src={designerImg}
                            alt="Jethro Mark Da'ar â€“ CEO of Afresh Centre"
                            className="ceo-img"
                        />
                    </div>
                </div>
            </section>

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          MEET OUR TEAM
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
            <section className="team-section" aria-label="Meet Our Team">
                <div className="team-header">
                    <h2>Meet Our Team</h2>
                    <p>Dedicated professionals passionate about transforming education through technology.</p>
                    <div className="team-nav-btns">
                        <button
                            className="team-nav-btn"
                            type="button"
                            onClick={prev}
                            aria-label="Previous team member"
                        >
                            &#8592;
                        </button>
                        <button
                            className="team-nav-btn"
                            type="button"
                            onClick={next}
                            aria-label="Next team member"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>

                <div
                    className={`team-carousel${isMobileTeam ? ' team-carousel--single' : ''}`}
                    aria-live="polite"
                    onMouseEnter={() => setIsTeamHovered(true)}
                    onMouseLeave={() => setIsTeamHovered(false)}
                    style={{ ['--start-idx']: startIdx } as React.CSSProperties}
                >
                    <div
                        className="team-track"
                        onTransitionEnd={handleTrackTransitionEnd}
                        style={disableTrackTransition ? { transition: 'none' } : undefined}
                    >
                        {(isMobileTeam ? (activeMember ? [activeMember] : []) : loopMembers).map((member, idx) => {
                            const isFeatured = isMobileTeam || idx === loopFeaturedIndex
                            return (
                                <article
                                    key={`${member.id}-${idx}`}
                                    className={`team-card${isFeatured ? ' team-card--featured' : ''}`}
                                >
                                    <div className="team-card-img-wrap">
                                        <img
                                            src={imageMap[member.imgKey] ?? member.imgKey}
                                            alt={member.name}
                                            className="team-card-img"
                                        />
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
                </div>
            </section>

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          JOIN US
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
                            Don't just consume technologyâ€”create it! At Afresh Centre, we empower the next generation of African
                            tech leaders through comprehensive training, mentorship, and handsâ€‘on experience.
                        </p>
                        <p>
                            Are you ready to elevate your skills and shape the future of technology? Join us, and let's grow
                            together, transforming ideas into impactful innovations!
                        </p>
                    </div>
                </div>
            </section>

            {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          FOOTER
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
            <SiteFooter />

        </main>
    )
}

export default AboutUs



