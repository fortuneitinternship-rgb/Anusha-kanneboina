import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <Link to="/" className="footer-logo">
            <span>R</span>
            RecyConnect
          </Link>

          <p>
            Turn Waste into Opportunity.
            We connect people with sustainable
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
          <a href="#">Help Center</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <p>support@recyconnect.com</p>
          <p>+91 90000 00000</p>
          <p>Hyderabad, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RecyConnect. All Rights Reserved.</p>

        <div>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Facebook</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;