
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import "./SearchResults.css";

const categoryOptions = [
  "Plastic",
  "Metal",
  "Paper",
  "E-Waste",
  "Textile",
  "Other",
];

// Keep these as category names only.
// Product names such as laptop, glass and cotton are searched separately.
const categoryAliases = {
  Plastic: ["plastic", "plastics"],
  Metal: ["metal", "metals"],
  Paper: ["paper", "papers", "cardboard"],
  "E-Waste": ["e-waste", "ewaste", "electronic", "electronics"],
  Textile: ["textile", "textiles"],
  Other: ["other"],
};

const normalize = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9₹.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function getCategory(product) {
  const value = normalize(product.category);

  if (value === "ewaste" || value === "e waste") {
    return "E-Waste";
  }

  return (
    categoryOptions.find(
      (category) => normalize(category) === value
    ) || "Other"
  );
}

function getNumericPrice(value) {
  const cleaned = String(value ?? "").replace(/,/g, "");
  const number = Number(cleaned.replace(/[^\d.]/g, ""));

  return Number.isFinite(number) ? number : 0;
}

function parsePrice(value) {
  if (!value) return null;

  const cleaned = String(value).toLowerCase().replace(/,/g, "");
  const number = Number(cleaned.replace(/[^\d.]/g, ""));

  if (!Number.isFinite(number)) return null;

  if (/\bk\b/.test(cleaned)) return number * 1000;

  if (cleaned.includes("lakh") || cleaned.includes("lac")) {
    return number * 100000;
  }

  return number;
}

