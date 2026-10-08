import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
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
            <Link to="/products" className="primary-btn">
              Explore Products
            </Link>

            <Link to="/products" className="secondary-btn">
              Sell / Recycle
            </Link>
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

      {/* Trending */}
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

    </div>
  );
}

export default Home;