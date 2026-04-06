import { Link } from "react-router-dom";
import { SiteFooter, SiteNavbar } from "../Component/SharedLayout";
import jethroImage from "../assets/images/JethroMD.jpg";
import dominicImage from "../assets/images/DominicRay.JPG";
import williamImage from "../assets/images/WilliamsBosw.jpg";
import blessingImage from "../assets/images/BlessingWilliams.jpg";
import felixImage from "../assets/images/MrFelix.JPG";

const management = [
  {
    id: "jethro",
    name: "Jethro Mark Da'ar",
    role: "Chief Executive Officer (CEO)",
    bio: "Drives strategic growth, innovation, and partnerships while leading long-term company direction.",
    image: jethroImage,
  },
  {
    id: "dominic",
    name: "Dominic Ray Nanjwan",
    role: "General Manager",
    bio: "Coordinates day-to-day execution across teams to deliver results and maintain operational excellence.",
    image: dominicImage,
  },
  {
    id: "william",
    name: "William Bosworth",
    role: "Software Manager",
    bio: "Leads software architecture, delivery standards, and continuous engineering improvements.",
    image: williamImage,
  },
  {
    id: "blessing",
    name: "Blessing Adukuchili",
    role: "Administrative Manager",
    bio: "Leads administrative operations, documentation, scheduling, and internal process coordination.",
    image: blessingImage,
  },
  {
    id: "felix",
    name: "Felix Nwachukwu",
    role: "Hardware Manager",
    bio: "Oversees procurement and maintenance of hardware systems with a focus on stability and reliability.",
    image: felixImage,
  },
];

const objectives = [
  "Document and preserve the historical evolution of governance and leadership across African nations.",
  "Highlight the three arms of government: Executive, Legislative, and Judiciary.",
  "Document traditional institutions, cultural hierarchies, and indigenous leadership systems.",
  "Promote Nigeria's cultural heritage including arts, crafts, traditions, historical monuments, and cultural festivals.",
  "Create an accessible digital platform for students, researchers, tourists, and educational institutions.",
  "Support national and international research on African leadership and governance systems.",
  "Encourage knowledge sharing and collaboration among African nations through WAILIN.",
];

const platformAudience = [
  "Students",
  "Researchers",
  "Historians",
  "Tourists",
  "Educational institutions",
  "Government agencies",
];

const projectScopeItems = [
  "Leaders of various nations",
  "The three arms of government: Executive, Legislative, and Judiciary",
  "Government institutions",
  "Traditional leadership structures",
  "Historical hierarchies",
  "Cultural heritage and traditions",
];

const digitalPlatforms = [
  {
    title: "Official Website Platform",
    description: "A comprehensive online knowledge base accessible worldwide.",
  },
  {
    title: "Mobile Application",
    description: "A user-friendly mobile app designed for students, researchers, and the general public.",
  },
];

const strategicPartners = [
  "National Museum Jos",
  "National Information Technology Development Agency (NITDA)",
  "National Library of Nigeria",
  "Other relevant government agencies and cultural organizations",
];

