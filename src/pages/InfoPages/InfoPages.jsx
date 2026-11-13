
import { Link } from "react-router-dom";
import "./InfoPages.css";

const pageContent = {
  "how-it-works": {
    eyebrow: "YOUR JOURNEY WITH RECYCONNECT",
    title: "How It Works",
    intro:
      "Making sustainable choices is simple. RecyConnect helps you discover products, connect with people and give reusable materials a new life.",
    icon: "♻",
    sections: [
      {
        number: "01",
        icon: "⌕",
        title: "Explore",
        description:
          "Start by exploring the available categories, recyclable materials and refurbished products. Browse listings to discover items that match your needs.",
        points: [
          "Explore different material categories.",
          "Discover reusable and refurbished products.",
          "Compare available product listings.",
        ],
      },
      {
        number: "02",
        icon: "▣",
        title: "Choose",
        description:
          "Select the product or material you are interested in. Review the listing information, price and condition before proceeding.",
        points: [
          "Review product descriptions.",
          "Check the displayed price and condition.",
          "Choose the option that suits your needs.",
        ],
      },
      {
        number: "03",
        icon: "♧",
        title: "Connect",
        description:
          "Use the available marketplace options to connect with sellers and explore suitable reuse or recycling opportunities.",
        points: [
          "Explore available listings.",
          "Follow the available shopping or service process.",
          "Check listing details before making decisions.",
        ],
      },
      {
        number: "04",
        icon: "♻",
        title: "Reuse / Recycle",
        description:
          "Give products and materials another opportunity to be useful. Reuse what you can and choose responsible recycling for materials that cannot be reused.",
        points: [
          "Give reusable products a second life.",
          "Reduce unnecessary waste.",
          "Support a more circular economy.",
        ],
      },
    ],
  },

  benefits: {
    eyebrow: "WHY CHOOSE RECYCONNECT?",
    title: "Recycling & Service Benefits",
    intro:
      "RecyConnect brings reusable products, recyclable materials and sustainable choices together in one marketplace.",
    icon: "🌿",
    sections: [
      {
        number: "01",
        icon: "♻",
        title: "Easy Recycling",
        description:
          "Explore different material categories and discover opportunities to reuse or recycle materials instead of sending them directly to waste.",
        points: [
          "Explore multiple material categories.",
          "Find reusable products and materials.",
          "Make more responsible disposal choices.",
        ],
      },
      {
        number: "02",
        icon: "♧",
        title: "Convenient Discovery",
        description:
          "Discover products and materials through organised marketplace listings. Find useful items without searching through unrelated categories.",
        points: [
          "Browse organised product categories.",
          "Explore different available listings.",
          "Find products that match your interests.",
        ],
      },
      {
        number: "03",
        icon: "✓",
        title: "Clear Product Information",
        description:
          "Product information helps users understand what they are exploring before making a decision.",
        points: [
          "Review product names and descriptions.",
          "Check displayed prices and conditions.",
          "Explore product details before proceeding.",
        ],
      },
      {
        number: "04",
        icon: "🌱",
        title: "Sustainable Choices",
        description:
          "Choosing reuse, refurbished products and responsible recycling can help reduce unnecessary waste and encourage better resource use.",
        points: [
          "Prefer reuse whenever possible.",
          "Consider refurbished alternatives.",
          "Help reduce waste through responsible choices.",
        ],
      },
    ],
  },

  sustainability: {
    eyebrow: "OUR SUSTAINABILITY IMPACT",
    title: "Small Actions. Big Impact.",
    intro:
      "A sustainable future begins with everyday decisions. RecyConnect encourages people to reuse products, explore recycling opportunities and make better use of available resources.",
    icon: "🌍",
    sections: [
      {
        number: "01",
        icon: "♻",
        title: "Reduce Waste",
        description:
          "Reducing waste starts with thinking carefully before throwing something away. Many products and materials may still have value.",
        points: [
          "Avoid unnecessary waste.",
          "Reuse products whenever practical.",
          "Choose responsible disposal options.",
        ],
      },
      {
        number: "02",
        icon: "↻",
        title: "Promote Reuse",
        description:
          "Reusable products can continue serving a purpose. Passing useful items to someone who needs them helps extend their life.",
        points: [
          "Choose reusable alternatives.",
          "Consider donating usable products.",
          "Give unwanted items another opportunity.",
        ],
      },
      {
        number: "03",
        icon: "🌿",
        title: "Support Recycling",
        description:
          "Responsible recycling helps materials re-enter productive use rather than becoming unnecessary waste.",
        points: [
          "Separate recyclable materials responsibly.",
          "Explore suitable recycling options.",
          "Understand the value of different materials.",
        ],
      },
      {
        number: "04",
        icon: "🌎",
        title: "Build a Circular Future",
        description:
          "A circular economy focuses on keeping products and materials useful for longer through reuse, repair and recycling.",
        points: [
          "Use resources more thoughtfully.",
          "Support sustainable marketplace choices.",
          "Encourage a reuse-focused lifestyle.",
        ],
      },
    ],
  },
};

function InfoPages({ type }) {
  const page = pageContent[type];

  if (!page) {
    return (
      <main className="info-page">
        <h1>Page not found</h1>
        <Link to="/">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="info-page">
      <section className="info-hero">
        <div className="info-hero-content">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>

          <div className="info-breadcrumb">
            <Link to="/">Home</Link>
            <span> / </span>
            <span>{page.title}</span>
          </div>
        </div>

        <div className="info-hero-icon" aria-hidden="true">
          {page.icon}
        </div>
      </section>

      <section className="info-content">
        <div className="info-heading">
          <p className="eyebrow">LEARN MORE</p>
          <h2>{page.title}</h2>
          <p>
            Discover the different ways RecyConnect supports a more
            sustainable and resource-conscious lifestyle.
          </p>
        </div>

        <div className="info-grid">
          {page.sections.map((section) => (
            <article className="info-card" key={section.number}>
              <div className="info-card-top">
                <span>{section.number}</span>
                <strong>{section.icon}</strong>
              </div>

              <h3>{section.title}</h3>
              <p>{section.description}</p>

              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="info-cta">
        <div>
          <p className="eyebrow">TAKE THE NEXT STEP</p>
          <h2>Make Your Choices Count.</h2>
          <p>
            Explore products and materials and become part of a
            reuse-focused community.
          </p>
        </div>

        <div className="info-cta-actions">
          <Link to="/products" className="button button-primary">
            Explore Products →
          </Link>
          <Link to="/" className="button button-outline">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default InfoPages;
