import { useEffect, useState } from 'react'
import { fetchTeams, getTeamImageUrl } from '../api/teams'
import cbrillianceImg from '../assets/images/cbrilliance.png'
import knowristImg from '../assets/images/knowrist.jpg'
import josCityImg from '../assets/images/joscity.jpg'
import designerImg from '../assets/images/designerrrr.png'
import missionImg from '../assets/images/mission.jpg'
import visionImg from '../assets/images/vision.jpg'
import joinImg from '../assets/images/join.jpg'
import joinUsImg from '../assets/images/faf5808cbbf8bf77544b1eed718d2e7cbd59dd0f.png'
import afreshLogoImg from '../assets/images/AfreshLogo.png'
import jethroImg from '../assets/images/JethroMD.jpg'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'
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
}

const getFeaturedIndex = (members: TeamMember[]) => {
  const idx = members.findIndex((member) => member.featured)
  return idx >= 0 ? idx : 0
}

const defaultHeroTitle = 'About Us'

const defaultTopWorks: TopWork[] = [
  {
    id: 'cbrilliance',
    title: 'Cbrilliance',
    description: 'Software development involves collaboration to design, code, test, and maintain user-friendly applications.',
    link: 'https://cbrilliance.io',
    imgKey: 'cbrilliance',
  },
  {
    id: 'joscity',
    title: 'JosCity',
    description: 'Software development involves collaboration to design, code, test, and maintain user-friendly applications.',
    link: 'https://joscity.com',
    imgKey: 'joscity',
  },
  {
    id: 'knowrist',
    title: 'Knowrist',
    description: 'Software development involves collaboration to design, code, test, and maintain user-friendly applications.',
    link: 'https://knowrist.com',
    imgKey: 'knowrist',
  },
]

