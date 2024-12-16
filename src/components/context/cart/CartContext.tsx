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
  total: number;
};

const initialState: State = {
  userId: null,
  items: [],
  total: 0,
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

  const addItem = (item: Item) => {
    setState((prevState) => {
      // 아이템 추가
      const items = structuredClone(prevState.items);
      const foundItem = items.find(
        (v) => v.productId === item.productId && v.color === item.color && v.size === item.size
      );
      if (foundItem) {
        foundItem.quantity += 1;
      } else {
        items.push(item);
      }

      // 총합
      const total = items.reduce((sum, v) => sum + v.price * v.quantity, 0);

      // 캐싱
      localStorage.setItem("carts", JSON.stringify(items));

      return { ...prevState, items, total };
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
      // 아이템 제거
      const items = prevState.items.filter(
        (v) => !(v.productId === productId && v.color === color && v.size === size)
      );

      // 총합
      const total = items.reduce((sum, v) => sum + v.price * v.quantity, 0);

      return { ...prevState, items, total };
    });
  };

  const clearCart = () => {
    setState(initialState);
  };

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
