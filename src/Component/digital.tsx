// import "./digital.css";
// import { SiteFooter } from "./SharedLayout";

// type CheckItemProps = { text: string; variant?: "feature" | "benefit" | "deliverable" };

// function CheckItem({ text, variant = "feature" }: CheckItemProps) {
//   return (
//     <div className={`check-item check-${variant}`}>
//       <span className={`check-icon ${variant}`} aria-hidden="true">
//         {variant === "benefit" ? "\u2713" : "\u2022"}
//       </span>
//       <span>{text}</span>
//     </div>
//   );
// }

// const features = [
//   "SEO Optimization",
//   "Content Marketing",
//   "Social Media Management",
//   "Paid Advertising Campaigns",
//   "Email Marketing",
//   "Analytics & Reporting",
// ];

// const benefits = [
//   "Increased online visibility",
//   "Higher conversion rates",
//   "Better customer engagement",
//   "Measurable ROI on marketing spend",
//   "Competitive market advantage",
//   "Sustainable business growth",
// ];

// const deliverables = [
//   "Monthly performance reports",
//   "Optimized landing pages",
//   "Content calendar & strategy",
//   "Social media content (20+ posts/month)",
//   "PPC campaign management",
//   "Technical SEO audit",
// ];

// function Digital() {
//   return (
//     <div className="dm-page">
//       <div className="dm-bg-overlay" />

//       <nav className="dm-nav">
//         <div className="dm-nav-left">
//           <span className="dm-logo-icon">afr</span>
//           <span className="dm-logo-text">AfrESH</span>
//         </div>
//         <ul className="dm-nav-links">
//           <li>HOME</li>
//           <li>ABOUT</li>
//           <li>SERVICES</li>
//           <li>CONTACT US</li>
//         </ul>
//         <button className="dm-academy-btn">Afresh Academy</button>
//       </nav>

//       <div className="dm-hero">
//         <a href="#" className="dm-back-link">{"\u2190"} Back to Services</a>
//         <h1 className="dm-title">Digital Marketing</h1>
//         <p className="dm-description">
//           Comprehensive digital marketing strategies to grow your online
//           <br />
//           presence and drive conversions.
//         </p>
//       </div>

//       <div className="service-page">
//         <div className="service-top">
//           <div className="overview-card">
//             <h2>Overview</h2>
//             <p>
//               Our digital marketing services help businesses establish and grow their online presence through
//               data-driven strategies. We combine SEO, content marketing, social media, and paid advertising
//               to create comprehensive campaigns that reach your target audience and drive measurable
//               results. From strategy development to execution and optimization, we ensure your marketing
//               budget delivers maximum ROI.
//             </p>
//           </div>

//           <div className="cta-sidebar">
//             <div className="cta-card">
//               <h3>Ready to Get Started?</h3>
//               <p>
//                 Book a consultation with our experts to discuss your project requirements and get a customized
//                 solution.
//               </p>
//               <button className="cta-button" type="button">Book This Service</button>

//               <hr className="cta-divider" />

//               <div className="need-help">
//                 <h4>Need Help?</h4>
//                 <p className="help-sub">Contact our team for more information</p>
//                 <div className="contact-item">+234 808 123 4567</div>
//                 <div className="contact-item">info@getweb.com</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="section-card">
//           <h2>Key Features</h2>
//           <div className="features-grid">
//             {features.map((f) => (
//               <CheckItem key={f} text={f} variant="feature" />
//             ))}
//           </div>
//         </div>

//         <div className="section-card">
//           <h2>Benefits</h2>
//           <div className="benefits-list">
//             {benefits.map((b) => (
//               <CheckItem key={b} text={b} variant="benefit" />
//             ))}
//           </div>
//         </div>

//         <div className="section-card">
//           <h2>What You'll Get</h2>
//           <div className="deliverables-list">
//             {deliverables.map((d) => (
//               <CheckItem key={d} text={d} variant="deliverable" />
//             ))}
//           </div>
//         </div>
//       </div>
//       <SiteFooter />
//     </div>
//   );
// }

// export default Digital;
