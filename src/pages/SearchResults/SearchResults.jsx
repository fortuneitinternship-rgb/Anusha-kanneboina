
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SearchResults.css";

const products = [
  {
    id: 1,
    name: "Refurbished Laptop - ThinkTech 1480",
    category: "E-Waste",
    condition: "Refurbished",
    description: "Tested refurbished laptop with SSD and RAM upgrade.",
    price: 28500,
    location: "Hyderabad",
    availability: "Available",
    image: "💻",
  },
  {
    id: 2,
    name: "Recycled Aluminum Scrap",
    category: "Metal",
    condition: "Recycled",
    description: "Premium recycled aluminium ingots for industrial use.",
    price: 2499,
    location: "Mumbai",
    availability: "Available",
    image: "⚙️",
  },
  {
    id: 3,
    name: "Refurbished Precision Ultrabook",
    category: "E-Waste",
    condition: "Refurbished",
    description: "Lightweight laptop with upgraded memory and SSD.",
    price: 21999,
    location: "Bangalore",
    availability: "Available",
    image: "💻",
  },
  {
    id: 4,
    name: "Recycled Plastic Laptop Protective Sleeve",
    category: "Plastic",
    condition: "Recycled",
    description: "Protective sleeve made from recycled plastic materials.",
    price: 899,
    location: "Hyderabad",
    availability: "Available",
    image: "♻️",
  },
  {
    id: 5,
    name: "Refurbished Business Laptop Display Panel",
    category: "E-Waste",
    condition: "Refurbished",
    description: "Tested display screen suitable for laptop replacement.",
    price: 4750,
    location: "Pune",
    availability: "Available",
    image: "🖥️",
  },
  {
    id: 6,
    name: "Recycled Kraft Packaging Sheets",
    category: "Paper",
    condition: "Recycled",
    description: "Eco-friendly packaging sheets made from recycled paper.",
    price: 450,
    location: "Hyderabad",
    availability: "Available",
    image: "📦",
  },
  {
    id: 7,
    name: "Cotton Textile Waste Bundle",
    category: "Textile",
    condition: "Recycled",
    description: "Sorted cotton textile waste for recycling and reuse.",
    price: 650,
    location: "Chennai",
    availability: "Available",
    image: "🧵",
  },
  {
    id: 8,
    name: "Copper Wire Scrap",
    category: "Metal",
    condition: "Recycled",
    description: "Sorted copper wire scrap for industrial recycling.",
    price: 1800,
    location: "Hyderabad",
    availability: "Available",
    image: "🔩",
  },
  {
    id: 9,
    name: "Recycled Glass Bottles",
    category: "Other",
    condition: "Recycled",
    description: "Clean glass bottles suitable for reuse and recycling.",
    price: 300,
    location: "Delhi",
    availability: "Out of Stock",
    image: "🍾",
  },
];

const categoryOptions = [
  "E-Waste",
  "Plastic",
  "Metal",
  "Paper",
  "Textile",
  "Other",
];

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    setPage(1);
  }, [query]);

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
      const searchTerm = query.trim().toLowerCase();

      const searchableText = [
        product.name,
        product.category,
        product.condition,
        product.description,
        product.location,
      ].join(" ").toLowerCase();

      const matchesSearch =
        !searchTerm || searchableText.includes(searchTerm);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesCondition =
        selectedConditions.length === 0 ||
        selectedConditions.includes(product.condition);

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available"
          ? product.availability === "Available"
          : product.availability === "Out of Stock");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesAvailability
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    query,
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
    setPage(1);
  };

  return (
    <main className="search-results-page">
      <div className="search-breadcrumb">
        <Link to="/">Home</Link> / Search Results
      </div>

      {/* Search Results Heading - No Inner Search Bar */}
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
          <span>Find materials and products that match your needs.</span>
          <strong>{filteredProducts.length} results found</strong>
        </div>
      </section>

      <section className="results-layout">
        {/* Filters Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-title">
            <h2>FILTER RESULTS</h2>
            <button onClick={clearFilters}>Clear All</button>
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
            <h3>MATERIAL CONDITION</h3>

            {["Recycled", "Refurbished", "Reusable"].map((condition) => (
              <label key={condition} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => toggleCondition(condition)}
                />
                {condition}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>PRICE RANGE (₹)</h3>

            <div className="price-inputs">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(1);
                }}
              />

              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
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
            onClick={() => setPage(1)}
          >
            APPLY FILTERS
          </button>

          <button className="clear-filter-btn" onClick={clearFilters}>
            CLEAR ALL
          </button>
        </aside>

        {/* Products Section */}
        <div className="results-content">
          <div className="results-toolbar">
            <p>
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : (page - 1) * productsPerPage + 1}
              {" - "}
              {Math.min(page * productsPerPage, filteredProducts.length)}
              {" of "}
              {filteredProducts.length} results
              {query && <> for "<strong>{query}</strong>"</>}
            </p>

            <div className="sort-control">
              <label htmlFor="sort-products">SORT BY</label>

              <select
                id="sort-products"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="active-filters">
            <span>FILTERS:</span>

            {[...selectedCategories, ...selectedConditions].length === 0 ? (
              <small>No category or condition selected</small>
            ) : (
              [...selectedCategories, ...selectedConditions].map((item) => (
                <span className="filter-chip" key={item}>
                  {item}
                </span>
              ))
            )}
          </div>

          {currentProducts.length > 0 ? (
            <div className="search-product-grid">
              {currentProducts.map((product) => (
                <article className="search-product-card" key={product.id}>
                  <div className="search-product-image">
                    <span>{product.image}</span>
                    <small>PRODUCT IMAGE</small>
                    <span className="product-condition">
                      {product.condition}
                    </span>
                  </div>

                  <div className="search-product-info">
                    <span className="product-category">
                      {product.category} / {product.condition}
                    </span>

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <span className="product-location">
                      Location: {product.location}
                    </span>

                    <div className="search-product-price">
                      ₹ {product.price.toLocaleString("en-IN")}
                    </div>

                    <span
                      className={
                        product.availability === "Available"
                          ? "stock-status in-stock"
                          : "stock-status out-stock"
                      }
                    >
                      {product.availability}
                    </span>

                    <div className="product-card-actions">
                      <Link to={`/products/${product.id}`}>
                        VIEW DETAILS
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          alert("Connect this button to your cart feature.")
                        }
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-search-results">
              <h2>No Products Found</h2>
              <p>
                No products matched "{query}". Try another product name.
              </p>
              <button onClick={clearFilters}>CLEAR FILTERS</button>
            </div>
          )}

          {filteredProducts.length > productsPerPage && (
            <div className="search-pagination">
              <span>
                Page {page} of {totalPages}
              </span>

              <div>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={page === index + 1 ? "active-page" : ""}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
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