function AboutUs() {
  const [content, setContent] = useState<AboutContent>({
    heroTitle: defaultHeroTitle,
    topWorks: defaultTopWorks,
    teamMembers: [],
  })
  const [teamLoading, setTeamLoading] = useState(true)
  const [brokenTeamImages, setBrokenTeamImages] = useState<Record<string, boolean>>({})

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
        const visibleMembers = teams.filter(
          (member) => member.visible !== false && member.status !== 'Inactive'
        )

        if (!visibleMembers.length) {
          if (!isActive) return
          setContent((prev) => ({ ...prev, teamMembers: [] }))
          return
        }

        const featuredIdx = visibleMembers.findIndex(
          (member) =>
            member.role?.toLowerCase().includes('ceo') ||
            member.role?.toLowerCase().includes('chief executive')
        )

        const mapped = visibleMembers.map((member, idx) => ({
          id: member.id ?? `${member.name ?? 'member'}-${idx}`,
          name: member.name ?? 'Team Member',
          role: member.role ?? 'Team',
          roleColor: '#f68014',
          bio: member.bio ?? '',
          imgKey: getTeamImageUrl(member.image_url) ?? member.image_url ?? member.id ?? '',
          featured: idx === featuredIdx && featuredIdx >= 0,
        }))

        if (!isActive) return
        setBrokenTeamImages({})
        setContent((prev) => ({ ...prev, teamMembers: mapped }))
      } catch {
        if (isActive) {
          setBrokenTeamImages({})
          setContent((prev) => ({ ...prev, teamMembers: [] }))
        }
      } finally {
        if (isActive) {
          setTeamLoading(false)
        }
      }
    }

    fetchAbout()
    fetchTeamsData()

    return () => {
      isActive = false
    }
  }, [])

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

  const [introRef, introVisible] = useScrollReveal()
  const [storyRef, storyVisible] = useScrollReveal()
  const [missionRef, missionVisible] = useScrollReveal()
  const [visionRef, visionVisible] = useScrollReveal()
  const [worksRef, worksVisibleCount] = useStaggerReveal(3)
  const [ceoRef, ceoVisible] = useScrollReveal()
  const [teamRef, teamVisible] = useScrollReveal()
  const [joinRef, joinVisible] = useScrollReveal()
  const getTeamFallbackLabel = (member: TeamMember) =>
    member.name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'AF'

  return (
    <main className="about-page">
      <SiteNavbar />

      <header className="about-hero" aria-label="About Us hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <h1>{content.heroTitle}</h1>
        </div>
      </header>

      <section ref={introRef} className={`about-intro reveal${introVisible ? ' is-visible' : ''}`} aria-label="Introduction">
        <p>
          Afresh Centre is a dynamic innovation hub committed to empowering Africa&apos;s next generation of entrepreneurs,
          creators, athletes, and tech leaders.
        </p>
        <p>
          We exist to bridge opportunity gaps by combining technology, media, sports, and entertainment into one powerful
          ecosystem designed to support growth, creativity, and sustainable impact.
        </p>
        <p>
          At AfrESH, we do not just offer services. We build platforms, create opportunities, and drive transformation.
        </p>
      </section>

      <section ref={storyRef} className={`about-section about-section--light about-section--soft reveal${storyVisible ? ' is-visible' : ''}`} aria-label="Our Story">
        <div className="about-two-col">
          <div className="about-text-col">
            <h2 className="section-label">OUR STORY</h2>
            <p>What started as a passion for innovation and creativity grew into a multi-sector platform combining technology, media, sports, and entertainment.</p>
            <p>We believe Africa is filled with untapped potential, and with the right tools, guidance, and exposure, that potential can transform communities and industries.</p>
            <p>AfrESH, Africa Focused Revolutionary Entrepreneurial Support Hub, represents our commitment to revolutionizing how entrepreneurs and talents are supported. Every service we offer is designed to empower, elevate, and create lasting impact.</p>
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

      <section ref={missionRef} className={`about-section about-section--light reveal${missionVisible ? ' is-visible' : ''}`} aria-label="Our Mission">
        <div className="about-two-col about-two-col--reversed">
          <div className="about-img-col">
            <div
              className="about-img-placeholder"
              aria-label="Our mission image"
              style={{ backgroundImage: `url(${missionImg})` }}
            />
          </div>
          <div className="about-text-col">
            <h2 className="section-label">OUR MISSION</h2>
            <p>To support and empower African entrepreneurs by delivering innovative tech solutions, impactful media services, sports development initiatives, and engaging entertainment platforms that create sustainable growth and opportunity.</p>
          </div>
        </div>
      </section>

      <section ref={visionRef} className={`about-section about-section--light about-section--soft reveal${visionVisible ? ' is-visible' : ''}`} aria-label="Our Vision">
        <div className="about-two-col">
          <div className="about-text-col">
            <h2 className="section-label">OUR VISION</h2>
            <p>Our vision is to become Africa&apos;s leading revolutionary entrepreneurial support hub. We aim to empower entrepreneurs, creatives, and athletes through technology, media, sports, and entertainment. We envision a continent where innovation thrives and talent is fully supported. We strive to create opportunities that drive sustainable growth and global competitiveness. Through excellence and impact, we are committed to shaping a brighter future for Africa.</p>
          </div>
          <div className="about-img-col">
            <div
              className="about-img-placeholder"
              aria-label="Our vision image"
              style={{ backgroundImage: `url(${visionImg})` }}
            />
          </div>
        </div>
      </section>

      <section ref={worksRef} className="about-works" aria-label="Our Top Works">
        <div className="works-header">
          <h2>Our Top Works</h2>
          <p>Committed experts eager to revolutionize education using innovative technology.</p>
        </div>
        <div className="works-grid">
          {content.topWorks.map((work, idx) => {
            const workImg = imageMap[work.imgKey] ?? work.imgKey
            return (
              <article key={work.id} className={`work-card reveal${idx < worksVisibleCount ? ` is-visible reveal--d${idx + 1}` : ''}`}>
                <div
                  className="work-card-img"
                  aria-label={`${work.title} project image`}
                  style={{ backgroundImage: `url('${workImg}')` }}
                />
                <div className="work-card-body">
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                  <a href={work.link} className="work-card-btn" role="button" target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section ref={ceoRef} className={`ceo-section reveal${ceoVisible ? ' is-visible' : ''}`} aria-label="Introducing Our CEO">
        <div className="ceo-inner">
          <div className="ceo-text">
            <h2 className="ceo-heading">Introducing Our Chief Executive Officer</h2>
            <p className="ceo-name">JETHRO MARK DA&apos;AR</p>
            <p>
              As the CEO of Afresh Centre, I have consistently resisted the allure of fleeting pleasures that can divert
              attention and dampen spirits. My commitment lies in nurturing choices that prioritize long-term wellness.
              This not only empowers our clients but also equips them with the insight and resilience needed to tackle life&apos;s
              challenges head-on.
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
              ensuring that our clients are well prepared to navigate obstacles. Together, we strive to build a
              community that values long-term wellness and empowers each individual to thrive.
            </p>
          </div>
          <div className="ceo-img-wrap">
            <img
              src={jethroImg}
              alt="Jethro Mark Da'ar - CEO of Afresh Centre"
              className="ceo-img"
            />
          </div>
        </div>
      </section>

      <section ref={teamRef} className={`team-section reveal${teamVisible ? ' is-visible' : ''}`} aria-label="Meet Our Team">
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

        {teamLoading ? (
          <div className="team-loading" role="status" aria-live="polite">
            Loading team members...
          </div>
        ) : totalMembers === 0 ? (
          <div className="team-loading" role="status" aria-live="polite">
            Team members will appear here soon.
          </div>
        ) : (
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
                const memberImage = imageMap[member.imgKey] ?? member.imgKey
                const showImage = Boolean(memberImage) && !brokenTeamImages[member.id]
                return (
                  <article
                    key={`${member.id}-${idx}`}
                    className={`team-card${isFeatured ? ' team-card--featured' : ''}`}
                  >
                    <div className="team-card-img-wrap">
                      {showImage ? (
                        <img
                          src={memberImage}
                          alt={member.name}
                          className="team-card-img"
                          onError={() => {
                            setBrokenTeamImages((prev) =>
                              prev[member.id] ? prev : { ...prev, [member.id]: true }
                            )
                          }}
                        />
                      ) : (
                        <div className="team-card-img-fallback" aria-label={`${member.name} image unavailable`}>
                          <span>{getTeamFallbackLabel(member)}</span>
                        </div>
                      )}
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
        )}
      </section>

      <section ref={joinRef} className={`join-section reveal${joinVisible ? ' is-visible' : ''}`} aria-label="Join Us">
        <div className="join-inner">
          <div className="join-img-wrap">
            <img
              src={joinImg}
              alt="Join the AfrESH team"
              className="join-img"
            />
          </div>
          <div className="join-text">
            <h2>Join Us</h2>
            <p>
              Do not just consume technology - create it. At Afresh Centre, we empower the next generation of African
              tech leaders through comprehensive training, mentorship, and hands-on experience.
            </p>
            <p>
              Are you ready to elevate your skills and shape the future of technology? Join us, and let&apos;s grow
              together, transforming ideas into impactful innovations.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

export default AboutUs
