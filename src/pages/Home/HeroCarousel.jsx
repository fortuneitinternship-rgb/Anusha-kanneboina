
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HeroCarousel.css";

function HeroCarousel() {
  const slides = [
    {
      image: "/images/carousel5.png",
      eyebrow: "REDUCE · REUSE · RECYCLE",
      title: "Turn Waste into",
      highlight: "Opportunity",
      description:
        "Sell, recycle, or donate your waste and give valuable materials a second life. Support a cleaner planet with RecyConnect.",
      primary: "Explore Products",
      secondary: "Sell / Recycle",
      primaryLink: "/products",
      secondaryLink: "/products",
    },
    {
      image: "/images/carousel2.jpg",
      eyebrow: "BUY SMART · REUSE MORE",
      title: "Discover Better",
      highlight: "Ways to Reuse",
      description:
        "Explore refurbished electronics and reusable products. Give valuable items another opportunity to serve you.",
      primary: "Shop Now",
      secondary: "Explore Products",
      primaryLink: "/products",
      secondaryLink: "/products",
    },
    {
      image: "/images/carousel3.jpg",
      eyebrow: "GIVE · SHARE · EXCHANGE",
      title: "Give Products a",
      highlight: "Second Life",
      description:
        "Donate useful products, exchange reusable items and help reduce unnecessary waste in your community.",
      primary: "Explore More",
      secondary: "Discover Categories",
      primaryLink: "/products",
      secondaryLink: "/categories",
    },
    {
      image: "/images/carousel4.jpg",
      eyebrow: "OUR SUSTAINABILITY IMPACT",
      title: "Together for a",
      highlight: "Greener Future",
      description:
        "Every responsible choice matters. Join RecyConnect and make reuse and recycling part of everyday life.",
      primary: "Learn More",
      secondary: "Explore Products",
      primaryLink: "/sustainability",
      secondaryLink: "/products",
    },
  ];

  return (
    <section className="full-hero">
      <div
        id="recyConnectHero"
        className="carousel slide carousel-fade full-hero-carousel"
        data-bs-ride="carousel"
        data-bs-interval="4500"
      >
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              data-bs-target="#recyConnectHero"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={slide.title}
            >
              <img
                src={slide.image}
                className="full-hero-image"
                alt={slide.highlight}
              />

              <div className="full-hero-overlay" />

              <div className="full-hero-content">
                <p className="eyebrow">{slide.eyebrow}</p>

                <h1>
                  {slide.title}
                  <span>{slide.highlight}</span>
                </h1>

                <p className="full-hero-description">
                  {slide.description}
                </p>

                <div className="hero-actions">
                  <Link
                    to={slide.primaryLink}
                    className="button button-primary"
                  >
                    {slide.primary} →
                  </Link>

                  <Link
                    to={slide.secondaryLink}
                    className="button button-outline"
                  >
                    {slide.secondary}
                  </Link>
                </div>

                <div className="hero-trust">
                  <span>♻ Sustainable choices</span>
                  <span>✓ Reuse more</span>
                  <span>🌱 Greener future</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#recyConnectHero"
          data-bs-slide="prev"
          aria-label="Previous slide"
        >
          <span className="carousel-control-prev-icon" />
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#recyConnectHero"
          data-bs-slide="next"
          aria-label="Next slide"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>
    </section>
  );
}

export default HeroCarousel;
