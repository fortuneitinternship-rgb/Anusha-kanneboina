
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const image = product.image || product.imageUrl;
  const saved = isInWishlist(product.id);

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
          className={`heart ${saved ? "heart-active" : ""}`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product)}
        >
          ♥
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h3>{product.name}</h3>

        {product.rating != null && (
          <div className="rating">
            <span aria-hidden="true">★</span> {product.rating}
          </div>
        )}

        <div className="product-bottom">
          <strong>₹{product.price}</strong>
          <Link to={`/products/${product.id}`}>View</Link>
        </div>

        <button
          type="button"
          className="add-cart-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
