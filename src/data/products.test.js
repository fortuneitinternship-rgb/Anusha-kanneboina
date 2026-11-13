
import { describe, it, expect } from "vitest";
import { products } from "./products";

describe("RecyConnect Product Data", () => {
  // 1. Export products
  it("exports products as an array", () => {
    expect(Array.isArray(products)).toBe(true);
  });

  // 2. Product count
  it("contains exactly 18 products", () => {
    expect(products).toHaveLength(18);
  });

  // 3. Required product properties
  it("contains all required properties for every product", () => {
    products.forEach((product) => {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("rating");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("condition");
      expect(product).toHaveProperty("stock");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("specifications");
      expect(product).toHaveProperty("images");
    });
  });

  // 4. Unique product IDs
  it("has unique product IDs", () => {
    const ids = products.map((product) => product.id);

    expect(new Set(ids).size).toBe(products.length);
  });

  // 5. Product names
  it("has a valid name for every product", () => {
    products.forEach((product) => {
      expect(product.name).toBeTruthy();
      expect(typeof product.name).toBe("string");
    });
  });

  // 6. Product prices
  it("has valid positive prices", () => {
    products.forEach((product) => {
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
    });
  });

  // 7. Product ratings
  it("has ratings between 0 and 5", () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });

  // 8. Product categories
  it("contains only the supported categories", () => {
    const validCategories = [
      "Plastic",
      "Metal",
      "Paper",
      "E-Waste",
      "Textile",
      "Other",
    ];

    products.forEach((product) => {
      expect(validCategories).toContain(product.category);
    });
  });

  // 9. Product conditions
  it("contains valid product conditions", () => {
    const validConditions = ["New", "Used", "Refurbished"];

    products.forEach((product) => {
      expect(validConditions).toContain(product.condition);
    });
  });

  // 10. Product stock
  it("has valid non-negative stock values", () => {
    products.forEach((product) => {
      expect(typeof product.stock).toBe("number");
      expect(product.stock).toBeGreaterThanOrEqual(0);
    });
  });

  // 11. Product descriptions
  it("has a non-empty description for every product", () => {
    products.forEach((product) => {
      expect(product.description).toBeTruthy();
      expect(typeof product.description).toBe("string");
    });
  });

  // 12. Product specifications
  it("has valid specifications for every product", () => {
    products.forEach((product) => {
      expect(typeof product.specifications).toBe("object");
      expect(product.specifications).not.toBeNull();
      expect(Object.keys(product.specifications).length).toBeGreaterThan(0);
    });
  });

  // 13. Product image paths
  it("has a valid image path for every product", () => {
    products.forEach((product) => {
      expect(product.image).toMatch(/^\/images\/.+\.(png|jpg|jpeg|webp)$/i);
    });
  });

  // 14. Product images array
  it("contains the main product image in images array", () => {
    products.forEach((product) => {
      expect(product.images).toEqual([product.image]);
    });
  });

  // 15. Category distribution
  it("contains products from all six categories", () => {
    const categories = new Set(
      products.map((product) => product.category)
    );

    expect(categories.size).toBe(6);
  });

  // 16. Plastic products
  it("contains three plastic products", () => {
    const plasticProducts = products.filter(
      (product) => product.category === "Plastic"
    );

    expect(plasticProducts).toHaveLength(3);
  });

  // 17. Metal products
  it("contains three metal products", () => {
    const metalProducts = products.filter(
      (product) => product.category === "Metal"
    );

    expect(metalProducts).toHaveLength(3);
  });

  // 18. Paper products
  it("contains three paper products", () => {
    const paperProducts = products.filter(
      (product) => product.category === "Paper"
    );

    expect(paperProducts).toHaveLength(3);
  });

  // 19. E-Waste products
  it("contains three E-Waste products", () => {
    const eWasteProducts = products.filter(
      (product) => product.category === "E-Waste"
    );

    expect(eWasteProducts).toHaveLength(3);
  });

  // 20. Textile products
  it("contains three textile products", () => {
    const textileProducts = products.filter(
      (product) => product.category === "Textile"
    );

    expect(textileProducts).toHaveLength(3);
  });

  // 21. Other category products
  it("contains three products in Other category", () => {
    const otherProducts = products.filter(
      (product) => product.category === "Other"
    );

    expect(otherProducts).toHaveLength(3);
  });

  // 22. Specific product details
  it("contains correct details for Recycled Plastic Chair", () => {
    const product = products.find((item) => item.id === 1);

    expect(product.name).toBe("Recycled Plastic Chair");
    expect(product.price).toBe(850);
    expect(product.category).toBe("Plastic");
    expect(product.condition).toBe("Used");
  });

  // 23. Product specifications
  it("contains correct specifications for the plastic chair", () => {
    const product = products.find((item) => item.id === 1);

    expect(product.specifications).toEqual({
      Material: "Recycled plastic",
      Usage: "Indoor and outdoor",
      Care: "Wipe with a damp cloth",
    });
  });

  // 24. Product IDs
  it("contains product IDs from 1 to 18", () => {
    const ids = products.map((product) => product.id).sort((a, b) => a - b);

    expect(ids).toEqual(
      Array.from({ length: 18 }, (_, index) => index + 1)
    );
  });

  // 25. Product image loading data
  it("uses the same image path for image and images array", () => {
    products.forEach((product) => {
      expect(product.images[0]).toBe(product.image);
    });
  });
});
