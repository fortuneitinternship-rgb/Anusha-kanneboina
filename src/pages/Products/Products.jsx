import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

function Products() {
  return (
    <div className="products-page">

      <section className="products-header">
        <p>RECYCONNECT MARKETPLACE</p>
        <h1>Recycled & Refurbished Products</h1>
        <span>
          Discover useful products and give materials a second life.
        </span>
      </section>

      <div className="products-layout">

        <aside className="filter-box">
          <h3>Filter Products</h3>

          <label>Category</label>

          <div>
            <input type="checkbox" /> Plastic
          </div>

          <div>
            <input type="checkbox" /> Metal
          </div>

          <div>
            <input type="checkbox" /> Paper
          </div>

          <div>
            <input type="checkbox" /> E-Waste
          </div>

          <div>
            <input type="checkbox" /> Textile
          </div>

          <hr />

          <label>Price</label>

          <div>
            <input type="checkbox" /> Under ₹500
          </div>

          <div>
            <input type="checkbox" /> ₹500 - ₹2000
          </div>

          <div>
            <input type="checkbox" /> Above ₹2000
          </div>
        </aside>

        <section className="product-section">

          <div className="product-toolbar">
            <h2>All Products</h2>

            <select>
              <option>Sort: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </section>

      </div>
    </div>
  );
}

export default Products;