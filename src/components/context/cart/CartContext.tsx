import { createContext, useEffect, useState } from "react";

type Cart = { items: Item[] };

const initialState: Cart = { items: [] };

export const CartContext = createContext<{
  cart: Cart;
  addItem: (item: Item) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}>({
  cart: initialState,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setState] = useState<Cart>(initialState);

  const addItem = (newItem: Item) => {
    setState((prevState) => {
      // 아이템 추가
      const items = structuredClone(prevState.items);
      const foundItem = items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
      );
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        items.push(newItem);
      }

      // 캐싱
      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...prevState, items };
    });
  };

  const removeItem = (productId: string, color?: string, size?: string) => {
    console.log({ productId, color, size });

    setState((prevState) => {
      // 아이템 삭제
      const items = prevState.items.filter((item) => {
        return item.productId !== productId;
        // return !(item.productId === productId && item.color === color && item.size === size);
      });

      // 캐싱
      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...prevState, items };
    });
  };

  const clearCart = () => {
    setState(initialState);
  };

  useEffect(() => {
    cart.items.length > 0 && console.log({ cart });
  }, [cart]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    setState((prevState) => ({ ...prevState, ...cart }));
  }, []);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
