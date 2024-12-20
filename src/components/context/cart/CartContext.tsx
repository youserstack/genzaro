import { createContext, useEffect, useState } from "react";

type Cart = { items: Item[] };

const initialState: Cart = { items: [] };

export const CartContext = createContext<{
  cart: Cart;
  addItem: (item: Item) => void;
  removeItem: (productId: string, attributes?: Record<string, string | number | undefined>) => void;
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
          // productId와 동적 속성들을 모두 비교
          item.productId === newItem.productId &&
          Object.keys(newItem).every((key) => newItem[key] === item[key])

        // item.productId === newItem.productId &&
        // item.color === newItem.color &&
        // item.size === newItem.size
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

  const removeItem = (
    productId: string,
    attributes: Record<string, string | number | undefined> = {}
  ) => {
    console.log({ productId, attributes });

    setState((prevState) => {
      // 아이템 삭제
      const items = prevState.items.filter((item) => {
        // productId 다르면 남기고(true로 리턴해야함)
        if (item.productId !== productId) return true;

        // productId 같으면
        // 동적 속성 비교
        const isMatchingAttributes = Object.entries(attributes).every(
          ([key, value]) => item[key] === value
        );

        // productId가 같고 모든 속성이 일치하면 제거(false로 리턴해야함)
        return !isMatchingAttributes;

        // return item.productId !== productId;
        // return !(item.productId === productId && item.color === color && item.size === size);
      });
      console.log({ items });

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
