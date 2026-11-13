
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ShopProvider, useShop } from "./ShopContext";

function TestComponent() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    wishlistItems,
    reviews,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    clearCart,
    getCartItem,
    addReview,
    getProductReviews,
  } = useShop();

  const product = {
    id: 1,
    name: "Recycled Plastic Bottle",
    category: "Plastic",
    price: 100,
    stock: 10,
  };

  return (
    <div>
      <p data-testid="cart-count">{cartCount}</p>
      <p data-testid="cart-total">{cartTotal}</p>
      <p data-testid="cart-items">{cartItems.length}</p>
      <p data-testid="wishlist-items">{wishlistItems.length}</p>
      <p data-testid="reviews-count">{reviews.length}</p>

      <p data-testid="product-in-wishlist">
        {isInWishlist(1) ? "Yes" : "No"}
      </p>

      <p data-testid="cart-product">
        {getCartItem(1)?.name || "Not found"}
      </p>

      <p data-testid="product-reviews">
        {getProductReviews(1).length}
      </p>

      <button onClick={() => addToCart(product)}>
        Add Cart
      </button>

      <button onClick={() => removeFromCart(1)}>
        Remove Cart
      </button>

      <button onClick={() => updateQuantity(1, 3)}>
        Update Quantity
      </button>

      <button onClick={() => updateQuantity(1, 0)}>
        Remove By Quantity
      </button>

      <button onClick={() => toggleWishlist(product)}>
        Toggle Wishlist
      </button>

      <button onClick={clearCart}>
        Clear Cart
      </button>

      <button
        onClick={() =>
          addReview(1, {
            name: "Anusha",
            title: "Good Product",
            comment: "Useful recycled product",
            rating: 5,
          })
        }
      >
        Add Review
      </button>
    </div>
  );
}

function renderShopContext() {
  return render(
    <ShopProvider>
      <TestComponent />
    </ShopProvider>
  );
}

