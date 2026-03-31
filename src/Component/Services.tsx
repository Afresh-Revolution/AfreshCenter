import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import servicesHeroImg from "../assets/images/Group 31.png";
import { SiteFooter } from "./SharedLayout";
import "../scss/Services.scss";
import { SiteNavbar } from "./SharedLayout";
import {
  fetchPublicServices,
  getServiceImageUrl,
  type ServiceItem,
} from "../api/services";
import { ReadyToGetStartedCard } from "./ReadyToGetStartedCard";
import { useStaggerReveal } from "../hooks/useScrollReveal";

function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);
  const detailId = searchParams.get("id");

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchPublicServices()
      .then((list) => {
        if (!cancelled) {
          setServices(list);
          if (detailId && list.length) {
            const found = list.find((s) => s.id === detailId);
            if (found) setDetailService(found);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load services.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [detailId]);

  const closeDetail = () => {
    setDetailService(null);
    if (searchParams.get("id")) setSearchParams({});
  };

  const openDetail = (service: ServiceItem) => {
    setDetailService(service);
    setSearchParams({ id: service.id });
  };

  const servicesStagger = useStaggerReveal(services.length || 6);

  return (
    <main className="services-page">
      {!detailService && (
        <>
          <header
            className="services-hero"
            aria-label="Our Services hero"
            style={{ ["--services-hero-image"]: `url(${servicesHeroImg})` } as Record<string, string>}
          >
            <div className="services-hero-overlay" />
            <SiteNavbar />
            <div className="services-hero-content">
              <h1 className="hero-anim-title">Our Services</h1>
            </div>
          </header>

          <div className="services-main">
            <section className="description">
              <p>
                At AFrESH Center (Africa Focused Revolutionary Entrepreneurial
                Support Hub), we provide integrated solutions across technology,
                media, sports, and entertainment — designed to empower
                entrepreneurs, businesses, and talents across Africa.
              </p>
            </section>

            {error && (
              <p className="services-error" role="alert">
                {error}
              </p>
            )}
            {loading ? (
              <p className="services-loading">Loading services…</p>
            ) : (
              <section className="services-section">
                <div ref={servicesStagger.ref} className="services-grid">
                  {services.map((service, idx) => (
                    <article
                      key={service.id}
                      className={`service-card reveal${idx < servicesStagger.visibleCount ? ` is-visible reveal--d${Math.min(idx + 1, 6)}` : ""}`}>
                      {getServiceImageUrl(service.image) ? (
                        <img
                          src={getServiceImageUrl(service.image) ?? ""}
                          alt={service.title}
                        />
                      ) : (
                        <div className="service-card-image-placeholder" aria-label={`${service.title} image not uploaded`}>
                          No image uploaded yet
                        </div>
                      )}
                      <div className="service-content">
                        <h3>{service.title}</h3>
                        <p>
                          {service.description ||
                            "Contact us for more details about this service."}
                        </p>
                        <button
                          type="button"
                          className="btn-learn"
                          onClick={() => openDetail(service)}
                        >
                          Learn More
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}

      {detailService && (
        <div
          className="service-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
        >
          <SiteNavbar />
          <div className="service-detail">
            <header
              className="service-detail-hero"
              style={{
                backgroundImage: detailService.image
                  ? `url(${getServiceImageUrl(detailService.image)})`
                  : undefined,
              }}
            >
              <div className="service-detail-hero-overlay" />
              <button
                type="button"
                className="service-detail-back"
                onClick={closeDetail}
              >
                ← Back to Services
              </button>
              <div className="service-detail-hero-content">
                <h1 id="service-detail-title" className="service-detail-title">
                  {detailService.title}
                </h1>
                {detailService.shortDescription && (
                  <p className="service-detail-short-desc">
                    {detailService.shortDescription}
                  </p>
                )}
              </div>
            </header>

            <div className="service-detail-body">
              <div className="service-detail-body-inner">
                <div className="service-detail-body-main">
                  {detailService.overview != null || detailService.image ? (
                    <section className="service-detail-block service-detail-overview">
                      <div className="service-detail-card">
                        <h2>Overview</h2>
                        {detailService.image && (
                          <div className="service-detail-overview-media">
                            <img
                              src={
                                getServiceImageUrl(detailService.image) ?? ""
                              }
                              alt=""
                            />
                          </div>
                        )}
                        {detailService.overview && (
                          <p className="service-detail-overview-text">
                            {detailService.overview}
                          </p>
                        )}
                      </div>
                    </section>
                  ) : null}

                  {detailService.keyFeatures &&
                    detailService.keyFeatures.length > 0 && (
                      <section className="service-detail-block">
                        <div className="service-detail-card">
                          <h2>Key Features</h2>
                          <ul className="service-detail-list service-detail-list--orange">
                            {detailService.keyFeatures.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )}

                  {detailService.benefits &&
                    detailService.benefits.length > 0 && (
                      <section className="service-detail-block">
                        <div className="service-detail-card">
                          <h2>Benefits</h2>
                          <ul className="service-detail-list service-detail-list--green">
                            {detailService.benefits.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )}

                  {detailService.whatYouGet &&
                    detailService.whatYouGet.length > 0 && (
                      <section className="service-detail-block">
                        <div className="service-detail-card">
                          <h2>What You'll Get</h2>
                          <ul className="service-detail-list service-detail-list--blue">
                            {detailService.whatYouGet.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    )}

                  <div className="service-detail-close-wrap">
                    <button
                      type="button"
                      className="btn-learn"
                      onClick={closeDetail}
                    >
                      Back to Services
                    </button>
                  </div>
                </div>

                <div className="service-detail-body-sidebar">
                  <ReadyToGetStartedCard serviceName={detailService.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}

export default Services;
