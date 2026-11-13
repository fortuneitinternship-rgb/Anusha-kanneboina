
import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Categories from "./Categories";

describe("Categories Component", () => {
  let container;

  beforeEach(() => {
    const result = render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    container = result.container;
  });

  it("renders the Categories page", () => {
    expect(container.querySelector(".categories-page")).toBeInTheDocument();
  });

  it("displays the page heading", () => {
    expect(
      within(container).getByRole("heading", {
        name: "Explore Material Categories",
      })
    ).toBeInTheDocument();
  });

  it("displays all six categories initially", () => {
    expect(container.querySelectorAll(".material-card")).toHaveLength(6);
  });

  it("displays the correct initial category count", () => {
    expect(container.querySelector(".showing-count")).toHaveTextContent(
      "Showing 6 of 6 categories"
    );
  });

  it("displays all category names", () => {
    const names = ["Plastic", "Metal", "Paper", "E-Waste", "Textile", "Other"];

    names.forEach((name) => {
      expect(
        within(container).getByRole("heading", { name })
      ).toBeInTheDocument();
    });
  });

  it("filters categories by search input", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "Plastic" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(1);
    expect(container.querySelector(".showing-count")).toHaveTextContent(
      "Showing 1 of 6 categories"
    );
  });

  it("searches categories without case sensitivity", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "plastic" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(1);
  });

  it("searches using material names", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "Copper" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(1);
    expect(container.querySelector(".material-card")).toHaveTextContent("Metal");
  });

  it("searches using category descriptions", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "newspapers" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(1);
    expect(container.querySelector(".material-card")).toHaveTextContent("Paper");
  });

  it("shows no categories for an unmatched search", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "UnknownMaterial123" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(0);
    expect(
      within(container).getByRole("heading", {
        name: "No Categories Found",
      })
    ).toBeInTheDocument();
  });

  it("filters categories using the dropdown", () => {
    const filterSelect = within(container).getByRole("combobox", {
      name: "Filter categories",
    });

    fireEvent.change(filterSelect, {
      target: { value: "Metal" },
    });

    expect(container.querySelectorAll(".material-card")).toHaveLength(1);
    expect(container.querySelector(".material-card")).toHaveTextContent("Metal");
  });

  it("clears the search using the clear search button", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "Plastic" },
    });

    fireEvent.click(
      within(container).getByRole("button", {
        name: "Clear search",
      })
    );

    expect(searchInput).toHaveValue("");
    expect(container.querySelectorAll(".material-card")).toHaveLength(6);
  });

  it("resets search and category filters", () => {
    const searchInput = within(container).getByRole("textbox", {
      name: "Search categories",
    });

    const filterSelect = within(container).getByRole("combobox", {
      name: "Filter categories",
    });

    fireEvent.change(searchInput, {
      target: { value: "Metal" },
    });

    fireEvent.change(filterSelect, {
      target: { value: "Metal" },
    });

    fireEvent.click(
      within(container).getByRole("button", { name: "Reset" })
    );

    expect(searchInput).toHaveValue("");
    expect(filterSelect).toHaveValue("All");
    expect(container.querySelectorAll(".material-card")).toHaveLength(6);
  });

  it("displays category images with alt text", () => {
    const images = container.querySelectorAll(".material-card-image img");

    expect(images).toHaveLength(6);

    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("displays Explore Products link", () => {
    expect(
      within(container).getByRole("link", { name: /Explore Products/i })
    ).toHaveAttribute("href", "/products");
  });

  it("displays the bottom Start Exploring link", () => {
    expect(
      within(container).getByRole("link", { name: /Start Exploring/i })
    ).toHaveAttribute("href", "/products");
  });

  it("provides category-specific product links", () => {
    const plasticLink = within(container).getByRole("link", {
      name: /Explore Plastic/i,
    });

    expect(plasticLink).toHaveAttribute(
      "href",
      "/products?category=Plastic"
    );
  });

  it("displays the breadcrumb navigation", () => {
    expect(
      within(container).getByRole("link", { name: "Home" })
    ).toHaveAttribute("href", "/");
  });
});
