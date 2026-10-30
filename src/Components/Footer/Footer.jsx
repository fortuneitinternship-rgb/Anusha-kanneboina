
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <Link to="/" className="footer-logo" aria-label="RecyConnect home">
            <span className="footer-logo-mark">R</span>
            <span>RecyConnect</span>
          </Link>

          <p>
            Turn Waste into Opportunity. We connect people with sustainable
            ways to buy, sell, recycle and reuse.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/products">Categories</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="footer-column">
          <h3>Services</h3>
          <Link to="/products">Sell / Recycle</Link>
          <Link to="/products">Buy Recycled</Link>
          <Link to="/products">Donate</Link>
          <Link to="/products">Exchange</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <a href="mailto:support@recyconnect.com">Email Support</a>
          <a href="mailto:support@recyconnect.com?subject=Contact%20RecyConnect">
            Contact Us
          </a>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact</h3>
          <a href="mailto:support@recyconnect.com">
            support@recyconnect.com
          </a>
          <p>+91 90000 00000</p>
          <p>Hyderabad, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 RecyConnect. All Rights Reserved.</p>

        <div className="footer-socials" aria-label="Social media links">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
