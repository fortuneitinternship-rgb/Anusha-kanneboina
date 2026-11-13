
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("RecyConnect Footer Component", () => {

  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  it("renders footer correctly", () => {
    renderFooter();

    expect(screen.getByRole("contentinfo"))
      .toBeInTheDocument();
  });

  it("displays RecyConnect logo", () => {
    renderFooter();

    expect(screen.getByRole("link", {
      name: "RecyConnect home"
    })).toHaveAttribute("href", "/");
  });

  it("displays footer description", () => {
    renderFooter();

    expect(screen.getByText(/Turn Waste into Opportunity/i))
      .toBeInTheDocument();
  });

  it("displays Quick Links section", () => {
    renderFooter();

    expect(screen.getByRole("heading", {
      name: "Quick Links"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Products"
    })).toHaveAttribute("href", "/products");

    expect(screen.getByRole("link", {
      name: "Wishlist"
    })).toHaveAttribute("href", "/wishlist");

    expect(screen.getByRole("link", {
      name: "Cart"
    })).toHaveAttribute("href", "/cart");
  });

  it("displays Services section", () => {
    renderFooter();

    expect(screen.getByRole("heading", {
      name: "Services"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Sell / Recycle"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Buy Recycled"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Donate"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Exchange"
    })).toBeInTheDocument();
  });

  it("displays Support section and links", () => {
    renderFooter();

    expect(screen.getByRole("heading", {
      name: "Support"
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
      name: "Privacy Policy"
    })).toHaveAttribute("href", "/privacy");

    expect(screen.getByRole("link", {
      name: "Terms & Conditions"
    })).toHaveAttribute("href", "/terms");
  });

  it("displays contact information", () => {
    renderFooter();

    expect(screen.getByText("support@recyconnect.com"))
      .toBeInTheDocument();

    expect(screen.getByText("+91 90000 00000"))
      .toBeInTheDocument();

    expect(screen.getByText("Hyderabad, India"))
      .toBeInTheDocument();
  });

  it("displays social media links", () => {
    renderFooter();

    expect(screen.getByRole("link", {
      name: "Instagram"
    })).toHaveAttribute("href", "https://www.instagram.com/");

    expect(screen.getByRole("link", {
      name: "LinkedIn"
    })).toHaveAttribute("href", "https://www.linkedin.com/");

    expect(screen.getByRole("link", {
      name: "Facebook"
    })).toHaveAttribute("href", "https://www.facebook.com/");
  });

  it("displays copyright information", () => {
    renderFooter();

    expect(screen.getByText(
      "© 2026 RecyConnect. All Rights Reserved."
    )).toBeInTheDocument();
  });

});
