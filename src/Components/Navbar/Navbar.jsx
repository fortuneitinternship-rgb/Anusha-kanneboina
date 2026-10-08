import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="top-strip">
        ♻ Sustainable Shopping • Reuse • Recycle • Reduce Waste
      </div>

      <nav className="navbar">
        <Link to="/" className="logo">
          <span className="logo-circle">R</span>
          <span>Recy<span>Connect</span></span>
        </Link>

        <div className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/products">Categories</Link>
          <Link to="/products">Buy</Link>
          <Link to="/products">Sell / Recycle</Link>
          <Link to="/products">Donate</Link>
          <Link to="/products">Exchange</Link>
        </div>

        <div className="nav-actions">
          <div className="nav-search">
            <span>⌕</span>
            <input type="text" placeholder="Search" />
          </div>

          <Link to="/wishlist" className="nav-action">♡</Link>
          <Link to="/cart" className="nav-action">🛒</Link>

          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;