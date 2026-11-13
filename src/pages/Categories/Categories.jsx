
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    id: 1,
    name: "Plastic",
    code: "CAT-01",
    description:
      "Explore reusable plastic containers, PET bottles, HDPE, LDPE and other recyclable plastic materials.",
    materials: "PET, HDPE, LDPE, PP",
    grades: "Food & Non-Food Grade",
    image: "/images/categories/plastic.jpg",
    count: "Plastic Materials",
  },
  {
    id: 2,
    name: "Metal",
    code: "CAT-02",
    description:
      "Discover recyclable iron, steel, aluminium, copper and other valuable metal materials.",
    materials: "Iron, Steel, Aluminium, Copper",
    grades: "Bulk & Mixed Materials",
    image: "/images/categories/metal.jpg",
    count: "Metal Materials",
  },
  {
    id: 3,
    name: "Paper",
    code: "CAT-03",
    description:
      "Find recyclable newspapers, cardboard, office paper, paper bags and packaging materials.",
    materials: "OCC, Newspaper, Office Paper",
    grades: "Recycled Paper",
    image: "/images/categories/paper.jpg",
    count: "Paper Materials",
  },
  {
    id: 4,
    name: "E-Waste",
    code: "CAT-04",
    description:
      "Give electronics a second life with reusable laptops, mobiles, circuit boards and accessories.",
    materials: "PCB, Computers, Electronics",
    grades: "Reusable & Scrap",
    image: "/images/categories/e-waste.jpg",
    count: "Electronic Materials",
  },
  {
    id: 5,
    name: "Textile",
    code: "CAT-05",
    description:
      "Explore reusable clothing, cotton fabrics, denim, textile waste and recycled fabric products.",
    materials: "Cotton, Denim, Synthetic Fibers",
    grades: "Sorted Textile",
    image: "/images/categories/textile.jpg",
    count: "Textile Materials",
  },
  {
    id: 6,
    name: "Other",
    code: "CAT-06",
    description:
      "Discover glass, rubber, wood, jute and other reusable materials for sustainable living.",
    materials: "Glass, Rubber, Wood, Jute",
    grades: "Mixed Materials",
    image: "/images/categories/others.jpg",
    count: "Other Materials",
  },
];

function Categories() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCategories = categories.filter((category) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      category.name.toLowerCase().includes(searchValue) ||
      category.description.toLowerCase().includes(searchValue) ||
      category.materials.toLowerCase().includes(searchValue);

    const matchesFilter =
      filter === "All" || category.name === filter;

    return matchesSearch && matchesFilter;
  });

  const clearFilters = () => {
    setSearch("");
    setFilter("All");
  };

  return (
    <main className="categories-page">

      {/* BREADCRUMB */}
      <div className="category-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Categories</span>
      </div>

      {/* PAGE HEADING */}
      <section className="category-page-heading">
        <div>
          <p className="category-eyebrow">
            EXPLORE RECYCONNECT
          </p>
          <h1 >Explore Material Categories</h1>
          <p>
            Discover recyclable materials and sustainable products
            across different categories.
          </p>
        </div>

        <div className="category-heading-count">
          <strong>06</strong>
          <span>Core Categories</span>
        </div>
      </section>

      {/* HERO BANNER */}
      <section className="category-hero">

        <div className="category-hero-content">
          <span className="category-hero-label">
            ♻ REUSE • RECYCLE • RECONNECT
          </span>

          <h2>
            Give Materials a <span>Second Life.</span>
          </h2>

          <p>
            From plastic and paper to electronics and textiles,
            discover valuable reusable materials. Buy, sell,
            recycle or exchange through RecyConnect.
          </p>

          <div className="category-hero-tags">
            <span>♻ Sustainable Choices</span>
            <span>✓ Multiple Materials</span>
            <span>🌱 Greener Future</span>
          </div>

          <Link to="/products" className="category-hero-btn">
            Explore Products <span>→</span>
          </Link>
        </div>

        <div className="category-hero-image">
          <img
            src="/images/categories/recycling-hero.png"
            alt="Sustainable recycling and reusable materials"
          />
        </div>

      </section>

      {/* CATEGORY LISTING */}
      <section className="material-section">

        <div className="material-heading">
          <div>
            <p className="category-eyebrow">
              FIND WHAT YOU NEED
            </p>
            <h2>Browse All Categories</h2>
            <p>
              Select a category to explore available materials
              and reusable products.
            </p>
          </div>

          <div className="material-count">
            <strong>{filteredCategories.length}</strong>
            <span> / 6 Categories</span>
          </div>
        </div>

        {/* SEARCH AND FILTER */}
        <div className="category-toolbar">

          <div className="category-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search materials, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search categories"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter categories"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="category-reset-btn"
            onClick={clearFilters}
          >
            Reset
          </button>

        </div>

        <div className="showing-count">
          Showing <strong>{filteredCategories.length}</strong> of 6 categories
        </div>

        {/* CATEGORY CARDS */}
        {filteredCategories.length > 0 ? (
          <div className="category-grid">

            {filteredCategories.map((category) => (
              <article className="material-card" key={category.id}>

                <div className="material-card-image">
                  <img
                    src={category.image}
                    alt={`${category.name} recyclable materials`}
                    loading="lazy"
                  />

                  <span className="material-card-code">
                    {category.code}
                  </span>
                </div>

                <div className="material-card-content">

                  <div className="material-card-title">
                    <h3>{category.name}</h3>
                    <span className="material-status">
                      <span></span> Sustainable
                    </span>
                  </div>

                  <p className="material-description">
                    {category.description}
                  </p>

                  <div className="material-details">
                    <div>
                      <span>AVAILABLE MATERIALS</span>
                      <strong>{category.materials}</strong>
                    </div>

                    <div>
                      <span>MATERIAL TYPE</span>
                      <strong>{category.grades}</strong>
                    </div>
                  </div>

                  <Link
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="view-products-btn"
                  >
                    Explore {category.name}
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="no-categories">
            <span>⌕</span>
            <h3>No Categories Found</h3>
            <p>
              We couldn't find any matching materials.
              Try another search or category.
            </p>
            <button onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}

      </section>

      {/* BOTTOM CTA */}
      <section className="category-bottom-banner">
        <div>
          <p className="category-eyebrow">
            MAKE A DIFFERENCE TODAY
          </p>

          <h2>Turn Waste into Opportunity.</h2>

          <p>
            Every reusable material has value. Start exploring
            sustainable products and make a positive difference.
          </p>

          <Link to="/products" className="category-bottom-btn">
            Start Exploring <span>→</span>
          </Link>
        </div>

        <div className="category-bottom-icon">
          ♻
        </div>
      </section>

    </main>
  );
}

export default Categories;
