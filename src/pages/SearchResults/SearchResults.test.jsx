
import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import SearchResults from "./SearchResults";
import { ShopProvider } from "../../context/ShopContext";
import { products } from "../../data/products";

function renderSearchResults(query = "") {
  return render(
    <ShopProvider>
      <MemoryRouter
        initialEntries={[
          `/search${query ? `?query=${encodeURIComponent(query)}` : ""}`,
        ]}
      >
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    </ShopProvider>
  );
}

describe("SearchResults Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // PAGE RENDERING

  it("renders the Search Results heading", () => {
    renderSearchResults();

    expect(
      screen.getByRole("heading", { name: "Search Results" })
    ).toBeInTheDocument();
  });

  it("renders the main page container", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".search-results-page")
    ).toBeInTheDocument();
  });

  it("renders the breadcrumb", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".search-breadcrumb")
    ).toHaveTextContent("Home");
  });

  it("renders the discovery eyebrow", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".search-eyebrow")
    ).toHaveTextContent("RECYCONNECT PRODUCT DISCOVERY");
  });

  it("renders the filter sidebar", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".filter-sidebar")
    ).toBeInTheDocument();
  });

  it("renders the results section", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".results-content")
    ).toBeInTheDocument();
  });

  it("renders the results toolbar", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".results-toolbar")
    ).toBeInTheDocument();
  });

  // CATEGORY FILTERS

  it("displays all six category options", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const categories = [
      "Plastic",
      "Metal",
      "Paper",
      "E-Waste",
      "Textile",
      "Other",
    ];

    categories.forEach((category) => {
      expect(
        within(sidebar).getByLabelText(category)
      ).toBeInTheDocument();
    });
  });

  it("allows selecting Plastic category", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const checkbox = within(sidebar).getByLabelText("Plastic");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("allows deselecting a category", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const checkbox = within(sidebar).getByLabelText("Plastic");

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it("filters displayed products by category", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.click(
      within(sidebar).getByLabelText("Plastic")
    );

    const cards = container.querySelectorAll(".search-product-card");

    cards.forEach((card) => {
      expect(
        card.querySelector(".product-category")
      ).toHaveTextContent("Plastic");
    });
  });

  // CONDITION FILTERS

  it("displays all product condition options", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    ["New", "Used", "Recycled", "Refurbished", "Reusable"].forEach(
      (condition) => {
        expect(
          within(sidebar).getByLabelText(condition)
        ).toBeInTheDocument();
      }
    );
  });

  it("allows selecting a product condition", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const checkbox = within(sidebar).getByLabelText("Used");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it("allows deselecting a product condition", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const checkbox = within(sidebar).getByLabelText("Used");

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  // PRICE FILTERS

  it("renders minimum and maximum price inputs", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    expect(
      within(sidebar).getByPlaceholderText("Min")
    ).toBeInTheDocument();

    expect(
      within(sidebar).getByPlaceholderText("Max")
    ).toBeInTheDocument();
  });

  it("accepts minimum price input", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const input = within(sidebar).getByPlaceholderText("Min");

    fireEvent.change(input, {
      target: { value: "100" },
    });

    expect(input).toHaveValue(100);
  });

  it("accepts maximum price input", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const input = within(sidebar).getByPlaceholderText("Max");

    fireEvent.change(input, {
      target: { value: "5000" },
    });

    expect(input).toHaveValue(5000);
  });

  it("filters products using the minimum price", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.change(
      within(sidebar).getByPlaceholderText("Min"),
      { target: { value: "1000" } }
    );

    container.querySelectorAll(".search-product-price").forEach((element) => {
      const price = Number(element.textContent.replace(/[^\d.]/g, ""));
      expect(price).toBeGreaterThanOrEqual(1000);
    });
  });

  it("filters products using the maximum price", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.change(
      within(sidebar).getByPlaceholderText("Max"),
      { target: { value: "100000" } }
    );

    container.querySelectorAll(".search-product-price").forEach((element) => {
      const price = Number(element.textContent.replace(/[^\d.]/g, ""));
      expect(price).toBeLessThanOrEqual(100000);
    });
  });

  // AVAILABILITY FILTERS

  it("renders all availability options", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    expect(
      within(sidebar).getByLabelText("Available in Stock")
    ).toBeInTheDocument();

    expect(
      within(sidebar).getByLabelText("Out of Stock")
    ).toBeInTheDocument();

    expect(
      within(sidebar).getByLabelText("Show All")
    ).toBeInTheDocument();
  });

  it("selects Available in Stock by default", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    expect(
      within(sidebar).getByLabelText("Available in Stock")
    ).toBeChecked();
  });

  it("allows selecting Out of Stock", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const option = within(sidebar).getByLabelText("Out of Stock");

    fireEvent.click(option);

    expect(option).toBeChecked();
  });

  it("allows selecting Show All", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const option = within(sidebar).getByLabelText("Show All");

    fireEvent.click(option);

    expect(option).toBeChecked();
  });

  it("shows available products by default", () => {
    const { container } = renderSearchResults();

    container.querySelectorAll(".stock-status").forEach((element) => {
      expect(element).not.toHaveTextContent("Out of Stock");
    });
  });

  // SEARCH FUNCTIONALITY

  it("displays the supplied search query", () => {
    const { container } = renderSearchResults("plastic");

    expect(
      container.querySelector(".search-header-box")
    ).toHaveTextContent('Products matching "plastic"');
  });

  it("displays the query in active filters", () => {
    const { container } = renderSearchResults("plastic");

    expect(
      container.querySelector(".active-filters")
    ).toHaveTextContent("plastic");
  });

  it("displays an empty state for an unmatched query", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    expect(
      container.querySelector(".empty-search-results")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "No Products Found" })
    ).toBeInTheDocument();
  });

  it("displays the empty state message", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    expect(
      container.querySelector(".empty-search-results")
    ).toHaveTextContent("We couldn't find products");
  });

  // SORTING

  it("renders the sorting dropdown", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector("#sort-products")
    ).toBeInTheDocument();
  });

  it("uses Relevance as the default sorting option", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector("#sort-products")
    ).toHaveValue("relevance");
  });

  it("allows sorting by lowest price", () => {
    const { container } = renderSearchResults();
    const select = container.querySelector("#sort-products");

    fireEvent.change(select, {
      target: { value: "low" },
    });

    expect(select).toHaveValue("low");

    const prices = Array.from(
      container.querySelectorAll(".search-product-price")
    ).map((element) =>
      Number(element.textContent.replace(/[^\d.]/g, ""))
    );

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("allows sorting by highest price", () => {
    const { container } = renderSearchResults();
    const select = container.querySelector("#sort-products");

    fireEvent.change(select, {
      target: { value: "high" },
    });

    expect(select).toHaveValue("high");

    const prices = Array.from(
      container.querySelectorAll(".search-product-price")
    ).map((element) =>
      Number(element.textContent.replace(/[^\d.]/g, ""))
    );

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it("allows sorting by rating", () => {
    const { container } = renderSearchResults();
    const select = container.querySelector("#sort-products");

    fireEvent.change(select, {
      target: { value: "rating" },
    });

    expect(select).toHaveValue("rating");
  });

  it("allows sorting by product name", () => {
    const { container } = renderSearchResults();
    const select = container.querySelector("#sort-products");

    fireEvent.change(select, {
      target: { value: "name" },
    });

    expect(select).toHaveValue("name");
  });

  // PRODUCT CARDS

  it("renders product cards", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".search-product-card").length
    ).toBeGreaterThan(0);
  });

  it("renders product images with alt text", () => {
    const { container } = renderSearchResults();

    const images = container.querySelectorAll(".search-product-image img");

    expect(images.length).toBeGreaterThan(0);

    images.forEach((image) => {
      expect(image).toHaveAttribute("src");
      expect(image).toHaveAttribute("alt");
    });
  });

  it("renders product names", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".search-product-title h3").length
    ).toBeGreaterThan(0);
  });

  it("renders product categories", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".product-category").length
    ).toBeGreaterThan(0);
  });

  it("renders product prices", () => {
    const { container } = renderSearchResults();

    const prices = container.querySelectorAll(".search-product-price");

    expect(prices.length).toBeGreaterThan(0);

    prices.forEach((price) => {
      expect(price).toHaveTextContent("₹");
    });
  });

  it("renders product ratings", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".search-product-rating").length
    ).toBeGreaterThan(0);
  });

  it("renders stock information", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".stock-status").length
    ).toBeGreaterThan(0);
  });

  it("renders View Details links", () => {
    const { container } = renderSearchResults();

    const links = container.querySelectorAll(".product-card-actions a");

    expect(links.length).toBeGreaterThan(0);

    links.forEach((link) => {
      expect(link).toHaveTextContent("VIEW DETAILS");
      expect(link.getAttribute("href")).toMatch(/^\/products\//);
    });
  });

  it("renders Add to Cart buttons", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelectorAll(".product-card-actions button").length
    ).toBeGreaterThan(0);
  });

  // CART FUNCTIONALITY

  it("adds an available product to the cart", () => {
    const { container } = renderSearchResults();

    const card = Array.from(
      container.querySelectorAll(".search-product-card")
    ).find((element) => {
      const stock = element.querySelector(".stock-status");
      return stock && !stock.textContent.includes("Out of Stock");
    });

    if (!card) return;

    const button = card.querySelector(".product-card-actions button");

    fireEvent.click(button);

    expect(button).toHaveTextContent("ADD MORE");
  });

  it("disables Add to Cart for out-of-stock products", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.click(
      within(sidebar).getByLabelText("Show All")
    );

    const cards = container.querySelectorAll(".search-product-card");

    cards.forEach((card) => {
      const stock = card.querySelector(".stock-status");

      if (stock?.textContent.includes("Out of Stock")) {
        expect(
          card.querySelector(".product-card-actions button")
        ).toBeDisabled();
      }
    });
  });

  // CLEAR FILTERS

  it("renders the Clear All button", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    expect(
      within(sidebar).getByRole("button", { name: "Clear All" })
    ).toBeInTheDocument();
  });

  it("renders the CLEAR ALL button", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    expect(
      within(sidebar).getByRole("button", { name: "CLEAR ALL" })
    ).toBeInTheDocument();
  });

  it("clears selected category filters", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const checkbox = within(sidebar).getByLabelText("Plastic");

    fireEvent.click(checkbox);

    fireEvent.click(
      within(sidebar).getByRole("button", { name: "Clear All" })
    );

    expect(checkbox).not.toBeChecked();
  });

  it("clears minimum and maximum price filters", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    const min = within(sidebar).getByPlaceholderText("Min");
    const max = within(sidebar).getByPlaceholderText("Max");

    fireEvent.change(min, { target: { value: "100" } });
    fireEvent.change(max, { target: { value: "5000" } });

    fireEvent.click(
      within(sidebar).getByRole("button", { name: "Clear All" })
    );

    expect(min).toHaveValue(null);
    expect(max).toHaveValue(null);
  });

  it("resets availability when filters are cleared", () => {
    const { container } = renderSearchResults();
    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.click(
      within(sidebar).getByLabelText("Show All")
    );

    fireEvent.click(
      within(sidebar).getByRole("button", { name: "Clear All" })
    );

    expect(
      within(sidebar).getByLabelText("Available in Stock")
    ).toBeChecked();
  });

  it("resets sorting when filters are cleared", () => {
    const { container } = renderSearchResults();
    const select = container.querySelector("#sort-products");

    fireEvent.change(select, {
      target: { value: "low" },
    });

    const sidebar = container.querySelector(".filter-sidebar");

    fireEvent.click(
      within(sidebar).getByRole("button", { name: "Clear All" })
    );

    expect(select).toHaveValue("relevance");
  });

  // PAGINATION

  it("shows pagination when more than six products match", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (pagination) {
      expect(pagination).toBeInTheDocument();
      expect(pagination).toHaveTextContent("Page 1 of");
    } else {
      expect(
        container.querySelectorAll(".search-product-card").length
      ).toBeLessThanOrEqual(6);
    }
  });

  it("does not show pagination for an empty result", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    expect(
      container.querySelector(".search-pagination")
    ).not.toBeInTheDocument();
  });

  it("disables Previous on the first page", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    expect(
      within(pagination).getByRole("button", { name: "Previous" })
    ).toBeDisabled();
  });

  it("moves to the next page", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    const next = within(pagination).getByRole("button", { name: "Next" });

    if (next.disabled) return;

    fireEvent.click(next);

    expect(pagination).toHaveTextContent("Page 2 of");
  });

  it("moves back to the previous page", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    const next = within(pagination).getByRole("button", { name: "Next" });

    if (next.disabled) return;

    fireEvent.click(next);

    fireEvent.click(
      within(pagination).getByRole("button", { name: "Previous" })
    );

    expect(pagination).toHaveTextContent("Page 1 of");
  });

  it("disables Next on the last page", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    const next = within(pagination).getByRole("button", { name: "Next" });

    while (!next.disabled) {
      fireEvent.click(next);
    }

    expect(next).toBeDisabled();

    const pageInfo = pagination.textContent.match(/Page (\d+) of (\d+)/);

    expect(pageInfo).not.toBeNull();
    expect(pageInfo[1]).toBe(pageInfo[2]);
  });

  it("allows direct navigation to a numbered page", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    const pageTwo = within(pagination).queryByRole("button", {
      name: "2",
    });

    if (!pageTwo) return;

    fireEvent.click(pageTwo);

    expect(pagination).toHaveTextContent("Page 2 of");
  });

  it("resets to page one after changing sort order", () => {
    const { container } = renderSearchResults();

    const pagination = container.querySelector(".search-pagination");

    if (!pagination) return;

    const next = within(pagination).getByRole("button", { name: "Next" });

    if (!next.disabled) {
      fireEvent.click(next);
    }

    fireEvent.change(container.querySelector("#sort-products"), {
      target: { value: "low" },
    });

    expect(pagination).toHaveTextContent("Page 1 of");
  });

  // RESULTS COUNT

  it("displays the total results count", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".search-header-bottom")
    ).toHaveTextContent("results found");
  });

  it("displays the current results range", () => {
    const { container } = renderSearchResults();

    expect(
      container.querySelector(".results-toolbar")
    ).toHaveTextContent("Showing");
  });

  it("displays zero results for an unmatched query", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    expect(
      container.querySelector(".search-header-bottom")
    ).toHaveTextContent("0 results found");
  });

  // EMPTY STATE

  it("renders the CLEAR FILTERS button in the empty state", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    const emptyState = container.querySelector(".empty-search-results");

    expect(
      within(emptyState).getByRole("button", { name: "CLEAR FILTERS" })
    ).toBeInTheDocument();
  });

  it("allows clicking CLEAR FILTERS in the empty state", () => {
    const { container } = renderSearchResults("unknownxyz987654");

    const emptyState = container.querySelector(".empty-search-results");

    fireEvent.click(
      within(emptyState).getByRole("button", { name: "CLEAR FILTERS" })
    );

    expect(
      container.querySelector(".search-results-page")
    ).toBeInTheDocument();
  });
});
