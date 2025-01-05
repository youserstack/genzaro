"use client";

import { createContext, useState } from "react";
import { CartProvider } from "./cart/CartContext";
import { CheckoutProvider } from "./checkout/CheckoutContext";
import { PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.PAYPAL_CLIENT_ID as string,
  currency: "USD",
};

export const Context = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: string;
}>({
  open: false,
  setOpen: () => {},
});

export const Provider = ({ children, mode }: { children: React.ReactNode; mode?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Context.Provider value={{ mode, open, setOpen }}>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </Context.Provider>
    </PayPalScriptProvider>
  );
};