export default function WailinPage() {
  return (
    <main className="wailin-page">
      <SiteNavbar />

      <header className="wailin-hero" aria-label="Wailin hero">
        <div className="wailin-hero-overlay" />
        <div className="wailin-hero-content">
          <h1>WAILIN Encyclopedia</h1>
          <p>
            West Africa Inter-Leadership Initiative of Nations; preserving and
            promoting Africa's history, governance, and cultural heritage.
          </p>
        </div>
        <svg
          className="wailin-hero-wave"
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

      <section className="wailin-content" aria-label="WAILIN Encyclopedia overview">
        <div className="wailin-content-inner container">
          <h2 className="wailin-main-title">Overview</h2>
          <div className="wailin-block">
            <p>
              The WAILIN Encyclopedia Project is a groundbreaking digital
              initiative designed to preserve, document, and promote Africa's
              rich history, governance systems, leadership structures, arts,
              crafts, and cultural heritage.
            </p>
            <p>
              This initiative begins with the Federal Republic of Nigeria,
              showcasing the diverse traditions, institutions, and historical
              development across the nation's 36 states.
            </p>
            <p>
              The project is a collaboration between Gosem Record Studios and
              AFRESH Media Center, under a three-year development and management
              agreement (2026–2028).
            </p>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Vision</h3>
            <p>
              To establish a comprehensive digital encyclopedia that preserves,
              promotes, and showcases the rich history, leadership structures,
              governance systems, arts, crafts, and cultural heritage of Africa,
              beginning with Nigeria, for the benefit of present and future
              generations.
            </p>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Mission</h3>
            <p>
              To develop a modern digital platform that documents Africa's
              historical evolution, governance institutions, traditional
              leadership systems, and cultural diversity through the WAILIN
              Encyclopedia Website and Mobile Application, making this knowledge
              accessible to students, researchers, policymakers, and tourists
              worldwide.
            </p>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Aim</h3>
            <p>
              The primary aim of the WAILIN Encyclopedia Project is to create a
              reliable digital knowledge platform that archives and presents
              accurate information about African history, leadership
              institutions, government systems, cultural traditions, and
              national development structures.
            </p>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Objectives</h3>
            <p>The project seeks to:</p>
            <ul className="wailin-list wailin-list--bulleted">
              {objectives.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">About the Initiative</h3>
            <p>
              The West Africa Inter-Leadership Initiative of Nations (WAILIN) is
              an initiative founded by Gosem Record Studios to promote leadership
              knowledge, governance awareness, and cultural preservation across
              Africa.
            </p>
            <p>
              Through this initiative, Gosem Record Studios has partnered with
              AFRESH Media Center to develop the WAILIN Encyclopedia – First
              Edition, a digital knowledge platform dedicated to documenting
              Nigeria's history, governance systems, and cultural heritage.
            </p>
            <p>This platform will serve:</p>
            <ul className="wailin-list wailin-list--bulleted">
              {platformAudience.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Project Scope</h3>
            <p>
              The WAILIN Encyclopedia will document and present important aspects
              of African governance and cultural history, including:
            </p>
            <ul className="wailin-list wailin-list--bulleted">
              {projectScopeItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Digital Platforms</h3>
            <p>
              The WAILIN Encyclopedia will be accessible through modern digital
              platforms to ensure global reach:
            </p>
            <ol className="wailin-list wailin-list--numbered wailin-list--platforms">
              {digitalPlatforms.map((item, i) => (
                <li key={i}>
                  <strong>{item.title}</strong>
                  <span className="wailin-platform-desc">{item.description}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="wailin-block">
            <h3 className="wailin-block-heading">Strategic Partnerships</h3>
            <p>
              To ensure the credibility, accuracy, and success of the project,
              Gosem Record Studios is developing partnerships with key national
              institutions and cultural organizations.
            </p>
            <p>Proposed partners include:</p>
            <ul className="wailin-list wailin-list--bulleted">
              {strategicPartners.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>
              These collaborations will strengthen the authenticity, research
              quality, and national value of the WAILIN Encyclopedia Project.
            </p>
          </div>

        </div>
      </section>

      <section className="wailin-management" aria-label="Leadership & Management">
        <div className="wailin-management-inner container">
          <div className="wailin-management-header">
            <h2>Management</h2>
            <p>
              Meet the leaders driving our vision and day-to-day excellence.
            </p>
          </div>
          <div className="wailin-management-grid">
            {management.map((member) => (
              <article
                key={member.id}
                className="wailin-management-card"
              >
                <div className="wailin-management-card-img-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="wailin-management-card-img"
                  />
                </div>
                <div className="wailin-management-card-body">
                  <h3>{member.name}</h3>
                  <p className="wailin-management-role">{member.role}</p>
                  <p className="wailin-management-bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wailin-cta" aria-label="Get in touch">
        <div className="wailin-cta-inner container">
          <h2>Get in Touch</h2>
          <p>
            Interested in partnerships or learning more about the WAILIN
            Encyclopedia Project? We'd love to hear from you.
          </p>
          <Link to="/contact" className="wailin-cta-btn">
            Contact Us
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
