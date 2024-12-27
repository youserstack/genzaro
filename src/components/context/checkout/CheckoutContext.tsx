import { createContext, useState } from "react";

interface ShippingInfo {
  method: "standard" | "express" | "same-day" | "scheduled" | "pickup-location";
  recipent: string;
  address: string;
  phone: string;
  cost: number;
  instructions?: string;
  message?: string;
  note?: string;
}

interface Checkout {
  products: GroupedProduct[];
  shippingInfo: ShippingInfo;
  total: number;
}

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
}>({
  checkout: initialCheckout,
  setProducts: () => {},
});

export const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [checkout, setCheckout] = useState<Checkout>(initialCheckout);

  const setProducts = (products: GroupedProduct[]) => {
    setCheckout((state) => {
      state.products = products;
      return state;
    });
  };

  return (
    <CheckoutContext.Provider value={{ checkout, setProducts }}>
      {children}
    </CheckoutContext.Provider>
  );
};
