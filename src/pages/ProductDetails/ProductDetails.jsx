import { Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  return (
    <div className="details-page">

      <div className="details-container">

        <div className="details-image">
          Product Image
        </div>

        <div className="details-content">

          <p className="details-category">
            RECYCLED PRODUCT
          </p>

          <h1>Recycled Plastic Chair</h1>

          <div className="details-rating">
            ★ 4.5
          </div>

          <h2>₹850</h2>

          <p>
            A durable chair made using recycled plastic materials.
            Designed for everyday use while reducing waste.
          </p>

          <hr />

          <p>
            <strong>Material:</strong> Recycled Plastic
          </p>

          <p>
            <strong>Condition:</strong> Good
          </p>

          <div className="quantity">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>

          <div className="details-buttons">
            <button>Add to Cart</button>
            <Link to="/cart">Buy Now</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;