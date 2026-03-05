import { useState } from 'react'
import { Link } from 'react-router-dom'
import afreshLogoImg from '../assets/images/AfreshLogo.png'
import '../scss/Services.scss'

type ServiceItem = {
  id: string
  title: string
  description: string
  image: string
  alt: string
}

const servicesData: ServiceItem[] = [
  { id: '1', title: 'Frontend Development', description: 'Building responsive and interactive user interfaces using modern frameworks and technologies.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', alt: 'Frontend Development' },
  { id: '2', title: 'Software Development', description: 'Creating custom software solutions tailored to your business needs and requirements.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', alt: 'Software Development' },
  { id: '3', title: 'UI/UX Design', description: 'Designing intuitive user experiences and beautiful interfaces for web and mobile apps.', image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400', alt: 'UI/UX Design' },
  { id: '4', title: 'Cyber Security', description: 'Protecting your digital assets with comprehensive security solutions and best practices.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400', alt: 'Cyber Security' },
  { id: '5', title: 'Graphics Design', description: 'Creating stunning visual designs for branding, marketing, and digital content.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400', alt: 'Graphics Design' },
  { id: '6', title: 'Embedded Systems', description: 'Developing hardware and software solutions for embedded devices and IoT applications.', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400', alt: 'Embedded Systems' },
  { id: '7', title: 'Mobile App Development', description: 'Building native and cross-platform mobile applications for iOS and Android devices.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', alt: 'Mobile App Development' },
  { id: '8', title: 'Technical Writing', description: 'Creating clear documentation, manuals, and guides for products and services.', image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400', alt: 'Technical Writing' },
  { id: '9', title: 'PCB Design', description: 'Designing printed circuit boards for electronic devices and hardware projects.', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400', alt: 'PCB Design' },
  { id: '10', title: 'IoT', description: 'Connecting devices and building smart solutions for homes, businesses, and industries.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', alt: 'IoT' },
  { id: '11', title: 'Backend Development', description: 'Building robust server-side applications, APIs, and database solutions.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', alt: 'Backend Development' },
  { id: '12', title: 'Typography', description: 'Creating beautiful and readable type designs for branding and digital content.', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', alt: 'Typography' },
  { id: '13', title: 'Video Editing', description: 'Professional video production and editing services for content creators.', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400', alt: 'Video Editing' },
  { id: '14', title: 'Digital Marketing', description: 'Strategic marketing solutions to grow your online presence and reach.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', alt: 'Digital Marketing' },
  { id: '15', title: 'Data Analyst', description: 'Transforming data into actionable insights for informed business decisions.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', alt: 'Data Analyst' },
]

const LEARN_MORE_SUFFIX = ' Contact us for more details about this service.'

function Services() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalDesc, setModalDesc] = useState('')

  const openModal = (title: string, description: string) => {
    setModalTitle(title)
    setModalDesc(description + LEARN_MORE_SUFFIX)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal()
  }

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <main className="services-page">
      <header className="services-hero" aria-label="Our Services hero">
        <div className="services-hero-overlay" />
        <div className="services-topbar">
          <div className="services-logo">
            <Link to="/" aria-label="Afresh home">
              <img src={afreshLogoImg} alt="AfrESH logo" className="services-logo-img" />
            </Link>
          </div>
          <nav aria-label="Primary navigation">
            <ul className="services-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="is-active"><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>
          <Link to="/contact" className="services-cta">Afresh Academy</Link>
        </div>
        <div className="services-hero-content">
          <h1>Our Services</h1>
        </div>
      </header>

      <div className="services-main">
        <section className="description">
          <p>
            At AFrESH Center (Africa Focused Revolutionary Entrepreneurial Support Hub), we provide integrated solutions across technology, media, sports, and entertainment — designed to empower entrepreneurs, businesses, and talents across Africa.
          </p>
        </section>

        <section className="services-section">
          <div className="services-grid">
          {servicesData.map((service) => (
            <article key={service.id} className="service-card">
              <img src={service.image} alt={service.alt} />
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button
                  type="button"
                  className="btn-learn"
                  onClick={() => openModal(service.title, service.description)}
                >
                  Learn More
                </button>
              </div>
            </article>
          ))}
          </div>
        </section>
      </div>

      {modalOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          aria-describedby="modalDesc"
          onClick={handleBackdropClick}
        >
          <div className="modal-content" onClick={handleModalContentClick}>
            <button
              type="button"
              className="close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 id="modalTitle">{modalTitle}</h2>
            <p id="modalDesc">{modalDesc}</p>
            <Link to="/contact" className="btn-learn" onClick={closeModal}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}

export default Services
