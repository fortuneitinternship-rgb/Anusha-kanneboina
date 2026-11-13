
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import Cart from "./Cart";

vi.mock("../../context/ShopContext", () => ({
  useShop: vi.fn(),
}));

const mockCartItem = {
  id: 1,
  name: "Recycled Plastic Chair",
  category: "Plastic",
  price: 500,
  quantity: 2,
  stock: 10,
  image: "/images/chair.png",
};

function renderCart() {
  return render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="/checkout" element={<h1>Checkout Page</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("RecyConnect Cart Component", () => {
  const mockRemoveFromCart = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useShop.mockReturnValue({
      cartItems: [mockCartItem],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });
  });

  it("renders the Cart page correctly", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "Shopping Cart" })
    ).toBeInTheDocument();
  });

  it("displays the RecyConnect page title", () => {
    renderCart();

    expect(screen.getByText("RECYCONNECT")).toBeInTheDocument();
  });

  it("displays the cart item count", () => {
    renderCart();

    expect(screen.getByText("Your Items (1)")).toBeInTheDocument();
  });

  it("displays product name and category", () => {
    renderCart();

    expect(screen.getByText("Recycled Plastic Chair")).toBeInTheDocument();
    expect(screen.getByText("Plastic")).toBeInTheDocument();
  });

  it("displays the product image with correct alt text", () => {
    renderCart();

    const image = screen.getByRole("img", {
      name: "Recycled Plastic Chair",
    });

    expect(image).toHaveAttribute("src", "/images/chair.png");
  });

  it("displays the product price", () => {
    renderCart();

    expect(screen.getByText("₹500")).toBeInTheDocument();
  });

  it("displays the product quantity", () => {
    renderCart();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls updateQuantity when decreasing quantity", () => {
    renderCart();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Decrease Recycled Plastic Chair quantity",
      })
    );

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("calls updateQuantity when increasing quantity", () => {
    renderCart();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Increase Recycled Plastic Chair quantity",
      })
    );

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("disables increase quantity when stock limit is reached", () => {
    useShop.mockReturnValue({
      cartItems: [{ ...mockCartItem, quantity: 10, stock: 10 }],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    expect(
      screen.getByRole("button", {
        name: "Increase Recycled Plastic Chair quantity",
      })
    ).toBeDisabled();
  });

  it("calls removeFromCart when Remove is clicked", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("displays Clear Cart button when cart has items", () => {
    renderCart();

    expect(
      screen.getByRole("button", { name: "Clear Cart" })
    ).toBeInTheDocument();
  });

  it("calls clearCart when Clear Cart is clicked", () => {
    renderCart();

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it("calculates subtotal correctly", () => {
    renderCart();

    const summary = document.querySelector(".cart-summary");

    expect(within(summary).getByText("Subtotal").parentElement)
      .toHaveTextContent("₹1,000");
  });

  it("displays delivery charges when cart has items", () => {
    renderCart();

    const summary = document.querySelector(".cart-summary");

    expect(within(summary).getByText("Delivery").parentElement)
      .toHaveTextContent("₹50");
  });

  it("calculates final total including delivery", () => {
    renderCart();

    const total = document.querySelector(".cart-summary .total");

    expect(total).toHaveTextContent("₹1,050");
  });

  it("displays Proceed to Checkout link", () => {
    renderCart();

    expect(
      screen.getByRole("link", { name: "Proceed to Checkout" })
    ).toHaveAttribute("href", "/checkout");
  });

  it("displays Continue Shopping link when cart has items", () => {
    renderCart();

    const summary = document.querySelector(".cart-summary");

    expect(
      within(summary).getByRole("link", { name: "Continue Shopping" })
    ).toHaveAttribute("href", "/products");
  });

  it("displays empty cart message when no products exist", () => {
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    expect(
      screen.getByRole("heading", { name: "Your Cart is Empty" })
    ).toBeInTheDocument();
  });

  it("does not display Clear Cart button when cart is empty", () => {
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    expect(
      screen.queryByRole("button", { name: "Clear Cart" })
    ).not.toBeInTheDocument();
  });

  it("does not display checkout link when cart is empty", () => {
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    expect(
      screen.queryByRole("link", { name: "Proceed to Checkout" })
    ).not.toBeInTheDocument();
  });

  it("sets delivery charges to zero when cart is empty", () => {
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    const summary = document.querySelector(".cart-summary");

    expect(within(summary).getByText("Delivery").parentElement)
      .toHaveTextContent("₹0");
  });

  it("displays Continue Shopping link in empty cart", () => {
    useShop.mockReturnValue({
      cartItems: [],
      removeFromCart: mockRemoveFromCart,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
    });

    renderCart();

    const emptyCart = document.querySelector(".empty-cart");

    expect(
      within(emptyCart).getByRole("link", { name: "Continue Shopping" })
    ).toHaveAttribute("href", "/products");
  });
});
