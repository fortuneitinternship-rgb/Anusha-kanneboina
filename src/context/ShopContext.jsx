
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ShopContext = createContext();

const readStorage = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState(() =>
    readStorage("recyconnect-cart")
  );

  const [wishlistItems, setWishlistItems] = useState(() =>
    readStorage("recyconnect-wishlist")
  );

  const [reviews, setReviews] = useState(() =>
    readStorage("recyconnect-reviews")
  );

  useEffect(() => {
    localStorage.setItem("recyconnect-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("recyconnect-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("recyconnect-reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Find a cart item
  const getCartItem = (productId) =>
    cartItems.find((item) => item.id === productId);

  // Add product to cart
  const addToCart = (product) => {
    if (Number(product.stock) <= 0) return;

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity >= Number(product.stock)) {
          return previousItems;
        }

        return previousItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId)
    );
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    const newQuantity = Number(quantity);

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== productId) return item;

        const stock = Number(item.stock);
        const safeQuantity = Number.isFinite(stock) && stock > 0
          ? Math.min(newQuantity, stock)
          : newQuantity;

        return { ...item, quantity: safeQuantity };
      })
    );
  };

  // Wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((previousItems) => {
      const exists = previousItems.some(
        (item) => item.id === product.id
      );

      return exists
        ? previousItems.filter((item) => item.id !== product.id)
        : [...previousItems, product];
    });
  };

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.id === productId);

  // Clear cart
  const clearCart = () => setCartItems([]);

  // Cart calculations
  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // Product reviews
  const addReview = (productId, review) => {
    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productId: Number(productId),
      name: review.name.trim(),
      title: review.title.trim(),
      comment: review.comment.trim(),
      rating: Number(review.rating),
      date: new Date().toISOString(),
    };

    setReviews((previousReviews) => [
      newReview,
      ...previousReviews,
    ]);

    return newReview;
  };

  const getProductReviews = (productId) =>
    reviews.filter(
      (review) => Number(review.productId) === Number(productId)
    );

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        wishlistItems,
        reviews,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        getCartItem,
        addReview,
        getProductReviews,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
