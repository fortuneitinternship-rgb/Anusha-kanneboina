
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const image = product.image || product.imageUrl;

  return (
    <article className="product-card">
      <div className="product-image">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-image-placeholder">
            Product Image
          </div>
        )}

        <button
          type="button"
          className="heart"
          aria-label={`Add ${product.name} to wishlist`}
          title="Add to wishlist"
        >
          ♡
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">RECYCLED PRODUCT</p>

        <h3>{product.name}</h3>

        {product.rating != null && (
          <div className="rating" aria-label={`Rating: ${product.rating}`}>
            <span aria-hidden="true">★</span> {product.rating}
          </div>
        )}

        <div className="product-bottom">
          <strong>₹{product.price}</strong>

          <Link
            to={`/products/${product.id}`}
            aria-label={`View ${product.name}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
