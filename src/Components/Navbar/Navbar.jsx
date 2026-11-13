
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { cartItems, wishlistItems } = useShop();

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const wishlistCount = wishlistItems.length;

  const closeMenu = () => setMenuOpen(false);

  // Keep the search box synchronized with the URL, including after refresh.
  useEffect(() => {
    setSearchText(searchParams.get("query") || "");
  }, [searchParams]);

  // Navigate to live search results whenever the user types.
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value)}`, {
        replace: true,
      });
    } else if (location.pathname === "/search") {
      navigate("/search", { replace: true });
    }
  };

  // Enter also keeps the user on the search results page.
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      closeMenu();
    }
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
          onClick={() => setMenuOpen((previous) => !previous)}
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
                onChange={handleSearchChange}
              />

              {searchText && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchText("");

                    if (location.pathname === "/search") {
                      navigate("/search", { replace: true });
                    }
                  }}
                >
                  ×
                </button>
              )}
            </form>

            <Link
              to="/wishlist"
              className="nav-action wishlist-nav-link"
              aria-label={`Wishlist, ${wishlistCount} items`}
              onClick={closeMenu}
            >
              ♡
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </Link>

            <Link
              to="/cart"
              className="nav-action cart-nav-link"
              aria-label={`Shopping cart, ${cartCount} items`}
              onClick={closeMenu}
            >
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
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