describe("ShopContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // 1. Render provider
  it("renders ShopProvider correctly", () => {
    renderShopContext();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("0");
  });

  // 2. Add product to cart
  it("adds product to cart", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent("1");
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
  });

  // 3. Increase existing product quantity
  it("increases quantity when adding the same product again", () => {
    renderShopContext();

    const addButton = screen.getByRole("button", { name: "Add Cart" });

    act(() => {
      addButton.click();
      addButton.click();
    });

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });

  // 4. Prevent adding out-of-stock products
  it("does not add products with zero stock", () => {
    function OutOfStockTest() {
      const { addToCart, cartItems } = useShop();

      return (
        <>
          <button
            onClick={() =>
              addToCart({
                id: 2,
                name: "Out of Stock Product",
                price: 100,
                stock: 0,
              })
            }
          >
            Add Out of Stock
          </button>
          <p data-testid="out-stock-count">{cartItems.length}</p>
        </>
      );
    }

    render(
      <ShopProvider>
        <OutOfStockTest />
      </ShopProvider>
    );

    act(() => {
      screen.getByRole("button", { name: "Add Out of Stock" }).click();
    });

    expect(screen.getByTestId("out-stock-count")).toHaveTextContent("0");
  });

  // 5. Prevent quantity exceeding stock
  it("does not increase cart quantity beyond available stock", () => {
    function StockLimitTest() {
      const { addToCart, cartItems } = useShop();

      const product = {
        id: 3,
        name: "Limited Stock Product",
        price: 100,
        stock: 1,
      };

      return (
        <>
          <button onClick={() => addToCart(product)}>
            Add Limited Stock
          </button>
          <p data-testid="limited-quantity">
            {cartItems[0]?.quantity || 0}
          </p>
        </>
      );
    }

    render(
      <ShopProvider>
        <StockLimitTest />
      </ShopProvider>
    );

    const button = screen.getByRole("button", {
      name: "Add Limited Stock",
    });

    act(() => {
      button.click();
      button.click();
    });

    expect(screen.getByTestId("limited-quantity")).toHaveTextContent("1");
  });

  // 6. Remove product from cart
  it("removes product from cart", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
    });

    act(() => {
      screen.getByRole("button", { name: "Remove Cart" }).click();
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent("0");
  });

  // 7. Update quantity
  it("updates product quantity", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
      screen.getByRole("button", { name: "Update Quantity" }).click();
    });

    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");
  });

  // 8. Remove product when quantity becomes zero
  it("removes product when quantity is less than one", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
      screen.getByRole("button", { name: "Remove By Quantity" }).click();
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent("0");
  });

  // 9. Limit updated quantity to available stock
  it("does not allow updated quantity to exceed stock", () => {
    function QuantityLimitTest() {
      const { addToCart, updateQuantity, cartItems } = useShop();

      const product = {
        id: 4,
        name: "Stock Limited Item",
        price: 50,
        stock: 2,
      };

      return (
        <>
          <button onClick={() => addToCart(product)}>Add Item</button>
          <button onClick={() => updateQuantity(4, 10)}>
            Set High Quantity
          </button>
          <p data-testid="safe-quantity">
            {cartItems[0]?.quantity || 0}
          </p>
        </>
      );
    }

    render(
      <ShopProvider>
        <QuantityLimitTest />
      </ShopProvider>
    );

    act(() => {
      screen.getByRole("button", { name: "Add Item" }).click();
      screen.getByRole("button", { name: "Set High Quantity" }).click();
    });

    expect(screen.getByTestId("safe-quantity")).toHaveTextContent("2");
  });

  // 10. Add product to wishlist
  it("adds product to wishlist", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Toggle Wishlist" }).click();
    });

    expect(screen.getByTestId("wishlist-items")).toHaveTextContent("1");
    expect(screen.getByTestId("product-in-wishlist")).toHaveTextContent("Yes");
  });

  // 11. Remove product from wishlist
  it("removes product from wishlist when toggled again", () => {
    renderShopContext();

    const button = screen.getByRole("button", {
      name: "Toggle Wishlist",
    });

    act(() => {
      button.click();
      button.click();
    });

    expect(screen.getByTestId("wishlist-items")).toHaveTextContent("0");
    expect(screen.getByTestId("product-in-wishlist")).toHaveTextContent("No");
  });

  // 12. Clear cart
  it("clears all cart items", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
      screen.getByRole("button", { name: "Clear Cart" }).click();
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent("0");
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  // 13. Calculate cart total
  it("calculates cart total correctly", () => {
    renderShopContext();

    const addButton = screen.getByRole("button", { name: "Add Cart" });

    act(() => {
      addButton.click();
      addButton.click();
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("200");
  });

  // 14. Get cart item
  it("returns the correct cart item", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
    });

    expect(screen.getByTestId("cart-product")).toHaveTextContent(
      "Recycled Plastic Bottle"
    );
  });

  // 15. Add product review
  it("adds a product review", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Review" }).click();
    });

    expect(screen.getByTestId("reviews-count")).toHaveTextContent("1");
    expect(screen.getByTestId("product-reviews")).toHaveTextContent("1");
  });

  // 16. Get reviews for a product
  it("returns reviews for the correct product", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Review" }).click();
    });

    expect(screen.getByTestId("product-reviews")).toHaveTextContent("1");
  });

  // 17. Save cart to localStorage
  it("saves cart items to localStorage", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Cart" }).click();
    });

    const savedCart = JSON.parse(
      localStorage.getItem("recyconnect-cart")
    );

    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].quantity).toBe(1);
  });

  // 18. Save wishlist to localStorage
  it("saves wishlist items to localStorage", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Toggle Wishlist" }).click();
    });

    const savedWishlist = JSON.parse(
      localStorage.getItem("recyconnect-wishlist")
    );

    expect(savedWishlist).toHaveLength(1);
  });

  // 19. Save reviews to localStorage
  it("saves reviews to localStorage", () => {
    renderShopContext();

    act(() => {
      screen.getByRole("button", { name: "Add Review" }).click();
    });

    const savedReviews = JSON.parse(
      localStorage.getItem("recyconnect-reviews")
    );

    expect(savedReviews).toHaveLength(1);
  });

  // 20. Load existing cart from localStorage
  it("loads cart items from localStorage", () => {
    localStorage.setItem(
      "recyconnect-cart",
      JSON.stringify([
        {
          id: 5,
          name: "Saved Product",
          price: 200,
          stock: 5,
          quantity: 2,
        },
      ])
    );

    renderShopContext();

    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("400");
  });

  // 21. Load existing wishlist from localStorage
  it("loads wishlist items from localStorage", () => {
    localStorage.setItem(
      "recyconnect-wishlist",
      JSON.stringify([{ id: 1, name: "Saved Product" }])
    );

    renderShopContext();

    expect(screen.getByTestId("wishlist-items")).toHaveTextContent("1");
    expect(screen.getByTestId("product-in-wishlist")).toHaveTextContent("Yes");
  });

  // 22. Handle invalid localStorage data
  it("handles invalid localStorage JSON safely", () => {
    localStorage.setItem("recyconnect-cart", "invalid-json");
    localStorage.setItem("recyconnect-wishlist", "invalid-json");
    localStorage.setItem("recyconnect-reviews", "invalid-json");

    renderShopContext();

    expect(screen.getByTestId("cart-items")).toHaveTextContent("0");
    expect(screen.getByTestId("wishlist-items")).toHaveTextContent("0");
    expect(screen.getByTestId("reviews-count")).toHaveTextContent("0");
  });
});
