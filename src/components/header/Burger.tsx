"use client";

import { useContext } from "react";
import { HiBars2 } from "react-icons/hi2";
import { Context } from "../context/Context";

export default function Burger() {
  const { setOpen } = useContext(Context);

  return (
    <button
      className="버거 flex md:hidden
      relative size-9  justify-center items-center    
      text-sm font-semibold rounded-lg
      hover:bg-neutral-200/20 [&_svg]:stroke-2"
      type="button"
      onClick={() => setOpen(true)}
    >
      <HiBars2 />
    </button>
  );
}
