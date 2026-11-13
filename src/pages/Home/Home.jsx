
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import HeroCarousel from "./HeroCarousel";

function Home() {
  const services = [
    {
      icon: "♻",
      title: "Sell / Recycle",
      description: "Turn recyclable waste into value through convenient recycling options.",
      link: "Get Started",
    },
    {
      icon: "🛍",
      title: "Buy Refurbished",
      description: "Discover useful refurbished products and reusable materials.",
      link: "Shop Now",
    },
    {
      icon: "♡",
      title: "Donate",
      description: "Give reusable products a second life by donating them.",
      link: "Donate Now",
    },
    {
      icon: "⇄",
      title: "Exchange",
      description: "Exchange reusable products and materials with the community.",
      link: "Explore More",
    },
  ];

  const categories = [
    { name: "Plastic", image: "/images/plastic.jpg", description: "Plastic containers and reusable products" },
    { name: "Paper", image: "/images/paper.jpg", description: "Paper bags, notebooks and cardboard" },
    { name: "Metal", image: "/images/metal.jpg", description: "Metal products and reusable materials" },
    { name: "Aluminium", image: "/images/aluminum.jpg", description: "Aluminium and metal materials" },
    { name: "Copper", image: "/images/copper.jpg", description: "Copper and other metal materials" },
    { name: "E-Waste", image: "/images/e-waste.jpg", description: "Mobiles, laptops and electronics" },
    { name: "Glass", image: "/images/glass.jpg", description: "Glass products and containers" },
    { name: "Textile", image: "/images/textile.jpg", description: "Reusable clothes and fabric products" },
    { name: "Wood", image: "/images/wood.jpg", description: "Wooden products and materials" },
    { name: "Other", image: "/images/others.jpg", description: "Other reusable and sustainable products" },
  ];

  // FEATURED PRODUCTS - 10 PRODUCTS
  const products = [
    {
      id: 1,
      name: "PET Plastic Bottles",
      category: "Plastic",
      condition: "Recyclable",
      price: "₹12,000",
      unit: "Per Ton",
      rating: "4.8",
      reviews: "120",
      image: "/images/plastic-box.png",
    },
    {
      id: 2,
      name: "Aluminium Scrap",
      category: "Metal",
      condition: "Recyclable",
      price: "₹45,000",
      unit: "Per Ton",
      rating: "4.7",
      reviews: "85",
      image: "/images/metal-rack.png",
    },
    {
      id: 3,
      name: "Waste Paper",
      category: "Paper",
      condition: "Recyclable",
      price: "₹8,000",
      unit: "Per Ton",
      rating: "4.6",
      reviews: "64",
      image: "/images/paper-bags.png",
    },
    {
      id: 4,
      name: "Refurbished Laptop",
      category: "E-Waste",
      condition: "Refurbished",
      price: "₹18,999",
      unit: "Per Unit",
      rating: "4.7",
      reviews: "90",
      image: "/images/refurbished-laptop.png",
    },
    {
      id: 5,
      name: "Used Mobile Phone",
      category: "E-Waste",
      condition: "Refurbished",
      price: "₹12,499",
      unit: "Per Unit",
      rating: "4.5",
      reviews: "72",
      image: "/images/smartphone.png",
    },
    {
      id: 6,
      name: "Copper Wire Scrap",
      category: "Copper",
      condition: "Recyclable",
      price: "₹60,000",
      unit: "Per Ton",
      rating: "4.9",
      reviews: "110",
      image: "/images/metal-table.png",
    },
    {
      id: 7,
      name: "Reusable Glass Vase",
      category: "Glass",
      condition: "Reusable",
      price: "₹299",
      unit: "Per Unit",
      rating: "4.6",
      reviews: "48",
      image: "/images/glass-vase.png",
    },
    {
      id: 8,
      name: "Cotton Tote Bag",
      category: "Textile",
      condition: "Reusable",
      price: "₹199",
      unit: "Per Unit",
      rating: "4.8",
      reviews: "56",
      image: "/images/cotton-tote-bag.png",
    },
    {
      id: 9,
      name: "Wooden Storage Box",
      category: "Wood",
      condition: "Reusable",
      price: "₹499",
      unit: "Per Unit",
      rating: "4.7",
      reviews: "39",
      image: "/images/wooden-box.png",
    },
    {
      id: 10,
      name: "Natural Jute Basket",
      category: "Other",
      condition: "Reusable",
      price: "₹349",
      unit: "Per Unit",
      rating: "4.8",
      reviews: "42",
      image: "/images/jute-basket.png",
    },
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

      <HeroCarousel />

      {/* SERVICES */}
      <section className="services section-wrap">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <Link to="/products">{service.link} →</Link>
          </article>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="categories section-wrap">
        <div className="section-heading">
          <p className="eyebrow">EXPLORE OUR MATERIALS</p>
          <h2>Material Categories</h2>
          <span>Choose a category to explore recyclable materials and reusable products.</span>
        </div>

        <div className="category-scroll">
          {categories.map((category) => (
            <Link to="/products" className="category-card" key={category.name}>
              <div className="category-image">
                <img src={category.image} alt={`${category.name} materials`} loading="lazy" />
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="text-link">Explore →</span>
            </Link>
          ))}

          <Link to="/categories" className="category-view-all">
            <span className="view-all-icon">→</span>
            <strong>View All</strong>
            <span>Explore all categories</span>
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS - COMPACT DESIGN */}
      <section className="trending section-wrap featured-products">

        <style>{`
          .featured-products .section-heading {
            margin-bottom: 23px;
          }

          .featured-products .section-heading h2 {
            font-size: 29px;
          }

          .featured-products .product-grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 16px;
          }

          .featured-products .product-card {
            min-width: 0;
            border-radius: 9px;
          }

          .featured-products .product-image {
            height: 145px;
          }

          .featured-products .product-image img {
            padding: 9px;
            object-fit: contain;
          }

          .featured-products .product-badge {
            top: 8px;
            left: 8px;
            padding: 5px 7px;
            font-size: 10px;
          }

          .featured-products .product-info {
            padding: 12px;
          }

          .featured-products .product-category {
            font-size: 11px;
          }

          .featured-products .product-info h3 {
            min-height: 35px;
            margin: 6px 0;
            font-size: 14px;
            line-height: 1.4;
          }

          .featured-products .rating {
            font-size: 11px;
          }

          .featured-products .rating small {
            font-size: 10px;
          }

          .featured-products .product-price {
            margin: 10px 0;
            gap: 5px;
          }

          .featured-products .product-price strong {
            font-size: 16px;
          }

          .featured-products .product-price span {
            font-size: 10px;
          }

          .featured-products .product-button {
            min-height: 36px;
            padding: 8px 10px;
            font-size: 12px;
          }

          @media (max-width: 1050px) {
            .featured-products .product-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          @media (max-width: 700px) {
            .featured-products .product-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 12px;
            }

            .featured-products .product-image {
              height: 135px;
            }

            .featured-products .product-info {
              padding: 10px;
            }

            .featured-products .product-info h3 {
              font-size: 13px;
            }

            .featured-products .product-price strong {
              font-size: 14px;
            }

            .featured-products .section-heading h2 {
              font-size: 25px;
            }
          }

          @media (max-width: 350px) {
            .featured-products .product-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="section-heading">
          <p className="eyebrow">DISCOVER OUR COLLECTION</p>
          <h2>Featured Products / Materials</h2>
          <span>Explore reusable, recyclable and refurbished products.</span>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="product-image product-image-link"
                aria-label={`View ${product.name}`}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
                <span className="product-badge">{product.condition}</span>
              </Link>

              <div className="product-info">
                <span className="product-category">{product.category}</span>

                <h3>{product.name}</h3>

                <div className="rating">
                  <span>★</span> {product.rating}
                  <small>({product.reviews} reviews)</small>
                </div>

                <div className="product-price">
                  <strong>{product.price}</strong>
                  <span>{product.unit}</span>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="button button-primary product-button"
                >
                  View Product →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="center-link">
          <Link to="/products">View All Products →</Link>
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="campaign section-wrap">
        <div>
          <p className="eyebrow">A BETTER WAY TO RECYCLE</p>
          <h2>Give Your Recyclables More Value</h2>
          <p>
            Explore recycling options for electronic and metal waste.
            Connect with available listings and discover new ways to reuse
            valuable materials.
          </p>
          <Link to="/products" className="button button-primary">
            Explore Materials →
          </Link>
        </div>

        <div className="campaign-note">
          <span>♻</span>
          <strong>Every small step counts.</strong>
          <p>Choose reuse. Choose recycling. Choose a greener tomorrow.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works section-wrap">
        <div className="section-heading">
          <p className="eyebrow">SIMPLE PROCESS</p>
          <h2>How It Works</h2>
          <span>Four simple steps towards a sustainable lifestyle.</span>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <Link to="/how-it-works" className="step-card" key={step.number}>
              <div className="step-top">
                <span>{step.number}</span>
                <strong>{step.icon}</strong>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="card-more">Learn More →</span>
            </Link>
          ))}
        </div>

        <div className="center-link">
          <Link to="/how-it-works">Explore How It Works →</Link>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits section-wrap">
        <div className="section-heading">
          <p className="eyebrow">WHY RECYCLE WITH US?</p>
          <h2>Recycling &amp; Service Benefits</h2>
          <span>Discover how RecyConnect makes reuse and recycling easier.</span>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <Link to="/benefits" className="benefit-card" key={benefit.title}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
              <span className="card-more">Discover More →</span>
            </Link>
          ))}
        </div>

        <div className="center-link">
          <Link to="/benefits">Explore All Benefits →</Link>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="sustainability">
        <div className="sustainability-content">
          <p className="eyebrow">OUR SUSTAINABILITY IMPACT</p>
          <h2>Small Actions. Big Impact.</h2>
          <p>
            Reuse more, waste less and help create a cleaner future
            for the next generation.
          </p>
          <Link to="/sustainability" className="button button-primary">
            Discover Our Impact →
          </Link>
        </div>

        <Link
          to="/sustainability"
          className="sustainability-icon"
          aria-label="Learn about sustainability"
        >
          🌱
        </Link>
      </section>

    </main>
  );
}

export default Home;
