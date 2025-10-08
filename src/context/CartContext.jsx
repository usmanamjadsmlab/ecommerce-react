import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [payment, setPayment] = useState(null);

  // 🛒 Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const uniqueId =
        product.uniqueId ||
        product.id ||
        Math.random().toString(36).substr(2, 9);

      const existing = prev.find((item) => item.uniqueId === uniqueId);

      if (existing) {
        return prev.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        const numericPrice = product.price
          ? Number(product.price.toString().replace("$", ""))
          : 0;

        return [
          ...prev,
          {
            ...product,
            uniqueId,
            quantity: product.quantity || 1,
            price: numericPrice,
          },
        ];
      }
    });
  };

  // ❌ Remove item
  const removeFromCart = (uniqueId) => {
    setCartItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // ➕ Increase qty
  const increaseQty = (uniqueId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ Decrease qty
  const decreaseQty = (uniqueId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.uniqueId === uniqueId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // 🧮 Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const cartCount = cartItems.length;
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        cartCount,
        cartQuantity,
        subtotal,
        discount,
        deliveryFee,
        total,
        customer,
        setCustomer,
        payment,
        setPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
