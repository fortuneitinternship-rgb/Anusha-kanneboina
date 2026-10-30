import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const initialTime = 2 * 86400 + 14 * 3600 + 38 * 60 + 45;

function Home() {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const benefits = [
    {
      icon: "◷",
      title: "1. Easy Recycling",
      description:
        "Book a slot in under 60 seconds. Plan your recycling and get started with ease.",
      detail: "STATUS: EASY BOOKING",
    },
    {
      icon: "♧",
      title: "2. Convenient Pickup / Drop-off",
      description:
        "Find convenient collection options for recyclable materials and reusable products.",
      detail: "SERVICE: FLEXIBLE OPTIONS",
    },
    {
      icon: "✓",
      title: "3. Trusted / Verified Process",
      description:
        "Clear product information and transparent processes help users make informed choices.",
      detail: "FOCUS: TRANSPARENCY",
    },
    {
      icon: "♻",
      title: "4. Sustainable / Eco-friendly Value",
      description:
        "Give useful materials a second life and help reduce unnecessary waste.",
      detail: "GOAL: LESS WASTE",
    },
  ];

  const advantages = [
    {
      icon: "▣",
      label: "ADVANTAGE_01",
      title: "Easy to Use",
      description:
        "Explore products and recycling options through a simple interface.",
    },
    {
      icon: "✓",
      label: "ADVANTAGE_02",
      title: "Trusted Transactions",
      description:
        "Clear listings and transparent information help users make better decisions.",
    },
    {
      icon: "♧",
      label: "ADVANTAGE_03",
      title: "Convenient Service",
      description:
        "Explore available options for selling, recycling, donating, and exchanging.",
    },
    {
      icon: "♻",
      label: "ADVANTAGE_04",
      title: "Sustainable Choice",
      description:
        "Support reuse and recycling by helping useful materials stay in circulation.",
    },
    {
      icon: "₹",
      label: "ADVANTAGE_05",
      title: "Fair Value",
      description:
        "Compare available products and listings before making a decision.",
    },
    {
      icon: "◇",
      label: "ADVANTAGE_06",
      title: "Secure Process",
      description:
        "Keep product details clear and follow responsible practices when using the platform.",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO RECYCONNECT</p>

          <h1>
            Turn Waste into
            <br />
            Opportunity
          </h1>

          <p>
            Buy, sell, recycle, donate and exchange materials
            for a better and sustainable future.
          </p>

          <div className="hero-buttons">
            <div className="hero-button-row">
              <Link to="/products" className="primary-btn">
                Explore Products
              </Link>

              <Link to="/products" className="secondary-btn">
                Sell / Recycle
              </Link>
            </div>

            <div className="hero-button-row">
              <Link to="/products" className="secondary-btn">
                Donate
              </Link>

              <Link to="/products" className="secondary-btn">
                Exchange
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="services">
        <div className="service-card">
          <h2>Sell / Recycle</h2>
          <p>
            Sell your recyclable waste and give materials
            a new value.
          </p>
          <Link to="/products">Get Started →</Link>
        </div>

        <div className="service-card">
          <h2>Buy Recycled Products</h2>
          <p>
            Discover useful products made from recycled
            and refurbished materials.
          </p>
          <Link to="/products">Shop Now →</Link>
        </div>

        <div className="service-card">
          <h2>Donate</h2>
          <p>
            Donate reusable materials and products to
            people who need them.
          </p>
          <Link to="/products">Donate Now →</Link>
        </div>

        <div className="service-card">
          <h2>Exchange</h2>
          <p>
            Exchange reusable materials and products
            with other users.
          </p>
          <Link to="/products">Exchange →</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Material Categories</h2>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <div className="category-icon">PL</div>
            <h3>Plastic</h3>
            <p>Bottles, containers and plastic waste</p>
          </div>

          <div className="category-card">
            <div className="category-icon">MT</div>
            <h3>Metal</h3>
            <p>Iron, steel, aluminium and copper</p>
          </div>

          <div className="category-card">
            <div className="category-icon">PA</div>
            <h3>Paper</h3>
            <p>Paper, cardboard and boxes</p>
          </div>

          <div className="category-card">
            <div className="category-icon">EW</div>
            <h3>E-Waste</h3>
            <p>Mobiles, laptops and electronics</p>
          </div>

          <div className="category-card">
            <div className="category-icon">TX</div>
            <h3>Textile</h3>
            <p>Clothes and reusable fabrics</p>
          </div>

          <div className="category-card">
            <div className="category-icon">OT</div>
            <h3>Other</h3>
            <p>Glass, wood and other materials</p>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending">
        <div className="section-heading">
          <p>DISCOVER</p>
          <h2>Trending Products</h2>
        </div>

        <div className="product-preview">
          <div className="preview-card">
            <div className="preview-image">Product Image</div>
            <h3>Recycled Plastic Chair</h3>
            <p>₹850</p>
            <Link to="/products/1">View Product →</Link>
          </div>

          <div className="preview-card">
            <div className="preview-image">Product Image</div>
            <h3>Recycled Metal Table</h3>
            <p>₹1,500</p>
            <Link to="/products/2">View Product →</Link>
          </div>

          <div className="preview-card">
            <div className="preview-image">Product Image</div>
            <h3>Recycled Paper Notebook</h3>
            <p>₹120</p>
            <Link to="/products/3">View Product →</Link>
          </div>
        </div>
      </section>
      {/* Promotional Campaign */}
      <section className="promo-section">
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-label">
              LIMITED PROMOTIONAL CAMPAIGN
            </span>

            <h2>
              Cash Recycling Sale – 10% Extra Payout
              on Commercial Scrap
            </h2>

            <p>
              Explore recycling options for electronic and metal
              waste. This sample campaign demonstrates how a
              promotional offer could appear on RecyConnect.
            </p>

            <Link to="/products" className="promo-button">
              Claim Pickup Bonus <span>→</span>
            </Link>
          </div>

          <div className="promo-timer">
            <p className="timer-heading">DEMO OFFER COUNTDOWN</p>

            <div className="timer-grid">
              <div className="timer-box">
                <strong>{String(days).padStart(2, "0")}</strong>
                <span>Days</span>
              </div>

              <div className="timer-box">
                <strong>{String(hours).padStart(2, "0")}</strong>
                <span>Hours</span>
              </div>

              <div className="timer-box">
                <strong>{String(minutes).padStart(2, "0")}</strong>
                <span>Mins</span>
              </div>

              <div className="timer-box">
                <strong>{String(seconds).padStart(2, "0")}</strong>
                <span>Secs</span>
              </div>
            </div>

            <div className="promo-code">
              <span>DEMO CODE:</span>
              <strong>RECYCLEBONUS</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Recycling & Service Benefits */}
      <section className="benefits-section">
        <div className="section-heading">
          <p>SECTION: 06_WORKFLOW</p>
          <h2>Recycling &amp; Service Benefits</h2>
          <span>
            Discover how RecyConnect makes reuse and recycling
            easier and more accessible.
          </span>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="benefit-icon" aria-hidden="true">
                {benefit.icon}
              </div>

              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>

              <div className="benefit-detail">
                {benefit.detail}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose RecyConnect */}
      <section className="advantages-section">
        <div className="section-heading">
          <p>SECTION: 07_VALUE_PROPOSITION</p>
          <h2>Why Choose RecyConnect</h2>
          <span>
            A simple way to discover products and explore
            sustainable choices.
          </span>
        </div>

        <div className="advantages-grid">
          {advantages.map((item) => (
            <article className="advantage-card" key={item.label}>
              <div className="advantage-top">
                <span>{item.label}</span>
                <span className="advantage-icon" aria-hidden="true">
                  {item.icon}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;