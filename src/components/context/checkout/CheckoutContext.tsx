import { createContext, useState } from "react";

const initialCheckout: Checkout = {
  products: [],
  shippingInfo: {
    recipent: "",
    address: "",
    method: "standard",
    phone: "",
    cost: 3000,
  },
  total: 0,
};

export const CheckoutContext = createContext<{
  checkout: Checkout;
  setProducts: (products: GroupedProduct[]) => void;
  clearCheckout: () => void;
}>({
  checkout: initialCheckout,
  setProducts: () => {},
  clearCheckout: () => {},
});

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkout, setCheckout] = useState<Checkout>(initialCheckout);

  const setProducts = (products: GroupedProduct[]) => {
    const total =
      // 제품리스트 레벨에서 카운팅
      products.reduce(
        // 아이템리스트 레벨에서 카운팅
        (a, product) => a + product.items.reduce((a, item) => a + item.total, 0),
        0
      );

    setCheckout((state) => ({
      ...state,
      products,
      total,
    }));
  };

  const clearCheckout = () => {
    setCheckout(initialCheckout);
  };

  return (
    <CheckoutContext.Provider value={{ checkout, setProducts, clearCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};
