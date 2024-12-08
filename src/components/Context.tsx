"use client";

import { createContext, useState } from "react";
// import { SessionProvider } from "next-auth/react";

interface IContext {
  mode?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
  mode?: string;
}

export const Context = createContext<IContext>({
  open: false,
  setOpen: () => {},
});

export const Provider = ({ children, mode }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    // <SessionProvider>
    <Context.Provider value={{ mode, open, setOpen }}>{children}</Context.Provider>
    // </SessionProvider>
  );
};
