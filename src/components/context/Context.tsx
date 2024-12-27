"use client";

import { createContext, useState } from "react";
import { CartProvider } from "./cart/CartContext";
import { SessionProvider } from "next-auth/react";
import { CheckoutProvider } from "./checkout/CheckoutContext";

type Props = {
  children: React.ReactNode;
  mode?: string;
};

export const Context = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: string;
}>({
  open: false,
  setOpen: () => {},
});

export const Provider = ({ children, mode }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <SessionProvider>
      <Context.Provider value={{ mode, open, setOpen }}>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </Context.Provider>
    </SessionProvider>
  );
};
