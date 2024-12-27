import { createContext, useEffect, useState } from "react";

type Cart = { items: Item[] };

const initialState: Cart = { items: [] };

export const CartContext = createContext<{
  cart: Cart;
  addItem: (item: Item) => void;
  removeItem: (productId: string, currentItem: Item) => void;
  removeGroupedProduct: (productId: string) => void;
  updateItem: (productId: string, prevItem: Item, newItem: Item) => void;
  clearCart: () => void;
}>({
  cart: initialState,
  addItem: () => {},
  removeItem: () => {},
  removeGroupedProduct: () => {},
  updateItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart>(initialState);

  const addItem = (newItem: Item) => {
    setCart((state) => {
      // 아이템 추가
      const { quantity, total, ...rest } = newItem;
      const items = structuredClone(state.items);
      const foundItem = items.find((item) =>
        Object.keys(rest).every((key) => rest[key] === item[key])
      );

      if (foundItem) {
        foundItem.quantity += quantity;
        foundItem.total = foundItem.quantity * foundItem.price;
      } else {
        items.push({ ...newItem, total: newItem.quantity * newItem.price });
      }

      // 캐싱
      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...state, items };
    });
  };

  const removeItem = (productId: string, currentItem: Item) => {
    setCart((state) => {
      // 아이템 삭제
      const items = state.items.filter((item) => {
        // productId 다르면 남기고(true로 리턴해야함)
        if (item.productId !== productId) return true;

        // productId 같으면
        // 동적 속성 비교
        const isMatchingAttributes = Object.entries(currentItem).every(
          ([key, value]) => item[key] === value
        );

        // productId가 같고 모든 속성이 일치하면 제거(false로 리턴해야함)
        return !isMatchingAttributes;
      });

      // 캐싱
      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...state, items };
    });
  };

  const removeGroupedProduct = (productId: string) => {
    setCart((state) => {
      // 아이템 삭제
      const items = state.items.filter((item) => item.productId !== productId);

      // 캐싱
      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...state, items };
    });
  };

  const updateItem = (productId: string, prevItem: Item, newItem: Item) => {
    setCart((state) => {
      const items = state.items.map((item) => {
        if (
          item.productId === productId &&
          Object.entries(prevItem).every(([key, value]) => item[key] === value)
        ) {
          const updatedItem = { ...item, ...newItem };
          // total 갱신
          updatedItem.total = updatedItem.quantity * updatedItem.price;
          return updatedItem;
        }

        return item;
      });

      const cart = { items };
      localStorage.setItem("cart", JSON.stringify(cart));

      return { ...state, items };
    });
  };

  const clearCart = () => {
    setCart(initialState);
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") as string);
    setCart((state) => ({ ...state, ...cart }));
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, removeGroupedProduct, updateItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
