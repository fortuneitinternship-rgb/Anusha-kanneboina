import "./Checkout.css";

function Checkout() {
  return (
    <div className="checkout-page">

      <div className="page-title">
        <p>RECYCONNECT</p>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">

        <div className="checkout-form">

          <h2>Delivery Address</h2>

          <div className="two-inputs">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div>

          <label>Phone Number</label>
          <input type="text" placeholder="Phone Number" />

          <label>Address</label>
          <textarea placeholder="Enter your address"></textarea>

          <div className="two-inputs">
            <div>
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>

            <div>
              <label>PIN Code</label>
              <input type="text" placeholder="PIN Code" />
            </div>
          </div>

          <h2>Payment Method</h2>

          <div className="payment-option">
            <input type="radio" name="payment" />
            <span>Cash on Delivery</span>
          </div>

          <div className="payment-option">
            <input type="radio" name="payment" />
            <span>UPI / Online Payment</span>
          </div>

          <button className="place-order">
            Place Order
          </button>

        </div>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <div>
            <span>Recycled Plastic Chair</span>
            <span>₹850</span>
          </div>

          <div>
            <span>Recycled Paper Notebook</span>
            <span>₹120</span>
          </div>

          <hr />

          <div>
            <span>Subtotal</span>
            <span>₹970</span>
          </div>

          <div>
            <span>Delivery</span>
            <span>₹50</span>
          </div>

          <hr />

          <div className="checkout-total">
            <strong>Total</strong>
            <strong>₹1020</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;