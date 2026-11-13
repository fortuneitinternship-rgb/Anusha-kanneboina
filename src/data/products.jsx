
const productDetails = {
  1: {
    description: "A durable chair made from recycled plastic. A sustainable seating choice for homes, gardens and outdoor spaces.",
    specifications: { Material: "Recycled plastic", Usage: "Indoor and outdoor", Care: "Wipe with a damp cloth" },
  },
  5: {
    description: "A reusable storage box made from recycled plastic. Ideal for organising household essentials.",
    specifications: { Material: "Recycled plastic", Usage: "Home storage", Care: "Wash and dry regularly" },
  },
  6: {
    description: "A reusable planter that gives plastic a second life while helping you create a greener home.",
    specifications: { Material: "Reusable plastic", Usage: "Gardening", Care: "Clean regularly" },
  },
  2: {
    description: "A sturdy table made using recycled metal materials. A practical and sustainable addition to your space.",
    specifications: { Material: "Recycled metal", Usage: "Indoor and outdoor", Care: "Keep dry when possible" },
  },
  7: {
    description: "A useful metal rack for organising household items, tools and everyday essentials.",
    specifications: { Material: "Recycled metal", Usage: "Storage", Care: "Wipe clean" },
  },
  8: {
    description: "A decorative flower pot made using recycled metal, suitable for your plants and garden.",
    specifications: { Material: "Recycled metal", Usage: "Gardening", Care: "Keep clean and dry" },
  },
  3: {
    description: "An eco-friendly notebook made from recycled paper. Perfect for notes, study and everyday writing.",
    specifications: { Material: "Recycled paper", Usage: "Writing and notes", Care: "Keep away from moisture" },
  },
  9: {
    description: "Reusable gift bags made from recycled paper, helping reduce single-use packaging waste.",
    specifications: { Material: "Recycled paper", Usage: "Gifting", Care: "Keep dry" },
  },
  10: {
    description: "A practical paper organiser for keeping your stationery and documents neatly arranged.",
    specifications: { Material: "Eco-friendly paper", Usage: "Organisation", Care: "Keep dry" },
  },
  4: {
    description: "A refurbished smartphone that gives electronic devices another useful life. Check the device condition before purchase.",
    specifications: { Category: "Refurbished electronics", Usage: "Communication", Care: "Use a compatible charger" },
  },
  11: {
    description: "A refurbished laptop offering another opportunity to use electronic equipment instead of discarding it.",
    specifications: { Category: "Refurbished electronics", Usage: "Work and study", Care: "Handle with care" },
  },
  12: {
    description: "A recycled electronic keyboard suitable for everyday computer use.",
    specifications: { Category: "Electronic accessory", Usage: "Computer input", Care: "Keep dust-free" },
  },
  13: {
    description: "An upcycled cotton tote bag designed for reusable everyday shopping and carrying essentials.",
    specifications: { Material: "Upcycled cotton", Usage: "Shopping and daily use", Care: "Follow fabric washing instructions" },
  },
  14: {
    description: "A cushion cover made from recycled fabric, giving textiles a fresh purpose in your home.",
    specifications: { Material: "Recycled fabric", Usage: "Home decor", Care: "Follow fabric washing instructions" },
  },
  15: {
    description: "A useful storage organiser made from reused denim fabric.",
    specifications: { Material: "Upcycled denim", Usage: "Storage", Care: "Clean according to fabric instructions" },
  },
  16: {
    description: "A decorative vase made from recycled glass. A sustainable choice for your home.",
    specifications: { Material: "Recycled glass", Usage: "Home decor", Care: "Handle carefully" },
  },
  17: {
    description: "A wooden storage box made using upcycled materials for practical and sustainable organisation.",
    specifications: { Material: "Upcycled wood", Usage: "Storage", Care: "Keep away from excess moisture" },
  },
  18: {
    description: "A reusable jute basket suitable for organising household essentials and everyday items.",
    specifications: { Material: "Jute", Usage: "Storage and organisation", Care: "Keep dry" },
  },
};

const baseProducts = [
  { id: 1, name: "Recycled Plastic Chair", price: 850, rating: 4.5, category: "Plastic", condition: "Used", stock: 12, image: "/images/plastic-chair.png" },
  { id: 5, name: "Recycled Plastic Storage Box", price: 350, rating: 4.3, category: "Plastic", condition: "Used", stock: 20, image: "/images/plastic-box.png" },
  { id: 6, name: "Reusable Plastic Planter", price: 250, rating: 4.4, category: "Plastic", condition: "New", stock: 15, image: "/images/plastic-planter.png" },

  { id: 2, name: "Recycled Metal Table", price: 1500, rating: 4.2, category: "Metal", condition: "Used", stock: 8, image: "/images/metal-table.png" },
  { id: 7, name: "Metal Storage Rack", price: 1200, rating: 4.5, category: "Metal", condition: "Used", stock: 10, image: "/images/metal-rack.png" },
  { id: 8, name: "Recycled Metal Flower Pot", price: 450, rating: 4.3, category: "Metal", condition: "New", stock: 18, image: "/images/metal-pot.png" },

  { id: 3, name: "Recycled Paper Notebook", price: 120, rating: 4.6, category: "Paper", condition: "New", stock: 30, image: "/images/paper-notebook.png" },
  { id: 9, name: "Recycled Paper Gift Bags", price: 180, rating: 4.4, category: "Paper", condition: "New", stock: 25, image: "/images/paper-bags.png" },
  { id: 10, name: "Eco-Friendly Paper Organizer", price: 220, rating: 4.5, category: "Paper", condition: "New", stock: 16, image: "/images/paper-organizer.png" },

  { id: 4, name: "Refurbished Smartphone", price: 6500, rating: 4.3, category: "E-Waste", condition: "Refurbished", stock: 5, image: "/images/smartphone.png" },
  { id: 11, name: "Refurbished Laptop", price: 18000, rating: 4.5, category: "E-Waste", condition: "Refurbished", stock: 4, image: "/images/refurbished-laptop.png" },
  { id: 12, name: "Recycled Electronic Keyboard", price: 750, rating: 4.1, category: "E-Waste", condition: "Used", stock: 9, image: "/images/electronic-keyboard.png" },

  { id: 13, name: "Upcycled Cotton Tote Bag", price: 299, rating: 4.6, category: "Textile", condition: "New", stock: 20, image: "/images/cotton-tote-bag.png" },
  { id: 14, name: "Recycled Fabric Cushion Cover", price: 399, rating: 4.4, category: "Textile", condition: "New", stock: 14, image: "/images/cushion-cover.png" },
  { id: 15, name: "Denim Storage Organizer", price: 499, rating: 4.3, category: "Textile", condition: "Used", stock: 11, image: "/images/denim-organizer.png" },

  { id: 16, name: "Recycled Glass Vase", price: 550, rating: 4.7, category: "Other", condition: "New", stock: 13, image: "/images/glass-vase.png" },
  { id: 17, name: "Upcycled Wooden Storage Box", price: 699, rating: 4.5, category: "Other", condition: "Used", stock: 10, image: "/images/wooden-box.png" },
  { id: 18, name: "Reusable Jute Basket", price: 350, rating: 4.4, category: "Other", condition: "New", stock: 17, image: "/images/jute-basket.png" },
];

export const products = baseProducts.map((product) => ({
  ...product,
  description: productDetails[product.id].description,
  specifications: productDetails[product.id].specifications,
  // Add more image paths here when you have additional product photos.
  images: [product.image],
}));
