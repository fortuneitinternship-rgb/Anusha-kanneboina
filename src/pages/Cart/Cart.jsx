
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useShop();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // Delivery charges
  const delivery = cartItems.length > 0 ? 50 : 0;

  // Final total
  const total = subtotal + delivery;

  // Decrease quantity
  const decreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  // Increase quantity
  const increaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-page">

      {/* Page Title */}
      <div className="page-title">
        <p>RECYCONNECT</p>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-container">

        {/* Cart Items */}
        <div className="cart-items">

          <div className="cart-header">
            <h2>Your Items ({cartItems.length})</h2>

            {cartItems.length > 0 && (
              <button type="button" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                {/* Product Image */}
                <div className="cart-image">
                  <img
                    src={item.image}
                    alt={item.name || "Product"}
                  />
                </div>

                {/* Product Details */}
                <div className="cart-info">

                  <h3>{item.name}</h3>

                  <p>{item.category}</p>

                  <strong className="cart-item-price">
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </strong>

                  {/* Quantity Controls */}
                  <div className="cart-quantity">

                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item)}
                      disabled={
                        Number.isFinite(Number(item.stock)) &&
                        Number(item.stock) > 0 &&
                        item.quantity >= Number(item.stock)
                      }
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Product */}
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>

                {/* Individual Product Total */}
                <strong className="cart-line-total">
                  ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                  ).toLocaleString("en-IN")}
                </strong>

              </div>
            ))
          ) : (

            /* Empty Cart */
            <div className="empty-cart">
              <div>🛒</div>

              <h2>Your Cart is Empty</h2>

              <p>
                Discover sustainable products and add them
                to your cart.
              </p>

              <Link to="/products">
                Continue Shopping
              </Link>
            </div>

          )}

        </div>

        {/* Order Summary */}
        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div>
            <span>Subtotal</span>

            <span>
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            <span>Delivery</span>

            <span>
              ₹{delivery.toLocaleString("en-IN")}
            </span>
          </div>

          <hr />

          <div className="total">
            <span>Total</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          {cartItems.length > 0 && (
            <Link to="/checkout">
              Proceed to Checkout
            </Link>
          )}

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Cart;
