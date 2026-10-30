
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (!query) return ;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setSearchText("");
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="top-strip">
        <span aria-hidden="true">♻</span>
        Sustainable Shopping · Reuse · Recycle · Reduce Waste
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-circle">R</span>
          <span className="logo-name">
            Recy<span>Connect</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nav-content ${menuOpen ? "nav-content-open" : ""}`}
        >
          <div className="nav-menu">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/categories" onClick={closeMenu}>Categories</Link>
            <Link to="/products" onClick={closeMenu}>Buy</Link>
            <Link to="/products" onClick={closeMenu}>Sell / Recycle</Link>
            <Link to="/products" onClick={closeMenu}>Donate</Link>
            <Link to="/products" onClick={closeMenu}>Exchange</Link>
          </div>

          <div className="nav-actions">
            <form
              className="nav-search"
              role="search"
              onSubmit={handleSearch}
            >
              <span aria-hidden="true">⌕</span>

              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchText}
                onChange={(event) =>
                  setSearchText(event.target.value)
                }
              />
            </form>

            <Link
              to="/wishlist"
              className="nav-action"
              aria-label="Wishlist"
              onClick={closeMenu}
            >
              ♡
            </Link>

            <Link
              to="/cart"
              className="nav-action"
              aria-label="Shopping cart"
              onClick={closeMenu}
            >
              🛒
            </Link>

            <Link
              to="/login"
              className="login-link"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
