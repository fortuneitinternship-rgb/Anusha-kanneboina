
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import {
  render,
  within,
  fireEvent,
} from "@testing-library/react";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import "@testing-library/jest-dom";

import ProductDetails from "./ProductDetails";
import { products } from "../../data/products";
import { ShopProvider } from "../../context/ShopContext";

const product = products[0];

const renderProductDetails = (id = product.id) => {
  return render(
    <ShopProvider>
      <MemoryRouter initialEntries={[`/products/${id}`]}>
        <Routes>
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />
          <Route
            path="/products"
            element={<h1>Products Page</h1>}
          />
          <Route
            path="/checkout"
            element={<h1>Checkout Page</h1>}
          />
          <Route
            path="/"
            element={<h1>Home Page</h1>}
          />
        </Routes>
      </MemoryRouter>
    </ShopProvider>
  );
};

describe("ProductDetails Component", () => {
  let alertMock;

  beforeEach(() => {
    window.localStorage.clear();
    alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Product Rendering", () => {
    it("renders the ProductDetails page correctly", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-page")
      ).toBeInTheDocument();
    });

    it("displays the product name", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".details-content")).getByRole(
          "heading",
          { level: 1, name: product.name }
        )
      ).toBeInTheDocument();
    });

    it("displays the product category", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-category")
      ).toHaveTextContent(
        new RegExp(product.category, "i")
      );
    });

    it("displays the product price", () => {
      const { container } = renderProductDetails();

      const expectedPrice = Number(product.price).toLocaleString("en-IN");

      expect(
        container.querySelector(".details-price")
      ).toHaveTextContent(`₹${expectedPrice}`);
    });

    it("displays the product description", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-description")
      ).toBeInTheDocument();

      expect(
        container.querySelector(".details-description")
      ).not.toBeEmptyDOMElement();
    });

    it("displays the product rating", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-rating")
      ).toBeInTheDocument();

      expect(
        container.querySelector(".details-rating strong")
      ).toHaveTextContent(
        Number(product.rating || 0).toFixed(1)
      );
    });

    it("displays the product availability", () => {
      const { container } = renderProductDetails();

      const availability = container.querySelector(
        ".details-product-meta"
      );

      expect(availability).toHaveTextContent("Availability:");

      if (Number(product.stock) > 0) {
        expect(availability).toHaveTextContent(
          `${product.stock} available`
        );
      } else {
        expect(availability).toHaveTextContent("Out of stock");
      }
    });

    it("displays product condition information", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-product-meta")
      ).toHaveTextContent(
        product.condition || "Not specified"
      );
    });

    it("displays the RecyConnect Green Deal section", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".details-offer")).getByRole(
          "heading",
          { name: /RecyConnect Green Deal/i }
        )
      ).toBeInTheDocument();
    });
  });

  describe("Breadcrumb Navigation", () => {
    it("renders the breadcrumb section", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-breadcrumb")
      ).toBeInTheDocument();
    });

    it("displays the Home breadcrumb link", () => {
      const { container } = renderProductDetails();

      expect(
        within(
          container.querySelector(".details-breadcrumb")
        ).getByRole("link", { name: "Home" })
      ).toHaveAttribute("href", "/");
    });

    it("displays the Products breadcrumb link", () => {
      const { container } = renderProductDetails();

      expect(
        within(
          container.querySelector(".details-breadcrumb")
        ).getByRole("link", { name: "Products" })
      ).toHaveAttribute("href", "/products");
    });

    it("displays the current product name in breadcrumb", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-breadcrumb")
      ).toHaveTextContent(product.name);
    });
  });

  describe("Product Image Gallery", () => {
    it("renders the main product image", () => {
      const { container } = renderProductDetails();

      const mainImage = container.querySelector(
        ".details-main-image img"
      );

      const expectedImage =
        product.images?.length > 0
          ? product.images[0]
          : product.image;

      expect(mainImage).toBeInTheDocument();
      expect(mainImage).toHaveAttribute("src", expectedImage);
      expect(mainImage).toHaveAttribute("alt", product.name);
    });

    it("renders product thumbnail buttons", () => {
      const { container } = renderProductDetails();

      const thumbnails = container.querySelectorAll(
        ".details-thumbnails .thumbnail"
      );

      const expectedCount =
        product.images?.length > 0
          ? product.images.length
          : 1;

      expect(thumbnails).toHaveLength(expectedCount);
    });

    it("marks the first thumbnail as active", () => {
      const { container } = renderProductDetails();

      const thumbnails = container.querySelectorAll(
        ".details-thumbnails .thumbnail"
      );

      expect(thumbnails[0]).toHaveClass("active-thumbnail");
    });

    it("changes the main image when another thumbnail is selected", () => {
      const { container } = renderProductDetails();

      const thumbnails = container.querySelectorAll(
        ".details-thumbnails .thumbnail"
      );

      if (thumbnails.length > 1) {
        const secondImage = thumbnails[1].querySelector("img").getAttribute("src");

        fireEvent.click(thumbnails[1]);

        expect(
          container.querySelector(".details-main-image img")
        ).toHaveAttribute("src", secondImage);

        expect(thumbnails[1]).toHaveClass("active-thumbnail");
      } else {
        expect(thumbnails).toHaveLength(1);
      }
    });

    it("renders the gallery note", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".details-gallery")).getByText(
          "Product images"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Quantity Controls", () => {
    it("renders the quantity section", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-quantity-section")
      ).toBeInTheDocument();
    });

    it("starts with quantity one", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-quantity span")
      ).toHaveTextContent("1");
    });

    it("disables the decrease button when quantity is one", () => {
      const { container } = renderProductDetails();

      const buttons = container.querySelectorAll(
        ".details-quantity button"
      );

      expect(buttons[0]).toBeDisabled();
    });

    it("increases quantity when the plus button is clicked", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 1) {
        const buttons = container.querySelectorAll(
          ".details-quantity button"
        );

        fireEvent.click(buttons[1]);

        expect(
          container.querySelector(".details-quantity span")
        ).toHaveTextContent("2");
      } else {
        expect(
          container.querySelector(".details-quantity span")
        ).toHaveTextContent("1");
      }
    });

    it("decreases quantity when the minus button is clicked", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 1) {
        const buttons = container.querySelectorAll(
          ".details-quantity button"
        );

        fireEvent.click(buttons[1]);
        fireEvent.click(buttons[0]);

        expect(
          container.querySelector(".details-quantity span")
        ).toHaveTextContent("1");
      } else {
        expect(
          container.querySelector(".details-quantity span")
        ).toHaveTextContent("1");
      }
    });
  });

  describe("Cart Functionality", () => {
    it("renders the Add to Cart button", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".details-buttons")).getByRole(
          "button",
          { name: /Add to Cart|Maximum Stock in Cart/i }
        )
      ).toBeInTheDocument();
    });

    it("disables Add to Cart when the product is out of stock", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) <= 0) {
        expect(
          container.querySelector(".details-add-cart")
        ).toBeDisabled();
      } else {
        expect(
          container.querySelector(".details-add-cart")
        ).toBeEnabled();
      }
    });

    it("adds the product to the cart", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 0) {
        fireEvent.click(
          container.querySelector(".details-add-cart")
        );

        expect(
          container.querySelector(".already-in-cart")
        ).toBeInTheDocument();

        expect(
          container.querySelector(".already-in-cart")
        ).toHaveTextContent("1 already in your cart.");
      } else {
        expect(
          container.querySelector(".details-add-cart")
        ).toBeDisabled();
      }
    });

    it("displays the Go to Cart link after adding a product", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 0) {
        fireEvent.click(
          container.querySelector(".details-add-cart")
        );

        expect(
          within(
            container.querySelector(".already-in-cart")
          ).getByRole("link", { name: /Go to Cart/i })
        ).toHaveAttribute("href", "/cart");
      } else {
        expect(
          container.querySelector(".already-in-cart")
        ).not.toBeInTheDocument();
      }
    });

    it("renders the Buy Now button", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-buy-now")
      ).toBeInTheDocument();
    });

    it("disables Buy Now when the product is out of stock", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) <= 0) {
        expect(
          container.querySelector(".details-buy-now")
        ).toBeDisabled();
      } else {
        expect(
          container.querySelector(".details-buy-now")
        ).toBeEnabled();
      }
    });

    it("navigates to Checkout when Buy Now is clicked", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 0) {
        fireEvent.click(
          container.querySelector(".details-buy-now")
        );

        expect(
          within(container).getByRole("heading", {
            name: "Checkout Page",
          })
        ).toBeInTheDocument();
      } else {
        expect(
          container.querySelector(".details-buy-now")
        ).toBeDisabled();
      }
    });

    it("adds the product to cart before navigating to Checkout", () => {
      const { container } = renderProductDetails();

      if (Number(product.stock) > 0) {
        fireEvent.click(
          container.querySelector(".details-buy-now")
        );

        const cart = JSON.parse(
          window.localStorage.getItem("recyconnect-cart") || "[]"
        );

        expect(
          cart.some((item) => String(item.id) === String(product.id))
        ).toBe(true);
      } else {
        expect(
          container.querySelector(".details-buy-now")
        ).toBeDisabled();
      }
    });
  });

  describe("Wishlist Functionality", () => {
    it("renders the Add to Wishlist button", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-wishlist")
      ).toBeInTheDocument();
    });

    it("adds the product to wishlist when clicked", () => {
      const { container } = renderProductDetails();

      const wishlistButton = container.querySelector(
        ".details-wishlist"
      );

      fireEvent.click(wishlistButton);

      expect(wishlistButton).toHaveTextContent(
        "Added to Wishlist"
      );

      expect(wishlistButton).toHaveClass("saved");
    });

    it("removes the product from wishlist when clicked again", () => {
      const { container } = renderProductDetails();

      const wishlistButton = container.querySelector(
        ".details-wishlist"
      );

      fireEvent.click(wishlistButton);

      fireEvent.click(
        container.querySelector(".details-wishlist")
      );

      expect(
        container.querySelector(".details-wishlist")
      ).toHaveTextContent("Add to Wishlist");

      expect(
        container.querySelector(".details-wishlist")
      ).not.toHaveClass("saved");
    });
  });

  describe("Product Specifications", () => {
    it("renders the Product Information section", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".details-section")).getByRole(
          "heading",
          { name: "Product Information" }
        )
      ).toBeInTheDocument();
    });

    it("displays the product information introduction", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".details-section")
      ).toHaveTextContent(
        "Learn more about this sustainable product."
      );
    });

    it("renders the product specifications", () => {
      const { container } = renderProductDetails();

      const specificationItems = container.querySelectorAll(
        ".specification-item"
      );

      expect(specificationItems).toHaveLength(
        Object.keys(product.specifications || {}).length
      );
    });

    it("displays specification names and values", () => {
      const { container } = renderProductDetails();

      const specificationItems = container.querySelectorAll(
        ".specification-item"
      );

      specificationItems.forEach((item) => {
        expect(item.querySelector("span")).toBeInTheDocument();
        expect(item.querySelector("strong")).toBeInTheDocument();
      });
    });
  });

  describe("Customer Reviews", () => {
    it("renders the Customer Reviews section", () => {
      const { container } = renderProductDetails();

      expect(
        within(
          container.querySelector(".reviews-section")
        ).getByRole("heading", { name: "Customer Reviews" })
      ).toBeInTheDocument();
    });

    it("renders the review summary", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".reviews-summary")
      ).toBeInTheDocument();

      expect(
        container.querySelector(".average-rating")
      ).toBeInTheDocument();
    });

    it("displays the initial review count", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".average-rating p")
      ).toHaveTextContent("0 written reviews");
    });

    it("renders all five rating breakdown rows", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelectorAll(".rating-row")
      ).toHaveLength(5);
    });

    it("renders the review form", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector(".review-form")
      ).toBeInTheDocument();
    });

    it("renders all review form fields", () => {
      const { container } = renderProductDetails();

      expect(
        container.querySelector("#review-name")
      ).toBeInTheDocument();

      expect(
        container.querySelector("#review-title")
      ).toBeInTheDocument();

      expect(
        container.querySelector("#review-rating")
      ).toBeInTheDocument();

      expect(
        container.querySelector("#review-comment")
      ).toBeInTheDocument();
    });

    it("allows entering a review name", () => {
      const { container } = renderProductDetails();

      const nameInput = container.querySelector("#review-name");

      fireEvent.change(nameInput, {
        target: { value: "Test User" },
      });

      expect(nameInput).toHaveValue("Test User");
    });

    it("allows entering a review title", () => {
      const { container } = renderProductDetails();

      const titleInput = container.querySelector("#review-title");

      fireEvent.change(titleInput, {
        target: { value: "Great Product" },
      });

      expect(titleInput).toHaveValue("Great Product");
    });

    it("allows selecting a review rating", () => {
      const { container } = renderProductDetails();

      const ratingSelect = container.querySelector(
        "#review-rating"
      );

      fireEvent.change(ratingSelect, {
        target: { value: "4" },
      });

      expect(ratingSelect).toHaveValue("4");
    });

    it("allows entering a review comment", () => {
      const { container } = renderProductDetails();

      const commentInput = container.querySelector(
        "#review-comment"
      );

      fireEvent.change(commentInput, {
        target: { value: "This is a useful product." },
      });

      expect(commentInput).toHaveValue(
        "This is a useful product."
      );
    });

    it("renders the Submit Review button", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".review-form")).getByRole(
          "button",
          { name: "Submit Review" }
        )
      ).toBeInTheDocument();
    });

    it("submits a review successfully", () => {
      const { container } = renderProductDetails();

      fireEvent.change(
        container.querySelector("#review-name"),
        { target: { value: "Test User" } }
      );

      fireEvent.change(
        container.querySelector("#review-title"),
        { target: { value: "Excellent Product" } }
      );

      fireEvent.change(
        container.querySelector("#review-rating"),
        { target: { value: "4" } }
      );

      fireEvent.change(
        container.querySelector("#review-comment"),
        { target: { value: "Very useful and sustainable." } }
      );

      fireEvent.submit(
        container.querySelector(".review-form")
      );

      expect(
        within(container.querySelector(".review-form")).getByText(
          "Thank you! Your review has been added."
        )
      ).toBeInTheDocument();
    });

    it("displays the submitted review in the review list", () => {
      const { container } = renderProductDetails();

      fireEvent.change(
        container.querySelector("#review-name"),
        { target: { value: "Test User" } }
      );

      fireEvent.change(
        container.querySelector("#review-title"),
        { target: { value: "Excellent Product" } }
      );

      fireEvent.change(
        container.querySelector("#review-comment"),
        { target: { value: "Very useful and sustainable." } }
      );

      fireEvent.submit(
        container.querySelector(".review-form")
      );

      const reviewList = container.querySelector(".review-list");

      expect(reviewList).toHaveTextContent("Test User");
      expect(reviewList).toHaveTextContent("Excellent Product");
      expect(reviewList).toHaveTextContent(
        "Very useful and sustainable."
      );
    });

    it("resets the review form after successful submission", () => {
      const { container } = renderProductDetails();

      const nameInput = container.querySelector("#review-name");
      const titleInput = container.querySelector("#review-title");
      const commentInput = container.querySelector("#review-comment");

      fireEvent.change(nameInput, {
        target: { value: "Test User" },
      });

      fireEvent.change(titleInput, {
        target: { value: "Good Product" },
      });

      fireEvent.change(commentInput, {
        target: { value: "Good experience." },
      });

      fireEvent.submit(
        container.querySelector(".review-form")
      );

      expect(nameInput).toHaveValue("");
      expect(titleInput).toHaveValue("");
      expect(commentInput).toHaveValue("");
    });

    it("updates the review count after submitting a review", () => {
      const { container } = renderProductDetails();

      fireEvent.change(
        container.querySelector("#review-name"),
        { target: { value: "Test User" } }
      );

      fireEvent.change(
        container.querySelector("#review-title"),
        { target: { value: "Good Product" } }
      );

      fireEvent.change(
        container.querySelector("#review-comment"),
        { target: { value: "Good experience." } }
      );

      fireEvent.submit(
        container.querySelector(".review-form")
      );

      expect(
        container.querySelector(".average-rating p")
      ).toHaveTextContent("1 written reviews");
    });

    it("displays the no reviews message initially", () => {
      const { container } = renderProductDetails();

      expect(
        within(container.querySelector(".review-list")).getByText(
          /No written reviews yet/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Related Products", () => {
    it("renders related products when matching products exist", () => {
      const { container } = renderProductDetails();

      const related = products.filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category
      ).slice(0, 4);

      if (related.length > 0) {
        expect(
          container.querySelector(".related-section")
        ).toBeInTheDocument();
      } else {
        expect(
          container.querySelector(".related-section")
        ).not.toBeInTheDocument();
      }
    });

    it("displays the Related Products heading when available", () => {
      const { container } = renderProductDetails();

      const relatedSection = container.querySelector(
        ".related-section"
      );

      if (relatedSection) {
        expect(
          within(relatedSection).getByRole("heading", {
            name: "Related Products",
          })
        ).toBeInTheDocument();
      } else {
        expect(relatedSection).not.toBeInTheDocument();
      }
    });

    it("renders links to related product details", () => {
      const { container } = renderProductDetails();

      const relatedSection = container.querySelector(
        ".related-section"
      );

      if (relatedSection) {
        const related = products.filter(
          (item) =>
            item.id !== product.id &&
            item.category === product.category
        ).slice(0, 4);

        const links = relatedSection.querySelectorAll(
          ".related-product-card"
        );

        expect(links).toHaveLength(related.length);

        links.forEach((link, index) => {
          expect(link).toHaveAttribute(
            "href",
            `/products/${related[index].id}`
          );
        });
      } else {
        expect(relatedSection).not.toBeInTheDocument();
      }
    });
  });

  describe("Product Not Found", () => {
    it("displays Product Not Found for an invalid product ID", () => {
      const { container } = renderProductDetails("invalid-product-id");

      expect(
        within(container).getByRole("heading", {
          name: "Product Not Found",
        })
      ).toBeInTheDocument();
    });

    it("displays the unavailable product message", () => {
      const { container } = renderProductDetails("invalid-product-id");

      expect(
        within(container).getByText(
          "Sorry, this product is not available."
        )
      ).toBeInTheDocument();
    });

    it("displays the Explore Products link", () => {
      const { container } = renderProductDetails("invalid-product-id");

      expect(
        within(container).getByRole("link", {
          name: "Explore Products",
        })
      ).toHaveAttribute("href", "/products");
    });

    it("does not render the product details page for an invalid ID", () => {
      const { container } = renderProductDetails("invalid-product-id");

      expect(
        container.querySelector(".details-page")
      ).not.toBeInTheDocument();

      expect(
        container.querySelector(".product-not-found")
      ).toBeInTheDocument();
    });
  });
});
