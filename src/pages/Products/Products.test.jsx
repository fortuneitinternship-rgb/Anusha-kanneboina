
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, within, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { ShopProvider } from "../../context/ShopContext";
import { products } from "../../data/products";
import Products from "./Products";

function LocationDisplay() {
  const location = useLocation();

  return (
    <div data-testid="current-location">
      {location.pathname}
    </div>
  );
}

function renderProducts(initialRoute = "/products") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ShopProvider>
        <Products />
        <LocationDisplay />
      </ShopProvider>
    </MemoryRouter>
  );
}

function getProductCards(container) {
  return Array.from(container.querySelectorAll(".product-card"));
}

function getCardByProductName(container, productName) {
  return getProductCards(container).find((card) =>
    card.querySelector("h3")?.textContent.includes(productName)
  );
}

function getDisplayedPrice(card) {
  return Number(
    card.querySelector(".product-price").textContent.replace(/[^\d]/g, "")
  );
}

describe("Products Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // ---------------- PAGE DISPLAY ----------------

  it("renders the Products page correctly", () => {
    const { container } = renderProducts();

    expect(container.querySelector(".products-page")).toBeInTheDocument();
    expect(
      within(container).getByRole("heading", {
        level: 1,
        name: "Explore Sustainable Products",
      })
    ).toBeInTheDocument();
  });

  it("displays the marketplace eyebrow text", () => {
    const { container } = renderProducts();

    expect(container.querySelector(".products-eyebrow"))
      .toHaveTextContent("RECYCONNECT MARKETPLACE");
  });

  it("displays the products subtitle", () => {
    const { container } = renderProducts();

    expect(container.querySelector(".products-subtitle"))
      .toHaveTextContent("Discover, reuse and give products a second life.");
  });

  it("displays the filter sidebar", () => {
    const { container } = renderProducts();

    expect(container.querySelector(".filter-sidebar")).toBeInTheDocument();
    expect(
      within(container.querySelector(".filter-sidebar"))
        .getByRole("heading", { name: "Filters" })
    ).toBeInTheDocument();
  });

  it("displays the product section heading", () => {
    const { container } = renderProducts();

    expect(
      within(container.querySelector(".products-main"))
        .getByRole("heading", { name: "Our Products" })
    ).toBeInTheDocument();
  });

  it("displays all available products initially", () => {
    const { container } = renderProducts();

    expect(getProductCards(container)).toHaveLength(products.length);
  });

  it("displays the correct product count", () => {
    const { container } = renderProducts();

    expect(container.querySelector(".products-toolbar-title"))
      .toHaveTextContent(`Showing ${products.length} of ${products.length} products`);
  });

  // ---------------- PRODUCT CARD ----------------

  it("displays product names", () => {
    const { container } = renderProducts();

    products.forEach((product) => {
      expect(getCardByProductName(container, product.name))
        .toBeTruthy();
    });
  });

  it("displays product images with correct alt text", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);
    const image = card.querySelector(".product-image img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", firstProduct.name);
    expect(image).toHaveAttribute("src", firstProduct.image);
  });

  it("displays product categories", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);

    expect(card.querySelector(".product-category")).toBeInTheDocument();
  });

  it("displays product descriptions", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);

    expect(card.querySelector(".product-description")).toBeInTheDocument();
    expect(card.querySelector(".product-description").textContent.length)
      .toBeGreaterThan(0);
  });

  it("displays product ratings", () => {
    const { container } = renderProducts();

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".product-rating")).toBeInTheDocument();
      expect(
        Number(card.querySelector(".product-rating strong").textContent)
      ).toBeGreaterThanOrEqual(0);
    });
  });

  it("displays product prices", () => {
    const { container } = renderProducts();

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".product-price")).toHaveTextContent("₹");
    });
  });

  it("displays stock information for products", () => {
    const { container } = renderProducts();

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".stock-status")).toBeInTheDocument();
    });
  });

  it("provides product details links", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);

    expect(
      card.querySelector(".product-title-link")
    ).toHaveAttribute("href", `/products/${firstProduct.id}`);

    expect(
      card.querySelector(".view-details-link")
    ).toHaveAttribute("href", `/products/${firstProduct.id}`);
  });

  // ---------------- SEARCH ----------------

  it("renders the product search input", () => {
    const { container } = renderProducts();

    expect(
      within(container).getByRole("searchbox", {
        name: "Search products",
      })
    ).toBeInTheDocument();
  });

  it("filters products by product name", () => {
    const { container } = renderProducts();

    const searchInput = within(container).getByRole("searchbox", {
      name: "Search products",
    });

    fireEvent.change(searchInput, {
      target: { value: products[0].name },
    });

    expect(getProductCards(container)).toHaveLength(1);
    expect(getProductCards(container)[0]).toHaveTextContent(products[0].name);
  });

  it("filters products by category name through search", () => {
    const { container } = renderProducts();

    const searchInput = within(container).getByRole("searchbox", {
      name: "Search products",
    });

    fireEvent.change(searchInput, {
      target: { value: "Plastic" },
    });

    const cards = getProductCards(container);

    expect(cards.length).toBeGreaterThan(0);

    cards.forEach((card) => {
      expect(card.querySelector(".product-category"))
        .toHaveTextContent(/plastic/i);
    });
  });

  it("shows an empty message when search has no matching products", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("searchbox", {
        name: "Search products",
      }),
      { target: { value: "NoMatchingProduct12345" } }
    );

    expect(container.querySelector(".no-products")).toBeInTheDocument();
    expect(container.querySelector(".no-products"))
      .toHaveTextContent("No Products Found");
  });

  it("initializes search from the URL query parameter", () => {
    const { container } = renderProducts("/products?query=Plastic");

    const searchInput = within(container).getByRole("searchbox", {
      name: "Search products",
    });

    expect(searchInput).toHaveValue("Plastic");
  });

  // ---------------- CATEGORY FILTER ----------------

  it("displays all category filter options", () => {
    const { container } = renderProducts();

    const sidebar = container.querySelector(".filter-sidebar");

    ["All Categories", "Plastic", "Metal", "Paper", "E-Waste", "Textile", "Other"]
      .forEach((category) => {
        expect(within(sidebar).getByText(category)).toBeInTheDocument();
      });
  });

  it("filters products by Plastic category", () => {
    const { container } = renderProducts();

    const plasticRadio = Array.from(
      container.querySelectorAll('input[name="category"]')
    ).find((radio) =>
      radio.closest("label")?.textContent.trim() === "Plastic"
    );

    fireEvent.click(plasticRadio);

    const cards = getProductCards(container);

    expect(cards.length).toBeGreaterThan(0);

    cards.forEach((card) => {
      expect(card.querySelector(".product-category"))
        .toHaveTextContent(/^Plastic$/i);
    });
  });

  it("filters products by the selected category", () => {
    const { container } = renderProducts();

    const metalRadio = Array.from(
      container.querySelectorAll('input[name="category"]')
    ).find((radio) =>
      radio.closest("label")?.textContent.trim() === "Metal"
    );

    fireEvent.click(metalRadio);

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".product-category"))
        .toHaveTextContent(/^Metal$/i);
    });
  });

  // ---------------- PRICE FILTER ----------------

  it("renders minimum and maximum price range inputs", () => {
    const { container } = renderProducts();

    expect(container.querySelector("#min-price")).toBeInTheDocument();
    expect(container.querySelector("#max-price")).toBeInTheDocument();
  });

  it("filters products using the minimum price", () => {
    const { container } = renderProducts();

    fireEvent.change(container.querySelector("#min-price"), {
      target: { value: "1000" },
    });

    getProductCards(container).forEach((card) => {
      expect(getDisplayedPrice(card)).toBeGreaterThanOrEqual(1000);
    });
  });

  it("filters products using the maximum price", () => {
    const { container } = renderProducts();

    fireEvent.change(container.querySelector("#max-price"), {
      target: { value: "5000" },
    });

    getProductCards(container).forEach((card) => {
      expect(getDisplayedPrice(card)).toBeLessThanOrEqual(5000);
    });
  });

  // ---------------- CONDITION FILTER ----------------

  it("displays all condition filter options", () => {
    const { container } = renderProducts();

    const sidebar = container.querySelector(".filter-sidebar");

    ["All", "New", "Used", "Refurbished"].forEach((condition) => {
      expect(within(sidebar).getByText(condition)).toBeInTheDocument();
    });
  });

  it("filters products by condition when matching products exist", () => {
    const matchingProduct = products.find(
      (product) => product.condition
    );

    if (!matchingProduct) return;

    const { container } = renderProducts();

    const conditionRadio = Array.from(
      container.querySelectorAll('input[name="condition"]')
    ).find((radio) =>
      radio.closest("label")?.textContent.trim().toLowerCase() ===
      matchingProduct.condition.toLowerCase()
    );

    if (!conditionRadio) return;

    fireEvent.click(conditionRadio);

    getProductCards(container).forEach((card) => {
      const productName = card.querySelector("h3").textContent;
      const product = products.find((item) => item.name === productName);

      expect(product.condition.toLowerCase()).toBe(
        matchingProduct.condition.toLowerCase()
      );
    });
  });

  // ---------------- RATING FILTER ----------------

  it("displays customer rating filter options", () => {
    const { container } = renderProducts();

    const sidebar = container.querySelector(".filter-sidebar");

    expect(within(sidebar).getByText("All Ratings")).toBeInTheDocument();
    expect(within(sidebar).getByText("4★ & above")).toBeInTheDocument();
    expect(within(sidebar).getByText("3★ & above")).toBeInTheDocument();
    expect(within(sidebar).getByText("2★ & above")).toBeInTheDocument();
    expect(within(sidebar).getByText("1★ & above")).toBeInTheDocument();
  });

  it("filters products by minimum rating", () => {
    const { container } = renderProducts();

    const fourStarRadio = container.querySelectorAll('input[name="rating"]')[1];

    fireEvent.click(fourStarRadio);

    getProductCards(container).forEach((card) => {
      const rating = Number(
        card.querySelector(".product-rating strong").textContent
      );

      expect(rating).toBeGreaterThanOrEqual(4);
    });
  });

  // ---------------- STOCK FILTER ----------------

  it("renders the in-stock checkbox", () => {
    const { container } = renderProducts();

    expect(
      within(container).getByRole("checkbox", {
        name: "In-stock products only",
      })
    ).toBeInTheDocument();
  });

  it("filters out products that are out of stock", () => {
    const { container } = renderProducts();

    fireEvent.click(
      within(container).getByRole("checkbox", {
        name: "In-stock products only",
      })
    );

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".stock-status"))
        .not.toHaveTextContent("Out of stock");
    });
  });

  // ---------------- SORTING ----------------

  it("renders the sorting dropdown", () => {
    const { container } = renderProducts();

    expect(
      within(container).getByRole("combobox", {
        name: "Sort products",
      })
    ).toBeInTheDocument();
  });

  it("sorts products by price from low to high", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("combobox", {
        name: "Sort products",
      }),
      { target: { value: "low-high" } }
    );

    const prices = getProductCards(container).map(getDisplayedPrice);

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("sorts products by price from high to low", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("combobox", {
        name: "Sort products",
      }),
      { target: { value: "high-low" } }
    );

    const prices = getProductCards(container).map(getDisplayedPrice);

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it("sorts products by rating from highest to lowest", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("combobox", {
        name: "Sort products",
      }),
      { target: { value: "rating" } }
    );

    const ratings = getProductCards(container).map((card) =>
      Number(card.querySelector(".product-rating strong").textContent)
    );

    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it("sorts products alphabetically by name", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("combobox", {
        name: "Sort products",
      }),
      { target: { value: "name" } }
    );

    const names = getProductCards(container).map(
      (card) => card.querySelector("h3").textContent
    );

    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  // ---------------- CLEAR FILTERS ----------------

  it("clears search and filters using Clear All", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("searchbox", {
        name: "Search products",
      }),
      { target: { value: "NoMatchingProduct12345" } }
    );

    expect(container.querySelector(".no-products")).toBeInTheDocument();

    fireEvent.click(
      within(container.querySelector(".filter-sidebar"))
        .getByRole("button", { name: "Clear All" })
    );

    expect(
      within(container).getByRole("searchbox", {
        name: "Search products",
      })
    ).toHaveValue("");

    expect(getProductCards(container)).toHaveLength(products.length);
  });

  it("clears filters using the empty results button", () => {
    const { container } = renderProducts();

    fireEvent.change(
      within(container).getByRole("searchbox", {
        name: "Search products",
      }),
      { target: { value: "NoMatchingProduct12345" } }
    );

    fireEvent.click(
      within(container.querySelector(".no-products"))
        .getByRole("button", { name: "Clear Filters" })
    );

    expect(getProductCards(container)).toHaveLength(products.length);
  });

  // ---------------- WISHLIST ----------------

  it("displays a wishlist button for every product", () => {
    const { container } = renderProducts();

    getProductCards(container).forEach((card) => {
      expect(card.querySelector(".wishlist-btn")).toBeInTheDocument();
    });
  });

  it("adds a product to the wishlist", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Add ${firstProduct.name} to wishlist`,
      })
    );

    expect(
      within(card).getByRole("button", {
        name: `Remove ${firstProduct.name} from wishlist`,
      })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("removes a product from the wishlist", () => {
    const { container } = renderProducts();

    const firstProduct = products[0];
    const card = getCardByProductName(container, firstProduct.name);

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Add ${firstProduct.name} to wishlist`,
      })
    );

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Remove ${firstProduct.name} from wishlist`,
      })
    );

    expect(
      within(card).getByRole("button", {
        name: `Add ${firstProduct.name} to wishlist`,
      })
    ).toHaveAttribute("aria-pressed", "false");
  });

  // ---------------- CART ----------------

  it("displays Add to Cart for an available product", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 0
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    expect(
      within(card).getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  it("adds a product to the cart", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 0
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    fireEvent.click(
      within(card).getByRole("button", { name: "Add to Cart" })
    );

    expect(card.querySelector(".product-quantity")).toBeInTheDocument();
    expect(card.querySelector(".quantity-value")).toHaveTextContent("1");
  });

  it("increases the cart quantity", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 1
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    fireEvent.click(
      within(card).getByRole("button", { name: "Add to Cart" })
    );

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Increase ${availableProduct.name} quantity`,
      })
    );

    expect(card.querySelector(".quantity-value")).toHaveTextContent("2");
  });

  it("decreases the cart quantity", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 1
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    fireEvent.click(
      within(card).getByRole("button", { name: "Add to Cart" })
    );

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Increase ${availableProduct.name} quantity`,
      })
    );

    fireEvent.click(
      within(card).getByRole("button", {
        name: `Decrease ${availableProduct.name} quantity`,
      })
    );

    expect(card.querySelector(".quantity-value")).toHaveTextContent("1");
  });

  it("disables the increase button when maximum stock is reached", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 0
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    fireEvent.click(
      within(card).getByRole("button", { name: "Add to Cart" })
    );

    for (let index = 1; index < Number(availableProduct.stock); index++) {
      fireEvent.click(
        within(card).getByRole("button", {
          name: `Increase ${availableProduct.name} quantity`,
        })
      );
    }

    expect(
      within(card).getByRole("button", {
        name: `Increase ${availableProduct.name} quantity`,
      })
    ).toBeDisabled();
  });

  it("does not add an out-of-stock product to the cart", () => {
    const unavailableProduct = products.find(
      (product) => Number(product.stock) <= 0
    );

    if (!unavailableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, unavailableProduct.name);

    expect(
      within(card).getByRole("button", { name: "Out of Stock" })
    ).toBeDisabled();
  });

  // ---------------- BUY NOW ----------------

  it("displays Buy Now buttons", () => {
    const { container } = renderProducts();

    getProductCards(container).forEach((card) => {
      expect(
        within(card).getByRole("button", { name: "Buy Now" })
      ).toBeInTheDocument();
    });
  });

  it("navigates to Checkout when Buy Now is clicked", () => {
    const availableProduct = products.find(
      (product) => Number(product.stock) > 0
    );

    if (!availableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, availableProduct.name);

    fireEvent.click(
      within(card).getByRole("button", { name: "Buy Now" })
    );

    expect(container.querySelector('[data-testid="current-location"]'))
      .toHaveTextContent("/checkout");
  });

  it("disables Buy Now for an out-of-stock product", () => {
    const unavailableProduct = products.find(
      (product) => Number(product.stock) <= 0
    );

    if (!unavailableProduct) return;

    const { container } = renderProducts();
    const card = getCardByProductName(container, unavailableProduct.name);

    expect(
      within(card).getByRole("button", { name: "Buy Now" })
    ).toBeDisabled();
  });
});
