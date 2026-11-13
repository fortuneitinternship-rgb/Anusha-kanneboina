
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Wishlist from "./Wishlist";

function renderWishlist() {
  return render(
    <MemoryRouter>
      <Wishlist />
    </MemoryRouter>
  );
}

describe("Wishlist Component", () => {
  it("renders the Wishlist page", () => {
    renderWishlist();

    expect(
      screen.getByRole("heading", { name: "Wishlist" })
    ).toBeInTheDocument();
  });

  it("renders the saved items subtitle", () => {
    renderWishlist();

    expect(
      screen.getByText("YOUR SAVED ITEMS")
    ).toBeInTheDocument();
  });

  it("renders the Recycled Plastic Chair product", () => {
    renderWishlist();

    expect(
      screen.getByRole("heading", { name: "Recycled Plastic Chair" })
    ).toBeInTheDocument();
  });

  it("renders the Recycled Metal Table product", () => {
    renderWishlist();

    expect(
      screen.getByRole("heading", { name: "Recycled Metal Table" })
    ).toBeInTheDocument();
  });

  it("displays the plastic chair price", () => {
    renderWishlist();

    const card = screen
      .getByRole("heading", { name: "Recycled Plastic Chair" })
      .closest(".wishlist-card");

    expect(within(card).getByText("₹850")).toBeInTheDocument();
  });

  it("displays the metal table price", () => {
    renderWishlist();

    const card = screen
      .getByRole("heading", { name: "Recycled Metal Table" })
      .closest(".wishlist-card");

    expect(within(card).getByText("₹1,500")).toBeInTheDocument();
  });

  it("renders product image placeholders", () => {
    renderWishlist();

    const images = screen.getAllByText("Product Image");

    expect(images).toHaveLength(2);
  });

  it("renders two wishlist product cards", () => {
    const { container } = renderWishlist();

    expect(
      container.querySelectorAll(".wishlist-card")
    ).toHaveLength(2);
  });

  it("renders View Product links", () => {
    renderWishlist();

    expect(
      screen.getAllByRole("link", { name: "View Product" })
    ).toHaveLength(2);
  });

  it("navigates to the plastic chair product", () => {
    renderWishlist();

    const link = screen
      .getByRole("heading", { name: "Recycled Plastic Chair" })
      .closest(".wishlist-card");

    expect(
      within(link).getByRole("link", { name: "View Product" })
    ).toHaveAttribute("href", "/products/1");
  });

  it("navigates to the metal table product", () => {
    renderWishlist();

    const link = screen
      .getByRole("heading", { name: "Recycled Metal Table" })
      .closest(".wishlist-card");

    expect(
      within(link).getByRole("link", { name: "View Product" })
    ).toHaveAttribute("href", "/products/2");
  });

  it("renders the wishlist container", () => {
    const { container } = renderWishlist();

    expect(
      container.querySelector(".wishlist-container")
    ).toBeInTheDocument();
  });

  it("renders the page title section", () => {
    const { container } = renderWishlist();

    expect(
      container.querySelector(".page-title")
    ).toBeInTheDocument();
  });
});
