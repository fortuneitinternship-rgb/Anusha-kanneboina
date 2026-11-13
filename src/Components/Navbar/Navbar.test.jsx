
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import Navbar from "./Navbar";

vi.mock("../../context/ShopContext", () => ({
  useShop: vi.fn(),
}));

// Display current route for navigation testing
function LocationDisplay() {
  const location = useLocation();

  return (
    <div data-testid="current-location">
      {location.pathname}
      {location.search}
    </div>
  );
}

// Render Navbar inside MemoryRouter
function renderNavbar(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
      <LocationDisplay />
    </MemoryRouter>
  );
}

describe("RecyConnect Navbar Component", () => {
  beforeEach(() => {
    useShop.mockReturnValue({
      cartItems: [],
      wishlistItems: [],
    });
  });

  // 1. Navbar rendering
  it("renders Navbar correctly", () => {
    renderNavbar();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Main navigation" })
    ).toBeInTheDocument();
  });

  // 2. Logo
  it("displays RecyConnect logo", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: /RecyConnect/i })
    ).toBeInTheDocument();
  });

  // 3. Navigation links
  it("displays all navigation links", () => {
    renderNavbar();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Categories" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Buy" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Sell / Recycle" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Donate" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Exchange" })).toBeInTheDocument();
  });

  // 4. Search input
  it("displays search input", () => {
    renderNavbar();

    expect(
      screen.getByRole("searchbox", { name: "Search products" })
    ).toBeInTheDocument();
  });

  // 5. Cart and wishlist links
  it("displays cart and wishlist links", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: /Wishlist/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Shopping cart/i })
    ).toBeInTheDocument();
  });

  // 6. Cart count
  it("displays correct cart count", () => {
    useShop.mockReturnValue({
      cartItems: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ],
      wishlistItems: [],
    });

    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Shopping cart, 5 items" })
    ).toBeInTheDocument();

    expect(document.querySelector(".cart-count")).toHaveTextContent("5");
  });

  // 7. Wishlist count
  it("displays correct wishlist count", () => {
    useShop.mockReturnValue({
      cartItems: [],
      wishlistItems: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    });

    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Wishlist, 3 items" })
    ).toBeInTheDocument();

    expect(document.querySelector(".wishlist-count")).toHaveTextContent("3");
  });

  // 8. Login link
  it("displays Login link", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Login" })
    ).toBeInTheDocument();
  });

  // 9. Search navigation
  it("navigates to search results when typing", () => {
    renderNavbar();

    const searchInput = screen.getByRole("searchbox", {
      name: "Search products",
    });

    fireEvent.change(searchInput, {
      target: { value: "plastic bottles" },
    });

    expect(screen.getByTestId("current-location")).toHaveTextContent(
      "/search?query=plastic%20bottles"
    );
  });

  // 10. Search query from URL
  it("loads search query from URL", () => {
    renderNavbar("/search?query=paper");

    expect(
      screen.getByRole("searchbox", { name: "Search products" })
    ).toHaveValue("paper");
  });

  // 11. Clear search
  it("clears search input when clear button is clicked", () => {
    renderNavbar("/search?query=plastic");

    const searchInput = screen.getByRole("searchbox", {
      name: "Search products",
    });

    expect(searchInput).toHaveValue("plastic");

    fireEvent.click(
      screen.getByRole("button", { name: "Clear search" })
    );

    expect(searchInput).toHaveValue("");
  });

  // 12. Toggle mobile navigation menu
  it("toggles mobile navigation menu", () => {
    renderNavbar();

    const menuButton = screen.getByLabelText("Toggle navigation");

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(document.querySelector(".nav-content")).toHaveClass(
      "nav-content-open"
    );

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".nav-content")).not.toHaveClass(
      "nav-content-open"
    );
  });

  // 13. Close mobile menu after navigation
  it("closes mobile menu after clicking a navigation link", () => {
    renderNavbar();

    const menuButton = screen.getByLabelText("Toggle navigation");

    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(
      screen.getByRole("link", { name: "Categories" })
    );

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".nav-content")).not.toHaveClass(
      "nav-content-open"
    );

    expect(screen.getByTestId("current-location")).toHaveTextContent(
      "/categories"
    );
  });
});