function getSearchRules(query) {
  let remainingText = normalize(query);
  let detectedCategory = null;
  let minPrice = null;
  let maxPrice = null;
  let minInclusive = true;
  let maxInclusive = true;

  // Detect complete category names and useful starting letters.
  const words = remainingText.split(" ");

  for (const [category, aliases] of Object.entries(categoryAliases)) {
    const matchedAlias = aliases.find((alias) =>
      words.some((word) => word === alias)
    );

    if (matchedAlias) {
      detectedCategory = category;

      const aliasPattern = matchedAlias.replace("-", "[-\\s]?");

      remainingText = remainingText.replace(
        new RegExp(`\\b${aliasPattern}\\b`, "i"),
        " "
      );

      break;
    }
  }

  // Detect partial category words such as "met", "plas", "pap".
  if (!detectedCategory) {
    const firstWord = normalize(query).split(" ")[0] || "";

    if (firstWord.length >= 3) {
      const partialMatches = Object.entries(categoryAliases)
        .filter(([, aliases]) =>
          aliases.some((alias) => alias.startsWith(firstWord))
        )
        .map(([category]) => category);

      if (partialMatches.length === 1) {
        detectedCategory = partialMatches[0];

        remainingText = remainingText.replace(
          new RegExp(`^${firstWord}`, "i"),
          " "
        );
      }
    }
  }

  // Detect price formats:
  // below 1000, under 1k, above 500, between 100 and 500.
  const pricePattern =
    /\b(below|under|less than|upto|up to|above|over|greater than|more than|between)\s*(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?\s*(?:k|lakh|lac)?)\s*(?:(?:and|to|-)\s*(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?\s*(?:k|lakh|lac)?))?/i;

  const priceMatch = normalize(query).match(pricePattern);

  if (priceMatch) {
    const operator = priceMatch[1].toLowerCase();
    const firstValue = parsePrice(priceMatch[2]);
    const secondValue = parsePrice(priceMatch[3]);

    if (operator === "between" && secondValue !== null) {
      minPrice = Math.min(firstValue, secondValue);
      maxPrice = Math.max(firstValue, secondValue);
    } else if (
      ["below", "under", "less than"].includes(operator)
    ) {
      maxPrice = firstValue;
      maxInclusive = false;
    } else if (
      ["above", "over", "greater than", "more than"].includes(operator)
    ) {
      minPrice = firstValue;
      minInclusive = false;
    } else if (["upto", "up to"].includes(operator)) {
      maxPrice = firstValue;
    }

    remainingText = remainingText.replace(priceMatch[0], " ");
  }

  // Support shorthand: "plastic 1000" means Plastic up to ₹1,000.
  const shorthandPrice = remainingText.match(
    /(?:₹|rs\.?\s*)?(\d+(?:\.\d+)?\s*(?:k|lakh|lac)?)\b/i
  );

  if (shorthandPrice && minPrice === null && maxPrice === null) {
    maxPrice = parsePrice(shorthandPrice[1]);

    remainingText = remainingText.replace(
      shorthandPrice[0],
      " "
    );
  }

  const ignoredWords = [
    "products",
    "product",
    "items",
    "item",
    "show",
    "find",
    "search",
    "all",
    "available",
    "in",
    "the",
    "for",
    "with",
    "price",
    "rs",
    "rupees",
    "below",
    "under",
    "above",
    "over",
    "less",
    "than",
    "more",
    "upto",
    "up",
    "to",
    "between",
    "and",
  ];

  const remainingWords = normalize(remainingText)
    .split(" ")
    .filter((word) => word && !ignoredWords.includes(word));

  return {
    detectedCategory,
    minPrice,
    maxPrice,
    minInclusive,
    maxInclusive,
    remainingWords,
  };
}

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { cartItems, addToCart, updateQuantity } = useShop();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  const searchRules = useMemo(
    () => getSearchRules(query),
    [query]
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  const toggleCategory = (category) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );

    setPage(1);
  };

  const toggleCondition = (condition) => {
    setSelectedConditions((previous) =>
      previous.includes(condition)
        ? previous.filter((item) => item !== condition)
        : [...previous, condition]
    );

    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productCategory = getCategory(product);
      const price = getNumericPrice(product.price);
      const stock = Number(product.stock) || 0;

      const searchableWords = normalize(
        [
          product.name,
          product.category,
          product.condition,
          product.description,
        ].join(" ")
      ).split(" ");

      const matchesSearchCategory =
        !searchRules.detectedCategory ||
        productCategory === searchRules.detectedCategory;

      const matchesSearchWords =
        searchRules.remainingWords.length === 0 ||
        searchRules.remainingWords.every((word) =>
          searchableWords.some((productWord) =>
            productWord.startsWith(word)
          )
        );

      const matchesSearchMinPrice =
        searchRules.minPrice === null ||
        (searchRules.minInclusive
          ? price >= searchRules.minPrice
          : price > searchRules.minPrice);

      const matchesSearchMaxPrice =
        searchRules.maxPrice === null ||
        (searchRules.maxInclusive
          ? price <= searchRules.maxPrice
          : price < searchRules.maxPrice);

      const matchesSelectedCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(productCategory);

      const matchesCondition =
        selectedConditions.length === 0 ||
        selectedConditions.some(
          (condition) =>
            normalize(condition) === normalize(product.condition)
        );

      const matchesMinPrice =
        minPrice === "" || price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || price <= Number(maxPrice);

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" ? stock > 0 : stock <= 0);

      return (
        matchesSearchCategory &&
        matchesSearchWords &&
        matchesSearchMinPrice &&
        matchesSearchMaxPrice &&
        matchesSelectedCategory &&
        matchesCondition &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesAvailability
      );
    });

    if (sort === "low") {
      result.sort(
        (a, b) =>
          getNumericPrice(a.price) - getNumericPrice(b.price)
      );
    } else if (sort === "high") {
      result.sort(
        (a, b) =>
          getNumericPrice(b.price) - getNumericPrice(a.price)
      );
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "rating") {
      result.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    return result;
  }, [
    searchRules,
    selectedCategories,
    selectedConditions,
    minPrice,
    maxPrice,
    availability,
    sort,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  const currentProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setMinPrice("");
    setMaxPrice("");
    setAvailability("Available");
    setSort("relevance");
    setPage(1);
  };

  const handleAddToCart = (product) => {
    const existing = getCartItem(product.id);
    const stock = Number(product.stock) || 0;

    if (stock <= 0) return;

    if (existing) {
      if (existing.quantity >= stock) {
        alert("Maximum available stock has been added.");
        return;
      }

      updateQuantity(product.id, existing.quantity + 1);
    } else {
      addToCart(product);
    }
  };

  const activeSearchCategory = searchRules.detectedCategory;

  return (
    <main className="search-results-page">
      <div className="search-breadcrumb">
        <Link to="/">Home</Link> / Search Results
      </div>

      <section className="search-header-box">
        <span className="search-eyebrow">
          ♻ RECYCONNECT PRODUCT DISCOVERY
        </span>

        <h1>Search Results</h1>

        <p>
          {query
            ? `Products matching "${query}"`
            : "Browse reusable, recycled, and refurbished products."}
        </p>

        <div className="search-header-bottom">
          <span>
            Find materials and products that match your needs.
          </span>

          <strong>{filteredProducts.length} results found</strong>
        </div>
      </section>

      <section className="results-layout">
        <aside className="filter-sidebar">
          <div className="filter-title">
            <h2>FILTER RESULTS</h2>

            <button type="button" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h3>CATEGORY</h3>

            {categoryOptions.map((category) => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>PRODUCT CONDITION</h3>

            {["New", "Used", "Recycled", "Refurbished", "Reusable"].map(
              (condition) => (
                <label key={condition} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(condition)}
                    onChange={() => toggleCondition(condition)}
                  />
                  {condition}
                </label>
              )
            )}
          </div>

          <div className="filter-group">
            <h3>PRICE RANGE (₹)</h3>

            <div className="price-inputs">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                  setPage(1);
                }}
              />

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="filter-group">
            <h3>AVAILABILITY</h3>

            {[
              { label: "Available in Stock", value: "Available" },
              { label: "Out of Stock", value: "Out of Stock" },
              { label: "Show All", value: "All" },
            ].map((item) => (
              <label key={item.value} className="filter-option">
                <input
                  type="radio"
                  name="availability"
                  checked={availability === item.value}
                  onChange={() => {
                    setAvailability(item.value);
                    setPage(1);
                  }}
                />
                {item.label}
              </label>
            ))}
          </div>

          <button
            className="apply-filter-btn"
            type="button"
            onClick={() => setPage(1)}
          >
            APPLY FILTERS
          </button>

          <button
            className="clear-filter-btn"
            type="button"
            onClick={clearFilters}
          >
            CLEAR ALL
          </button>
        </aside>

        <div className="results-content">
          <div className="results-toolbar">
            <p>
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : (page - 1) * productsPerPage + 1}
              {" - "}
              {Math.min(
                page * productsPerPage,
                filteredProducts.length
              )}
              {" of "}
              {filteredProducts.length} results

              {query && (
                <>
                  {" "}for "<strong>{query}</strong>"
                </>
              )}
            </p>

            <div className="sort-control">
              <label htmlFor="sort-products">SORT BY</label>

              <select
                id="sort-products"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="active-filters">
            <span>SEARCH:</span>

            {query ? (
              <span className="filter-chip">{query}</span>
            ) : (
              <small>All products</small>
            )}

            {activeSearchCategory && (
              <span className="filter-chip">
                Category: {activeSearchCategory}
              </span>
            )}

            {searchRules.minPrice !== null && (
              <span className="filter-chip">
                Above ₹
                {searchRules.minPrice.toLocaleString("en-IN")}
              </span>
            )}

            {searchRules.maxPrice !== null && (
              <span className="filter-chip">
                Up to ₹
                {searchRules.maxPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {currentProducts.length > 0 ? (
            <div className="search-product-grid">
              {currentProducts.map((product) => {
                const cartItem = getCartItem(product.id);
                const outOfStock = Number(product.stock) <= 0;

                return (
                  <article
                    className="search-product-card"
                    key={product.id}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="search-product-image"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />

                      <span className="product-condition">
                        {product.condition || "Recycled"}
                      </span>
                    </Link>

                    <div className="search-product-info">
                      <span className="product-category">
                        {getCategory(product)}
                      </span>

                      <Link
                        to={`/products/${product.id}`}
                        className="search-product-title"
                      >
                        <h3>{product.name}</h3>
                      </Link>

                      <p>
                        {product.description ||
                          `Explore this ${getCategory(
                            product
                          )} product and give it a useful second life.`}
                      </p>

                      <div className="search-product-rating">
                        <span>★</span>
                        {Number(product.rating || 0).toFixed(1)}
                      </div>

                      <div className="search-product-price">
                        ₹
                        {getNumericPrice(product.price).toLocaleString(
                          "en-IN"
                        )}
                      </div>

                      <span
                        className={`stock-status ${
                          outOfStock ? "out-stock" : "in-stock"
                        }`}
                      >
                        {outOfStock
                          ? "Out of Stock"
                          : `${product.stock} available`}
                      </span>

                      <div className="product-card-actions">
                        <Link to={`/products/${product.id}`}>
                          VIEW DETAILS
                        </Link>

                        <button
                          type="button"
                          disabled={outOfStock}
                          onClick={() => handleAddToCart(product)}
                        >
                          {cartItem
                            ? `ADD MORE (${cartItem.quantity})`
                            : "ADD TO CART"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-search-results">
              <div className="empty-search-icon">⌕</div>

              <h2>No Products Found</h2>

              <p>
                We couldn't find products matching "{query}" and your
                selected filters.
              </p>

              <button type="button" onClick={clearFilters}>
                CLEAR FILTERS
              </button>
            </div>
          )}

          {filteredProducts.length > productsPerPage && (
            <div className="search-pagination">
              <span>
                Page {page} of {totalPages}
              </span>

              <div>
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((previous) => previous - 1)
                  }
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    type="button"
                    key={index + 1}
                    className={
                      page === index + 1 ? "active-page" : ""
                    }
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((previous) => previous + 1)
                  }
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SearchResults;
