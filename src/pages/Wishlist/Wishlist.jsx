import { Link } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  return (
    <div className="wishlist-page">

      <div className="page-title">
        <p>YOUR SAVED ITEMS</p>
        <h1>Wishlist</h1>
      </div>

      <div className="wishlist-container">

        <div className="wishlist-card">
          <div className="wishlist-image">
            Product Image
          </div>

          <h3>Recycled Plastic Chair</h3>
          <p>₹850</p>

          <Link to="/products/1">
            View Product
          </Link>
        </div>

        <div className="wishlist-card">
          <div className="wishlist-image">
            Product Image
          </div>

          <h3>Recycled Metal Table</h3>
          <p>₹1,500</p>

          <Link to="/products/2">
            View Product
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Wishlist;