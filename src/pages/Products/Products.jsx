
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import "./Products.css";

const categories = [
  "Plastic",
  "Metal",
  "Paper",
  "E-Waste",
  "Textile",
  "Other",
];

const ratingOptions = [
  { label: "All Ratings", value: 0 },
  { label: "4★ & above", value: 4 },
  { label: "3★ & above", value: 3 },
  { label: "2★ & above", value: 2 },
  { label: "1★ & above", value: 1 },
];

function formatCategory(value) {
  if (!value) return "Other";

  const normalized = String(value).toLowerCase();

  if (normalized === "e-waste" || normalized === "ewaste") {
    return "E-Waste";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getShortDescription(product) {
  if (product.description) {
    return product.description;
  }

  const category = formatCategory(product.category).toLowerCase();

  return `A sustainable ${category} product that gives useful materials a second life.`;
}

function Products() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [condition, setCondition] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState(
    searchParams.get("query") || ""
  );

  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productCategory = formatCategory(product.category);
      const rating = Number(product.rating || 0);

      const matchesCategory =
        category === "All" || productCategory === category;

      const matchesPrice =
        Number(product.price) >= minPrice &&
        Number(product.price) <= maxPrice;

      const matchesCondition =
        condition === "All" ||
        String(product.condition || "").toLowerCase() ===
          condition.toLowerCase();

      const matchesRating = rating >= minRating;

      const matchesStock =
        !inStockOnly || Number(product.stock) > 0;

      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        String(product.name || "").toLowerCase().includes(searchText) ||
        productCategory.toLowerCase().includes(searchText);

      return (
        matchesCategory &&
        matchesPrice &&
        matchesCondition &&
        matchesRating &&
        matchesStock &&
        matchesSearch
      );
    });

    if (sortBy === "low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      result.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    category,
    minPrice,
    maxPrice,
    condition,
    minRating,
    inStockOnly,
    search,
    sortBy,
  ]);

  const clearFilters = () => {
    setCategory("All");
    setMinPrice(0);
    setMaxPrice(20000);
    setCondition("All");
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("default");
    setSearch("");
  };

  const handleAddToCart = (product) => {
    const existing = getCartItem(product.id);

    if (Number(product.stock) <= 0) return;

    if (existing && existing.quantity >= product.stock) {
      alert("Sorry! Maximum available stock has been added.");
      return;
    }

    addToCart(product);
  };

  const handleIncrease = (product) => {
    const existing = getCartItem(product.id);

    if (!existing) {
      handleAddToCart(product);
      return;
    }

    if (existing.quantity >= product.stock) {
      alert("Sorry! Maximum available stock has been added.");
      return;
    }

    updateQuantity(product.id, existing.quantity + 1);
  };

  const handleDecrease = (product) => {
    const existing = getCartItem(product.id);

    if (!existing) return;

    updateQuantity(product.id, existing.quantity - 1);
  };

  const handleBuyNow = (product) => {
    if (Number(product.stock) <= 0) return;

    const existing = getCartItem(product.id);

    if (!existing) {
      addToCart(product);
    } else if (existing.quantity < product.stock) {
      updateQuantity(product.id, existing.quantity + 1);
    }

    navigate("/checkout");
  };

  return (
    <div className="products-page">

      {/* PAGE HERO */}
      <section className="products-heading">
        <div className="products-heading-content">
          <p className="products-eyebrow">
            RECYCONNECT MARKETPLACE
          </p>

          <h1>Explore Sustainable Products</h1>

          <p className="products-subtitle">
            Discover, reuse and give products a second life.
          </p>

          <div className="heading-decoration"></div>
        </div>
      </section>

      <div className="products-layout">

        {/* FILTER SIDEBAR */}
        <aside className="filter-sidebar">

          <div className="filter-heading">
            <h2>Filters</h2>

            <button type="button" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          {/* CATEGORY FILTER */}
          <div className="filter-group">
            <h3>Categories</h3>

            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={category === "All"}
                onChange={() => setCategory("All")}
              />
              <span>All Categories</span>
            </label>

            {categories.map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="category"
                  checked={category === item}
                  onChange={() => setCategory(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          {/* PRICE FILTER */}
          <div className="filter-group">
            <h3>Price Range</h3>

            <div className="price-values">
              <span>₹{minPrice.toLocaleString("en-IN")}</span>
              <span>₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>

            <label className="range-label" htmlFor="min-price">
              Minimum Price
            </label>

            <input
              id="min-price"
              className="price-range"
              type="range"
              min="0"
              max="20000"
              step="100"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(
                  Math.min(Number(e.target.value), maxPrice)
                )
              }
            />

            <label className="range-label" htmlFor="max-price">
              Maximum Price
            </label>

            <input
              id="max-price"
              className="price-range"
              type="range"
              min="0"
              max="20000"
              step="100"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  Math.max(Number(e.target.value), minPrice)
                )
              }
            />
          </div>

          {/* CONDITION FILTER */}
          <div className="filter-group">
            <h3>Product Condition</h3>

            {["All", "New", "Used", "Refurbished"].map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="condition"
                  checked={condition === item}
                  onChange={() => setCondition(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          {/* RATING FILTER */}
          <div className="filter-group">
            <h3>Customer Rating</h3>

            {ratingOptions.map((item) => (
              <label className="filter-option" key={item.value}>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === item.value}
                  onChange={() => setMinRating(item.value)}
                />

                <span className="rating-filter-label">
                  {item.value === 0 ? (
                    item.label
                  ) : (
                    <>
                      <span className="rating-filter-stars">
                        {"★".repeat(item.value)}
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </span>
              </label>
            ))}
          </div>

          {/* STOCK FILTER */}
          <div className="filter-group stock-filter">
            <label className="filter-option">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>In-stock products only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS SECTION */}
        <main className="products-main">

          {/* TOOLBAR */}
          <div className="products-toolbar">
            <div className="products-toolbar-title">
              <h2>Our Products</h2>

              <p>
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                {products.length} products
              </p>
            </div>

            <div className="product-controls">
              <div className="product-search">
                <span aria-hidden="true">⌕</span>

                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="default">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const cartItem = getCartItem(product.id);
                const saved = isInWishlist(product.id);
                const outOfStock = Number(product.stock) <= 0;

                return (
                  <article className="product-card" key={product.id}>

                    {/* IMAGE */}
                    <div className="product-image">
                      <Link
                        to={`/products/${product.id}`}
                        className="product-image-link"
                        aria-label={`View ${product.name}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                      </Link>

                      <span className="product-category">
                        {formatCategory(product.category)}
                      </span>

                      <button
                        type="button"
                        className={`wishlist-btn ${
                          saved ? "wishlist-active" : ""
                        }`}
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                          saved
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                        }
                        aria-pressed={saved}
                      >
                        {saved ? "♥" : "♡"}
                      </button>

                      {product.condition && (
                        <span className="condition-badge">
                          {product.condition}
                        </span>
                      )}
                    </div>

                    {/* PRODUCT INFORMATION */}
                    <div className="product-info">

                      <Link
                        to={`/products/${product.id}`}
                        className="product-title-link"
                      >
                        <h3>{product.name}</h3>
                      </Link>

                      <Link
                        to={`/products/${product.id}`}
                        className="product-description-link"
                      >
                        <p className="product-description">
                          {getShortDescription(product)}
                        </p>
                      </Link>

                      <div className="product-rating">
                        <span>★</span>
                        <strong>
                          {Number(product.rating || 0).toFixed(1)}
                        </strong>

                        {product.reviewCount !== undefined && (
                          <span className="review-count">
                            ({product.reviewCount} reviews)
                          </span>
                        )}
                      </div>

                      <div className="product-price">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </div>

                      <p
                        className={`stock-status ${
                          outOfStock ? "out-of-stock" : ""
                        }`}
                      >
                        {outOfStock
                          ? "Out of stock"
                          : `${product.stock} available`}
                      </p>

                      {/* CART QUANTITY */}
                      {outOfStock ? (
                        <button
                          type="button"
                          className="add-cart-btn"
                          disabled
                        >
                          Out of Stock
                        </button>
                      ) : cartItem ? (
                        <div className="product-quantity">
                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={() => handleDecrease(product)}
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            −
                          </button>

                          <span className="quantity-value">
                            {cartItem.quantity}
                          </span>

                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={() => handleIncrease(product)}
                            disabled={
                              cartItem.quantity >= product.stock
                            }
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      )}

                      <button
                        type="button"
                        className="buy-now-btn"
                        disabled={outOfStock}
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button>

                      <Link
                        to={`/products/${product.id}`}
                        className="view-details-link"
                      >
                        View Full Details →
                      </Link>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="no-products">
                <div className="no-products-icon">⌕</div>

                <h3>No Products Found</h3>

                <p>
                  No products match your selected filters.
                  Try changing your search or rating.
                </p>

                <button type="button" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
