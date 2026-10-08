import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  return (
    <div className="cart-page">

      <div className="page-title">
        <p>RECYCONNECT</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-container">

        <div className="cart-items">

          <div className="cart-item">
            <div className="cart-image">Product</div>

            <div className="cart-info">
              <h3>Recycled Plastic Chair</h3>
              <p>Recycled Plastic</p>

              <div className="cart-quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <strong>₹850</strong>
          </div>

          <div className="cart-item">
            <div className="cart-image">Product</div>

            <div className="cart-info">
              <h3>Recycled Paper Notebook</h3>
              <p>Recycled Paper</p>

              <div className="cart-quantity">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>

            <strong>₹120</strong>
          </div>

        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>
            <span>₹970</span>
          </div>

          <div>
            <span>Delivery</span>
            <span>₹50</span>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>
            <strong>₹1020</strong>
          </div>

          <Link to="/checkout">
            Proceed to Checkout
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Cart;