
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import ProductCard from "./ProductCard";

vi.mock("../../context/ShopContext", () => ({
  useShop: vi.fn(),
}));

const mockProduct = {
  id: 1,
  name: "Recycled Plastic Bottle",
  category: "Plastic",
  price: 150,
  rating: 4.5,
  image: "https://example.com/plastic-bottle.jpg",
};

function renderProductCard(product = mockProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
}

describe("ProductCard Component", () => {
  const mockAddToCart = vi.fn();
  const mockToggleWishlist = vi.fn();
  const mockIsInWishlist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockIsInWishlist.mockReturnValue(false);

    useShop.mockReturnValue({
      addToCart: mockAddToCart,
      toggleWishlist: mockToggleWishlist,
      isInWishlist: mockIsInWishlist,
    });
  });

  // 1. Render ProductCard
  it("renders ProductCard correctly", () => {
    renderProductCard();

    expect(document.querySelector(".product-card")).toBeInTheDocument();
  });

  // 2. Product name
  it("displays product name", () => {
    renderProductCard();

    expect(
      screen.getByRole("heading", { name: "Recycled Plastic Bottle" })
    ).toBeInTheDocument();
  });

  // 3. Product category
  it("displays product category", () => {
    renderProductCard();

    expect(screen.getByText("Plastic")).toBeInTheDocument();
  });

  // 4. Product price
  it("displays product price", () => {
    renderProductCard();

    expect(screen.getByText("₹150")).toBeInTheDocument();
  });

  // 5. Product image
  it("displays product image when image is available", () => {
    renderProductCard();

    const image = screen.getByRole("img", {
      name: "Recycled Plastic Bottle",
    });

    expect(image).toHaveAttribute(
      "src",
      "https://example.com/plastic-bottle.jpg"
    );
  });

  // 6. Image URL fallback
  it("uses imageUrl when image is not available", () => {
    const product = {
      ...mockProduct,
      image: undefined,
      imageUrl: "https://example.com/fallback.jpg",
    };

    renderProductCard(product);

    expect(
      screen.getByRole("img", { name: "Recycled Plastic Bottle" })
    ).toHaveAttribute("src", "https://example.com/fallback.jpg");
  });

  // 7. Image placeholder
  it("displays image placeholder when no image is available", () => {
    const product = {
      ...mockProduct,
      image: undefined,
      imageUrl: undefined,
    };

    renderProductCard(product);

    expect(screen.getByText("Product Image")).toBeInTheDocument();
  });

  // 8. Product rating
  it("displays product rating when available", () => {
    renderProductCard();

    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  // 9. Hide rating when unavailable
  it("does not display rating when rating is unavailable", () => {
    const product = {
      ...mockProduct,
      rating: null,
    };

    renderProductCard(product);

    expect(document.querySelector(".rating")).not.toBeInTheDocument();
  });

  // 10. Wishlist button
  it("displays Add to wishlist button when product is not saved", () => {
    renderProductCard();

    expect(
      screen.getByRole("button", { name: "Add to wishlist" })
    ).toBeInTheDocument();
  });

  // 11. Active wishlist state
  it("displays Remove from wishlist when product is saved", () => {
    mockIsInWishlist.mockReturnValue(true);

    renderProductCard();

    expect(
      screen.getByRole("button", { name: "Remove from wishlist" })
    ).toBeInTheDocument();

    expect(document.querySelector(".heart")).toHaveClass("heart-active");
  });

  // 12. Toggle wishlist
  it("calls toggleWishlist when wishlist button is clicked", () => {
    renderProductCard();

    fireEvent.click(
      screen.getByRole("button", { name: "Add to wishlist" })
    );

    expect(mockToggleWishlist).toHaveBeenCalledTimes(1);
    expect(mockToggleWishlist).toHaveBeenCalledWith(mockProduct);
  });

  // 13. Add to cart button
  it("displays Add to Cart button", () => {
    renderProductCard();

    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  // 14. Add product to cart
  it("calls addToCart when Add to Cart button is clicked", () => {
    renderProductCard();

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  // 15. Product details navigation
  it("displays View link with correct product URL", () => {
    renderProductCard();

    expect(
      screen.getByRole("link", { name: "View" })
    ).toHaveAttribute("href", "/products/1");
  });

  // 16. Lazy loading
  it("loads product image lazily", () => {
    renderProductCard();

    expect(
      screen.getByRole("img", { name: "Recycled Plastic Bottle" })
    ).toHaveAttribute("loading", "lazy");
  });
});
