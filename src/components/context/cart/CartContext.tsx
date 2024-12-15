import { createContext, useState } from "react";

type Item = {
  productId: string;
  quantity: number;
  price: number;
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

  // 장바구니에 상품을 추가하는 함수
  const addItem = (item: Item) => {
    setState((prevState) => {
      const itemIndex = prevState.items.findIndex((i) => i.productId === item.productId);
      let updatedItems;
      if (itemIndex >= 0) {
        // 만약 이미 장바구니에 해당 상품이 있으면, 수량을 증가시킴
        updatedItems = prevState.items.map((i, index) =>
          index === itemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        // 해당 상품이 없다면, 새로 장바구니에 추가
        updatedItems = [...prevState.items, item];
      }
      // 총합을 재계산
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...prevState, items: updatedItems, total };
    });
  };

  // 장바구니에서 특정 상품을 제거하는 함수
  const removeItem = (productId: string) => {
    setState((prevState) => {
      const updatedItems = prevState.items.filter((item) => item.productId !== productId);
      // 총합을 재계산
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...prevState, items: updatedItems, total };
    });
  };

  // 장바구니를 초기 상태로 리셋하는 함수
  const clearCart = () => {
    setState(initialState);
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
