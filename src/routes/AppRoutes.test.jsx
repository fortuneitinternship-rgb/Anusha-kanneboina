
import {
  describe,
  it,
  expect,
  vi,
  afterEach,
} from "vitest";

import { render, screen, cleanup } from "@testing-library/react";

// Mock MainLayout and render its child routes
vi.mock("../Layouts/MainLayout", async () => {
  const { Outlet } = await vi.importActual("react-router-dom");

  return {
    default: () => (
      <div data-testid="main-layout">
        <Outlet />
      </div>
    ),
  };
});

// Mock Home
vi.mock("../pages/Home/Home", () => ({
  default: () => <h1>Home Page</h1>,
}));

// Mock Products
vi.mock("../pages/Products/Products", () => ({
  default: () => <h1>Products Page</h1>,
}));

// Mock ProductDetails
vi.mock("../pages/ProductDetails/ProductDetails", () => ({
  default: () => <h1>Product Details Page</h1>,
}));

// Mock Cart
vi.mock("../pages/Cart/Cart", () => ({
  default: () => <h1>Cart Page</h1>,
}));

// Mock Categories
vi.mock("../pages/Categories/Categories", () => ({
  default: () => <h1>Categories Page</h1>,
}));

// Mock Wishlist
vi.mock("../pages/Wishlist/Wishlist", () => ({
  default: () => <h1>Wishlist Page</h1>,
}));

// Mock Login
vi.mock("../pages/Login/Login", () => ({
  default: () => <h1>Login Page</h1>,
}));

// Mock Register
vi.mock("../pages/Register/Register", () => ({
  default: () => <h1>Register Page</h1>,
}));

// Mock Checkout
vi.mock("../pages/Checkout/Checkout", () => ({
  default: () => <h1>Checkout Page</h1>,
}));

// Mock ForgotPassword
vi.mock("../pages/ForgotPassword/ForgotPassword", () => ({
  default: () => <h1>Forgot Password Page</h1>,
}));

// Mock VerifyOTP
vi.mock("../pages/VerifyOTP/VerifyOTP", () => ({
  default: () => <h1>Verify OTP Page</h1>,
}));

// Mock NewPassword
vi.mock("../pages/NewPassword/NewPassword", () => ({
  default: () => <h1>New Password Page</h1>,
}));

// Mock SearchResults
vi.mock("../pages/SearchResults/SearchResults", () => ({
  default: () => <h1>Search Results Page</h1>,
}));

// Mock InfoPages
vi.mock("../pages/InfoPages/InfoPages", () => ({
  default: ({ type }) => <h1>{type} Page</h1>,
}));

// Mock Buttton.jsx

import AppRoutes from "./AppRoutes";

// Render a route using the actual BrowserRouter in AppRoutes
function renderRoute(path) {
  window.history.pushState({}, "Test page", path);

  return render(<AppRoutes />);
}

afterEach(() => {
  cleanup();
});

describe("AppRoutes Component", () => {
  it("renders the Home page", () => {
    renderRoute("/");
    expect(screen.getByRole("heading", { name: "Home Page" })).toBeInTheDocument();
  });

  it("renders the Products page", () => {
    renderRoute("/products");
    expect(screen.getByRole("heading", { name: "Products Page" })).toBeInTheDocument();
  });

  it("renders Product Details page", () => {
    renderRoute("/products/1");
    expect(screen.getByRole("heading", { name: "Product Details Page" })).toBeInTheDocument();
  });

  it("renders the Cart page", () => {
    renderRoute("/cart");
    expect(screen.getByRole("heading", { name: "Cart Page" })).toBeInTheDocument();
  });

  it("renders the Wishlist page", () => {
    renderRoute("/wishlist");
    expect(screen.getByRole("heading", { name: "Wishlist Page" })).toBeInTheDocument();
  });

  it("renders the Login page", () => {
    renderRoute("/login");
    expect(screen.getByRole("heading", { name: "Login Page" })).toBeInTheDocument();
  });

  it("renders the Register page", () => {
    renderRoute("/register");
    expect(screen.getByRole("heading", { name: "Register Page" })).toBeInTheDocument();
  });

  it("renders the Checkout page", () => {
    renderRoute("/checkout");
    expect(screen.getByRole("heading", { name: "Checkout Page" })).toBeInTheDocument();
  });

  it("renders the Forgot Password page", () => {
    renderRoute("/forgot-password");
    expect(screen.getByRole("heading", { name: "Forgot Password Page" })).toBeInTheDocument();
  });

  it("renders the Verify OTP page", () => {
    renderRoute("/verify-otp");
    expect(screen.getByRole("heading", { name: "Verify OTP Page" })).toBeInTheDocument();
  });

  it("renders the New Password page", () => {
    renderRoute("/new-password");
    expect(screen.getByRole("heading", { name: "New Password Page" })).toBeInTheDocument();
  });

  it("renders the Categories page", () => {
    renderRoute("/categories");
    expect(screen.getByRole("heading", { name: "Categories Page" })).toBeInTheDocument();
  });

  it("renders the Search Results page", () => {
    renderRoute("/search");
    expect(screen.getByRole("heading", { name: "Search Results Page" })).toBeInTheDocument();
  });

  it("renders the How It Works page", () => {
    renderRoute("/how-it-works");
    expect(screen.getByRole("heading", { name: "how-it-works Page" })).toBeInTheDocument();
  });

  it("renders the Benefits page", () => {
    renderRoute("/benefits");
    expect(screen.getByRole("heading", { name: "benefits Page" })).toBeInTheDocument();
  });

  it("renders the Sustainability page", () => {
    renderRoute("/sustainability");
    expect(screen.getByRole("heading", { name: "sustainability Page" })).toBeInTheDocument();
  });


  it("renders MainLayout around the Home page", () => {
    renderRoute("/");
    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });
});
