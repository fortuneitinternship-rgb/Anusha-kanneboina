
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const {
    cartItems,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    addReview,
    getProductReviews,
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    title: "",
    comment: "",
    rating: 5,
  });

  const [reviewMessage, setReviewMessage] = useState("");

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, this product is not available.</p>
        <Link to="/products">Explore Products</Link>
      </div>
    );
  }

  const gallery =
    product.images?.length > 0
      ? product.images
      : [product.image];

  const cartItem = cartItems.find(
    (item) => String(item.id) === String(product.id)
  );

  const currentQuantity = cartItem?.quantity || 0;
  const availableStock = Math.max(
    0,
    Number(product.stock || 0) - currentQuantity
  );

  const saved = isInWishlist(product.id);
  const reviews = getProductReviews(product.id);

  const reviewTotal = reviews.length;
  const reviewAverage =
    reviewTotal > 0
      ? reviews.reduce(
          (total, review) => total + Number(review.rating),
          0
        ) / reviewTotal
      : Number(product.rating || 0);

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, 4);

  const formatCategory = (value = "") =>
    value.toLowerCase() === "e-waste"
      ? "E-Waste"
      : value.charAt(0).toUpperCase() + value.slice(1);

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN");

  const handleAddToCart = () => {
    if (Number(product.stock) <= 0) return;

    const quantityToAdd = Math.min(
      quantity,
      availableStock
    );

    if (quantityToAdd <= 0) {
      alert("Maximum available stock is already in your cart.");
      return;
    }

    for (let i = 0; i < quantityToAdd; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (Number(product.stock) <= 0) return;

    const quantityToAdd = Math.min(
      quantity,
      availableStock
    );

    if (quantityToAdd > 0) {
      for (let i = 0; i < quantityToAdd; i++) {
        addToCart(product);
      }
    }

    navigate("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (
      !reviewForm.name.trim() ||
      !reviewForm.title.trim() ||
      !reviewForm.comment.trim()
    ) {
      return;
    }

    addReview(product.id, reviewForm);

    setReviewForm({
      name: "",
      title: "",
      comment: "",
      rating: 5,
    });

    setReviewMessage("Thank you! Your review has been added.");
  };

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter(
      (review) => Number(review.rating) === rating
    ).length,
  }));

  return (
    <div className="details-page">

      {/* BREADCRUMB */}
      <div className="details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <section className="details-container">

        {/* PRODUCT GALLERY */}
        <div className="details-gallery">

          <div className="details-main-image">
            <img
              src={gallery[selectedImage]}
              alt={product.name}
            />
          </div>

          <div className="details-thumbnails">
            {gallery.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                className={
                  selectedImage === index
                    ? "thumbnail active-thumbnail"
                    : "thumbnail"
                }
                onClick={() => setSelectedImage(index)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>

          <p className="gallery-note">
            Product images
          </p>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="details-content">

          <p className="details-category">
            {formatCategory(product.category)} PRODUCT
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <span className="rating-stars">★</span>
            <strong>{reviewAverage.toFixed(1)}</strong>
            <span>
              ({reviewTotal} customer reviews)
            </span>
          </div>

          <div className="details-price">
            ₹{formatPrice(product.price)}
          </div>

          <p className="details-description">
            {product.description ||
              "A sustainable product designed to give materials a second life."}
          </p>

          <div className="details-product-meta">
            <p>
              <strong>Category:</strong>
              {formatCategory(product.category)}
            </p>

            <p>
              <strong>Condition:</strong>
              {product.condition || "Not specified"}
            </p>

            <p>
              <strong>Availability:</strong>
              <span
                className={
                  Number(product.stock) > 0
                    ? "available-text"
                    : "unavailable-text"
                }
              >
                {Number(product.stock) > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </span>
            </p>
          </div>

          {/* OFFER SECTION */}
          <div className="details-offer">
            <h3>♻ RecyConnect Green Deal</h3>
            <p>
              Choose reused, recycled and upcycled products
              to support a more sustainable lifestyle.
            </p>
            <p>
              <strong>Delivery:</strong> Delivery details
              will be confirmed during checkout.
            </p>
          </div>

          {/* QUANTITY */}
          <div className="details-quantity-section">
            <label htmlFor="details-quantity">
              Quantity
            </label>

            <div className="details-quantity">
              <button
                type="button"
                onClick={() =>
                  setQuantity((previous) =>
                    Math.max(1, previous - 1)
                  )
                }
                disabled={quantity <= 1}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() =>
                  setQuantity((previous) =>
                    Math.min(
                      Math.max(1, availableStock),
                      previous + 1
                    )
                  )
                }
                disabled={
                  availableStock <= 0 ||
                  quantity >= availableStock
                }
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="details-buttons">

            <button
              type="button"
              className="details-add-cart"
              onClick={handleAddToCart}
              disabled={availableStock <= 0}
            >
              {availableStock <= 0
                ? "Maximum Stock in Cart"
                : "Add to Cart"}
            </button>

            <button
              type="button"
              className="details-buy-now"
              onClick={handleBuyNow}
              disabled={Number(product.stock) <= 0}
            >
              Buy Now
            </button>

          </div>

          <button
            type="button"
            className={
              saved
                ? "details-wishlist saved"
                : "details-wishlist"
            }
            onClick={() => toggleWishlist(product)}
          >
            {saved ? "♥ Added to Wishlist" : "♡ Add to Wishlist"}
          </button>

          {currentQuantity > 0 && (
            <p className="already-in-cart">
              {currentQuantity} already in your cart.
              <Link to="/cart"> Go to Cart</Link>
            </p>
          )}

        </div>
      </section>

      {/* PRODUCT SPECIFICATIONS */}
      <section className="details-section">
        <h2>Product Information</h2>

        <p className="section-intro">
          Learn more about this sustainable product.
        </p>

        <div className="specifications-grid">
          {Object.entries(
            product.specifications || {}
          ).map(([key, value]) => (
            <div className="specification-item" key={key}>
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="details-section reviews-section">
        <h2>Customer Reviews</h2>

        <div className="reviews-summary">

          <div className="average-rating">
            <strong>{reviewAverage.toFixed(1)}</strong>
            <span>★★★★★</span>
            <p>{reviewTotal} written reviews</p>
          </div>

          <div className="rating-breakdown">
            {ratingCounts.map((item) => (
              <div className="rating-row" key={item.rating}>
                <span>{item.rating} ★</span>

                <div className="rating-bar">
                  <div
                    style={{
                      width:
                        reviewTotal > 0
                          ? `${(item.count / reviewTotal) * 100}%`
                          : "0%",
                    }}
                  />
                </div>

                <span>{item.count}</span>
              </div>
            ))}
          </div>

        </div>

        {/* REVIEW FORM */}
        <form
          className="review-form"
          onSubmit={handleReviewSubmit}
        >
          <h3>Write a Review</h3>

          <label htmlFor="review-name">Your Name</label>
          <input
            id="review-name"
            type="text"
            placeholder="Enter your name"
            value={reviewForm.name}
            onChange={(e) =>
              setReviewForm({
                ...reviewForm,
                name: e.target.value,
              })
            }
            required
          />

          <label htmlFor="review-title">Review Title</label>
          <input
            id="review-title"
            type="text"
            placeholder="Give your review a title"
            value={reviewForm.title}
            onChange={(e) =>
              setReviewForm({
                ...reviewForm,
                title: e.target.value,
              })
            }
            required
          />

          <label htmlFor="review-rating">Your Rating</label>
          <select
            id="review-rating"
            value={reviewForm.rating}
            onChange={(e) =>
              setReviewForm({
                ...reviewForm,
                rating: Number(e.target.value),
              })
            }
          >
            {[5, 4, 3, 2, 1].map((rating) => (
              <option value={rating} key={rating}>
                {rating} Stars
              </option>
            ))}
          </select>

          <label htmlFor="review-comment">Your Review</label>
          <textarea
            id="review-comment"
            rows="4"
            placeholder="Share your experience..."
            value={reviewForm.comment}
            onChange={(e) =>
              setReviewForm({
                ...reviewForm,
                comment: e.target.value,
              })
            }
            required
          />

          <button type="submit">
            Submit Review
          </button>

          {reviewMessage && (
            <p className="review-success">
              {reviewMessage}
            </p>
          )}
        </form>

        {/* REVIEW LIST */}
        <div className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-top">
                  <strong>{review.name}</strong>
                  <span>
                    {"★".repeat(Number(review.rating))}
                    {"☆".repeat(5 - Number(review.rating))}
                  </span>
                </div>

                <h4>{review.title}</h4>
                <p>{review.comment}</p>

                <small>
                  {new Date(review.date).toLocaleDateString("en-IN")}
                </small>
              </article>
            ))
          ) : (
            <p className="no-reviews">
              No written reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="details-section related-section">
          <h2>Related Products</h2>

          <p className="section-intro">
            Explore more products from the same category.
          </p>

          <div className="related-products-grid">
            {relatedProducts.map((item) => (
              <Link
                to={`/products/${item.id}`}
                className="related-product-card"
                key={item.id}
              >
                <div className="related-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="related-info">
                  <h3>{item.name}</h3>
                  <p>★ {Number(item.rating || 0).toFixed(1)}</p>
                  <strong>₹{formatPrice(item.price)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default ProductDetails;
