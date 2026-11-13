
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import HeroCarousel from "./HeroCarousel";

describe("HeroCarousel Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );
  });

  it("renders the hero carousel", () => {
    expect(document.querySelector(".full-hero")).toBeInTheDocument();
  });

  it("renders the carousel with the correct ID", () => {
    expect(document.querySelector("#recyConnectHero")).toBeInTheDocument();
  });

  it("displays all four carousel slides", () => {
    expect(document.querySelectorAll(".carousel-item")).toHaveLength(4);
  });

  it("marks the first slide as active", () => {
    expect(
      document.querySelector(".carousel-item.active")
    ).toBe(document.querySelectorAll(".carousel-item")[0]);
  });

  it("displays the first slide heading", () => {
    expect(
      screen.getByRole("heading", { name: /Turn Waste into Opportunity/i })
    ).toBeInTheDocument();
  });

  it("displays all slide headings", () => {
    const headings = [
      /Turn Waste into Opportunity/i,
      /Discover Better Ways to Reuse/i,
      /Give Products a Second Life/i,
      /Together for a Greener Future/i,
    ];

    headings.forEach((heading) => {
      expect(
        screen.getByRole("heading", { name: heading })
      ).toBeInTheDocument();
    });
  });

  it("displays all four slide images", () => {
    const images = document.querySelectorAll(".full-hero-image");

    expect(images).toHaveLength(4);

    images.forEach((image) => {
      expect(image).toHaveAttribute("src");
      expect(image).toHaveAttribute("alt");
    });
  });

  it("displays the correct first slide image", () => {
    const firstImage = document.querySelector(".carousel-item.active img");

    expect(firstImage).toHaveAttribute("src", "/images/carousel5.png");
    expect(firstImage).toHaveAttribute("alt", "Opportunity");
  });

  it("displays four carousel indicators", () => {
    expect(
      document.querySelectorAll(".carousel-indicators button")
    ).toHaveLength(4);
  });

  it("marks the first indicator as active", () => {
    const indicators = document.querySelectorAll(
      ".carousel-indicators button"
    );

    expect(indicators[0]).toHaveClass("active");
    expect(indicators[0]).toHaveAttribute("aria-current", "true");
  });

  it("provides accessible labels for carousel indicators", () => {
    const indicators = document.querySelectorAll(
      ".carousel-indicators button"
    );

    indicators.forEach((indicator, index) => {
      expect(indicator).toHaveAttribute(
        "aria-label",
        `Slide ${index + 1}`
      );
    });
  });

  it("displays the primary Explore Products link", () => {
    const firstSlide = document.querySelector(".carousel-item.active");

    expect(
      within(firstSlide).getByRole("link", {
        name: /Explore Products/i,
      })
    ).toHaveAttribute("href", "/products");
  });

  it("displays the secondary Sell / Recycle link", () => {
    const firstSlide = document.querySelector(".carousel-item.active");

    expect(
      within(firstSlide).getByRole("link", {
        name: /Sell \/ Recycle/i,
      })
    ).toHaveAttribute("href", "/products");
  });

  it("displays navigation links for all slides", () => {
    const links = document.querySelectorAll(".hero-actions a");

    expect(links).toHaveLength(8);
  });

  it("displays the Previous slide button", () => {
    expect(
      screen.getByRole("button", { name: "Previous slide" })
    ).toBeInTheDocument();
  });

  it("displays the Next slide button", () => {
    expect(
      screen.getByRole("button", { name: "Next slide" })
    ).toBeInTheDocument();
  });

  it("displays the hero overlay", () => {
    expect(
      document.querySelector(".full-hero-overlay")
    ).toBeInTheDocument();
  });

  it("displays the hero description", () => {
    expect(
      document.querySelector(".full-hero-description")
    ).toBeInTheDocument();
  });

  it("displays the sustainability trust information", () => {
    expect(screen.getAllByText(/Sustainable choices/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Reuse more/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Greener future/i).length).toBeGreaterThan(0);
  });

  it("has the automatic carousel interval configured", () => {
    expect(
      document.querySelector("#recyConnectHero")
    ).toHaveAttribute("data-bs-interval", "4500");
  });

  it("has the carousel fade animation class", () => {
    expect(
      document.querySelector("#recyConnectHero")
    ).toHaveClass("carousel-fade");
  });
});
