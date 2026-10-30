
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    id: 1,
    name: "Plastic",
    code: "CAT-01",
    description:
      "Post-consumer and industrial PET, HDPE, LDPE, PP resins, shredded plastics, and baled polymers.",
    materials: "PET, HDPE, LDPE, PP",
    grades: "Grade: Food and Non-Food",
    icon: "♻",
  },
  {
    id: 2,
    name: "Metal",
    code: "CAT-02",
    description:
      "Ferrous and non-ferrous scrap, aluminium ingots, copper wire, industrial steel offcuts, and alloys.",
    materials: "Iron, Steel, Aluminium, Copper",
    grades: "Grade: Bulk and Mixed",
    icon: "⚙",
  },
  {
    id: 3,
    name: "Paper",
    code: "CAT-03",
    description:
      "Corrugated cardboard (OCC), sorted paper, mixed office paper, newspaper, and fiber packaging.",
    materials: "OCC, Newspaper, Office Paper",
    grades: "Grade: Recycled Paper",
    icon: "📄",
  },
  {
    id: 4,
    name: "E-Waste",
    code: "CAT-04",
    description:
      "Circuit boards, electronic components, laptops, batteries, accessories, and miscellaneous IT hardware.",
    materials: "PCB, Computers, Electronics",
    grades: "Grade: Reusable and Scrap",
    icon: "💻",
  },
  {
    id: 5,
    name: "Textile",
    code: "CAT-05",
    description:
      "Pre-consumer cotton cuttings, recycled synthetic fibers, denim pulp, and industrial fabric waste.",
    materials: "Cotton, Denim, Synthetic Fibers",
    grades: "Grade: Sorted Textile",
    icon: "🧵",
  },
  {
    id: 6,
    name: "Other",
    code: "CAT-06",
    description:
      "Glass cullet, industrial rubber, bio-composite waste, organic residues, and mixed composite materials.",
    materials: "Glass, Rubber, Organic Waste",
    grades: "Grade: Mixed Materials",
    icon: "🌱",
  },
];

function Categories() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.description.toLowerCase().includes(search.toLowerCase()) ||
      category.materials.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || category.name === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="categories-page">

      {/* Breadcrumb */}
      <div className="category-breadcrumb">
        <Link to="/">Home</Link> / Categories
      </div>

      {/* Page Heading */}
      <div className="category-heading">
        <div>
          <h1>CATEGORIES</h1>
          <p>Explore recyclable materials and discover their value.</p>
        </div>
        <span className="category-version">RECYCONNECT / V1.0</span>
      </div>

      {/* Introduction Banner */}
      <section className="category-hero">
        <div className="category-hero-content">
          <span className="small-label">
            ♻ RECYCLING • REUSE • SUSTAINABILITY
          </span>

          <h2>EXPLORE RECYCLABLE MATERIAL CATEGORIES</h2>

          <p>
            Browse organized categories to sell, buy, exchange, or donate
            certified recyclable materials. Discover different types of
            reusable materials and create a cleaner, greener future.
          </p>

          <div className="hero-tags">
            <span>6 Core Categories</span>
            <span>Verified Materials</span>
            <span>Circular Economy</span>
          </div>
        </div>

        <div className="category-hero-image">
          <span>♻</span>
          <p>Recycling Starts With You</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="material-section">

        <div className="material-heading">
          <div>
            <h2>▪ MATERIAL CATEGORIES</h2>
            <p>
              Select a material category below to discover available
              products, pricing benchmarks, and processing specifications.
            </p>
          </div>

          <span className="material-count">
            {filteredCategories.length} CATEGORIES
          </span>
        </div>

        {/* Search and Filter */}
        <div className="category-toolbar">
          <input
            type="text"
            placeholder="⌕  Search categories (e.g. Plastic, Metal, Paper...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <p className="showing-count">
          Displaying {filteredCategories.length} of 6 Material Categories
        </p>

        {/* Category Cards */}
        <h3 className="main-category-title">MAIN CATEGORIES</h3>

        <div className="category-grid">
          {filteredCategories.map((category) => (
            <div className="material-card" key={category.id}>

              <div className="material-card-heading">
                <h3>
                  {category.id}. {category.name.toUpperCase()}
                </h3>
                <span>{category.code}</span>
              </div>

              <div className="material-image">
                <span className="material-icon">{category.icon}</span>
                <p>{category.name} Materials</p>
                <small>Recyclable • Reusable • Sustainable</small>
              </div>

              <p className="material-description">
                {category.description}
              </p>

              <div className="material-details">
                <span>{category.materials}</span>
                <span>{category.grades}</span>
              </div>

              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="view-products-btn"
              >
                <span>VIEW PRODUCTS</span>
                <span>→ {category.name.toUpperCase()} PRODUCT LISTING</span>
              </Link>

              <small className="destination-text">
                Destination: /products?category={category.name.toLowerCase()}
              </small>

            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="no-categories">
            <h3>No Categories Found</h3>
            <p>Try searching with another material name.</p>
            <button onClick={() => {
              setSearch("");
              setFilter("All");
            }}>
              Clear Search
            </button>
          </div>
        )}

      </section>
    </div>
  );
}

export default Categories;
