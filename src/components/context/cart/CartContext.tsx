import { createContext, useEffect, useState } from "react";

type Item = {
  productId: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
};

type State = {
  userId: string | null;
  items: Item[];
};

const initialState: State = {
  userId: null,
  items: [],
};

export const CartContext = createContext<{
  state: State;
  addItem: (item: Item) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}>({
  state: initialState,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<State>(initialState);

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

      // 총합
      // const total = items.reduce((sum, v) => sum + v.price * v.quantity, 0);

      // 캐싱
      localStorage.setItem("carts", JSON.stringify(items));

      return { ...prevState, items };
    });

    // setState((prevState) => {
    //   const itemIndex = prevState.items.findIndex((v) => v.productId === item.productId);
    //   let items;
    //   if (itemIndex >= 0) {
    //     items = prevState.items.map((v, i) =>
    //       i === itemIndex ? { ...v, quantity: v.quantity + item.quantity } : v
    //     );
    //   } else {
    //     items = [...prevState.items, item];
    //   }

    //   // 총합을 재계산
    //   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    //   //   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    //   return { ...prevState, items, total };
    // });
  };

  const removeItem = (productId: string, color?: string, size?: string) => {
    setState((prevState) => {
      const items = prevState.items.filter((item) => {
        // 조건 1: productId가 일치하지만 color와 size가 없을 경우 제거
        if (productId && !color && !size) {
          return item.productId !== productId;
        }
        // 조건 2: productId, color, size가 모두 일치하는 경우 제거
        return !(item.productId === productId && item.color === color && item.size === size);
      });

      // 총합
      // const total = items.reduce((sum, v) => sum + v.price * v.quantity, 0);

      localStorage.setItem("carts", JSON.stringify(items));

      return { ...prevState, items };
    });
  };

  const clearCart = () => {
    setState(initialState);
  };

  useEffect(() => console.log({ state }), [state]);

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      setState((prevState) => ({
        ...prevState,
        items: JSON.parse(carts),
        total: JSON.parse(carts).reduce((sum: number, v: Item) => sum + v.price * v.quantity, 0),
      }));
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
