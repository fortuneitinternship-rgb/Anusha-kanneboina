
import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Home from "./Home";

const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe("RecyConnect Home Page", () => {
  it("renders the Home page correctly", () => {
    const { container } = renderHome();

    expect(container.querySelector("main.home")).toBeInTheDocument();
  });

  it("renders the Hero Carousel", () => {
    const { container } = renderHome();

    expect(
      container.querySelector(".full-hero-carousel")
    ).toBeInTheDocument();
  });

  it("renders all four service cards", () => {
    const { container } = renderHome();

    const services = container.querySelector(".services");
    const serviceCards = services.querySelectorAll(".service-card");

    expect(serviceCards).toHaveLength(4);

    expect(
      within(services).getByRole("heading", { name: "Sell / Recycle" })
    ).toBeInTheDocument();

    expect(
      within(services).getByRole("heading", { name: "Buy Refurbished" })
    ).toBeInTheDocument();

    expect(
      within(services).getByRole("heading", { name: "Donate" })
    ).toBeInTheDocument();

    expect(
      within(services).getByRole("heading", { name: "Exchange" })
    ).toBeInTheDocument();
  });

  it("displays service descriptions", () => {
    const { container } = renderHome();

    const services = container.querySelector(".services");

    expect(
      within(services).getByText(/Turn recyclable waste into value/i)
    ).toBeInTheDocument();

    expect(
      within(services).getByText(/Discover useful refurbished products/i)
    ).toBeInTheDocument();
  });

  it("renders the Material Categories heading", () => {
    const { container } = renderHome();

    expect(
      within(container).getByRole("heading", {
        name: "Material Categories",
      })
    ).toBeInTheDocument();
  });

  it("displays all ten material categories", () => {
    const { container } = renderHome();

    const categoryCards = container.querySelectorAll(".category-card");

    expect(categoryCards).toHaveLength(10);

    const categoryNames = [
      "Plastic",
      "Paper",
      "Metal",
      "Aluminium",
      "Copper",
      "E-Waste",
      "Glass",
      "Textile",
      "Wood",
      "Other",
    ];

    categoryNames.forEach((name) => {
      expect(
        within(container).getByRole("heading", {
          name,
          level: 3,
        })
      ).toBeInTheDocument();
    });
  });

  it("displays category images with alternative text", () => {
    const { container } = renderHome();

    const categoryImages = container.querySelectorAll(
      ".category-card .category-image img"
    );

    expect(categoryImages).toHaveLength(10);

    categoryImages.forEach((image) => {
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")).not.toBe("");
    });
  });

  it("renders the View All Categories link", () => {
    const { container } = renderHome();

    const viewAll = container.querySelector(".category-view-all");

    expect(viewAll).toBeInTheDocument();
    expect(viewAll).toHaveAttribute("href", "/categories");
  });

  it("renders the Featured Products section", () => {
    const { container } = renderHome();

    expect(
      within(container).getByRole("heading", {
        name: "Featured Products / Materials",
      })
    ).toBeInTheDocument();
  });

  it("displays all ten featured products", () => {
    const { container } = renderHome();

    const productCards = container.querySelectorAll(
      ".featured-products .product-card"
    );

    expect(productCards).toHaveLength(10);
  });

  it("displays the correct featured product names", () => {
    const { container } = renderHome();

    const productNames = [
      "PET Plastic Bottles",
      "Aluminium Scrap",
      "Waste Paper",
      "Refurbished Laptop",
      "Used Mobile Phone",
      "Copper Wire Scrap",
      "Reusable Glass Vase",
      "Cotton Tote Bag",
      "Wooden Storage Box",
      "Natural Jute Basket",
    ];

    productNames.forEach((name) => {
      expect(
        within(container).getByRole("heading", {
          name,
          level: 3,
        })
      ).toBeInTheDocument();
    });
  });

  it("displays product images with alternative text", () => {
    const { container } = renderHome();

    const productImages = container.querySelectorAll(
      ".featured-products .product-image img"
    );

    expect(productImages).toHaveLength(10);

    productImages.forEach((image) => {
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")).not.toBe("");
    });
  });

  it("displays product prices and ratings", () => {
    const { container } = renderHome();

    const featuredSection = container.querySelector(".featured-products");

    const expectedPrices = [
      "₹12,000",
      "₹45,000",
      "₹8,000",
      "₹18,999",
      "₹12,499",
      "₹60,000",
      "₹299",
      "₹199",
      "₹499",
      "₹349",
    ];

    expectedPrices.forEach((price) => {
      expect(
        within(featuredSection).getByText(price)
      ).toBeInTheDocument();
    });

    const ratings = featuredSection.querySelectorAll(".rating");

    expect(ratings).toHaveLength(10);
    expect(ratings[0]).toHaveTextContent("4.8");
    expect(ratings[5]).toHaveTextContent("4.9");
  });

  it("displays the correct product conditions", () => {
    const { container } = renderHome();

    const featuredSection = container.querySelector(".featured-products");

    const badges = featuredSection.querySelectorAll(".product-badge");

    expect(badges).toHaveLength(10);

    expect(
      within(featuredSection).getAllByText("Recyclable").length
    ).toBeGreaterThan(0);

    expect(
      within(featuredSection).getAllByText("Refurbished").length
    ).toBeGreaterThan(0);

    expect(
      within(featuredSection).getAllByText("Reusable").length
    ).toBeGreaterThan(0);
  });

  it("provides product detail links", () => {
    const { container } = renderHome();

    const productLinks = container.querySelectorAll(
      ".featured-products .product-image-link"
    );

    expect(productLinks).toHaveLength(10);
    expect(productLinks[0]).toHaveAttribute("href", "/products/1");
    expect(productLinks[9]).toHaveAttribute("href", "/products/10");
  });

  it("renders the View All Products link", () => {
    const { container } = renderHome();

    const featuredSection = container.querySelector(".featured-products");

    expect(
      within(featuredSection).getByRole("link", {
        name: /View All Products/i,
      })
    ).toHaveAttribute("href", "/products");
  });

  it("renders the campaign section", () => {
    const { container } = renderHome();

    const campaign = container.querySelector(".campaign");

    expect(
      within(campaign).getByRole("heading", {
        name: "Give Your Recyclables More Value",
      })
    ).toBeInTheDocument();

    expect(
      within(campaign).getByRole("link", {
        name: /Explore Materials/i,
      })
    ).toHaveAttribute("href", "/products");
  });

  it("renders the How It Works section", () => {
    const { container } = renderHome();

    const section = container.querySelector(".how-it-works");

    expect(
      within(section).getByRole("heading", {
        name: "How It Works",
      })
    ).toBeInTheDocument();

    expect(section.querySelectorAll(".step-card")).toHaveLength(4);
  });

  it("displays all four process steps", () => {
    const { container } = renderHome();

    const section = container.querySelector(".how-it-works");

    const steps = [
      "Explore",
      "Choose",
      "Connect",
      "Reuse / Recycle",
    ];

    steps.forEach((step) => {
      expect(
        within(section).getByRole("heading", {
          name: step,
          level: 3,
        })
      ).toBeInTheDocument();
    });
  });

  it("renders the Explore How It Works link", () => {
    const { container } = renderHome();

    const section = container.querySelector(".how-it-works");

    expect(
      within(section).getByRole("link", {
        name: /Explore How It Works/i,
      })
    ).toHaveAttribute("href", "/how-it-works");
  });

  it("renders the Benefits section", () => {
    const { container } = renderHome();

    const section = container.querySelector(".benefits");

    expect(
      within(section).getByRole("heading", {
        name: "Recycling & Service Benefits",
      })
    ).toBeInTheDocument();

    expect(section.querySelectorAll(".benefit-card")).toHaveLength(4);
  });

  it("displays all four benefits", () => {
    const { container } = renderHome();

    const section = container.querySelector(".benefits");

    const benefits = [
      "Easy Recycling",
      "Convenient Pickup",
      "Transparent Listings",
      "Sustainable Choices",
    ];

    benefits.forEach((benefit) => {
      expect(
        within(section).getByRole("heading", {
          name: benefit,
          level: 3,
        })
      ).toBeInTheDocument();
    });
  });

  it("renders the Explore All Benefits link", () => {
    const { container } = renderHome();

    const section = container.querySelector(".benefits");

    expect(
      within(section).getByRole("link", {
        name: /Explore All Benefits/i,
      })
    ).toHaveAttribute("href", "/benefits");
  });

  it("renders the Sustainability section", () => {
    const { container } = renderHome();

    const section = container.querySelector(".sustainability");

    expect(
      within(section).getByRole("heading", {
        name: "Small Actions. Big Impact.",
      })
    ).toBeInTheDocument();

    expect(
      within(section).getByRole("link", {
        name: /Discover Our Impact/i,
      })
    ).toHaveAttribute("href", "/sustainability");
  });

  it("renders the sustainability icon link", () => {
    const { container } = renderHome();

    const sustainabilityLink = container.querySelector(
      ".sustainability-icon"
    );

    expect(sustainabilityLink).toBeInTheDocument();

    expect(sustainabilityLink).toHaveAttribute(
      "aria-label",
      "Learn about sustainability"
    );

    expect(sustainabilityLink).toHaveAttribute(
      "href",
      "/sustainability"
    );
  });

  it("renders all main Home page sections", () => {
    const { container } = renderHome();

    const sections = [
      ".services",
      ".categories",
      ".featured-products",
      ".campaign",
      ".how-it-works",
      ".benefits",
      ".sustainability",
    ];

    sections.forEach((selector) => {
      expect(
        container.querySelector(selector)
      ).toBeInTheDocument();
    });
  });
});
