import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../utils/storage";

const CartContext = createContext(undefined);

const CartProvider = ({ children }) => {
  const [cartItems, setCarItems] = useState([]);
  const init = async () => {
    const persistedCartItems = await getItem("cart");
    if (persistedCartItems) {
      setCarItems(persistedCartItems);
    }
  };
  React.useEffect(() => {
    init();
  }, []);
  const addToCart = (item) => {
    setCarItems((prev) => [...JSON.parse(JSON.stringify(prev)), item]);
    setItem("cart", [...JSON.parse(JSON.stringify(cartItems)), item]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
