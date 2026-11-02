import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const services = [
    { icon: "♻", title: "Sell / Recycle", description: "Turn recyclable waste into value through convenient recycling options.", link: "Get Started" },
    { icon: "🛍", title: "Buy Refurbished", description: "Discover useful refurbished products and reusable materials.", link: "Shop Now" },
    { icon: "♡", title: "Donate", description: "Give reusable products a second life by donating them.", link: "Donate Now" },
    { icon: "⇄", title: "Exchange", description: "Exchange reusable products and materials with the community.", link: "Explore More" },
  ];

  const categories = [
    { name: "Plastic", image: "/images/plastic.jpg", description: "Bottles, containers and plastic waste" },
    { name: "Paper", image: "/images/paper.jpg", description: "Paper, cardboard and newspapers" },
    { name: "Metal", image: "/images/metal.jpg", description: "Iron, steel and metal scrap" },
    { name: "Aluminium", image: "/images/aluminium.jpg", description: "Aluminium cans and sheets" },
    { name: "Copper", image: "/images/copper.jpg", description: "Copper wires and scrap" },
    { name: "E-Waste", image: "/images/ewaste.jpg", description: "Mobiles, laptops and electronics" },
    { name: "Glass", image: "/images/glass.jpg", description: "Glass bottles and containers" },
    { name: "Textile", image: "/images/textile.jpg", description: "Clothes and reusable fabrics" },
    { name: "Wood", image: "/images/wood.jpg", description: "Wooden materials and furniture" },
    { name: "Other", image: "/images/other.jpg", description: "Other recyclable materials" },
  ];

  const products = [
    { id: 1, name: "PET Plastic Bottles", category: "Plastic", condition: "Recyclable", price: "₹12,000", unit: "Per Ton", rating: "4.8", reviews: "120", image: "/images/plastic-bottles.jpg" },
    { id: 2, name: "Aluminium Scrap", category: "Metal", condition: "Recyclable", price: "₹45,000", unit: "Per Ton", rating: "4.7", reviews: "85", image: "/images/aluminium-scrap.jpg" },
    { id: 3, name: "Waste Paper", category: "Paper", condition: "Recyclable", price: "₹8,000", unit: "Per Ton", rating: "4.6", reviews: "64", image: "/images/waste-paper.jpg" },
    { id: 4, name: "Refurbished Laptop", category: "E-Waste", condition: "Refurbished", price: "₹18,999", unit: "Per Unit", rating: "4.7", reviews: "90", image: "/images/laptop.jpg" },
    { id: 5, name: "Used Mobile Phone", category: "E-Waste", condition: "Refurbished", price: "₹12,499", unit: "Per Unit", rating: "4.5", reviews: "72", image: "/images/mobile.jpg" },
    { id: 6, name: "Copper Wire Scrap", category: "Copper", condition: "Recyclable", price: "₹60,000", unit: "Per Ton", rating: "4.9", reviews: "110", image: "/images/copper-wire.jpg" },
  ];

  const steps = [
    { number: "01", icon: "⌕", title: "Explore", description: "Browse recyclable materials and refurbished products." },
    { number: "02", icon: "▣", title: "Choose", description: "Select the product or service that matches your needs." },
    { number: "03", icon: "♧", title: "Connect", description: "Connect with the available seller or recycling service." },
    { number: "04", icon: "♻", title: "Reuse / Recycle", description: "Give materials a new life and support a greener future." },
  ];

  const benefits = [
    { icon: "◷", title: "Easy Recycling", description: "Explore convenient recycling options and collection services." },
    { icon: "♧", title: "Convenient Pickup", description: "Find suitable collection and drop-off options." },
    { icon: "✓", title: "Transparent Listings", description: "View clear product details before making a decision." },
    { icon: "♻", title: "Sustainable Choices", description: "Help reduce waste by reusing and recycling materials." },
  ];

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">REDUCE · REUSE · RECYCLE</p>
          <h1>Turn Waste into <span>Opportunity</span></h1>
          <p className="hero-description">
            Sell, recycle, or donate your waste and give valuable materials a second life.
            Support a cleaner planet with RecyConnect.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="button button-primary">Explore Products <span>→</span></Link>
            <Link to="/products" className="button button-outline">Sell / Recycle</Link>
          </div>
          <div className="hero-trust">
            <span>♻ Sustainable choices</span><span>✓ Reuse more</span><span>🌱 Greener future</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/images/hero-recycling.jpg" alt="Recycling materials and a sustainable environment"
            onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <div className="hero-caption"><strong>Less Waste. More Value.</strong><span>Together for a greener future.</span></div>
        </div>
      </section>

      <section className="services section-wrap">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2><p>{service.description}</p>
            <Link to="/products">{service.link} →</Link>
          </article>
        ))}
      </section>

      <section className="categories section-wrap">
        <div className="section-heading">
          <p className="eyebrow">EXPLORE OUR MATERIALS</p>
          <h2>Material Categories</h2>
          <span>Choose a category to explore recyclable materials and reusable products.</span>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link to="/products" className="category-card" key={category.name}>
              <div className="category-image">
                <img src={category.image} alt={`${category.name} materials`}
                  onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="text-link">Explore →</span>
            </Link>
          ))}
        </div>
        <div className="center-link"><Link to="/products">View All Categories →</Link></div>
      </section>

      <section className="trending section-wrap">
        <div className="section-heading">
          <p className="eyebrow">DISCOVER OUR COLLECTION</p>
          <h2>Featured Products / Materials</h2>
          <span>Explore reusable, recyclable and refurbished products.</span>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name}
                  onError={(event) => { event.currentTarget.style.display = "none"; }} />
                <span className="product-badge">{product.condition}</span>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="rating"><span>★</span> {product.rating} <small>({product.reviews} reviews)</small></div>
                <div className="product-price"><strong>{product.price}</strong><span>{product.unit}</span></div>
                <Link to={`/products/${product.id}`} className="button button-primary product-button">View Product →</Link>
              </div>
            </article>
          ))}
        </div>
        <div className="center-link"><Link to="/products">View All Products →</Link></div>
      </section>

      <section className="campaign section-wrap">
        <div>
          <p className="eyebrow">A BETTER WAY TO RECYCLE</p>
          <h2>Give Your Recyclables More Value</h2>
          <p>Explore recycling options for electronic and metal waste. Connect with available listings and discover new ways to reuse valuable materials.</p>
          <Link to="/products" className="button button-primary">Explore Materials →</Link>
        </div>
        <div className="campaign-note"><span>♻</span><strong>Every small step counts.</strong><p>Choose reuse. Choose recycling. Choose a greener tomorrow.</p></div>
      </section>

      <section className="how-it-works section-wrap">
        <div className="section-heading">
          <p className="eyebrow">SIMPLE PROCESS</p><h2>How It Works</h2>
          <span>Four simple steps towards a sustainable lifestyle.</span>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step-card" key={step.number}>
              <div className="step-top"><span>{step.number}</span><strong>{step.icon}</strong></div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="benefits section-wrap">
        <div className="section-heading">
          <p className="eyebrow">WHY RECYCLE WITH US?</p><h2>Recycling &amp; Service Benefits</h2>
          <span>Discover how RecyConnect makes reuse and recycling easier.</span>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3><p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sustainability">
        <div><p className="eyebrow">OUR SUSTAINABILITY IMPACT</p>
          <h2>Small Actions. Big Impact.</h2>
          <p>Reuse more, waste less and help create a cleaner future for the next generation.</p>
          <Link to="/products" className="button button-primary">Be Part of the Change →</Link>
        </div>
        <div className="sustainability-icon" aria-hidden="true">🌱</div>
      </section>
    </main>
  );
}

export default Home;
