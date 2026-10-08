import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <div className="product-image">
        Product Image
        <button className="heart">♡</button>
      </div>

      <div className="product-info">

        <p className="product-category">
          RECYCLED PRODUCT
        </p>

        <h3>{product.name}</h3>

        <div className="rating">
          ★ {product.rating}
        </div>

        <div className="product-bottom">
          <strong>₹{product.price}</strong>

          <Link to={`/products/${product.id}`}>
            View
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;