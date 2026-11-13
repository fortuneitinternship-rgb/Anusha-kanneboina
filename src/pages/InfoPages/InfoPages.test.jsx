
import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import InfoPages from "./InfoPages";

const renderInfoPage = (type) => {
  return render(
    <MemoryRouter>
      <InfoPages type={type} />
    </MemoryRouter>
  );
};

describe("InfoPages Component", () => {
  describe("How It Works Page", () => {
    it("renders the How It Works page correctly", () => {
      const { container } = renderInfoPage("how-it-works");

      const hero = container.querySelector(".info-hero");
      const content = container.querySelector(".info-content");

      expect(hero).toBeInTheDocument();
      expect(
        within(hero).getByRole("heading", {
          level: 1,
          name: "How It Works",
        })
      ).toBeInTheDocument();

      expect(
        within(content).getByRole("heading", {
          level: 2,
          name: "How It Works",
        })
      ).toBeInTheDocument();
    });

    it("displays the correct eyebrow text", () => {
      const { container } = renderInfoPage("how-it-works");

      expect(
        within(container.querySelector(".info-hero")).getByText(
          "YOUR JOURNEY WITH RECYCONNECT"
        )
      ).toBeInTheDocument();
    });

    it("renders all four process cards", () => {
      const { container } = renderInfoPage("how-it-works");
      const cards = container.querySelectorAll(".info-card");

      expect(cards).toHaveLength(4);
    });

    it.each(["Explore", "Choose", "Connect", "Reuse / Recycle"])(
      "displays the %s process step",
      (step) => {
        const { container } = renderInfoPage("how-it-works");
        const content = container.querySelector(".info-content");

        expect(
          within(content).getByRole("heading", {
            level: 3,
            name: step,
          })
        ).toBeInTheDocument();
      }
    );

    it("displays the process descriptions and lists", () => {
      const { container } = renderInfoPage("how-it-works");
      const cards = container.querySelectorAll(".info-card");

      cards.forEach((card) => {
        expect(card.querySelector("p")).toBeInTheDocument();
        expect(card.querySelectorAll("li").length).toBeGreaterThan(0);
      });
    });
  });

  describe("Benefits Page", () => {
    it("renders the Benefits page correctly", () => {
      const { container } = renderInfoPage("benefits");

      const hero = container.querySelector(".info-hero");
      const content = container.querySelector(".info-content");

      expect(
        within(hero).getByRole("heading", {
          level: 1,
          name: "Recycling & Service Benefits",
        })
      ).toBeInTheDocument();

      expect(
        within(content).getByRole("heading", {
          level: 2,
          name: "Recycling & Service Benefits",
        })
      ).toBeInTheDocument();
    });

    it("displays the correct benefits eyebrow", () => {
      const { container } = renderInfoPage("benefits");

      expect(
        within(container.querySelector(".info-hero")).getByText(
          "WHY CHOOSE RECYCONNECT?"
        )
      ).toBeInTheDocument();
    });

    it("renders all four benefit cards", () => {
      const { container } = renderInfoPage("benefits");

      expect(container.querySelectorAll(".info-card")).toHaveLength(4);
    });

    it.each([
      "Easy Recycling",
      "Convenient Discovery",
      "Clear Product Information",
      "Sustainable Choices",
    ])("displays the %s benefit", (benefit) => {
      const { container } = renderInfoPage("benefits");
      const content = container.querySelector(".info-content");

      expect(
        within(content).getByRole("heading", {
          level: 3,
          name: benefit,
        })
      ).toBeInTheDocument();
    });

    it("displays descriptions and bullet points for all benefits", () => {
      const { container } = renderInfoPage("benefits");
      const cards = container.querySelectorAll(".info-card");

      cards.forEach((card) => {
        expect(card.querySelector("p")).toBeInTheDocument();
        expect(card.querySelectorAll("li")).toHaveLength(3);
      });
    });
  });

  describe("Sustainability Page", () => {
    it("renders the Sustainability page correctly", () => {
      const { container } = renderInfoPage("sustainability");

      const hero = container.querySelector(".info-hero");
      const content = container.querySelector(".info-content");

      expect(
        within(hero).getByRole("heading", {
          level: 1,
          name: "Small Actions. Big Impact.",
        })
      ).toBeInTheDocument();

      expect(
        within(content).getByRole("heading", {
          level: 2,
          name: "Small Actions. Big Impact.",
        })
      ).toBeInTheDocument();
    });

    it("displays the correct sustainability eyebrow", () => {
      const { container } = renderInfoPage("sustainability");

      expect(
        within(container.querySelector(".info-hero")).getByText(
          "OUR SUSTAINABILITY IMPACT"
        )
      ).toBeInTheDocument();
    });

    it("renders all four sustainability cards", () => {
      const { container } = renderInfoPage("sustainability");

      expect(container.querySelectorAll(".info-card")).toHaveLength(4);
    });

    it.each([
      "Reduce Waste",
      "Promote Reuse",
      "Support Recycling",
      "Build a Circular Future",
    ])("displays the %s sustainability section", (section) => {
      const { container } = renderInfoPage("sustainability");
      const content = container.querySelector(".info-content");

      expect(
        within(content).getByRole("heading", {
          level: 3,
          name: section,
        })
      ).toBeInTheDocument();
    });

    it("displays descriptions and bullet points for all sustainability cards", () => {
      const { container } = renderInfoPage("sustainability");
      const cards = container.querySelectorAll(".info-card");

      cards.forEach((card) => {
        expect(card.querySelector("p")).toBeInTheDocument();
        expect(card.querySelectorAll("li")).toHaveLength(3);
      });
    });
  });

  describe("Common Page Elements", () => {
    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the hero section",
      (type) => {
        const { container } = renderInfoPage(type);

        expect(container.querySelector(".info-hero")).toBeInTheDocument();
        expect(
          container.querySelector(".info-hero-content")
        ).toBeInTheDocument();
        expect(
          container.querySelector(".info-hero-icon")
        ).toBeInTheDocument();
      }
    );

    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the information section",
      (type) => {
        const { container } = renderInfoPage(type);

        expect(container.querySelector(".info-content")).toBeInTheDocument();
        expect(container.querySelector(".info-heading")).toBeInTheDocument();
        expect(container.querySelector(".info-grid")).toBeInTheDocument();
      }
    );

    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the breadcrumb",
      (type) => {
        const { container } = renderInfoPage(type);
        const breadcrumb = container.querySelector(".info-breadcrumb");

        expect(breadcrumb).toBeInTheDocument();
        expect(
          within(breadcrumb).getByRole("link", { name: "Home" })
        ).toHaveAttribute("href", "/");
      }
    );

    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the CTA section",
      (type) => {
        const { container } = renderInfoPage(type);
        const cta = container.querySelector(".info-cta");

        expect(cta).toBeInTheDocument();
        expect(
          within(cta).getByRole("heading", {
            name: "Make Your Choices Count.",
          })
        ).toBeInTheDocument();
      }
    );

    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the Explore Products link",
      (type) => {
        const { container } = renderInfoPage(type);
        const cta = container.querySelector(".info-cta");

        expect(
          within(cta).getByRole("link", { name: /Explore Products/i })
        ).toHaveAttribute("href", "/products");
      }
    );

    it.each(["how-it-works", "benefits", "sustainability"])(
      "%s page displays the Back to Home link",
      (type) => {
        const { container } = renderInfoPage(type);
        const cta = container.querySelector(".info-cta");

        expect(
          within(cta).getByRole("link", { name: /Back to Home/i })
        ).toHaveAttribute("href", "/");
      }
    );
  });

  describe("Invalid Page Type", () => {
    it("displays Page not found for an invalid type", () => {
      const { container } = renderInfoPage("invalid-page");

      expect(
        within(container).getByRole("heading", {
          name: "Page not found",
        })
      ).toBeInTheDocument();
    });

    it("displays a Return Home link for an invalid type", () => {
      const { container } = renderInfoPage("invalid-page");

      expect(
        within(container).getByRole("link", {
          name: "Return Home",
        })
      ).toHaveAttribute("href", "/");
    });

    it("does not render the information cards for an invalid type", () => {
      const { container } = renderInfoPage("invalid-page");

      expect(container.querySelectorAll(".info-card")).toHaveLength(0);
    });

    it("does not render the CTA section for an invalid type", () => {
      const { container } = renderInfoPage("invalid-page");

      expect(container.querySelector(".info-cta")).not.toBeInTheDocument();
    });
  });
});
